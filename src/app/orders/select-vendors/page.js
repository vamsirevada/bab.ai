'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Star,
  ArrowLeft,
  Check,
  Phone,
  MapPin,
  ChevronDown,
} from 'lucide-react'
import { Button, Card, LoadingPage } from '@/components/ui'

// Main component content
const SelectVendorsContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [vendors, setVendors] = useState([])
  const [selectedVendors, setSelectedVendors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({})
  const [expanded, setExpanded] = useState(new Set())
  const [orderItems, setOrderItems] = useState([])

  // Get parameters from URL and localStorage
  useEffect(() => {
    const uuid = searchParams.get('uuid') || ''

    // Get customer data from localStorage
    let customerData = {}
    try {
      const storedData = localStorage.getItem('customerInfo')
      if (storedData) {
        customerData = JSON.parse(storedData)
      }
      const storedItems = localStorage.getItem('orderItems')

      if (storedItems) {
        const parsed = JSON.parse(storedItems)
        if (Array.isArray(parsed)) setOrderItems(parsed)
      }
    } catch (error) {
      console.error('Error parsing customer data from localStorage:', error)
    }

    // Set customer info with fallbacks
    setCustomerInfo({
      uuid,
      name: customerData.name || 'Construction Team',
      phone: customerData.phone || '+91 99663 30468',
      site: customerData.site || 'Construction Project',
      address: customerData.address || 'Project Site Address',
    })
  }, [searchParams])

  // Mock vendor data
  useEffect(() => {
    const mockVendors = [
      {
        id: 1,
        name: 'BuildPro Materials',
        rating: 4.8,
        type: 'Distributor',
        specialties: ['Steel Rods', 'Cement', 'Bricks'],
        phone: '+919876543210',
        mapQuery: 'BuildPro Materials Mumbai',
        years: 12,
        responseTime: '2h',
        minOrder: '₹15k',
        gstin: '27ABCDE1234F1Z5',
        areas: ['Mumbai', 'Navi Mumbai', 'Thane'],
        verified: true,
      },
      {
        id: 2,
        name: 'ConstructCorp',
        rating: 4.6,
        type: 'Authorized Vendor',
        specialties: ['TMT Bars', 'Ready Mix', 'Tiles'],
        phone: '+919812345678',
        mapQuery: 'ConstructCorp Delhi',
        years: 9,
        responseTime: '3h',
        minOrder: '₹10k',
        gstin: '07PQRSX6789L1Z2',
        areas: ['Delhi', 'Gurgaon', 'Noida'],
        verified: true,
      },
      {
        id: 3,
        name: 'Steel & Stone Co.',
        rating: 4.7,
        type: 'Retailer',
        specialties: ['MS Angles', 'Granite', 'Hardware'],
        phone: '+919811112222',
        mapQuery: 'Steel and Stone Co Bangalore',
        years: 15,
        responseTime: '1.5h',
        minOrder: '₹8k',
        gstin: '29LMNOP4321Q1Z7',
        areas: ['Bangalore', 'Hosakote'],
        verified: true,
      },
      {
        id: 4,
        name: 'Metro Building Supply',
        rating: 4.5,
        type: 'Authorized',
        specialties: ['Plywood', 'Paint', 'Electrical'],
        phone: '+919800112233',
        mapQuery: 'Metro Building Supply Chennai',
        years: 7,
        responseTime: '4h',
        minOrder: '₹12k',
        gstin: '33QRSTU2468Z1Z9',
        areas: ['Chennai', 'Chengalpattu'],
        verified: true,
      },
      {
        id: 5,
        name: 'Prime Construction Materials',
        rating: 4.9,
        type: 'Distributor',
        specialties: ['Concrete', 'Pipes', 'Fittings'],
        phone: '+919833344455',
        mapQuery: 'Prime Construction Materials Pune',
        years: 11,
        responseTime: '2.5h',
        minOrder: '₹18k',
        gstin: '27UVWXY9753N1Z4',
        areas: ['Pune', 'PCMC'],
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

  const handleSelectAll = () => {
    if (selectedVendors.length === vendors.length) {
      // If all are selected, deselect all
      setSelectedVendors([])
    } else {
      // Select all vendors
      setSelectedVendors([...vendors])
    }
  }

  const toggleExpand = (id) => {
    // Single-open accordion: toggle off if same, otherwise open only this id
    setExpanded((prev) => {
      if (prev.has(id)) return new Set()
      return new Set([id])
    })
  }

  const handleSubmit = async () => {
    if (selectedVendors.length === 0) {
      alert('Please select at least one vendor')
      return
    }

    if (!orderItems || orderItems.length === 0) {
      alert('Order items are missing. Please go back and review your order.')
      return
    }

    setIsSubmitting(true)
    try {
      // Store selected vendors for later steps
      localStorage.setItem('selectedVendors', JSON.stringify(selectedVendors))

      const requestId = customerInfo.uuid
      const payload = {
        request_id: requestId,
        status: 'DRAFT',
        delivery_location: customerInfo.address || null,
        notes: `Vendors selected: ${selectedVendors
          .map((v) => v.name)
          .join(', ')}${
          customerInfo.site ? ` | Site: ${customerInfo.site}` : ''
        }`,
        expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        items: orderItems,
        sender_id: customerInfo.phone,
      }

      console.log('Submitting order with payload:', payload)

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(
          `Submit failed (${res.status}): ${text || res.statusText}`
        )
      }

      // Optionally read response
      let responseData = null
      try {
        responseData = await res.json()
      } catch {}
      if (responseData) {
        localStorage.setItem(
          'submitOrderResponse',
          JSON.stringify(responseData)
        )
      }

      // Navigate to next step
      router.push('/orders/quote-request')
    } catch (error) {
      console.error('Submission failed:', error)
      // CORS or network errors: suggest proxy if needed
      alert(
        'Submission failed. If this persists, we can proxy the request via our API.\n' +
          (error?.message || '')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative">
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
                  <div className="text-lg font-semibold text-gray-dark font-heading flex items-center gap-2">
                    {selectedVendors.length}{' '}
                    {selectedVendors.length === 1 ? 'vendor' : 'vendors'}{' '}
                    selected
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-dark font-heading">
              Available Vendors
            </h2>
            <Button
              variant="outline"
              onClick={handleSelectAll}
              className="sm:w-auto w-full"
            >
              {selectedVendors.length === vendors.length ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Deselect All
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Select All ({vendors.length})
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4">
            {vendors.map((vendor) => {
              const isSelected = selectedVendors.find((v) => v.id === vendor.id)

              const isExpanded = expanded.has(vendor.id)
              return (
                <div
                  key={vendor.id}
                  className={`relative rounded-lg border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-gray-dark bg-gray-light/10'
                      : 'border-gray-medium/20 hover:border-gray-medium/40 hover:bg-gray-light/5'
                  } ${isExpanded ? 'shadow-sm' : ''}`}
                >
                  {isSelected && (
                    <span className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-gray-dark" />
                  )}
                  {/* Header Row (click to expand) */}
                  <div
                    className="p-2 sm:p-2.5 grid grid-cols-[1fr,auto] items-start gap-2 md:gap-3 select-none cursor-pointer"
                    onClick={() => handleVendorSelect(vendor)}
                  >
                    {/* Content */}
                    <div className="min-w-0 flex flex-col gap-[2px]">
                      <div className="flex items-start gap-2 min-w-0">
                        <h3 className="flex-1 font-medium text-gray-dark font-heading text-[13px] sm:text-sm leading-tight break-words whitespace-normal line-clamp-2 flex items-center gap-1">
                          {isSelected && (
                            <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-gray-dark text-white text-[9px]">
                              ✓
                            </span>
                          )}
                          <span className="flex-1 break-words">
                            {vendor.name}
                          </span>
                        </h3>
                        <span className="shrink-0 text-[10px] sm:text-[11px] uppercase tracking-wide text-gray-medium font-medium bg-gray-light/50 rounded px-1.5 py-0.5 border border-gray-medium/20">
                          {vendor.type}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-gray-medium truncate font-body">
                        {vendor.specialties.slice(0, 3).join(' • ')}
                      </div>
                    </div>

                    {/* Right column rating + chevron */}
                    <div className="flex items-center gap-1.5 pl-1 justify-self-end self-start mt-0.5">
                      <div className="flex items-center gap-1 text-gray-dark">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        <span className="font-medium text-[11px] sm:text-sm">
                          {vendor.rating}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(vendor.id)
                        }}
                        aria-label={
                          isExpanded ? 'Collapse details' : 'Expand details'
                        }
                        className="p-1 rounded-md hover:bg-gray-light/50 transition"
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-gray-medium transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-3 -mt-1 pt-0">
                      <div className="border-t border-gray-medium/20 pt-2 flex flex-wrap gap-1.5 text-[10px] sm:text-[11px] text-gray-dark">
                        <span className="px-2 py-1 rounded-md bg-gray-light/40 border border-gray-medium/20 font-medium">
                          {vendor.years}+ yrs
                        </span>
                        <span className="px-2 py-1 rounded-md bg-gray-light/40 border border-gray-medium/20 font-medium">
                          Response {vendor.responseTime}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-gray-light/40 border border-gray-medium/20 font-medium">
                          Min {vendor.minOrder}
                        </span>
                        <span
                          className="px-2 py-1 rounded-md bg-gray-light/40 border border-gray-medium/20 font-medium max-w-[45%] truncate"
                          title={vendor.areas.join(', ')}
                        >
                          Areas {vendor.areas.length}
                        </span>
                        <span
                          className="px-2 py-1 rounded-md bg-gray-light/40 border border-gray-medium/20 font-mono tracking-tight"
                          title={vendor.gstin}
                        >
                          GST {vendor.gstin.slice(-6)}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (vendor.phone)
                              window.location.href = `tel:${vendor.phone}`
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-dark text-white hover:bg-gray-medium transition border border-gray-dark/10"
                        >
                          <Phone className="w-3.5 h-3.5" /> Call
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (vendor.mapQuery)
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  vendor.mapQuery
                                )}`,
                                '_blank'
                              )
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-dark text-white hover:bg-gray-medium transition border border-gray-dark/10"
                        >
                          <MapPin className="w-3.5 h-3.5" /> Map
                        </button>
                        <span className="hidden sm:inline px-2 py-1 rounded-md text-gray-medium border border-transparent">
                          Reviews {Math.floor(Math.random() * 200) + 50}
                        </span>
                      </div>
                    </div>
                  )}
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

// Main export with Suspense boundary
const SelectVendors = () => {
  return (
    <Suspense fallback={<LoadingPage text="Loading vendors..." />}>
      <SelectVendorsContent />
    </Suspense>
  )
}

export default SelectVendors
