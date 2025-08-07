// src/app/api/orders/review-order/[id]/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request, { params }) {
  try {
    const { id } = await params

    // Validate ID parameter
    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      )
    }

    // Query database - works for both UUID and numeric IDs
    const result = await pool.query(
      'SELECT * FROM material_request_items WHERE material_request_id = $1 ORDER BY id',
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Review order not found', id },
        { status: 404 }
      )
    }

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error in /api/orders/review-order/[id]:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch review order',
        message:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
