import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM projects;')
    return NextResponse.json(rows)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      {
        message: 'Error fetching projects from the database.',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
