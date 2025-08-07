// src/app/api/health/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db' // Adjust path based on your db.js location, e.g., src/lib/db.js

export async function GET() {
  let dbStatus = 'disconnected'
  let dbError = null

  try {
    const client = await pool.connect()
    console.log(client)
    await client.query('SELECT 1') // Execute a simple query to verify connection
    client.release() // Release the client back to the pool
    dbStatus = 'connected'
  } catch (error) {
    console.error('Database health check failed:', error)
    dbError =
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Connection failed'
  }

  const responseData = {
    status: 'ok',
    uptime: process.uptime(), // Node.js process uptime in seconds
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      error: dbError,
    },
  }

  if (dbStatus === 'connected') {
    return NextResponse.json(responseData, { status: 200 })
  } else {
    // If the database is disconnected, return a 500 status to indicate a problem
    return NextResponse.json(responseData, { status: 500 })
  }
}
