import { NextResponse } from 'next/server'

// Server-side proxy to avoid CORS when submitting orders from the client
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
        // Suppress ngrok browser warning page in dev
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(payload),
      // Do not cache proxy responses
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
