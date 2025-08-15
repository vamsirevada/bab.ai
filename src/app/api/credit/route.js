import { NextResponse } from 'next/server'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max))
}

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      businessName,
      pan,
      gstin = '',
      turnover, // INR per year
      years, // years in operation
      email,
    } = body || {}

    if (!businessName || !pan || !turnover || years === undefined || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    if (!panRegex.test(String(pan).toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid PAN format' },
        { status: 400 }
      )
    }

    const turnoverNum = Number(turnover)
    const yearsNum = Number(years)
    if (!Number.isFinite(turnoverNum) || turnoverNum <= 0) {
      return NextResponse.json(
        { error: 'Turnover must be a positive number' },
        { status: 400 }
      )
    }
    if (!Number.isFinite(yearsNum) || yearsNum < 0) {
      return NextResponse.json(
        { error: 'Years in operation must be zero or more' },
        { status: 400 }
      )
    }

    // Basic rule-based eligibility
    const minTurnover = 500000 // INR 5,00,000
    const minYears = 0.5

    let eligible = true
    const reasons = []

    if (turnoverNum < minTurnover) {
      eligible = false
      reasons.push('Minimum annual turnover INR 5,00,000 required')
    }
    if (yearsNum < minYears) {
      eligible = false
      reasons.push('At least 6 months of operations required')
    }

    // Estimate a limit: 12% to 22% of annual turnover, adjusted by profile
    let basePct = 0.15
    if (turnoverNum >= 5000000) basePct += 0.03 // +3% for > 50L turnover
    if (yearsNum >= 3) basePct += 0.02 // +2% for stability
    if (gstin && typeof gstin === 'string' && gstin.length >= 10) basePct += 0.01 // +1% for GST profile

    basePct = clamp(basePct, 0.12, 0.22)

    let creditLimit = Math.round(turnoverNum * basePct)
    creditLimit = clamp(creditLimit, 100000, 10000000) // between 1L and 1Cr

    // APR heuristic: better profile => lower APR
    let apr = 20
    if (turnoverNum >= 5000000) apr -= 3
    if (yearsNum >= 3) apr -= 2
    if (gstin && typeof gstin === 'string' && gstin.length >= 10) apr -= 1
    apr = clamp(Math.round(apr), 12, 28)

    if (!eligible) {
      return NextResponse.json({
        eligible: false,
        reason: reasons.join('. '),
        suggestion:
          'Increase turnover, maintain operations for longer, or add GST details to improve chances.',
      })
    }

    return NextResponse.json({
      eligible: true,
      creditLimit,
      apr,
      message:
        'This is an indicative assessment. Final approval and terms may vary after verification.',
    })
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Unable to process credit check',
        details:
          process.env.NODE_ENV === 'development' ? err?.message : undefined,
      },
      { status: 500 }
    )
  }
}
