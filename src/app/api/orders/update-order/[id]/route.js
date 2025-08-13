import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(req, context) {
  // In Next.js dynamic route handlers, params must be awaited
  const { id } = await context.params
  const { material_name, sub_type, dimensions, quantity } = await req.json()

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
