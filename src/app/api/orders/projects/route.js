// src/app/api/projects/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db' // Adjust path based on your db.js location, e.g., src/lib/db.js

export async function GET() {
  try {
    const result = await pool.query('SELECT id, name FROM projects') // Fetch all projects
    return NextResponse.json(result.rows) // Return the fetched data
  } catch (error) {
    console.error('Database error in /api/projects:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch projects',
        message:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
