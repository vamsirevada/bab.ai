'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Mail,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Filter,
  SortAsc,
  Eye,
  Grid,
  List,
  ChevronRight,
} from 'lucide-react'

// Import shared UI components
import {
  Button,
  Card,
  Badge,
  LoadingPage,
  InlineSpinner,
} from '@/components/ui'

// Mock data fallback
const mockQuotes = [
  {
    vendor_id: 'vendor_001',
    vendor_name: 'Steel Solutions Ltd',
    vendor_location: 'Mumbai, Maharashtra',
    vendor_specialization: 'Steel & Iron',
    status: 'received',
    items: [
      {
        item_id: 'item_001',
        quoted_price: 85000,
        delivery_days: 14,
        comments: 'High quality TMT bars, BIS certified',
      },
      {
        item_id: 'item_002',
        quoted_price: 12000,
        delivery_days: 7,
        comments: 'Standard cement bags',
      },
    ],
  },
  {
    vendor_id: 'vendor_002',
    vendor_name: 'BuildMart Enterprises',
    vendor_location: 'Pune, Maharashtra',
    vendor_specialization: 'Construction Materials',
    status: 'received',
    items: [
      {
        item_id: 'item_001',
        quoted_price: 82000,
        delivery_days: 10,
        comments: 'Premium grade steel with warranty',
      },
      {
        item_id: 'item_002',
        quoted_price: 11500,
        delivery_days: 5,
        comments: 'Bulk pricing applied',
      },
    ],
  },
  {
    vendor_id: 'vendor_003',
    vendor_name: 'Metro Construction Supply',
    vendor_location: 'Delhi, NCR',
    vendor_specialization: 'Building Materials',
    status: 'received',
    items: [
      {
        item_id: 'item_001',
        quoted_price: 90000,
        delivery_days: 12,
        comments: 'High strength concrete mix',
      },
      {
        item_id: 'item_002',
        quoted_price: 13000,
        delivery_days: 6,
        comments: 'Standard cement bags',
      },
    ],
  },
  {
    vendor_id: 'vendor_004',
    vendor_name: 'ABC Supplies',
    vendor_location: 'Bangalore, Karnataka',
    vendor_specialization: 'Construction Materials',
    status: 'pending',
    items: [],
  },
  {
    vendor_id: 'vendor_005',
    vendor_name: 'XYZ Constructions',
    vendor_location: 'Hyderabad, Telangana',
    vendor_specialization: 'Civil Engineering',
    status: 'pending',
    items: [],
  },
  {
    vendor_id: 'vendor_006',
    vendor_name: 'PQR Builders',
    vendor_location: 'Chennai, Tamil Nadu',
    vendor_specialization: 'Construction Services',
    status: 'received',
    items: [],
  },
]

