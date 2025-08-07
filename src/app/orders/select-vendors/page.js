'use client'
import React, { useState, useCallback, memo, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)

// UI Components matching our minimal theme
const Button = ({
  children,
  onClick,
  disabled,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    default:
      'bg-gray-dark text-white hover:bg-gray-medium focus:ring-gray-medium',
    outline:
      'border border-gray-medium/30 bg-white text-gray-dark hover:bg-gray-light/20 focus:ring-gray-medium',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white rounded-2xl border border-gray-medium/20 shadow-sm ${className}`}
  >
    {children}
  </div>
)

const Badge = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-light/30 text-gray-dark border border-gray-medium/20 ${className}`}
  >
    {children}
  </span>
)

// Customer Info Component matching our minimal theme
const CustomerInfo = memo(({ customerInfo }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-dark rounded-full">
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
      </svg>
    </div>
    <div className="text-left">
      <div className="text-sm font-medium text-gray-dark font-heading">
        {customerInfo.name}
      </div>
      <div className="text-xs text-gray-medium font-body">
        Vendor Selection • {customerInfo.phone}
      </div>
    </div>
  </div>
))
CustomerInfo.displayName = 'CustomerInfo'

/**
 * Vendor Selection Component
 * Unified with minimal theme and design consistency
 */
