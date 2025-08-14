'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, Clock, ArrowLeft, Send, Eye } from 'lucide-react'

const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-xl border border-gray-medium/20 shadow-sm ${className}`}
  >
    {children}
  </div>
)

const Button = ({ children, onClick, variant = 'default', className = '' }) => {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    default:
      'bg-gray-dark text-white hover:bg-gray-medium focus:ring-gray-dark',
    outline:
      'border border-gray-medium/30 text-gray-dark hover:bg-gray-light/20 focus:ring-gray-dark',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function QuoteSentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestIdParam = searchParams.get('request_id') || ''
  const vendorIdParam = searchParams.get('vendor_id') || ''
  const quoteIdParam = searchParams.get('quote_id') || ''

  const [pendingQuotes, setPendingQuotes] = useState([])
  const [loadingPending, setLoadingPending] = useState(true)
  const [errorPending, setErrorPending] = useState('')
  const [serverQuote, setServerQuote] = useState(null)
  const [loadingServerQuote, setLoadingServerQuote] = useState(false)
  const [serverError, setServerError] = useState('')
  const [mounted, setMounted] = useState(false)

  const quoteData = useMemo(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem('quoteData')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  const totalAmount = useMemo(() => {
    const items = quoteData?.items || []
    return items.reduce(
      (sum, it) =>
        sum + (Number(it.quoted_price) || 0) * (Number(it.quantity) || 1),
      0
    )
  }, [quoteData])

  // Prevent hydration mismatches by rendering a simple shell until mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const loadPending = async () => {
      const vendorId = vendorIdParam || quoteData?.vendor_id
      if (!vendorId) {
        setLoadingPending(false)
        setErrorPending('')
        return
      }
      try {
        const res = await fetch(
          `/api/vendors/${encodeURIComponent(vendorId)}/quotes?status=pending`
        )
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setPendingQuotes(Array.isArray(data) ? data : [])
      } catch (e) {
        setErrorPending('Failed to load pending quotes')
      } finally {
        setLoadingPending(false)
      }
    }
    loadPending()
  }, [mounted, vendorIdParam, quoteData])

  const handleViewServerQuote = async () => {
    setServerError('')
    setLoadingServerQuote(true)
    try {
      const id = quoteIdParam || quoteData?.server_quote_id
      if (!id) {
        setServerError('No quote_id available from server response')
        return
      }
      const res = await fetch(`/api/quotes/${encodeURIComponent(id)}`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setServerQuote(data)
    } catch (e) {
      setServerError('Failed to fetch quote from server')
    } finally {
      setLoadingServerQuote(false)
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen relative">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
          <Card className="p-6">
            <div className="h-6 w-40 bg-gray-100 rounded mb-3" />
            <div className="h-4 w-64 bg-gray-100 rounded" />
          </Card>
        </div>
      </div>
    )
  }

  const requestId = requestIdParam || quoteData?.request_id || ''
  const vendorId = vendorIdParam || quoteData?.vendor_id || ''

  return (
    <div className="min-h-screen relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="mb-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-gray-dark font-heading">
                Quote sent successfully
              </h1>
              <p className="text-sm text-gray-medium font-body mt-1">
                We saved your quote details below.
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-medium">Request ID</p>
                  <p className="text-sm font-medium text-gray-dark break-all">
                    {requestId || '-'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-medium">Vendor ID</p>
                  <p className="text-sm font-medium text-gray-dark break-all">
                    {vendorId || '-'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-medium">Items</p>
                  <p className="text-sm font-medium text-gray-dark">
                    {quoteData?.items?.length ?? 0}
                  </p>
                </div>
              </div>

              {/* Desktop table view */}
              <div className="mt-4 overflow-x-auto hidden md:block">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-medium border-b">
                      <th className="py-2 pr-4">Item ID</th>
                      <th className="py-2 pr-4">Quoted Price (₹)</th>
                      <th className="py-2 pr-4">Delivery Days</th>
                      <th className="py-2 pr-4">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(quoteData?.items || []).map((it, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="py-2 pr-4 text-gray-dark break-all">
                          {it.item_id}
                        </td>
                        <td className="py-2 pr-4 text-gray-dark">
                          {Number(it.quoted_price).toFixed(2)}
                        </td>
                        <td className="py-2 pr-4 text-gray-dark">
                          {it.delivery_days ?? '-'}
                        </td>
                        <td className="py-2 pr-4 text-gray-dark break-words">
                          {it.comments ?? '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile list view */}
              <div className="mt-4 space-y-2 md:hidden">
                {(quoteData?.items || []).map((it, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-medium/20 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-medium">Item ID</span>
                      <span className="text-xs font-medium text-gray-dark break-all ml-2">
                        {it.item_id}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-medium">
                          Quoted Price (₹)
                        </p>
                        <p className="text-gray-dark">
                          {Number(it.quoted_price).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-medium">
                          Delivery Days
                        </p>
                        <p className="text-gray-dark">
                          {it.delivery_days ?? '-'}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-medium">Comments</p>
                        <p className="text-gray-dark break-words">
                          {it.comments ?? '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-dark font-medium order-2 sm:order-1">
                  Total:{' '}
                  <span className="font-semibold">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleViewServerQuote}
                    className="w-full sm:w-auto"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View this quote (server)
                  </Button>
                  <Button
                    onClick={() =>
                      router.push(
                        `/orders/send-quote?uuid=${encodeURIComponent(
                          requestId
                        )}`
                      )
                    }
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send another quote
                  </Button>
                </div>
              </div>

              {loadingServerQuote ? (
                <p className="text-sm text-gray-medium mt-3">
                  Loading server quote...
                </p>
              ) : serverError ? (
                <p className="text-sm text-red-600 mt-3">{serverError}</p>
              ) : serverQuote ? (
                <pre className="mt-3 p-3 bg-gray-50 rounded-lg text-xs overflow-auto max-h-72">
                  {JSON.stringify(serverQuote, null, 2)}
                </pre>
              ) : null}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-dark font-heading">
              Pending quotes for this vendor
            </h2>
            <Clock className="w-5 h-5 text-gray-medium" />
          </div>
          {loadingPending ? (
            <p className="text-sm text-gray-medium">
              Loading pending quotes...
            </p>
          ) : errorPending ? (
            <p className="text-sm text-red-600">{errorPending}</p>
          ) : pendingQuotes.length === 0 ? (
            <p className="text-sm text-gray-medium">No pending quotes found.</p>
          ) : (
            <div className="space-y-3">
              {pendingQuotes.map((q) => (
                <div
                  key={q.id}
                  className="border border-gray-medium/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-dark">
                      Quote #{q.id}
                    </p>
                    <p className="text-xs text-gray-medium break-all">
                      Request: {q.request_id} • Status: {q.status}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      router.push(
                        `/orders/send-quote?uuid=${encodeURIComponent(
                          q.request_id
                        )}`
                      )
                    }
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send now
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
