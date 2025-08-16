'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Building,
  Calendar,
  IndianRupee,
  Phone,
  MapPin,
} from 'lucide-react'
import {
  Button,
  Card,
  Badge,
  LoadingPage,
  InlineSpinner,
} from '@/components/ui'

const QuoteAcceptedContent = () => {
  const router = useRouter()
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get the selected quote from localStorage
    const storedQuote = localStorage.getItem('selectedQuote')
    if (storedQuote) {
      setSelectedQuote(JSON.parse(storedQuote))
    } else {
      // If no quote found, redirect back
      router.push('/orders/receive-quote')
      return
    }
    setLoading(false)
  }, [router])

  const handleAvailCredit = () => {
    router.push('/onboarding/credit')
  }

  const handleViewOrders = () => {
    router.push('/dashboard')
  }

  if (loading) {
    return <InlineSpinner text="Processing..." />
  }

  if (!selectedQuote) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-medium">No quote selected</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-4xl mx-auto p-3 sm:p-6 lg:p-8">
        {/* Success Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Quote Accepted Successfully!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-4 sm:px-0">
            Your quote has been confirmed and the vendor has been notified.
          </p>
        </div>

        {/* Quote Summary Card */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 border-green-200 bg-green-50">
          <div className="flex items-start sm:items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                {selectedQuote.vendorName}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{selectedQuote.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="text-center sm:text-left bg-white bg-opacity-50 rounded-lg p-3 sm:p-0 sm:bg-transparent">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                Total Amount
              </div>
              <div className="text-lg sm:text-2xl font-bold text-green-600 flex items-center justify-center sm:justify-start">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">
                  {selectedQuote.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="text-center sm:text-left bg-white bg-opacity-50 rounded-lg p-3 sm:p-0 sm:bg-transparent">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                Status
              </div>
              <div className="flex justify-center sm:justify-start">
                <Badge
                  variant="success"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1"
                >
                  Confirmed
                </Badge>
              </div>
            </div>
            <div className="text-center sm:text-left bg-white bg-opacity-50 rounded-lg p-3 sm:p-0 sm:bg-transparent col-span-2 sm:col-span-1">
              <div className="text-xs sm:text-sm text-gray-600 mb-1">
                Delivery Time
              </div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 flex items-center justify-center sm:justify-start">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {selectedQuote.deliveryTime}
              </div>
            </div>
          </div>

          {selectedQuote.specialization && (
            <div className="text-xs sm:text-sm text-gray-600 bg-white bg-opacity-50 rounded-lg p-2 sm:p-0 sm:bg-transparent">
              <span className="font-medium">Specialization:</span>{' '}
              <span className="break-words">
                {selectedQuote.specialization}
              </span>
            </div>
          )}
        </Card>

        {/* Next Steps */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            What&apos;s Next?
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs sm:text-sm font-semibold">
                  1
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm sm:text-base">
                  Vendor Confirmation
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  The vendor will confirm your order and provide delivery
                  details.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs sm:text-sm font-semibold">
                  2
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm sm:text-base">
                  Payment Processing
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  You&apos;ll receive payment instructions and can proceed with
                  the transaction.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-xs sm:text-sm font-semibold">
                  3
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm sm:text-base">
                  Delivery Tracking
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  Track your order status and delivery progress in real-time.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Credit Card */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8 border-blue-200 bg-blue-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Need Financing for Your Order?
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                Get instant credit approval and flexible payment terms to manage
                your cash flow better.
              </p>
              <Button
                variant="default"
                onClick={handleAvailCredit}
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm"
              >
                <CreditCard className="w-4 h-4" />
                Avail Credit
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button
            variant="success"
            onClick={() =>
              window.open(
                `tel:${selectedQuote.phone || '+91-XXX-XXX-XXXX'}`,
                '_self'
              )
            }
            className="w-full h-12 text-sm"
          >
            <Phone className="w-4 h-4" />
            Contact Vendor
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main export with Suspense boundary
const QuoteAccepted = () => {
  return (
    <Suspense
      fallback={<LoadingPage text="Processing your quote acceptance..." />}
    >
      <QuoteAcceptedContent />
    </Suspense>
  )
}

export default QuoteAccepted
