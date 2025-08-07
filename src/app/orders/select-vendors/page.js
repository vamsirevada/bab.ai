import React, { useState, useCallback, memo } from 'react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'

// Logo component adapted for SelectVendors theme
const Logo = memo(() => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <div className="w-8 h-8 bg-gradient-to-br from-brand-charcoal to-brand-charcoal/90 rounded-xl flex items-center justify-center shadow-md">
        <span className="text-brand-white font-bold text-sm font-heading">
          B
        </span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-brand-charcoal/80 to-brand-charcoal rounded-full flex items-center justify-center">
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
        Vendor Selection
      </p>
    </div>
  </div>
))

/**
 * Vendor Selection Component
 * Matches the UI design with vendor cards, ratings, and selection
 */
const SelectVendors = () => {
  const navigate = useNavigate()
  const [selectedVendors, setSelectedVendors] = useState(new Set([])) // Pre-select BuildMart and Urban Hardware
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [order, setOrder] = useState(null)

  // Load order summary from localStorage
  React.useEffect(() => {
    const storedOrder = localStorage.getItem('orderData')
    if (storedOrder) {
      try {
        setOrder(JSON.parse(storedOrder))
        const { customerInfo, ...updatedOrder } = order
        console.log(order)
        console.log('hi')
      } catch (error) {
        console.error('Error parsing order data:', error)
      }
    }
  }, [])

  // Vendor data with realistic construction material suppliers
  const vendors = [
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
  ]

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
  }, [selectedVendors.size, vendors.length])

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
      navigate('/quote-confirmation', {
        state: {
          orderData: order,
          selectedVendors: selectedVendorList,
        },
      })
    } catch (error) {
      console.error('Error submitting to vendors:', error)
      alert('Failed to submit order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedVendors, vendors, navigate, order])

  // Render star rating with review count
  const renderStars = useCallback((rating, reviewCount, isMobile = false) => {
    if (!rating) return null

    return (
      <div className={`flex items-center ${isMobile ? 'gap-1' : 'gap-2'}`}>
        <div className="flex items-center gap-1">
          <span
            className={`font-medium text-gray-900 ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}
          >
            {rating}
          </span>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${
                i < Math.floor(rating)
                  ? 'text-brand-accent'
                  : 'text-brand-charcoal/30'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span
          className={`text-brand-charcoal/70 ${
            isMobile ? 'text-xs' : 'text-xs'
          } font-body`}
        >
          ({reviewCount} reviews)
        </span>
      </div>
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-white to-brand-charcoal/5">
      {/* Header */}
      <div className="bg-brand-white border-b border-brand-charcoal/20 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-brand-charcoal rounded-full">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-brand-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                </svg>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-brand-charcoal font-body">
                  {order?.customerInfo?.name || 'Customer'}
                </div>
                <div className="text-xs text-brand-charcoal/70 font-body">
                  {order?.customerInfo?.phone || 'Phone'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6 transition-all duration-300 ease-in-out">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-charcoal mb-2 font-heading">
            Select Vendors
          </h2>
          {/* {order && (
            <p className="text-gray-600 text-sm sm:text-base">
              {order.items.length} items for {order.customerInfo.name}
            </p>
          )} */}
        </div>

        {/* Vendor Selection */}
        <div className="bg-brand-white rounded-lg sm:rounded-xl shadow-sm border border-brand-charcoal/20 p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300 ease-in-out">
          {/* Select All Option */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-brand-charcoal/20">
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-3 text-left w-full py-2"
            >
              <div
                className={`w-5 h-5 sm:w-5 sm:h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  selectedVendors.size === vendors.length
                    ? 'bg-brand-charcoal border-brand-charcoal text-brand-white'
                    : 'border-brand-charcoal/30 hover:border-brand-charcoal/50'
                }`}
              >
                {selectedVendors.size === vendors.length && (
                  <Check className="w-3 h-3" />
                )}
              </div>
              <span className="text-base sm:text-lg font-medium text-brand-charcoal font-body">
                Select All
              </span>
            </button>
          </div>

          {/* Vendor List */}
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border border-brand-charcoal/20 rounded-lg hover:border-brand-charcoal/30 transition-colors"
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
                            ? 'bg-brand-charcoal border-brand-charcoal text-brand-white'
                            : 'border-brand-charcoal/30 hover:border-brand-charcoal/50'
                        }`}
                      >
                        {selectedVendors.has(vendor.id) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-brand-charcoal text-lg font-body">
                          {vendor.name}
                        </h3>
                        {vendor.type && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              vendor.isAuthorized
                                ? 'bg-gray-200 text-gray-800 border border-gray-300' // Softer authorized badge
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {vendor.type}
                          </span>
                        )}
                      </div>
                      <p className="text-brand-charcoal/70 text-sm mb-2 font-body">
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
                            ? 'bg-brand-charcoal border-brand-charcoal text-brand-white'
                            : 'border-brand-charcoal/30 hover:border-brand-charcoal/50'
                        }`}
                      >
                        {selectedVendors.has(vendor.id) && (
                          <Check className="w-3 h-3" />
                        )}
                      </div>
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-brand-charcoal text-lg font-body">
                          {vendor.name}
                        </h3>
                        {vendor.type && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              vendor.isAuthorized
                                ? 'bg-gray-200 text-gray-800 border border-gray-300' // Softer authorized badge
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {vendor.type}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
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
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-3 -mx-3 px-3 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-11 sm:h-12 text-base sm:text-lg"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedVendors.size === 0}
            className="flex-1 bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-white h-11 sm:h-12 text-base sm:text-lg font-medium font-body"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedVendors.size > 0 && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-brand-white border border-brand-primary rounded-lg">
            <p className="text-brand-charcoal text-sm">
              {selectedVendors.size} vendor
              {selectedVendors.size !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(SelectVendors)
