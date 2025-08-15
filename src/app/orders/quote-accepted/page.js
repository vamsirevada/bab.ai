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

// Components (assuming they exist in a shared location)
const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}
  >
    {children}
  </div>
)

const Button = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  disabled = false,
}) => {
  const baseClasses =
    'px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2'
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400',
    success: 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400',
    outline:
      'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 disabled:bg-gray-100',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

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
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-medium">Processing...</p>
        </div>
      </div>
    )
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
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Quote Accepted Successfully!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Your quote has been confirmed and the vendor has been notified.
          </p>
        </div>

        {/* Quote Summary Card */}
        <Card className="p-6 mb-6 border-green-200 bg-green-50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedQuote.vendorName}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {selectedQuote.location}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="text-center sm:text-left">
              <div className="text-sm text-gray-600 mb-1">Total Amount</div>
              <div className="text-2xl font-bold text-green-600 flex items-center justify-center sm:justify-start">
                <IndianRupee className="w-5 h-5" />
                {selectedQuote.totalAmount.toLocaleString()}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-sm text-gray-600 mb-1">Delivery Time</div>
              <div className="text-lg font-semibold text-gray-900 flex items-center justify-center sm:justify-start">
                <Calendar className="w-4 h-4 mr-1" />
                {selectedQuote.deliveryTime}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <Badge variant="success" className="text-sm px-3 py-1">
                Confirmed
              </Badge>
            </div>
          </div>

          {selectedQuote.specialization && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Specialization:</span>{' '}
              {selectedQuote.specialization}
            </div>
          )}
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What&apos;s Next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Vendor Confirmation
                </div>
                <div className="text-sm text-gray-600">
                  The vendor will confirm your order and provide delivery
                  details.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Payment Processing
                </div>
                <div className="text-sm text-gray-600">
                  You&apos;ll receive payment instructions and can proceed with
                  the transaction.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Delivery Tracking
                </div>
                <div className="text-sm text-gray-600">
                  Track your order status and delivery progress in real-time.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Credit Card */}
        <Card className="p-6 mb-8 border-blue-200 bg-blue-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Financing for Your Order?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Get instant credit approval and flexible payment terms to manage
                your cash flow better.
              </p>
              <Button
                variant="default"
                onClick={handleAvailCredit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="w-4 h-4" />
                Avail Credit
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            variant="success"
            onClick={() =>
              window.open(
                `tel:${selectedQuote.phone || '+91-XXX-XXX-XXXX'}`,
                '_self'
              )
            }
            className="flex-1"
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

// Loading component
const QuoteAcceptedLoading = () => (
  <div className="min-h-screen relative flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Processing your quote acceptance...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const QuoteAccepted = () => {
  return (
    <Suspense fallback={<QuoteAcceptedLoading />}>
      <QuoteAcceptedContent />
    </Suspense>
  )
}

export default QuoteAccepted
