import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/orders/[id]/quotes - Get all quotes for a specific order
export async function GET(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Order ID parameter is required' }, { status: 400 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const vendor_id = searchParams.get('vendor_id')
    const status = searchParams.get('status')

    let query = `
      SELECT vq.*, v.name as vendor_name, v.email as vendor_email
      FROM vendor_quotes vq
      LEFT JOIN vendors v ON vq.vendor_id = v.id
      WHERE vq.request_id = $1
    `
    let queryParams = [id]

    if (vendor_id) {
      query += ` AND vq.vendor_id = $${queryParams.length + 1}`
      queryParams.push(vendor_id)
    }

    if (status) {
      query += ` AND vq.status = $${queryParams.length + 1}`
      queryParams.push(status)
    }

    query += ` ORDER BY vq.created_at DESC`

    const result = await pool.query(query, queryParams)

    // Get quote items for each quote
    const quotesWithItems = await Promise.all(
      result.rows.map(async (quote) => {
        const itemsResult = await pool.query(
          'SELECT * FROM quote_items WHERE quote_id = $1 ORDER BY id',
          [quote.id]
        )
        return {
          ...quote,
          items: itemsResult.rows
        }
      })
    )

    return NextResponse.json(quotesWithItems)
  } catch (error) {
    console.error('Error in GET /api/orders/[id]/quotes:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch order quotes',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// POST /api/orders/[id]/quotes - Create a new quote for this order
export async function POST(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Order ID parameter is required' }, { status: 400 })
  }

  try {
    const { vendor_id, items, notes } = await request.json()

    if (!vendor_id || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Missing required fields: vendor_id and items array' },
        { status: 400 }
      )
    }

    // Verify order exists
    const orderCheck = await pool.query('SELECT id FROM material_requests WHERE id = $1', [id])
    if (orderCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Verify vendor exists
    const vendorCheck = await pool.query('SELECT id FROM vendors WHERE id = $1', [vendor_id])
    if (vendorCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const quoteResult = await client.query(
        'INSERT INTO vendor_quotes (request_id, vendor_id, notes, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
        [id, vendor_id, notes || '', 'pending']
      )

      const quoteId = quoteResult.rows[0].id

      // Insert quote items
      for (const item of items) {
        await client.query(
          'INSERT INTO quote_items (quote_id, item_id, quoted_price, delivery_days, comments) VALUES ($1, $2, $3, $4, $5)',
          [quoteId, item.item_id, item.quoted_price, item.delivery_days, item.comments]
        )
      }

      await client.query('COMMIT')
      return NextResponse.json({ id: quoteId, message: 'Quote created successfully for order' }, { status: 201 })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating order quote:', error)
    return NextResponse.json(
      {
        error: 'Failed to create quote for order',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
