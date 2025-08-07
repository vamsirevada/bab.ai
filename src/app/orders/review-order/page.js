'use client'
import React, { useState, useCallback, memo, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Edit2, Trash2, Plus, Minus } from 'lucide-react'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)

// UI Components
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
    ghost:
      'bg-transparent text-gray-dark hover:bg-gray-light/20 focus:ring-gray-medium',
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

const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 bg-white border border-gray-medium/30 rounded-lg text-gray-dark placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-gray-medium focus:border-gray-medium transition-all duration-200 ${className}`}
    {...props}
  />
)

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

// Editable Cell Component
const EditableCell = memo(({ value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value || '')

  useEffect(() => {
    setEditValue(value || '')
  }, [value])

  const handleSave = () => {
    onSave(editValue)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditValue(value || '')
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <Input
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        autoFocus
        className="text-sm"
      />
    )
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-gray-light/20 rounded px-2 py-1 min-h-[2rem] flex items-center text-sm text-gray-dark"
    >
      {value || <span className="text-gray-medium italic">Click to edit</span>}
    </div>
  )
})
EditableCell.displayName = 'EditableCell'

// Customer Info Component
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
        Order Review • {customerInfo.phone}
      </div>
    </div>
  </div>
))
CustomerInfo.displayName = 'CustomerInfo'

// Table Row Component
const TableRow = memo(({ row, onCellEdit, onDeleteRow }) => {
  return (
    <tr className="border-b border-gray-medium/20 hover:bg-gray-light/10 transition-colors">
      <td className="px-4 py-3">
        <EditableCell
          value={row.material_name}
          onSave={(newValue) => onCellEdit(row.id, 'material_name', newValue)}
        />
      </td>
      <td className="px-4 py-3">
        <EditableCell
          value={row.sub_type}
          onSave={(newValue) => onCellEdit(row.id, 'sub_type', newValue)}
        />
      </td>
      <td className="px-4 py-3">
        <EditableCell
          value={row.dimensions}
          onSave={(newValue) => onCellEdit(row.id, 'dimensions', newValue)}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onCellEdit(
                row.id,
                'quantity',
                Math.max(1, (row.quantity || 1) - 1)
              )
            }
            disabled={row.quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={row.quantity || 1}
            onChange={(e) =>
              onCellEdit(row.id, 'quantity', parseInt(e.target.value) || 1)
            }
            className="h-8 w-16 text-center text-sm"
            min="1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onCellEdit(row.id, 'quantity', (row.quantity || 1) + 1)
            }
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteRow(row.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
})
TableRow.displayName = 'TableRow'

// Item Card Component for Mobile
const ItemCard = memo(({ item, onEdit, onDelete }) => (
  <Card className="p-4 hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-medium text-gray-dark font-heading">
          {item.material_name || (
            <span className="text-gray-medium italic">Unnamed item</span>
          )}
        </h3>
        {item.sub_type && (
          <p className="text-sm text-gray-medium mt-1 font-body">
            {item.sub_type}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(item)}
          className="h-8 w-8 p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(item.id)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <div>
        <span className="text-gray-medium font-body">Size/Unit:</span>
        <p className="font-medium mt-1 text-gray-dark font-body">
          {item.dimensions || (
            <span className="text-gray-medium italic">Not specified</span>
          )}
        </p>
      </div>
      <div className="text-right">
        <span className="text-gray-medium font-body">Quantity:</span>
        <p className="font-medium mt-1 text-gray-dark font-body">
          {item.quantity || 1}
        </p>
      </div>
    </div>
  </Card>
))
ItemCard.displayName = 'ItemCard'

// Main Component Content
const ReviewOrderContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isMobile, setIsMobile] = useState(false)
  const uuid = searchParams.get('uuid')

  // State management
  const [orderData, setOrderData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: searchParams.get('name') || 'Construction Team',
    phone: searchParams.get('phone') || '+91 98765 43210',
    site: searchParams.get('site') || 'Construction Project',
    address: searchParams.get('address') || 'Project Site Address',
    whatsappName: searchParams.get('name') || 'Construction Team',
    whatsappPhone: searchParams.get('phone') || '+91 98765 43210',
  })

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Data loading with proper API call
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
        }
      } catch (error) {
        console.error('Error loading order data:', error)
        // Set some default data for demo purposes
        setOrderData([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [uuid])

  // Event handlers
  const handleCellEdit = useCallback((rowId, field, value) => {
    setOrderData((currentData) =>
      currentData.map((item) =>
        item.id === rowId ? { ...item, [field]: value } : item
      )
    )
  }, [])

  const handleDeleteRow = useCallback((rowId) => {
    setOrderData((currentData) =>
      currentData.filter((item) => item.id !== rowId)
    )
  }, [])

  const handleAddRow = useCallback(() => {
    const newId = Date.now()
    const newRow = {
      id: newId,
      material_name: '',
      sub_type: '',
      dimensions: '',
      quantity: 1,
      unit_price: 0,
    }
    setOrderData((currentData) => [...currentData, newRow])
  }, [])

  const handleSubmit = useCallback(async () => {
    const invalidItems = orderData.filter(
      (item) =>
        !item.material_name?.trim() || !item.quantity || item.quantity <= 0
    )

    if (invalidItems.length > 0) {
      alert('Please fill in all required fields (Item name and valid quantity)')
      return
    }

    setIsSubmitting(true)
    try {
      // Navigate to vendor selection
      const queryParams = new URLSearchParams({
        uuid: uuid || '',
        name: customerInfo.name,
        phone: customerInfo.phone,
        site: customerInfo.site,
      })

      router.push(`/orders/select-vendors?${queryParams.toString()}`)
    } catch (error) {
      console.error('Navigation failed:', error)
      alert(`Navigation failed: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }, [orderData, customerInfo, router, uuid])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-medium border-t-gray-dark rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-medium font-body">Loading your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6">
        {/* Order Summary */}
        <Card className="p-6 mb-6">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-dark font-heading">
                  Order Review
                </h2>
                <p className="text-sm text-gray-medium font-body">
                  {orderData.length} {orderData.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-dark font-heading">
                    {customerInfo.name}
                  </h3>
                  <p className="text-sm text-gray-medium font-body">
                    Order Review • {customerInfo.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-dark font-heading">
              Order Items
            </h2>
            <Button onClick={handleAddRow} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          {/* Desktop Table */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-medium/20">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-dark font-heading">
                      Material Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-dark font-heading">
                      Sub Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-dark font-heading">
                      Dimensions
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-dark font-heading">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-dark font-heading">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((row) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      onCellEdit={handleCellEdit}
                      onDeleteRow={handleDeleteRow}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile Cards */}
          {isMobile && (
            <div className="space-y-4">
              {orderData.length === 0 ? (
                <div className="text-center py-8 text-gray-medium">
                  <p className="font-body">No items added yet.</p>
                  <p className="text-sm mt-1 font-body">
                    Tap &quot;Add Item&quot; to get started.
                  </p>
                </div>
              ) : (
                orderData.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onEdit={() => {}}
                    onDelete={handleDeleteRow}
                  />
                ))
              )}
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 -mx-4 px-4 border-t border-gray-medium/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Back to WhatsApp
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || orderData.length === 0}
            className="flex-1 h-12 font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Processing...
              </>
            ) : (
              'Select Vendor'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Loading component
const ReviewOrderLoading = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-medium">Loading order...</p>
    </div>
  </div>
)

// Main export with Suspense boundary
const ReviewOrder = () => {
  return (
    <Suspense fallback={<ReviewOrderLoading />}>
      <ReviewOrderContent />
    </Suspense>
  )
}

export default memo(ReviewOrder)