const SelectVendors = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedVendors, setSelectedVendors] = useState(new Set([]))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: searchParams.get('name') || 'Construction Team',
    phone: searchParams.get('phone') || '+91 98765 43210',
    site: searchParams.get('site') || 'Construction Project',
    address: searchParams.get('address') || 'Project Site Address',
  })

  // Vendor data with minimal, realistic information
  const vendors = useMemo(
    () => [
      {
        id: 1,
        name: 'ABC Supplies',
        specialties: ['Cement', 'Concrete Blocks'],
        type: 'Distributor',
        rating: 4.2,
        reviewCount: 156,
        isAuthorized: false,
      },
      {
        id: 2,
        name: 'BuildMart',
        specialties: ['Steel Bars', 'Sand', 'Cement'],
        type: 'Retailer',
        rating: 4.5,
        reviewCount: 289,
        isAuthorized: false,
      },
      {
        id: 3,
        name: 'StrongStone',
        specialties: ['Concrete Blocks', 'Cement'],
        type: 'Authorized',
        rating: 4.7,
        reviewCount: 124,
        isAuthorized: true,
      },
      {
        id: 4,
        name: 'Urban Hardware',
        specialties: ['Steel Bars', 'River Sand'],
        type: 'Retailer',
        rating: 4.3,
        reviewCount: 203,
        isAuthorized: false,
      },
      {
        id: 5,
        name: 'ProBuild',
        specialties: ['Cement', 'Steel Bars'],
        type: 'Authorized Vendor',
        rating: 4.6,
        reviewCount: 87,
        isAuthorized: true,
      },
    ],
    []
  )

  // Handle vendor selection toggle
  const handleVendorToggle = useCallback((vendorId) => {
    setSelectedVendors((prev) => {
      const newSelection = new Set(prev)
      if (newSelection.has(vendorId)) {
        newSelection.delete(vendorId)
      } else {
        newSelection.add(vendorId)
      }
      return newSelection
    })
  }, [])

  // Handle select all toggle
  const handleSelectAll = useCallback(() => {
    if (selectedVendors.size === vendors.length) {
      setSelectedVendors(new Set())
    } else {
      setSelectedVendors(new Set(vendors.map((v) => v.id)))
    }
  }, [selectedVendors.size, vendors])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (selectedVendors.size === 0) {
      alert('Please select at least one vendor')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const selectedVendorList = vendors.filter((v) =>
        selectedVendors.has(v.id)
      )

      // Navigate to confirmation page with order data and selected vendors
      const queryParams = new URLSearchParams({
        ...customerInfo,
        vendors: selectedVendorList.map((v) => v.name).join(','),
      })

      router.push(`/orders/quote-confirmation?${queryParams.toString()}`)
    } catch (error) {
      console.error('Error submitting to vendors:', error)
      alert('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedVendors, vendors, router, customerInfo])

  // Render star rating with review count
  const renderStars = useCallback((rating, reviewCount, isMobile = false) => {
    if (!rating) return null

    return (
      <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
        <div className="flex items-center gap-1">
          <span
            className={`font-medium text-gray-dark ${
              isMobile ? 'text-sm' : 'text-sm'
            } font-body`}
          >
            {rating}
          </span>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${
                i < Math.floor(rating) ? 'text-gray-dark' : 'text-gray-medium'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span
          className={`text-gray-medium ${
            isMobile ? 'text-xs' : 'text-xs'
          } font-body`}
        >
          ({reviewCount} reviews)
        </span>
      </div>
    )
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6">
        {/* Order Summary */}
        <Card className="p-6 mb-6">
          {selectedVendors.size === 0 ? (
            // No selection state - full width centered
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
                <h2 className="text-xl font-semibold text-gray-dark font-heading">
                  Vendor Selection
                </h2>
              </div>
              <p className="text-gray-medium font-body">
                {vendors.length} vendors available • Choose vendors to request
                quotes
              </p>
            </div>
          ) : (
            // Selection active state - responsive layout
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
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-dark rounded-full">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-dark font-heading">
                      {selectedVendors.size} Selected
                    </h3>
                    <p className="text-sm text-gray-medium font-body">
                      Estimated time: 2-4 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
        {/* Vendor Selection */}
        <Card className="p-6 mb-6">
          {/* Select All Option */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-medium/20">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-3 text-left w-full py-2 hover:bg-gray-light/20 rounded-lg transition-colors"
            >
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedVendors.size === vendors.length
                    ? 'bg-gray-dark border-gray-dark text-white'
                    : 'border-gray-medium hover:border-gray-dark'
                }`}
              >
                {selectedVendors.size === vendors.length && (
                  <Check className="w-3 h-3" />
                )}
              </div>
              <span className="text-base font-medium text-gray-dark font-body">
                Select All Vendors
              </span>
            </button>
          </div>

          {/* Vendor List */}
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border border-gray-medium/20 rounded-xl hover:border-gray-dark/30 transition-all duration-200 hover:shadow-sm"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden p-4 space-y-3">
                  {/* Header with checkbox and name */}
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleVendorToggle(vendor.id)}
                      className="mt-1"
                    >
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedVendors.has(vendor.id)
                            ? 'bg-gray-dark border-gray-dark text-white'
                            : 'border-gray-medium hover:border-gray-dark'
                        }`}
                      >
                        {selectedVendors.has(vendor.id) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-gray-dark text-lg font-heading">
                          {vendor.name}
                        </h3>
                        {vendor.type && (
                          <Badge
                            className={
                              vendor.isAuthorized
                                ? 'bg-gray-light text-gray-dark border-gray-medium/30'
                                : ''
                            }
                          >
                            {vendor.type}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-medium text-sm mb-2 font-body">
                        {vendor.specialties.join(', ')}
                      </p>
                      {/* Rating on separate line for mobile */}
                      <div className="flex items-center">
                        {renderStars(vendor.rating, vendor.reviewCount, true)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => handleVendorToggle(vendor.id)}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedVendors.has(vendor.id)
                            ? 'bg-gray-dark border-gray-dark text-white'
                            : 'border-gray-medium hover:border-gray-dark'
                        }`}
                      >
                        {selectedVendors.has(vendor.id) && (
                          <Check className="w-3 h-3" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-dark text-lg font-heading">
                          {vendor.name}
                        </h3>
                        {vendor.type && (
                          <Badge
                            className={
                              vendor.isAuthorized
                                ? 'bg-gray-light text-gray-dark border-gray-medium/30'
                                : ''
                            }
                          >
                            {vendor.type}
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-medium text-sm font-body">
                        {vendor.specialties.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Rating and Reviews */}
                  <div className="flex items-center">
                    {renderStars(vendor.rating, vendor.reviewCount, false)}
                  </div>
                </div>
              </div>
            ))}
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
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedVendors.size === 0}
            className="flex-1 h-12 font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Request Quotes (${selectedVendors.size})`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(SelectVendors)
