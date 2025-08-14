import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/orders - List all orders with optional filtering

// POST /api/orders - Submit order (consolidates submit-order functionality)
export async function POST(request) {
  try {
    const payload = await request.json()
    const targetUrl =
      process.env.SUBMIT_ORDER_URL ||
      'https://bug-saving-frog.ngrok-free.app/submit-order'

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }

    return NextResponse.json(data, {
      status: res.status,
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('Error proxying submit order:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit order',
        message:
          process.env.NODE_ENV === 'development'
            ? error?.message
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
