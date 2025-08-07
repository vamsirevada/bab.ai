'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FileText, Users, Check, Clock, ArrowLeft } from 'lucide-react'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.484 3.488A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
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

// Main component wrapped in Suspense
const QuoteConfirmationContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // ... rest of your component logic here
  const [selectedVendors, setSelectedVendors] = useState([])
  const [customerInfo, setCustomerInfo] = useState({})

  useEffect(() => {
    // Get data from URL parameters
    const vendors = searchParams.get('vendors')
    const customer = searchParams.get('customer')

    if (vendors) {
      try {
        setSelectedVendors(JSON.parse(decodeURIComponent(vendors)))
      } catch (error) {
        console.error('Error parsing vendors:', error)
      }
    }

    if (customer) {
      try {
        setCustomerInfo(JSON.parse(decodeURIComponent(customer)))
      } catch (error) {
        console.error('Error parsing customer info:', error)
      }
    }
  }, [searchParams])

  const handleBackToWhatsApp = () => {
    const orderId = `BAB${Date.now().toString().slice(-6)}`
    const message = `Hello! Your order ${orderId} has been submitted successfully. Our vendors will respond with quotes within 2-4 hours.`
    const whatsappUrl = `https://wa.me/${customerInfo.phone?.replace(
      /\D/g,
      ''
    )}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-dark mb-2 font-heading">
            Request Sent Successfully!
          </h1>
          <p className="text-gray-medium text-lg font-body">
            Your quote request has been submitted to selected vendors
          </p>
        </div>

        {/* Header Card */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-dark font-heading">
                  Request Submitted
                </h2>
                <p className="text-sm text-gray-medium font-body">
                  Order ID: BAB{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-dark font-heading flex items-center gap-2 justify-end">
                  <Users className="w-4 h-4" />
                  {selectedVendors.length}{' '}
                  {selectedVendors.length === 1 ? 'vendor' : 'vendors'}{' '}
                  contacted
                </div>
                <div className="text-sm text-gray-medium font-body flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" />
                  Response: 2-4 hours
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Project Details */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-dark rounded-full">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-dark font-heading">
                Project Details
              </h2>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-medium/20">
                <span className="text-gray-medium font-body">Site:</span>
                <span className="font-medium text-gray-dark font-body text-right">
                  {customerInfo.site}
                </span>
              </div>
              <div className="flex justify-between items-start py-2 border-b border-gray-medium/20">
                <span className="text-gray-medium font-body">Delivery:</span>
                <span className="font-medium text-gray-dark font-body text-right max-w-xs">
                  {customerInfo.address}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-medium font-body">Contact:</span>
                <span className="font-medium text-gray-dark font-body">
                  {customerInfo.name} • {customerInfo.phone}
                </span>
              </div>
            </div>

            <div className="bg-gray-light/30 rounded-xl p-4">
              <h3 className="font-medium text-gray-dark mb-2 font-body">
                Request Summary:
              </h3>
              <p className="text-sm text-gray-medium font-body">
                Materials and quantities will be finalized with vendors during
                quote discussion.
              </p>
            </div>
          </Card>

          {/* Vendor Network */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-dark font-heading">
                Vendor Network
              </h2>
            </div>

            {selectedVendors.length > 0 ? (
              <div className="space-y-3">
                <p className="text-gray-medium text-sm font-body mb-4">
                  Request sent to {selectedVendors.length} verified vendor
                  {selectedVendors.length !== 1 ? 's' : ''}:
                </p>
                <div className="space-y-3">
                  {selectedVendors.map((vendor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-dark font-body">
                            {vendor.name}
                          </div>
                          <div className="text-xs text-gray-medium font-body">
                            Verified Supplier
                          </div>
                        </div>
                      </div>
                      {vendor.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-gray-dark font-body">
                            {vendor.rating}
                          </span>
                          <svg
                            className="w-4 h-4 text-yellow-500"
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
                <div className="w-12 h-12 bg-gray-light/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-gray-medium" />
                </div>
                <p className="text-gray-medium font-body">
                  Request sent to available vendors in your area
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* What happens next */}
        <Card className="p-4 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-dark mb-4 font-heading">
            What happens next?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold font-heading">
                  1
                </span>
              </div>
              <h3 className="font-medium text-gray-dark mb-2 font-body">
                Vendors Review
              </h3>
              <p className="text-sm text-gray-medium font-body">
                Verified suppliers review your requirements and prepare
                competitive quotes
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold font-heading">2</span>
              </div>
              <h3 className="font-medium text-gray-dark mb-2 font-body">
                Receive Quotes
              </h3>
              <p className="text-sm text-gray-medium font-body">
                Multiple quotes delivered directly to your WhatsApp within 2-4
                hours
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold font-heading">3</span>
              </div>
              <h3 className="font-medium text-gray-dark mb-2 font-body">
                Choose & Order
              </h3>
              <p className="text-sm text-gray-medium font-body">
                Compare prices and quality, then place your order with the best
                vendor
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 -mx-4 px-4 border-t border-gray-medium/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleBackToWhatsApp}
            variant="whatsapp"
            className="flex-1 h-12 font-medium"
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
            Back to WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

// Loading component
const QuoteConfirmationLoading = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const QuoteConfirmation = () => {
  return (
    <Suspense fallback={<QuoteConfirmationLoading />}>
      <QuoteConfirmationContent />
    </Suspense>
  )
}

export default QuoteConfirmation