// Quote Card Component
const QuoteCard = ({
  quote,
  onAccept,
  onReject,
  onRequestAgain,
  selectedQuote,
}) => {
  const isSelected = selectedQuote?.vendorId === quote.vendorId
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = (e) => {
    // Only handle clicks on the main card, not buttons
    if (e.target.closest('button')) return

    // For received quotes, toggle selection only (expansion is handled by details button)
    if (quote.status === 'received') {
      if (isSelected) {
        // If already selected, deselect it
        onAccept(null)
      } else {
        // If not selected, select this quote
        onAccept(quote)
      }
    }
  }

  return (
    <Card
      className={`p-3 transition-all duration-300 hover:shadow-md cursor-pointer rounded-xl ${
        isSelected
          ? 'border-2 border-gray-dark bg-gray-light/30 shadow-md'
          : 'border border-gray-medium/20 hover:border-gray-medium/40 hover:bg-gray-light/20'
      } ${isExpanded ? 'shadow-lg' : ''}`}
      onClick={handleCardClick}
    >
      {/* Minimal Header - Name, Total, and Details Button */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0 pr-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-dark font-heading text-sm truncate">
              {quote.vendorName}
            </h3>
            {isSelected && quote.status === 'received' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-600 text-white text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Selected
              </span>
            )}
          </div>
          {/* Total amount below vendor name - inline layout */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-medium font-body">
              {quote.status === 'pending' ? 'Pending:' : 'Total Price:'}
            </span>
            <span className="text-base sm:text-lg font-bold text-gray-dark font-heading">
              {quote.status === 'pending'
                ? '₹0'
                : `₹${quote.totalAmount.toLocaleString()}`}
            </span>
          </div>
          {/* Show expand indicator for collapsed state */}
          {!isExpanded && quote.status !== 'received' && (
            <div className="flex items-center gap-2 mt-1">
              <div className="text-xs text-gray-500 font-medium">
                Awaiting quote
              </div>
              {quote.status === 'pending' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRequestAgain && onRequestAgain(quote)
                  }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 hover:border-blue-300 transition-all duration-200"
                >
                  <Mail className="w-3 h-3" />
                  Request Again
                </button>
              )}
            </div>
          )}
        </div>
        {/* Details Button */}
        <div className="flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors duration-200 flex items-center"
          >
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expanded Content - All Details */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          {/* Vendor Details */}
          <div className="mb-3 border-t border-gray-100 pt-3">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < quote.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <Badge
                variant={quote.status === 'received' ? 'success' : 'pending'}
                className="text-xs"
              >
                {quote.status}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex justify-between sm:block">
                <span className="font-medium text-gray-dark">Location:</span>
                <span className="text-gray-medium sm:ml-1 truncate max-w-32 sm:max-w-none">
                  {quote.location}
                </span>
              </div>
              <div className="flex justify-between sm:block">
                <span className="font-medium text-gray-dark">Delivery:</span>
                <span className="text-gray-medium sm:ml-1">
                  {quote.deliveryTime}
                </span>
              </div>
              {quote.specialization && (
                <div className="col-span-full flex justify-between sm:block">
                  <span className="font-medium text-gray-dark">
                    Specialization:
                  </span>
                  <span className="text-gray-medium sm:ml-1 truncate max-w-40 sm:max-w-none">
                    {quote.specialization}
                  </span>
                </div>
              )}
            </div>
          </div>

          {quote.status === 'received' && (
            <>
              {/* Quote Items */}
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-gray-dark mb-2">
                  Quote Breakdown
                </h4>
                <div className="max-h-32 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {quote.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-xs py-1 bg-gray-50 px-2 rounded gap-2"
                    >
                      <span className="text-gray-medium font-body truncate flex-1 min-w-0">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium text-gray-dark font-body whitespace-nowrap flex-shrink-0">
                        ₹{item.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {quote.status === 'pending' && (
            <div className="flex items-center justify-center py-2 text-gray-medium bg-orange-50 rounded">
              <Clock className="w-3 h-3 mr-1" />
              <span className="text-xs font-body">
                Waiting for vendor response...
              </span>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}

// Comparison Table Component
const ComparisonTable = ({ quotes, selectedQuote, onAccept }) => {
  if (quotes.length === 0) return null

  // Get all unique materials from all quotes
  const allMaterials = []
  const materialMap = new Map()

  quotes.forEach((quote) => {
    quote.items.forEach((item) => {
      if (!materialMap.has(item.name)) {
        materialMap.set(item.name, item.name)
        allMaterials.push(item.name)
      }
    })
  })

  // Helper function to get price for a specific material from a quote
  const getMaterialPrice = (quote, materialName) => {
    const item = quote.items.find((item) => item.name === materialName)
    return item ? item.unitPrice : null
  }

  // Helper function to find the lowest price for each material across all vendors
  const getLowestPriceForMaterial = (materialName) => {
    const prices = quotes
      .map((quote) => getMaterialPrice(quote, materialName))
      .filter((price) => price !== null)
    return prices.length > 0 ? Math.min(...prices) : null
  }

  // Helper function to check if a price is uniquely the lowest (not shared with others)
  const isUniquelyLowest = (materialName, price) => {
    if (price === null) return false
    const lowestPrice = getLowestPriceForMaterial(materialName)
    if (price !== lowestPrice) return false

    // Count how many vendors have this lowest price
    const vendorsWithLowestPrice = quotes
      .map((quote) => getMaterialPrice(quote, materialName))
      .filter((vendorPrice) => vendorPrice === lowestPrice)

    // Only return true if this is the unique lowest price (only one vendor has it)
    return vendorsWithLowestPrice.length === 1
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-x-auto">
      <table
        className="w-full"
        style={{ minWidth: `${160 + quotes.length * 180}px` }}
      >
        <thead>
          <tr>
            <th
              className="sticky left-0 z-10 bg-white border-r-2 border-r-gray-300 border-b border-b-gray-200 py-3 px-3 text-left font-semibold text-gray-dark"
              style={{
                width: '160px',
                minWidth: '160px',
                maxWidth: '160px',
                boxShadow: '2px 0 5px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span className="text-sm whitespace-nowrap">Material</span>
            </th>
            {quotes.map((quote) => {
              const isSelected = selectedQuote?.vendorId === quote.vendorId
              return (
                <th
                  key={quote.vendorId}
                  className="text-center py-3 px-3 font-semibold text-gray-dark bg-white border-b border-gray-200"
                  style={{
                    width: '180px',
                    minWidth: '180px',
                    maxWidth: '180px',
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-medium text-sm whitespace-nowrap"
                        title={quote.vendorName}
                      >
                        {quote.vendorName}
                      </span>
                    </div>
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {allMaterials.map((material, materialIndex) => {
            const lowestPrice = getLowestPriceForMaterial(material)
            return (
              <tr key={`material-${materialIndex}`}>
                <td
                  className="sticky left-0 z-10 bg-white border-r-2 border-r-gray-300 border-b border-b-gray-100 py-3 px-3"
                  style={{
                    width: '160px',
                    minWidth: '160px',
                    maxWidth: '160px',
                    boxShadow: '2px 0 5px -1px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div
                    className="font-medium text-gray-dark text-sm cursor-help whitespace-nowrap overflow-hidden text-ellipsis"
                    title={material}
                  >
                    {material}
                  </div>
                </td>
                {quotes.map((quote) => {
                  const price = getMaterialPrice(quote, material)
                  const showIcon = isUniquelyLowest(material, price)

                  return (
                    <td
                      key={`${quote.vendorId}-${materialIndex}`}
                      className="py-3 px-3 text-center bg-white border-b border-gray-100"
                      style={{
                        width: '180px',
                        minWidth: '180px',
                        maxWidth: '180px',
                      }}
                    >
                      {price !== null ? (
                        <div className="flex items-center justify-center gap-1">
                          <span
                            className={`font-medium text-sm whitespace-nowrap ${
                              showIcon ? 'text-green-600' : 'text-gray-dark'
                            }`}
                          >
                            ₹{price.toLocaleString()}
                          </span>
                          {showIcon && (
                            <TrendingDown className="w-3 h-3 text-green-600" />
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          <tr>
            <td
              className="sticky left-0 z-10 bg-gray-50 border-r-2 border-r-gray-300 border-t-2 border-t-gray-300 py-4 px-3 text-gray-dark font-semibold"
              style={{
                width: '160px',
                minWidth: '160px',
                maxWidth: '160px',
                boxShadow: '2px 0 5px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span className="text-sm font-semibold whitespace-nowrap">
                Total
              </span>
            </td>
            {quotes.map((quote) => (
              <td
                key={`total-${quote.vendorId}`}
                className="py-4 px-3 text-center text-gray-dark bg-gray-50 border-t-2 border-gray-300 font-semibold"
                style={{
                  width: '180px',
                  minWidth: '180px',
                  maxWidth: '180px',
                }}
              >
                <span className="text-sm font-semibold whitespace-nowrap">
                  ₹{quote.totalAmount.toLocaleString()}
                </span>
              </td>
            ))}
          </tr>
          {/* Select Buttons Row */}
          <tr>
            <td
              className="sticky left-0 z-10 bg-white border-r-2 border-r-gray-300 border-t border-t-gray-200 py-3 px-3"
              style={{
                width: '160px',
                minWidth: '160px',
                maxWidth: '160px',
                boxShadow: '2px 0 5px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <span className="text-sm font-medium text-gray-dark whitespace-nowrap">
                Select Vendor
              </span>
            </td>
            {quotes.map((quote) => {
              const isSelected = selectedQuote?.vendorId === quote.vendorId
              return (
                <td
                  key={`select-${quote.vendorId}`}
                  className="py-3 px-3 text-center bg-white border-t border-gray-200"
                  style={{
                    width: '180px',
                    minWidth: '180px',
                    maxWidth: '180px',
                  }}
                >
                  <button
                    onClick={() => onAccept(isSelected ? null : quote)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                      isSelected
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// Comparison Stats Component
const ComparisonStats = ({ quotes }) => {
  if (quotes.length === 0) return null

  const prices = quotes.map((q) => q.totalAmount)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length
  const priceRange = maxPrice - minPrice
  const avgDeliveryDays =
    quotes.reduce((sum, q) => {
      const days = parseInt(q.deliveryTime) || 0
      return sum + days
    }, 0) / quotes.length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-gray-medium">
            Best Price
          </span>
        </div>
        <div className="text-lg font-semibold text-gray-dark">
          ₹{minPrice.toLocaleString()}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-medium text-gray-medium">Average</span>
        </div>
        <div className="text-lg font-semibold text-gray-dark">
          ₹{Math.round(avgPrice).toLocaleString()}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-orange-600" />
          <span className="text-xs font-medium text-gray-medium">
            Price Range
          </span>
        </div>
        <div className="text-lg font-semibold text-gray-dark">
          ₹{priceRange.toLocaleString()}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-medium text-gray-medium">
            Avg Delivery
          </span>
        </div>
        <div className="text-lg font-semibold text-gray-dark">
          {Math.round(avgDeliveryDays)} days
        </div>
      </Card>
    </div>
  )
}
// Main Component Content
const ReceiveQuoteContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [customerInfo, setCustomerInfo] = useState({})
  const [quotes, setQuotes] = useState([])
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [requestId, setRequestId] = useState('')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'table'
  const [sortBy, setSortBy] = useState('price') // 'price', 'delivery', 'rating'
  const [sortOrder, setSortOrder] = useState('asc') // 'asc' or 'desc'

  // Read request id from query: support both uuid and request_id
  // Note: We don't store this in state to avoid re-renders, read it inside useEffect instead

  // Load data on component mount (fetch quotes for this request/order)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)

      // Read request id from query: support both uuid and request_id
      const reqId = searchParams.get('uuid') || searchParams.get('request_id')
      setRequestId(reqId || '')

      try {
        // Load basic customer info from localStorage if available
        try {
          const storedCustomerInfo = localStorage.getItem('customerInfo')
          if (storedCustomerInfo) {
            setCustomerInfo(JSON.parse(storedCustomerInfo))
          }
        } catch (e) {
          // non-fatal
          console.warn('Unable to read customerInfo from localStorage')
        }

        if (!reqId) {
          console.warn('No request ID provided for quotes fetch')
          setQuotes([])
          setIsLoading(false)
          return
        }

        console.log('Fetching quotes for request ID:', reqId)

        // Fetch order items and quotes in parallel
        const [orderRes, quotesRes] = await Promise.all([
          fetch(`/api/orders/${encodeURIComponent(reqId)}`, {
            cache: 'no-store',
          }),
          fetch(`/api/orders/${encodeURIComponent(reqId)}/quotes`, {
            cache: 'no-store',
          }),
        ])

        // Build a lookup of order item details (name, quantity) for totals
        let orderItems = []
        if (orderRes.ok) {
          const data = await orderRes.json()
          if (Array.isArray(data)) {
            orderItems = data
          }
        }
        const orderItemMap = orderItems.reduce((acc, item) => {
          acc[item.id] = {
            name:
              item.material_name || item.name || item.title || 'Material Item',
            quantity: Number(item.quantity) || 1,
          }
          return acc
        }, {})

        // Parse quotes and enrich with computed totals and item breakdown
        let rawQuotes = []
        if (!quotesRes.ok) {
          console.warn(
            'Quotes API failed, using mock data with real order items:',
            {
              status: quotesRes.status,
              statusText: quotesRes.statusText,
              url: `/api/orders/${encodeURIComponent(reqId)}/quotes`,
            }
          )
          // Use mock data as fallback but with real order items if available
          rawQuotes = mockQuotes.map((mockQuote) => ({
            ...mockQuote,
            // Replace mock items with real order items if available
            items:
              orderItems.length > 0
                ? orderItems.map((item, index) => ({
                    item_id: item.id || `item_${index + 1}`,
                    quoted_price:
                      mockQuote.items[index]?.quoted_price ||
                      85000 + index * 1000,
                    delivery_days: mockQuote.items[index]?.delivery_days || 14,
                    comments:
                      mockQuote.items[index]?.comments ||
                      `Quality ${item.material_name || 'materials'}`,
                  }))
                : mockQuote.items,
          }))
        } else {
          try {
            rawQuotes = await quotesRes.json()
          } catch (parseError) {
            console.warn(
              'Failed to parse quotes response, using mock data with real order items:',
              parseError
            )
            // Use mock data as fallback but with real order items if available
            rawQuotes = mockQuotes.map((mockQuote) => ({
              ...mockQuote,
              // Replace mock items with real order items if available
              items:
                orderItems.length > 0
                  ? orderItems.map((item, index) => ({
                      item_id: item.id || `item_${index + 1}`,
                      quoted_price:
                        mockQuote.items[index]?.quoted_price ||
                        85000 + index * 1000,
                      delivery_days:
                        mockQuote.items[index]?.delivery_days || 14,
                      comments:
                        mockQuote.items[index]?.comments ||
                        `Quality ${item.material_name || 'materials'}`,
                    }))
                  : mockQuote.items,
            }))
          }
        }

        const normalized = (Array.isArray(rawQuotes) ? rawQuotes : []).map(
          (q) => {
            // Items come from quote_items table
            const items = (q.items || []).map((qi) => {
              const src = orderItemMap[qi.item_id] || {
                name: `Item #${qi.item_id}`,
                quantity: 1,
              }
              const unit = Number(qi.quoted_price) || 0
              const qty = Number(src.quantity) || 1
              const total = unit * qty
              return {
                name: src.name,
                quantity: qty,
                unitPrice: unit,
                total,
              }
            })

            const totalAmount = items.reduce((s, it) => s + it.total, 0)

            // If API status not reliable, infer received when items exist
            const status =
              q.status || (items.length > 0 ? 'received' : 'pending')

            // Derive delivery time from max delivery_days across items if present
            const maxDays = Math.max(
              0,
              ...(q.items || [])
                .map((qi) => Number(qi.delivery_days))
                .filter((n) => !Number.isNaN(n))
            )

            return {
              vendorId: q.vendor_id,
              vendorName: q.vendor_name || `Vendor ${q.vendor_id}`,
              location: q.vendor_location || '—',
              rating: 4, // placeholder; adjust if rating exists in data
              deliveryTime: maxDays ? `${maxDays} days` : 'N/A',
              specialization: q.vendor_specialization || null,
              status,
              totalAmount,
              items,
            }
          }
        )

        setQuotes(normalized)
      } catch (err) {
        console.error('Error loading quotes:', {
          error: err,
          message: err.message,
          requestId: reqId,
          url: `/api/orders/${encodeURIComponent(reqId || '')}/quotes`,
        })

        // Provide more specific error messages based on the error type
        let userMessage = 'Failed to load quotes. Please try again later.'
        if (err.message.includes('422')) {
          userMessage =
            'Invalid request format. Please check the request ID and try again.'
        } else if (err.message.includes('404')) {
          userMessage =
            'No quotes found for this request. The request may not exist.'
        } else if (err.message.includes('500')) {
          userMessage =
            'Server error while fetching quotes. Please try again in a moment.'
        }

        setError(userMessage)
        setQuotes([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAcceptQuote = (quote) => {
    setSelectedQuote(quote)
    // Store selected quote in localStorage
    localStorage.setItem('selectedQuote', JSON.stringify(quote))
  }

  const handleRejectQuote = (quote) => {
    setQuotes(quotes.filter((q) => q.vendorId !== quote.vendorId))
  }

  const handleRequestAgain = async (quote) => {
    try {
      console.log(`Requesting quote again from vendor: ${quote.vendorName}`)
      alert(`Quote request sent to ${quote.vendorName}`)
    } catch (error) {
      console.error('Error requesting quote again:', error)
      alert('Failed to send quote request. Please try again.')
    }
  }

  const handleProceedToOrder = () => {
    if (selectedQuote) {
      router.push('/orders/quote-accepted')
    }
  }

  // Sorting function
  const sortQuotes = (quotesToSort) => {
    return [...quotesToSort].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'price':
          aValue = a.totalAmount
          bValue = b.totalAmount
          break
        case 'delivery':
          aValue = parseInt(a.deliveryTime) || 999
          bValue = parseInt(b.deliveryTime) || 999
          break
        case 'rating':
          aValue = a.rating
          bValue = b.rating
          break
        default:
          aValue = a.totalAmount
          bValue = b.totalAmount
      }

      if (sortOrder === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }

  const receivedQuotes = sortQuotes(
    quotes.filter((q) => q.status === 'received')
  )
  const pendingQuotes = quotes.filter((q) => q.status === 'pending')

  if (isLoading) {
    return <LoadingPage>Loading quotes...</LoadingPage>
  }

  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 relative z-10">
        {error && (
          <Card className="p-3 sm:p-4 mb-4 border-red-200 bg-red-50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <p className="text-sm text-red-700 flex-1">{error}</p>
              <Button
                variant="outline"
                className="text-red-700 border-red-300 hover:bg-red-100 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                onClick={() => {
                  // Trigger reload by updating search params state
                  typeof window !== 'undefined' && router.refresh?.()
                }}
              >
                Retry
              </Button>
            </div>
          </Card>
        )}
        {/* Header Card */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex-shrink-0">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-gray-dark font-heading truncate">
                  Compare Quotes
                </h2>
                <p className="text-xs sm:text-sm text-gray-medium font-body">
                  Analyze and select the best quote from multiple vendors
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 justify-between sm:justify-end">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex-shrink-0">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="text-left min-w-0 flex-1 sm:flex-initial">
                <div className="text-base sm:text-lg font-semibold text-gray-dark font-heading">
                  {receivedQuotes.length} of {quotes.length}
                </div>
                <p className="text-xs text-gray-medium font-body flex items-center gap-1">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Quotes Received</span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Comparison Stats */}
        {receivedQuotes.length > 1 && (
          <ComparisonStats quotes={receivedQuotes} />
        )}

        {/* Controls Bar */}
        {receivedQuotes.length > 0 && (
          <Card className="p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {/* Mobile: Single row with justified space between sort and view */}
              <div className="flex items-center justify-between sm:justify-start sm:gap-2 sm:flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-medium flex-shrink-0" />
                  {/* Hide "Sort by:" label on mobile for space */}
                  <span className="hidden sm:inline text-sm font-medium text-gray-dark whitespace-nowrap">
                    Sort by:
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1 bg-white min-w-0"
                    >
                      <option value="price">Price</option>
                      <option value="delivery">Delivery Time</option>
                      <option value="rating">Rating</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                      }
                      className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                      title={`Sort ${
                        sortOrder === 'asc' ? 'Descending' : 'Ascending'
                      }`}
                    >
                      <SortAsc
                        className={`w-4 h-4 text-gray-medium ${
                          sortOrder === 'desc' ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
                {/* View controls aligned to right on mobile */}
                <div className="flex items-center sm:hidden">
                  <div className="flex border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`px-1.5 py-1 text-xs flex items-center gap-1 ${
                        viewMode === 'cards'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-dark hover:bg-gray-50'
                      }`}
                      title="Cards View"
                    >
                      <Grid className="w-3 h-3" />
                      <span>Cards</span>
                    </button>
                    <button
                      onClick={() => setViewMode('table')}
                      className={`px-1.5 py-1 text-xs flex items-center gap-1 ${
                        viewMode === 'table'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-dark hover:bg-gray-50'
                      }`}
                      title="Table View"
                    >
                      <List className="w-3 h-3" />
                      <span>Table</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* View controls separate on desktop */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-dark whitespace-nowrap">
                  View:
                </span>
                <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-3 py-1 text-sm flex items-center gap-1 ${
                      viewMode === 'cards'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-dark hover:bg-gray-50'
                    }`}
                  >
                    <Grid className="w-3 h-3" />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1 text-sm flex items-center gap-1 ${
                      viewMode === 'table'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-dark hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-3 h-3" />
                    <span>Table</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Received Quotes */}
        {receivedQuotes.length > 0 && (
          <Card className="p-3 sm:p-4 mb-4 sm:mb-6 mt-4 sm:mt-0">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-dark font-heading">
                Available Quotes ({receivedQuotes.length})
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="info" className="text-xs">
                  {receivedQuotes.length} received
                </Badge>
                {receivedQuotes.length > 1 && (
                  <Badge variant="success" className="text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Compare
                  </Badge>
                )}
              </div>
            </div>

            {/* Mobile-First Comparison View */}
            {viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <ComparisonTable
                  quotes={receivedQuotes}
                  selectedQuote={selectedQuote}
                  onAccept={handleAcceptQuote}
                />
              </div>
            ) : (
              /* Cards View */
              <div className="space-y-2 sm:space-y-3">
                {receivedQuotes.map((quote) => (
                  <QuoteCard
                    key={quote.vendorId}
                    quote={quote}
                    onAccept={handleAcceptQuote}
                    onReject={handleRejectQuote}
                    onRequestAgain={handleRequestAgain}
                    selectedQuote={selectedQuote}
                  />
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Empty state when no quotes yet */}
        {receivedQuotes.length === 0 && pendingQuotes.length === 0 && (
          <Card className="p-6 sm:p-8 mb-4 sm:mb-6 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-base sm:text-lg font-semibold text-gray-dark font-heading mb-2">
                No quotes yet
              </h3>
              <p className="text-sm text-gray-medium font-body mb-4">
                Vendors are preparing their quotes. Check back soon.
              </p>
              <Button onClick={() => router.refresh?.()}>Refresh</Button>
            </div>
          </Card>
        )}

        {/* Pending Quotes */}
        {pendingQuotes.length > 0 && (
          <Card className="p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-dark font-heading">
                Pending Quotes ({pendingQuotes.length})
              </h3>
              <Badge variant="warning" className="text-xs">
                {pendingQuotes.length} pending
              </Badge>
            </div>
            {/* Container for pending quotes */}
            <div className="space-y-2 sm:space-y-3">
              {pendingQuotes.map((quote) => (
                <QuoteCard
                  key={quote.vendorId}
                  quote={quote}
                  onAccept={handleAcceptQuote}
                  onReject={handleRejectQuote}
                  onRequestAgain={handleRequestAgain}
                  selectedQuote={selectedQuote}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons - Fixed at bottom for easy access */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-medium/20 p-3 z-30 sm:relative sm:bg-transparent sm:border-t-0 sm:p-0">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              variant="outline"
              className="flex-1 h-10 sm:h-12 sm:max-w-32 text-sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleProceedToOrder}
              disabled={!selectedQuote}
              className="flex-1 h-10 sm:h-12 font-medium bg-green-600 hover:bg-green-700 focus:ring-green-600 text-sm"
            >
              {selectedQuote ? (
                <>
                  <span className="truncate">
                    Accept Quote (₹
                    {selectedQuote.totalAmount.toLocaleString()})
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
                </>
              ) : (
                'Accept Quote'
              )}
            </Button>
          </div>
        </div>

        {/* Bottom padding for fixed button on mobile */}
        <div className="h-16 sm:h-20 sm:hidden" />
      </div>
    </div>
  )
}

// Loading component
const ReceiveQuoteLoading = () => <LoadingPage>Loading quotes...</LoadingPage>

// Main export with Suspense boundary
const ReceiveQuote = () => {
  return (
    <Suspense fallback={<ReceiveQuoteLoading />}>
      <ReceiveQuoteContent />
    </Suspense>
  )
}

export default ReceiveQuote
