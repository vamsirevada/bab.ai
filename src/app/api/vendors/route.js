import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/vendors - List all vendors with optional filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit') || '50'
    const offset = searchParams.get('offset') || '0'

    let query = 'SELECT * FROM vendors'
    let queryParams = []
    let whereConditions = []

    if (status) {
      whereConditions.push(`status = $${queryParams.length + 1}`)
      queryParams.push(status)
    }

    if (category) {
      whereConditions.push(`category = $${queryParams.length + 1}`)
      queryParams.push(category)
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(' AND ')}`
    }

    query += ` ORDER BY name ASC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    queryParams.push(limit, offset)

    const result = await pool.query(query, queryParams)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Database error in /api/vendors:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch vendors',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

// POST /api/vendors - Create new vendor
export async function POST(request) {
  try {
    const { name, email, phone, category, address, status = 'active' } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      'INSERT INTO vendors (name, email, phone, category, address, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
      [name, email, phone, category, address, status]
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error('Error creating vendor:', error)
    return NextResponse.json(
      {
        error: 'Failed to create vendor',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
