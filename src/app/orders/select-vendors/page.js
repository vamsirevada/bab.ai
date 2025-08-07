'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Star, ArrowLeft, Check } from 'lucide-react'

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
    ghost: 'text-gray-dark hover:bg-gray-light/20 focus:ring-gray-dark',
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
const Badge = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-light/30 text-gray-dark border border-gray-medium/20 ${className}`}
    >
      {children}
    </span>
  )
}

// Main component content
const SelectVendorsContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [vendors, setVendors] = useState([])
  const [selectedVendors, setSelectedVendors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({})

  // Get parameters from URL
  useEffect(() => {
    const uuid = searchParams.get('uuid') || ''
    const name = searchParams.get('name') || 'Construction Team'
    const phone = searchParams.get('phone') || '+91 98765 43210'
    const site = searchParams.get('site') || 'Construction Project'

    setCustomerInfo({ uuid, name, phone, site })
  }, [searchParams])

  // Mock vendor data
  useEffect(() => {
    const mockVendors = [
      {
        id: 1,
        name: 'BuildPro Materials',
        rating: 4.8,
        location: 'Mumbai',
        verified: true,
      },
      {
        id: 2,
        name: 'ConstructCorp',
        rating: 4.6,
        location: 'Delhi',
        verified: true,
      },
      {
        id: 3,
        name: 'Steel & Stone Co.',
        rating: 4.7,
        location: 'Bangalore',
        verified: true,
      },
      {
        id: 4,
        name: 'Metro Building Supply',
        rating: 4.5,
        location: 'Chennai',
        verified: true,
      },
      {
        id: 5,
        name: 'Prime Construction Materials',
        rating: 4.9,
        location: 'Pune',
        verified: true,
      },
    ]
    setVendors(mockVendors)
  }, [])

  const handleVendorSelect = (vendor) => {
    setSelectedVendors((prev) => {
      const isSelected = prev.find((v) => v.id === vendor.id)
      if (isSelected) {
        return prev.filter((v) => v.id !== vendor.id)
      } else {
        return [...prev, vendor]
      }
    })
  }

  const handleSubmit = async () => {
    if (selectedVendors.length === 0) {
      alert('Please select at least one vendor')
      return
    }

    setIsSubmitting(true)
    try {
      // Navigate to quote confirmation with selected vendors and customer info
      const queryParams = new URLSearchParams({
        vendors: encodeURIComponent(JSON.stringify(selectedVendors)),
        customer: encodeURIComponent(JSON.stringify(customerInfo)),
      })

      router.push(`/orders/quote-confirmation?${queryParams.toString()}`)
    } catch (error) {
      console.error('Submission failed:', error)
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Vendor Selection Summary */}
        <Card className="p-6 mb-6">
          {selectedVendors.length === 0 ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-dark rounded-full">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-dark font-heading">
                Vendor Selection
              </h2>
              <p className="text-sm text-gray-medium font-body">
                {vendors.length} vendors available • Choose vendors to request
                quotes
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-dark rounded-full">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-dark font-heading">
                    Vendor Selection
                  </h2>
                  <p className="text-sm text-gray-medium font-body">
                    {vendors.length} vendors available
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-dark rounded-full">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-dark font-heading flex items-center gap-2 justify-end">
                    <Check className="w-4 h-4" />
                    {selectedVendors.length} Selected
                  </div>
                  <div className="text-sm text-gray-medium font-body">
                    Estimated time: 2-4 hours
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Vendors List */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-dark mb-6 font-heading">
            Available Vendors
          </h2>

          <div className="space-y-4">
            {vendors.map((vendor) => {
              const isSelected = selectedVendors.find((v) => v.id === vendor.id)

              return (
                <div
                  key={vendor.id}
                  onClick={() => handleVendorSelect(vendor)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-gray-dark bg-gray-light/10'
                      : 'border-gray-medium/20 hover:border-gray-medium/40 hover:bg-gray-light/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-gray-dark' : 'bg-gray-light'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <svg
                            className="w-5 h-5 text-gray-medium"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-dark font-heading">
                          {vendor.name}
                        </h3>
                        <p className="text-sm text-gray-medium font-body">
                          {vendor.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {vendor.verified && <Badge>Verified</Badge>}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-dark font-body">
                          {vendor.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 -mx-4 px-4 border-t border-gray-medium/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedVendors.length === 0}
            className="flex-1 h-12 font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Submitting...
              </>
            ) : (
              `Request Quotes (${selectedVendors.length})`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Loading component
const SelectVendorsLoading = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading vendors...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const SelectVendors = () => {
  return (
    <Suspense fallback={<SelectVendorsLoading />}>
      <SelectVendorsContent />
    </Suspense>
  )
}

export default SelectVendors
