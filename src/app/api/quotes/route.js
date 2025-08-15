import { NextResponse } from 'next/server'

// Server-side proxy to avoid CORS when sending quotes from the client
export async function POST(request) {
  try {
    const payload = await request.json()

    // Transform the payload to match VendorQuoteResponse format
    const transformedPayload = {
      request_id: payload.request_id, // Use the UUID from the payload
      vendor_id: payload.vendor_id, // Use the vendor_id from the payload
      items:
        payload.items?.map((item) => ({
          item_id: item.item_id,
          quoted_price: parseFloat(item.quoted_price) || 0,
          delivery_days: item.delivery_days || null,
          comments: item.comments || null,
        })) || [],
    }

    const targetUrl =
      process.env.SEND_QUOTE_URL ||
      'https://bug-saving-frog.ngrok-free.app/vendor-quote-response'

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Suppress ngrok browser warning page in dev
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(transformedPayload),
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
    console.error('Error proxying send quote:', error)
    return NextResponse.json(
      {
        error: 'Failed to send quote',
        message:
          process.env.NODE_ENV === 'development'
            ? error?.message
            : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
