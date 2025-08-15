'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart,
  CreditCard,
  CheckCircle,
  Truck,
  Calendar,
  ArrowLeft,
  Download,
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
    whatsapp: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600',
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
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Order Item Component
const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-medium/10 last:border-b-0">
      <div className="flex-1">
        <h4 className="font-medium text-gray-dark font-heading text-sm">
          {item.name}
        </h4>
        <p className="text-xs text-gray-medium font-body">
          Qty: {item.quantity} • Unit: ₹{item.unitPrice?.toLocaleString() || 0}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-dark font-body">
          ₹{item.total?.toLocaleString() || 0}
        </p>
      </div>
    </div>
  )
}

// Main Component Content
const PlaceOrderContent = () => {
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({})
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [orderDetails, setOrderDetails] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  // Load data on component mount
  useEffect(() => {
    try {
      const storedCustomerInfo = localStorage.getItem('customerInfo')
      const storedSelectedQuote = localStorage.getItem('selectedQuote')

      if (storedCustomerInfo) {
        setCustomerInfo(JSON.parse(storedCustomerInfo))
      }

      if (storedSelectedQuote) {
        const quote = JSON.parse(storedSelectedQuote)
        setSelectedQuote(quote)

        // Generate order details
        const newOrderId = `BAB${Date.now().toString().slice(-6)}`
        setOrderId(newOrderId)

        const today = new Date()
        const deliveryDate = new Date(today)
        deliveryDate.setDate(today.getDate() + 3) // Default 3 days delivery

        setOrderDetails({
          orderId: newOrderId,
          orderDate: today.toISOString().split('T')[0],
          deliveryDate: deliveryDate.toISOString().split('T')[0],
          subtotal: quote.totalAmount,
          gst: Math.round(quote.totalAmount * 0.18),
          total: Math.round(quote.totalAmount * 1.18),
          status: 'pending',
        })
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }, [])

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store order in localStorage
      const finalOrder = {
        ...orderDetails,
        customerInfo,
        vendorInfo: {
          name: selectedQuote?.vendorName,
          location: selectedQuote?.location,
          deliveryTime: selectedQuote?.deliveryTime,
        },
        items: selectedQuote?.items || [],
        paymentMethod,
        placedAt: new Date().toISOString(),
        status: 'confirmed',
      }

      localStorage.setItem('placedOrder', JSON.stringify(finalOrder))
      setOrderPlaced(true)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleBackToWhatsApp = () => {
    const message = `Hello! Your order ${orderId} has been placed successfully.

Order Details:
• Total Amount: ₹${orderDetails.total?.toLocaleString()}
• Vendor: ${selectedQuote?.vendorName}
• Expected Delivery: ${orderDetails.deliveryDate}

Thank you for using bab.ai! We'll keep you updated on your order status.`

    const whatsappUrl = `https://wa.me/${customerInfo.phone?.replace(
      /\D/g,
      ''
    )}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleDownloadInvoice = () => {
    alert('Invoice download feature will be implemented soon!')
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen relative">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
          {/* Success Header */}
          <Card className="p-6 mb-6 bg-green-50 border-green-200">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-dark font-heading mb-2">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-medium font-body mb-4">
                Your order #{orderId} has been confirmed and will be processed
                soon.
              </p>
              <Badge variant="success" className="text-sm px-4 py-1">
                Order Confirmed
              </Badge>
            </div>
          </Card>

          {/* Order Summary */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
              Order Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Order ID
                </p>
                <p className="text-sm text-gray-medium font-body">{orderId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Vendor
                </p>
                <p className="text-sm text-gray-medium font-body">
                  {selectedQuote?.vendorName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Total Amount
                </p>
                <p className="text-sm text-gray-medium font-body">
                  ₹{orderDetails.total?.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Expected Delivery
                </p>
                <p className="text-sm text-gray-medium font-body">
                  {orderDetails.deliveryDate}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleDownloadInvoice}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button
              variant="whatsapp"
              className="flex-1 h-12"
              onClick={handleBackToWhatsApp}
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              Back to WhatsApp
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedQuote) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-medium">
            No quote selected. Please go back and select a quote.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
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
              <div className="flex items-center justify-center w-12 h-12 bg-orange-600 rounded-full">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-dark font-heading">
                  Place Order
                </h2>
                <p className="text-sm text-gray-medium font-body">
                  Review and confirm your order
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-gray-dark font-heading">
                  ₹{orderDetails.total?.toLocaleString()}
                </div>
                <p className="text-xs text-gray-medium font-body flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  Total Amount
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Vendor Information */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
            Vendor Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Vendor Name
              </p>
              <p className="text-sm text-gray-medium font-body">
                {selectedQuote.vendorName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Location
              </p>
              <p className="text-sm text-gray-medium font-body">
                {selectedQuote.location}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Delivery Time
              </p>
              <p className="text-sm text-gray-medium font-body">
                {selectedQuote.deliveryTime}
              </p>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6 mb-6 paper">
          <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
            Order Items
          </h3>
          <div className="space-y-1">
            {selectedQuote.items?.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
        </Card>

        {/* Delivery Information */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
            Delivery Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Delivery Address
              </p>
              <p className="text-sm text-gray-medium font-body">
                {customerInfo.site}
                <br />
                {customerInfo.address}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-dark font-body">
                Expected Delivery
              </p>
              <p className="text-sm text-gray-medium font-body flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {orderDetails.deliveryDate}
              </p>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
            Payment Method
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-green-600"
              />
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Cash on Delivery
                </p>
                <p className="text-xs text-gray-medium font-body">
                  Pay when you receive the order
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer opacity-50">
              <input
                type="radio"
                name="payment"
                value="online"
                disabled
                className="w-4 h-4 text-green-600"
              />
              <div>
                <p className="text-sm font-medium text-gray-dark font-body">
                  Online Payment
                </p>
                <p className="text-xs text-gray-medium font-body">
                  Coming soon
                </p>
              </div>
            </label>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-dark font-heading mb-4">
            Payment Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-dark font-body">
                Subtotal
              </span>
              <span className="text-sm text-gray-medium font-body">
                ₹{orderDetails.subtotal?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-dark font-body">
                GST (18%)
              </span>
              <span className="text-sm text-gray-medium font-body">
                ₹{orderDetails.gst?.toLocaleString()}
              </span>
            </div>
            <hr className="border-gray-medium/20" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-dark font-heading">
                Total Amount
              </span>
              <span className="text-lg font-semibold text-gray-dark font-heading">
                ₹{orderDetails.total?.toLocaleString()}
              </span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 -mx-4 px-4 border-t border-gray-medium/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => router.back()}
            disabled={isPlacingOrder}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
            className="flex-1 h-12 font-medium"
          >
            {isPlacingOrder ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Placing Order...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Place Order
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Loading component
const PlaceOrderLoading = () => (
  <div className="min-h-screen relative flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading order details...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const PlaceOrder = () => {
  return (
    <Suspense fallback={<PlaceOrderLoading />}>
      <PlaceOrderContent />
    </Suspense>
  )
}

export default PlaceOrder
