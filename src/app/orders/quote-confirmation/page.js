import React, { useState, useEffect, memo } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, ArrowLeft, MessageCircle } from 'lucide-react'

// Logo component adapted for QuoteConfirmation theme
const Logo = memo(() => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-8 h-8 bg-gradient-to-br from-functional-success to-functional-success/90 rounded-xl flex items-center justify-center shadow-md">
        <span className="text-brand-white font-bold text-sm font-heading">
          B
        </span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-functional-success/80 to-functional-success rounded-full flex items-center justify-center">
        <span className="text-brand-white text-xs font-bold font-heading">
          ai
        </span>
      </div>
    </div>
    <div>
      <h1 className="text-lg sm:text-xl font-bold text-brand-charcoal font-heading">
        bab.ai
      </h1>
      <p className="text-xs sm:text-sm text-brand-charcoal/70 font-body">
        Quote Requested
      </p>
    </div>
  </div>
))

const QuoteConfirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderData, setOrderData] = useState(null)
  const [selectedVendors, setSelectedVendors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get data from location state or localStorage
    const stateData = location.state
    const storedOrder = localStorage.getItem('orderData')

    if (stateData) {
      setOrderData(stateData.orderData || JSON.parse(storedOrder))
      setSelectedVendors(stateData.selectedVendors || [])
    } else if (storedOrder) {
      setOrderData(JSON.parse(storedOrder))
      // If no vendors passed, create default message
      setSelectedVendors([])
    }

    setIsLoading(false)
  }, [location])

  const handleBackToWhatsApp = () => {
    // Clear stored data
    localStorage.removeItem('orderData')

    // In a real app, this would open WhatsApp or redirect to the chat
    const message = encodeURIComponent(
      `✅ Quote request submitted successfully!\n\nOrder ID: ${
        orderData?.request_id || 'BAB' + Date.now()
      }\nItems: ${orderData?.items?.length || 0}\nVendors: ${
        selectedVendors.length
      }\n\nWe'll notify you once quotes are received.`
    )
    const whatsappUrl = `https://wa.me/${orderData?.customerInfo?.whatsappPhone?.replace(
      /\D/g,
      ''
    )}?text=${message}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')

    // Navigate back to landing page
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-white to-functional-success/5">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-functional-success border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brand-charcoal font-body">
            Loading confirmation...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-white to-functional-success/5">
      {/* Header */}
      <div className="bg-brand-white border-b border-brand-charcoal/20 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-functional-success rounded-full">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand-white" />
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-brand-charcoal font-body">
                  {orderData?.customerInfo?.name || 'Customer'}
                </div>
                <div className="text-xs text-brand-charcoal/70 font-body">
                  Quote Requested
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Success Message */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-functional-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-brand-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-2 font-heading">
            Quote Request Submitted!
          </h1>
          <p className="text-brand-charcoal/70 text-base sm:text-lg font-body max-w-2xl mx-auto">
            Your request has been sent to selected vendors. You'll receive
            quotes on WhatsApp shortly.
          </p>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Order Details */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-brand-charcoal mb-4 font-heading">
              Order Details
            </h2>

            {/* Order Info */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-brand-charcoal/10">
                <span className="text-brand-charcoal/70 font-body">
                  Order ID:
                </span>
                <span className="font-medium text-brand-charcoal font-body">
                  {orderData?.request_id || 'BAB' + Date.now()}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-charcoal/10">
                <span className="text-brand-charcoal/70 font-body">Items:</span>
                <span className="font-medium text-brand-charcoal font-body">
                  {orderData?.items?.length || 0} items
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-brand-charcoal/10">
                <span className="text-brand-charcoal/70 font-body">Site:</span>
                <span className="font-medium text-brand-charcoal font-body text-right">
                  {orderData?.customerInfo?.site || 'Construction Site'}
                </span>
              </div>
              <div className="flex justify-between items-start py-2">
                <span className="text-brand-charcoal/70 font-body">
                  Delivery:
                </span>
                <span className="font-medium text-brand-charcoal font-body text-right max-w-xs">
                  {orderData?.delivery_location ||
                    orderData?.customerInfo?.address ||
                    'Delivery Address'}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-3">
              <h3 className="font-medium text-brand-charcoal font-body">
                Items Requested:
              </h3>
              <div className="space-y-2">
                {orderData?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-brand-charcoal/5 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-brand-charcoal text-sm font-body">
                        {item.material_name}
                      </div>
                      {item.sub_type && (
                        <div className="text-xs text-brand-charcoal/70 font-body">
                          {item.sub_type}
                        </div>
                      )}
                      {item.dimensions && (
                        <div className="text-xs text-brand-charcoal/70 font-body">
                          Size: {item.dimensions}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-brand-charcoal font-body">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-brand-charcoal/70 text-sm font-body italic">
                    No items found
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Selected Vendors */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-brand-charcoal mb-4 font-heading">
              Selected Vendors
            </h2>

            {selectedVendors.length > 0 ? (
              <div className="space-y-3">
                <p className="text-brand-charcoal/70 text-sm font-body mb-4">
                  Quotes requested from {selectedVendors.length} vendor
                  {selectedVendors.length !== 1 ? 's' : ''}:
                </p>
                <div className="space-y-3">
                  {selectedVendors.map((vendor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-functional-success/10 rounded-lg border border-functional-success/20"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-functional-success rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-brand-white" />
                        </div>
                        <div>
                          <div className="font-medium text-brand-charcoal font-body">
                            {vendor.name}
                          </div>
                          <div className="text-xs text-brand-charcoal/70 font-body">
                            {vendor.specialties?.join(', ') || vendor.type}
                          </div>
                        </div>
                      </div>
                      {vendor.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-brand-charcoal font-body">
                            {vendor.rating}
                          </span>
                          <svg
                            className="w-4 h-4 text-functional-success"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-functional-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-functional-success" />
                </div>
                <p className="text-brand-charcoal/70 font-body">
                  Quote request sent to available vendors
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="p-4 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-brand-charcoal mb-4 font-heading">
            What happens next?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-functional-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-functional-success font-bold font-heading">
                  1
                </span>
              </div>
              <h3 className="font-medium text-brand-charcoal mb-2 font-body">
                Vendors Review
              </h3>
              <p className="text-sm text-brand-charcoal/70 font-body">
                Selected vendors will review your requirements and prepare
                quotes
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-functional-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-functional-success font-bold font-heading">
                  2
                </span>
              </div>
              <h3 className="font-medium text-brand-charcoal mb-2 font-body">
                Quotes Sent
              </h3>
              <p className="text-sm text-brand-charcoal/70 font-body">
                You'll receive competitive quotes directly on WhatsApp
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-functional-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-functional-success font-bold font-heading">
                  3
                </span>
              </div>
              <h3 className="font-medium text-brand-charcoal mb-2 font-body">
                Choose & Order
              </h3>
              <p className="text-sm text-brand-charcoal/70 font-body">
                Compare quotes and place your order with the best vendor
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-brand-white/95 backdrop-blur-sm py-4 -mx-4 px-4 border-t border-brand-charcoal/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12 text-base border-brand-charcoal/30 hover:bg-brand-charcoal/5"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleBackToWhatsApp}
            className="flex-1 bg-functional-success hover:bg-functional-success/90 text-brand-white h-12 text-base font-medium font-body"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Back to WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(QuoteConfirmation)
