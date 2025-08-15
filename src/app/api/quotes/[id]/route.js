import { NextResponse } from 'next/server'

// GET /api/quotes/[id] - Get quotes for a specific request ID from external API only
export async function GET(request, { params }) {
  const { id } = await params

  console.log('Fetching quotes for request ID:', id)

  if (!id) {
    return NextResponse.json(
      { error: 'Request ID parameter is required' },
      { status: 400 }
    )
  }

  try {
    console.log('Fetching quotes from external API...')

    const externalResult = await fetch(
      'https://bug-saving-frog.ngrok-free.app/get-vendor-quotes',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      }
    )

    if (!externalResult.ok) {
      console.error(
        'External API error:',
        externalResult.status,
        externalResult.statusText
      )

      const errorText = await externalResult.text()
      console.error('External API error response:', errorText)

      return NextResponse.json(
        {
          error: 'Failed to fetch vendor quotes',
          message: 'External API is not available',
          details:
            process.env.NODE_ENV === 'development' ? errorText : undefined,
        },
        { status: 502 } // Bad Gateway
      )
    }

    const vendorQuotes = await externalResult.json()
    console.log(
      'External API response received, total quotes:',
      Array.isArray(vendorQuotes) ? vendorQuotes.length : 'not an array'
    )

    // Filter quotes by request ID
    let filteredQuotes = []
    if (Array.isArray(vendorQuotes)) {
      filteredQuotes = vendorQuotes.filter((quote) => quote.request_id === id)
      console.log(
        `Filtered to ${filteredQuotes.length} quotes for request ${id}`
      )
    } else {
      console.warn('External API did not return an array:', typeof vendorQuotes)
      return NextResponse.json([])
    }

    return NextResponse.json(filteredQuotes)
  } catch (error) {
    console.error('Error fetching vendor quotes:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          process.env.NODE_ENV === 'development'
            ? error.message
            : 'Failed to fetch vendor quotes',
      },
      { status: 500 }
    )
  }
}
