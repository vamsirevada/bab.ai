import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/vendors/[id] - Get specific vendor details
export async function GET(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const result = await pool.query('SELECT * FROM vendors WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error in GET /api/vendors/[id]:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch vendor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

// PUT /api/vendors/[id] - Update vendor details
export async function PUT(request, { params }) {
  const { id } = await params
  const { name, email, phone, category, address, status } = await request.json()

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const result = await pool.query(
      'UPDATE vendors SET name = $1, email = $2, phone = $3, category = $4, address = $5, status = $6, updated_at = NOW() WHERE id = $7',
      [name, email, phone, category, address, status, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Vendor updated successfully' })
  } catch (error) {
    console.error('Error updating vendor:', error)
    return NextResponse.json({ message: 'Error updating vendor' }, { status: 500 })
  }
}

// DELETE /api/vendors/[id] - Delete vendor
export async function DELETE(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const result = await pool.query('DELETE FROM vendors WHERE id = $1', [id])

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Vendor deleted successfully' })
  } catch (error) {
    console.error('Error deleting vendor:', error)
    return NextResponse.json({ message: 'Error deleting vendor' }, { status: 500 })
  }
}
