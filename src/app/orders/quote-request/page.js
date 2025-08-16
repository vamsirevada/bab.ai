'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FileText, Users, Check, Clock, ArrowLeft } from 'lucide-react'
import { Button, Card, LoadingPage } from '@/components/ui'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)

// Main component wrapped in Suspense
const QuoteRequestContent = () => {
  // ... rest of your component logic here
  const [selectedVendors, setSelectedVendors] = useState([])
  const [customerInfo, setCustomerInfo] = useState({})

  useEffect(() => {
    // Get data from localStorage
    try {
      // Get selected vendors from localStorage
      const storedVendors = localStorage.getItem('selectedVendors')
      if (storedVendors) {
        setSelectedVendors(JSON.parse(storedVendors))
      }

      // Get customer info from localStorage
      const storedCustomer = localStorage.getItem('customerInfo')
      if (storedCustomer) {
        const customerData = JSON.parse(storedCustomer)
        setCustomerInfo({
          name: customerData.name || 'Construction Team',
          phone: customerData.phone || '+91 98765 43210',
          site: customerData.site || 'Construction Project',
          address:
            customerData.address ||
            customerData.site ||
            'Project Site Location',
          uuid: customerData.uuid || '',
        })
      } else {
        // Set fallback data if no customer data is provided
        setCustomerInfo({
          name: 'Construction Team',
          phone: '+91 98765 43210',
          site: 'Construction Project',
          address: 'Project Site Location',
          uuid: '',
        })
      }
    } catch (error) {
      console.error('Error parsing data from localStorage:', error)
      // Set fallback data if parsing fails
      setSelectedVendors([])
      setCustomerInfo({
        name: 'Construction Team',
        phone: '+91 98765 43210',
        site: 'Construction Project',
        address: 'Project Site Location',
        uuid: '',
      })
    }
  }, [])

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
    <div className="min-h-screen relative">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
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
                  {selectedVendors.length}{' '}
                  {selectedVendors.length === 1 ? 'vendor' : 'vendors'}{' '}
                  contacted
                </div>
                <div className="text-sm text-gray-medium font-body flex items-center gap-1">
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
                  {customerInfo.address &&
                  customerInfo.address !== customerInfo.site
                    ? customerInfo.address
                    : 'Same as site location'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-medium/20">
                <span className="text-gray-medium font-body">Name:</span>
                <span className="font-medium text-gray-dark font-body">
                  {customerInfo.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-medium font-body">Contact:</span>
                <span className="font-medium text-gray-dark font-body">
                  {customerInfo.phone}
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
const QuoteRequestLoading = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const QuoteRequest = () => {
  return (
    <Suspense fallback={<LoadingPage text="Loading..." />}>
      <QuoteRequestContent />
    </Suspense>
  )
}

export default QuoteRequest
