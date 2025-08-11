'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Send,
  FileText,
  DollarSign,
  Clock,
  Calculator,
  ArrowLeft,
} from 'lucide-react'

// WhatsApp Icon Component (kept for parity if needed later)
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)

// Generic Button
const Button = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  disabled = false,
}) => {
  const base =
    'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    default:
      'bg-gray-dark text-white hover:bg-gray-medium focus:ring-gray-dark',
    outline:
      'border border-gray-medium/30 text-gray-dark hover:bg-gray-light/20 focus:ring-gray-dark',
    whatsapp: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-xl border border-gray-medium/20 shadow-sm ${className}`}
  >
    {children}
  </div>
)

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Quote Item (desktop grid; mobile inline unit + total)
const QuoteItem = ({ item, onPriceChange }) => {
  const [price, setPrice] = useState(item.quoted_price || '')
  const handlePriceChange = (value) => {
    setPrice(value)
    onPriceChange(item.id, value)
  }
  const total = price ? (parseFloat(price) * item.quantity).toFixed(2) : '0.00'
  return (
    <Card className="p-4 md:p-5 border-l-4 border-l-gray-dark hover:shadow-md transition-all duration-200">
      <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-[minmax(0,1fr)_220px_140px] md:gap-4 items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium text-gray-dark font-heading text-sm md:text-base truncate">
              {item.material_name}
            </h3>
            {item.sub_type && (
              <span className="text-[10px] md:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-body whitespace-nowrap">
                {item.sub_type}
              </span>
            )}
            <span className="text-[10px] md:text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-body whitespace-nowrap">
              Qty: {item.quantity}
            </span>
            {item.dimensions && (
              <span className="text-[10px] md:text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-body whitespace-nowrap">
                {item.dimensions}
              </span>
            )}
          </div>
          <div className="flex items-end justify-between gap-4 mt-3 md:hidden">
            <div className="flex-1">
              <label className="block text-[11px] font-medium text-gray-dark mb-1 font-body">
                Unit (₹)
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-medium text-xs">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full pl-6 pr-2 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-medium/40 rounded-md focus:ring-1 focus:ring-gray-dark/20 focus:border-gray-dark transition-all duration-200 font-body placeholder-gray-medium/70 shadow-sm text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="text-right min-w-[90px]">
              <p className="text-[11px] font-medium text-gray-dark mb-1 font-body">
                Total
              </p>
              <p className="text-sm font-semibold text-gray-dark font-body bg-gray-50 px-2 py-1.5 rounded-md">
                ₹{total}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:pl-2">
          <label className="block text-[11px] md:text-xs font-medium text-gray-dark mb-1 font-body">
            Unit Price (₹)
          </label>
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-medium text-xs">
              ₹
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full pl-6 pr-2 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-medium/40 rounded-md focus:ring-1 focus:ring-gray-dark/20 focus:border-gray-dark transition-all duration-200 font-body placeholder-gray-medium/70 shadow-sm text-sm"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        <div className="hidden md:flex md:flex-col md:items-end">
          <p className="text-[11px] md:text-xs font-medium text-gray-dark mb-1 font-body">
            Total
          </p>
          <p className="text-sm font-semibold text-gray-dark font-body bg-gray-50 px-2 py-1.5 rounded-md min-w-20 text-center">
            ₹{total}
          </p>
        </div>
      </div>
    </Card>
  )
}

// Main Component Content
const SendQuoteContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState([])
  const [customerInfo, setCustomerInfo] = useState({})
  const [vendorInfo, setVendorInfo] = useState({
    name: 'ABC Materials Pvt Ltd',
    contact: '+91 98765 43210',
    email: 'vendor@example.com',
  })
  const [quotePrices, setQuotePrices] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const uuid = searchParams.get('uuid')

  // Load order data from API
  useEffect(() => {
    const loadData = async () => {
      if (!uuid) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/orders/review-order/${uuid}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reviewOrderData = await response.json()

        if (reviewOrderData && Array.isArray(reviewOrderData)) {
          const orderItems = reviewOrderData.map((item, index) => ({
            id: item.id || Date.now() + index,
            material_name: item.material_name || '',
            sub_type: item.sub_type || '',
            dimensions: item.dimensions || '',
            quantity: item.quantity || 1,
            unit_price: item.unit_price || 0,
            ...item,
          }))
          setOrderData(orderItems)

          // Initialize quote prices
          const initialPrices = {}
          orderItems.forEach((item) => {
            initialPrices[item.id] = item.quoted_price || ''
          })
          setQuotePrices(initialPrices)
        }
      } catch (error) {
        console.error('Error loading order data:', error)
      } finally {
        setIsLoading(false)
      }

      // Try to load customer info from localStorage as fallback
      try {
        const storedCustomerInfo = localStorage.getItem('customerInfo')
        if (storedCustomerInfo) {
          setCustomerInfo(JSON.parse(storedCustomerInfo))
        } else {
          // Fallback customer info
          setCustomerInfo({
            name: 'Construction Team',
            phone: '+91 98765 43210',
            site: 'Construction Project',
            address: 'Project Site Address',
          })
        }
      } catch (error) {
        console.error('Error loading customer info:', error)
        setCustomerInfo({
          name: 'Construction Team',
          phone: '+91 98765 43210',
          site: 'Construction Project',
          address: 'Project Site Address',
        })
      }
    }

    loadData()
  }, [uuid])

  const handlePriceChange = (itemId, price) => {
    setQuotePrices((prev) => ({
      ...prev,
      [itemId]: price,
    }))
  }

  const calculateTotal = () => {
    return orderData.reduce((total, item) => {
      const price = quotePrices[item.id] || 0
      return total + parseFloat(price) * item.quantity
    }, 0)
  }

  const handleSubmitQuote = async () => {
    // Validate all items have prices
    const missingPrices = orderData.filter(
      (item) => !quotePrices[item.id] || quotePrices[item.id] === ''
    )

    if (missingPrices.length > 0) {
      alert('Please enter prices for all items before submitting the quote.')
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store quote data
      const quoteData = {
        orderId: `BAB${Date.now().toString().slice(-6)}`,
        customerInfo,
        vendorInfo,
        items: orderData.map((item) => ({
          ...item,
          quoted_price: quotePrices[item.id],
          total: parseFloat(quotePrices[item.id]) * item.quantity,
        })),
        totalAmount: calculateTotal(),
        submittedAt: new Date().toISOString(),
      }

      localStorage.setItem('quoteData', JSON.stringify(quoteData))

      // Navigate to receive quote page
      router.push('/orders/receive-quote')
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Failed to submit quote. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalAmount = calculateTotal()

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-medium border-t-gray-dark rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-medium font-body">Loading order data...</p>
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
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-dark font-heading">
                  Send Quote
                </h2>
                <p className="text-sm text-gray-medium font-body">
                  Provide pricing for requested items
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-dark font-heading">
                  ₹{totalAmount.toFixed(2)}
                </div>
                <p className="text-xs text-gray-medium font-body flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Quote Total
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Info */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
            Customer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Name
              </p>
              <p className="text-sm text-gray-medium font-body">
                {customerInfo.name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Phone
              </p>
              <p className="text-sm text-gray-medium font-body">
                {customerInfo.phone || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Site
              </p>
              <p className="text-sm text-gray-medium font-body">
                {customerInfo.site || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Address
              </p>
              <p className="text-sm text-gray-medium font-body">
                {customerInfo.address || 'N/A'}
              </p>
            </div>
          </div>
        </Card>

        {/* Quote Items */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-dark font-heading">
              Quote Items ({orderData.length})
            </h3>
            <div className="text-sm text-gray-medium font-body">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
          </div>

          {orderData.length === 0 ? (
            <div className="text-center py-8 text-gray-medium">
              <p className="font-body">No order items found.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {orderData.map((item) => (
                <QuoteItem
                  key={item.id}
                  item={item}
                  onPriceChange={handlePriceChange}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Quote Summary - Sticky on mobile for easy access */}
        <Card className="p-4 mb-6 sticky top-4 z-20 bg-white/95 backdrop-blur-sm border-2 border-gray-dark/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-dark font-heading">
              Quote Summary
            </h3>
            <Badge variant="info" className="text-xs">
              {orderData.length} items
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="flex justify-between sm:flex-col">
              <span className="font-medium text-gray-dark font-body">
                Subtotal
              </span>
              <span className="text-gray-medium font-body">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col">
              <span className="font-medium text-gray-dark font-body">
                GST (18%)
              </span>
              <span className="text-gray-medium font-body">
                ₹{(totalAmount * 0.18).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between sm:flex-col sm:border-l sm:border-gray-200 sm:pl-3">
              <span className="text-lg font-semibold text-gray-dark font-heading">
                Total
              </span>
              <span className="text-lg font-semibold text-gray-dark font-heading">
                ₹{(totalAmount * 1.18).toFixed(2)}
              </span>
            </div>
          </div>
        </Card>

        {/* Action Buttons - Fixed at bottom for easy access */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-medium/20 p-4 z-30 sm:relative sm:bg-transparent sm:border-t-0 sm:p-0">
          <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 sm:max-w-32"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleSubmitQuote}
              disabled={
                isSubmitting || orderData.length === 0 || totalAmount === 0
              }
              className="flex-1 h-12 font-medium bg-green-600 hover:bg-green-700 focus:ring-green-600"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Quote (₹{(totalAmount * 1.18).toFixed(2)})
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom padding for fixed button on mobile */}
        <div className="h-20 sm:hidden" />
      </div>
    </div>
  )
}

// Loading component
const SendQuoteLoading = () => (
  <div className="min-h-screen relative flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading quote form...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const SendQuote = () => {
  return (
    <Suspense fallback={<SendQuoteLoading />}>
      <SendQuoteContent />
    </Suspense>
  )
}

export default SendQuote
