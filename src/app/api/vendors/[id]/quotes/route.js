import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/vendors/[id]/quotes - Get all quotes from a specific vendor
export async function GET(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Vendor ID parameter is required' }, { status: 400 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const request_id = searchParams.get('request_id')
    const limit = searchParams.get('limit') || '50'
    const offset = searchParams.get('offset') || '0'

    let query = `
      SELECT vq.*, mr.project_id
      FROM vendor_quotes vq
      LEFT JOIN material_requests mr ON vq.request_id = mr.id
      WHERE vq.vendor_id = $1
    `
    let queryParams = [id]

    if (status) {
      query += ` AND vq.status = $${queryParams.length + 1}`
      queryParams.push(status)
    }

    if (request_id) {
      query += ` AND vq.request_id = $${queryParams.length + 1}`
      queryParams.push(request_id)
    }

    query += ` ORDER BY vq.created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    queryParams.push(limit, offset)

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
    console.error('Error in GET /api/vendors/[id]/quotes:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch vendor quotes',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// POST /api/vendors/[id]/quotes - Create a new quote for this vendor
export async function POST(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Vendor ID parameter is required' }, { status: 400 })
  }

  try {
    const { request_id, items, notes } = await request.json()

    if (!request_id || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Missing required fields: request_id and items array' },
        { status: 400 }
      )
    }

    // Verify vendor exists
    const vendorCheck = await pool.query('SELECT id FROM vendors WHERE id = $1', [id])
    if (vendorCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const quoteResult = await client.query(
        'INSERT INTO vendor_quotes (request_id, vendor_id, notes, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
        [request_id, id, notes || '', 'pending']
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
      return NextResponse.json({ id: quoteId, message: 'Quote created successfully' }, { status: 201 })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error creating vendor quote:', error)
    return NextResponse.json(
      {
        error: 'Failed to create quote',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
