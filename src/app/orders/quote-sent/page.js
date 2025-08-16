'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, Clock, ArrowLeft, Send } from 'lucide-react'

// Import shared UI components
import { Button, Card, LoadingPage } from '@/components/ui'

function QuoteSentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestIdParam = searchParams.get('request_id') || ''
  const vendorIdParam = searchParams.get('vendor_id') || ''
  const quoteIdParam = searchParams.get('quote_id') || ''

  const [pendingQuotes, setPendingQuotes] = useState([])
  const [loadingPending, setLoadingPending] = useState(true)
  const [errorPending, setErrorPending] = useState('')

  const [mounted, setMounted] = useState(false)
  const [orderItemMap, setOrderItemMap] = useState({})

  const quoteData = useMemo(() => {
    if (typeof window === 'undefined') return null
    try {
      const raw = localStorage.getItem('quoteData')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  // Merge quote items with order item metadata for friendly names and quantities
  const displayItems = useMemo(() => {
    const items = quoteData?.items || []
    return items.map((it) => {
      const meta = orderItemMap[it.item_id] || {}
      const qty = Number(meta.quantity ?? it.quantity ?? 1)
      const unit = Number(it.quoted_price) || 0
      return {
        name: meta.name || 'Item',
        quantity: qty,
        unitPrice: unit,
        lineTotal: unit * qty,
        deliveryDays: it.delivery_days ?? null,
        comments: it.comments ?? null,
      }
    })
  }, [quoteData, orderItemMap])

  const subtotal = useMemo(
    () => displayItems.reduce((sum, it) => sum + it.lineTotal, 0),
    [displayItems]
  )
  const gstAmount = useMemo(() => subtotal * 0.18, [subtotal])
  const grandTotal = useMemo(() => subtotal + gstAmount, [subtotal, gstAmount])
  // No delivery aggregation shown in the summary to keep the view minimal

  // Prevent hydration mismatches by rendering a simple shell until mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch order items to label item names/quantities (hide raw IDs from UI)
  useEffect(() => {
    if (!mounted) return
    const reqId = requestIdParam || quoteData?.request_id || ''
    if (!reqId) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/orders/${encodeURIComponent(reqId)}`, {
          cache: 'no-store',
        })
        if (!res.ok) return
        const data = await res.json()
        if (!Array.isArray(data)) return
        const map = {}
        for (const item of data) {
          map[item.id] = {
            name: item.material_name || item.name || 'Item',
            quantity: Number(item.quantity) || 1,
          }
        }
        if (!cancelled) setOrderItemMap(map)
      } catch {}
    })()
    return () => {
      cancelled = true
    }
  }, [mounted, requestIdParam, quoteData])

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
        // Treat errors as no pending quotes for a cleaner UX
        setErrorPending('')
        setPendingQuotes([])
      } finally {
        setLoadingPending(false)
      }
    }
    loadPending()
  }, [mounted, vendorIdParam, quoteData])

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
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full flex-shrink-0">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-gray-dark font-heading">
                Quote sent successfully
              </h1>
              <p className="text-sm text-gray-medium font-body mt-1">
                We saved your quote details below.
              </p>
            </div>
          </div>

          {/* Desktop items summary (Name + Quantity + Line Total) */}
          <div className="mt-4 overflow-x-auto hidden md:block">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-medium border-b">
                  <th className="py-2 pr-4">Item</th>
                  <th className="py-2 pr-4">Line Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((it, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2 pr-4 text-gray-dark">
                      {it.name}{' '}
                      {it.quantity > 1 && (
                        <span className="text-gray-medium">
                          (Qty: {it.quantity})
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-gray-dark">
                      {it.lineTotal.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile items summary (Name + Quantity + Line Total) */}
          <div className="mt-4 space-y-2 md:hidden">
            {displayItems.map((it, idx) => (
              <div
                key={idx}
                className="border border-gray-medium/20 rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-dark">
                    {it.name}{' '}
                    {it.quantity > 1 && (
                      <span className="text-gray-medium">
                        (Qty: {it.quantity})
                      </span>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-gray-dark">
                    ₹{it.lineTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="order-1">
              <p className="text-sm text-gray-dark font-medium">
                Total (incl. GST):{' '}
                <span className="font-semibold">₹{grandTotal.toFixed(2)}</span>
              </p>
              <p className="text-xs text-gray-medium">
                Subtotal ₹{subtotal.toFixed(2)} • GST (18%) ₹
                {gstAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-dark font-heading">
              Pending quotes
            </h2>
            <Clock className="w-5 h-5 text-gray-medium" />
          </div>
          {loadingPending ? (
            <p className="text-sm text-gray-medium">
              Loading pending quotes...
            </p>
          ) : errorPending ? (
            <p className="text-sm text-gray-medium">
              No pending quotes as of now.
            </p>
          ) : pendingQuotes.length === 0 ? (
            <p className="text-sm text-gray-medium">
              No pending quotes as of now.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingQuotes.map((q) => (
                <div
                  key={q.id}
                  className="border border-gray-medium/20 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-dark">
                      Pending quote
                    </p>
                    <p className="text-xs text-gray-medium break-words">
                      {`Items: ${Array.isArray(q.items) ? q.items.length : 0}`}{' '}
                      • Status: {q.status || 'pending'}
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

// Lightweight loading fallback while search params resolve
function QuoteSentLoading() {
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

export default function QuoteSent() {
  return (
    <Suspense fallback={<QuoteSentLoading />}>
      <QuoteSentContent />
    </Suspense>
  )
}
