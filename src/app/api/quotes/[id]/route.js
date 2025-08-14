import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/quotes/[id] - Get specific quote details
export async function GET(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const result = await fetch('https://bug-saving-frog.ngrok-free.app/get-vendor-quotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // Skip ngrok browser warning
      },
    })

      if (!result.ok) {
          console.error('External API error:', result.status, result.statusText)
          return NextResponse.json(
            {
              error: 'Failed to fetch vendor quotes',
              status: result.status,
              message: result.statusText
            },
            { status: result.status }
          )
        }

         const vendorQuotes = await result.json()
    console.log('Vendor quotes fetched successfully:', vendorQuotes)
    let filteredQuotes = vendorQuotes
    if (Array.isArray(vendorQuotes)) {
      filteredQuotes = vendorQuotes.filter(quote => quote.request_id === requestId)
    }

    return NextResponse.json(filteredQuotes)

  } catch (error) {
    console.error('Error fetching vendor quotes:', error)
    return NextResponse.json(
       {
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch vendor quotes'
      },
      { status: 500 }
    )
  }
}

// PUT /api/quotes/[id] - Update quote details
export async function PUT(request, { params }) {
  const { id } = await params
  const { status, notes, items } = await request.json()

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Update quote
      const quoteResult = await client.query(
        'UPDATE vendor_quotes SET status = $1, notes = $2, updated_at = NOW() WHERE id = $3',
        [status, notes, id]
      )

      if (quoteResult.rowCount === 0) {
        return NextResponse.json({ message: 'Quote not found' }, { status: 404 })
      }

      // Update items if provided
      if (items && Array.isArray(items)) {
        // Delete existing items
        await client.query('DELETE FROM quote_items WHERE quote_id = $1', [id])

        // Insert updated items
        for (const item of items) {
          await client.query(
            'INSERT INTO quote_items (quote_id, item_id, quoted_price, delivery_days, comments) VALUES ($1, $2, $3, $4, $5)',
            [id, item.item_id, item.quoted_price, item.delivery_days, item.comments]
          )
        }
      }

      await client.query('COMMIT')
      return NextResponse.json({ message: 'Quote updated successfully' })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error updating quote:', error)
    return NextResponse.json({ message: 'Error updating quote' }, { status: 500 })
  }
}

// DELETE /api/quotes/[id] - Delete quote
export async function DELETE(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Delete quote items first
      await client.query('DELETE FROM quote_items WHERE quote_id = $1', [id])

      // Delete quote
      const result = await client.query('DELETE FROM vendor_quotes WHERE id = $1', [id])

      if (result.rowCount === 0) {
        return NextResponse.json({ message: 'Quote not found' }, { status: 404 })
      }

      await client.query('COMMIT')
      return NextResponse.json({ message: 'Quote deleted successfully' })
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error deleting quote:', error)
    return NextResponse.json({ message: 'Error deleting quote' }, { status: 500 })
  }
}
