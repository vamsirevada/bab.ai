'use client'

import { useState } from 'react'
import { LoadingPage, InlineSpinner } from '@/components/ui'

const initialForm = {
  businessName: '',
  pan: '',
  gstin: '',
  turnover: '',
  years: '',
  email: '',
  consent: false,
}

function formatINR(amount) {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `₹${amount}`
  }
}

export default function CreditCheckPage() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (
      !form.businessName ||
      !form.pan ||
      !form.turnover ||
      !form.years ||
      !form.email
    ) {
      setError('Please fill all required fields.')
      return
    }

    if (!form.consent) {
      setError('Please accept the consent to proceed.')
      return
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    if (!panRegex.test(form.pan.toUpperCase())) {
      setError('Please enter a valid PAN in the format AAAAA9999A.')
      return
    }

    const turnover = Number(form.turnover)
    const years = Number(form.years)
    if (Number.isNaN(turnover) || turnover <= 0) {
      setError('Annual turnover must be a positive number.')
      return
    }
    if (Number.isNaN(years) || years < 0) {
      setError('Years in operation must be zero or more.')
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: form.businessName,
          pan: form.pan.toUpperCase(),
          gstin: form.gstin?.toUpperCase() || '',
          turnover,
          years,
          email: form.email,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || 'Unable to process request.')
      }
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative z-10">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark text-center">
            Check Credit Eligibility
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Provide basic details to get an instant eligibility estimate.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-sm"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Acme Traders Pvt Ltd"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN
                </label>
                <input
                  type="text"
                  name="pan"
                  value={form.pan}
                  onChange={handleChange}
                  placeholder="AAAAA9999A"
                  className="mt-2 w-full uppercase rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GSTIN (Optional)
                </label>
                <input
                  type="text"
                  name="gstin"
                  value={form.gstin}
                  onChange={handleChange}
                  placeholder="22AAAAA0000A1Z5"
                  className="mt-2 w-full uppercase rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  maxLength={15}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Annual Turnover (INR)
                </label>
                <input
                  type="number"
                  name="turnover"
                  value={form.turnover}
                  onChange={handleChange}
                  placeholder="e.g., 1500000"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  min={1}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Years in Operation
                </label>
                <input
                  type="number"
                  name="years"
                  value={form.years}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  min={0}
                  step="0.5"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-dark"
                  required
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-dark focus:ring-brand-dark"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                I consent to the processing of my information to provide an
                indicative eligibility assessment.
              </label>
            </div>

            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 text-red-700 px-4 py-3">
                {error}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white px-5 py-2.5 font-medium hover:bg-emerald-700 transition disabled:opacity-60"
              >
                {loading ? 'Checking...' : 'Check Eligibility'}
              </button>
            </div>

            {result && (
              <div className="mt-8 rounded-xl border px-5 py-4 shadow-sm bg-white">
                {result.eligible ? (
                  <div className="text-emerald-700">
                    <p className="font-semibold">Eligible</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Indicative Limit:{' '}
                      <span className="font-medium">
                        {formatINR(result.creditLimit)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      Indicative APR:{' '}
                      <span className="font-medium">{result.apr}%</span>
                    </p>
                    {result.message && (
                      <p className="mt-2 text-sm text-gray-600">
                        {result.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-red-700">
                    <p className="font-semibold">Not Eligible</p>
                    <p className="mt-1 text-sm text-gray-700">
                      {result.reason ||
                        'Does not meet the minimum criteria at this time.'}
                    </p>
                    {result.suggestion && (
                      <p className="mt-2 text-sm text-gray-600">
                        {result.suggestion}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}
