'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)

// Button Component
const Button = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  disabled = false,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    default:
      'bg-gray-dark text-white hover:bg-gray-medium focus:ring-gray-dark',
    outline:
      'border border-gray-medium/30 text-gray-dark hover:bg-gray-light/20 focus:ring-gray-dark',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Card Component
const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-medium/20 shadow-sm ${className}`}
    >
      {children}
    </div>
  )
}

// Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
    pending: 'bg-orange-100 text-orange-700',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Quote Card Component
const QuoteCard = ({ quote, onAccept, onReject, selectedQuote }) => {
  const isSelected = selectedQuote?.vendorId === quote.vendorId

  return (
    <Card
      className={`p-4 transition-all duration-200 ${
        isSelected ? 'ring-2 ring-green-500 bg-green-50/50' : 'hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-gray-dark font-heading">
              {quote.vendorName}
            </h3>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < quote.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <Badge
              variant={quote.status === 'received' ? 'success' : 'pending'}
            >
              {quote.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-medium font-body mb-2">
            {quote.location} • {quote.deliveryTime}
          </p>
          <p className="text-sm text-gray-medium font-body">
            {quote.specialization}
          </p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-dark font-heading">
            ₹{quote.totalAmount.toLocaleString()}
          </div>
          <p className="text-xs text-gray-medium font-body">Total Amount</p>
        </div>
      </div>

      {quote.status === 'received' && (
        <>
          {/* Quote Items */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-dark font-body mb-2">
              Quote Breakdown
            </h4>
            <div className="space-y-2">
              {quote.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-medium font-body">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium text-gray-dark font-body">
                    ₹{item.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => onAccept(quote)}
              disabled={!!selectedQuote && !isSelected}
              className="flex-1 h-9"
            >
              {isSelected ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Selected
                </>
              ) : (
                'Accept Quote'
              )}
            </Button>
            {!selectedQuote && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReject(quote)}
                className="px-3 h-9"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </>
      )}

      {quote.status === 'pending' && (
        <div className="flex items-center justify-center py-4 text-gray-medium">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm font-body">Waiting for quote...</span>
        </div>
      )}
    </Card>
  )
}

// Main Component Content
const ReceiveQuoteContent = () => {
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({})
  const [quotes, setQuotes] = useState([])
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load data on component mount
  useEffect(() => {
    // Mock quotes data
    const mockQuotes = [
      {
        vendorId: 'vendor1',
        vendorName: 'ABC Materials Pvt Ltd',
        location: 'Sector 15, Gurgaon',
        rating: 4,
        deliveryTime: '2-3 days',
        specialization: 'Construction Materials',
        status: 'received',
        totalAmount: 45800,
        items: [
          { name: 'Modular Plates', quantity: 2, total: 25000 },
          { name: 'Steel Rods', quantity: 12, total: 20800 },
        ],
      },
      {
        vendorId: 'vendor2',
        vendorName: 'BuildMart Solutions',
        location: 'Industrial Area, Delhi',
        rating: 5,
        deliveryTime: '1-2 days',
        specialization: 'Premium Building Materials',
        status: 'received',
        totalAmount: 42500,
        items: [
          { name: 'Modular Plates', quantity: 2, total: 22000 },
          { name: 'Steel Rods', quantity: 12, total: 20500 },
        ],
      },
      {
        vendorId: 'vendor3',
        vendorName: 'Construction Hub',
        location: 'Phase 2, Noida',
        rating: 3,
        deliveryTime: '3-4 days',
        specialization: 'Bulk Construction Supplies',
        status: 'pending',
        totalAmount: 0,
        items: [],
      },
    ]

    try {
      const storedCustomerInfo = localStorage.getItem('customerInfo')
      if (storedCustomerInfo) {
        setCustomerInfo(JSON.parse(storedCustomerInfo))
      }

      // Simulate loading quotes
      setTimeout(() => {
        setQuotes(mockQuotes)
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error('Error loading data:', error)
      setIsLoading(false)
    }
  }, [])

  const handleAcceptQuote = (quote) => {
    setSelectedQuote(quote)
    // Store selected quote in localStorage
    localStorage.setItem('selectedQuote', JSON.stringify(quote))
  }

  const handleRejectQuote = (quote) => {
    setQuotes(quotes.filter((q) => q.vendorId !== quote.vendorId))
  }

  const handleProceedToOrder = () => {
    if (selectedQuote) {
      router.push('/orders/place-order')
    }
  }

  const receivedQuotes = quotes.filter((q) => q.status === 'received')
  const pendingQuotes = quotes.filter((q) => q.status === 'pending')

  if (isLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-medium">Loading quotes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Header Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-dark font-heading">
                  Received Quotes
                </h2>
                <p className="text-sm text-gray-medium font-body">
                  Compare and select the best quote
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-dark font-heading">
                  {receivedQuotes.length} of {quotes.length}
                </div>
                <p className="text-xs text-gray-medium font-body flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" />
                  Quotes Received
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Received Quotes */}
        {receivedQuotes.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
              Available Quotes ({receivedQuotes.length})
            </h3>
            <div className="space-y-4">
              {receivedQuotes.map((quote) => (
                <QuoteCard
                  key={quote.vendorId}
                  quote={quote}
                  onAccept={handleAcceptQuote}
                  onReject={handleRejectQuote}
                  selectedQuote={selectedQuote}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Pending Quotes */}
        {pendingQuotes.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
              Pending Quotes ({pendingQuotes.length})
            </h3>
            <div className="space-y-4">
              {pendingQuotes.map((quote) => (
                <QuoteCard
                  key={quote.vendorId}
                  quote={quote}
                  onAccept={handleAcceptQuote}
                  onReject={handleRejectQuote}
                  selectedQuote={selectedQuote}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Selected Quote Summary */}
        {selectedQuote && (
          <Card className="p-6 mb-6 bg-green-50 border-green-200">
            <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
              Selected Quote Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Vendor
                </p>
                <p className="text-sm text-gray-medium font-body">
                  {selectedQuote.vendorName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Delivery
                </p>
                <p className="text-sm text-gray-medium font-body">
                  {selectedQuote.deliveryTime}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Total Amount
                </p>
                <p className="text-lg font-semibold text-gray-dark font-body">
                  ₹{selectedQuote.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 -mx-4 px-4 border-t border-gray-medium/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleProceedToOrder}
            disabled={!selectedQuote}
            className="flex-1 h-12 font-medium"
          >
            {selectedQuote ? (
              <>
                Proceed to Order
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              'Select a Quote First'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Loading component
const ReceiveQuoteLoading = () => (
  <div className="min-h-screen relative flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading quotes...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const ReceiveQuote = () => {
  return (
    <Suspense fallback={<ReceiveQuoteLoading />}>
      <ReceiveQuoteContent />
    </Suspense>
  )
}

export default ReceiveQuote
