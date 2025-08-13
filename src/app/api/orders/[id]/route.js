import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request, { params }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 })
  }

  try {
    const result = await pool.query('SELECT * FROM material_request_items WHERE material_request_id = $1 ORDER BY id', [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Review order not found', id }, { status: 404 })
    }

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error in GET /api/orders/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review order', message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  const { id } = await params
  const { material_name, sub_type, dimensions, quantity } = await request.json()

  try {
    const result = await pool.query(
      'UPDATE material_request_items SET material_name = $1, sub_type = $2, dimensions = $3, quantity = $4 WHERE id = $5',
      [material_name, sub_type, dimensions, quantity, id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 })
  }
}
