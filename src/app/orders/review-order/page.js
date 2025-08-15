'use client'
import React, {
  useState,
  useCallback,
  memo,
  useEffect,
  Suspense,
  useRef,
} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Edit2, Trash2, Plus, Minus, X } from 'lucide-react'

// CSS Animations for Modal
const modalStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-20px) rotateX(10deg);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0) rotateX(0deg);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-modalSlideIn {
    animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    transform-style: preserve-3d;
    perspective: 1000px;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = modalStyles
  if (!document.head.querySelector('style[data-modal-styles]')) {
    styleElement.setAttribute('data-modal-styles', 'true')
    document.head.appendChild(styleElement)
  }
}

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
        {customerInfo.phone}
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

// Item Card Component for Mobile - Compact Design
const ItemCard = memo(({ item, onEdit, onDelete }) => (
  <Card className="p-3 hover:shadow-md transition-all duration-200 border-l-4 border-l-gray-dark">
    <div className="flex items-center justify-between">
      {/* Left Content - Material Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-dark font-heading text-sm truncate">
            {item.material_name || (
              <span className="text-gray-medium italic">Unnamed item</span>
            )}
          </h3>
          {item.sub_type && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-body">
              {item.sub_type}
            </span>
          )}
        </div>

        {/* Compact Info Row */}
        <div className="flex items-center gap-4 text-xs text-gray-medium font-body">
          <div className="flex items-center gap-1">
            <span className="font-medium">Size:</span>
            <span className="text-gray-dark">
              {item.dimensions || 'Not set'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Qty:</span>
            <span className="text-gray-dark font-semibold">
              {item.quantity || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Right Actions - Compact Buttons */}
      <div className="flex gap-1 ml-2">
        <button
          onClick={() => onEdit(item)}
          className="w-7 h-7 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-dark rounded-md flex items-center justify-center transition-all duration-200"
        >
          <Edit2 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="w-7 h-7 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-md flex items-center justify-center transition-all duration-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </Card>
))
ItemCard.displayName = 'ItemCard'

// Edit Item Form Component
const EditItemForm = memo(({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    material_name: item.material_name || '',
    sub_type: item.sub_type || '',
    dimensions: item.dimensions || '',
    quantity: item.quantity || 1,
  })

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'quantity' ? Math.max(1, parseInt(value) || 1) : value,
    }))
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!formData.material_name.trim()) {
        alert('Material name is required')
        return
      }
      onSave({
        ...item,
        ...formData,
      })
    },
    [formData, item, onSave]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-dark mb-1.5 font-body">
          Material Name *
        </label>
        <input
          type="text"
          value={formData.material_name}
          onChange={(e) => handleInputChange('material_name', e.target.value)}
          className="w-full px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-medium/40 rounded-lg focus:ring-1 focus:ring-gray-dark/20 focus:border-gray-dark transition-all duration-200 font-body placeholder-gray-medium/70 shadow-sm text-sm"
          placeholder="Enter material name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-dark mb-1.5 font-body">
          Sub Type
        </label>
        <input
          type="text"
          value={formData.sub_type}
          onChange={(e) => handleInputChange('sub_type', e.target.value)}
          className="w-full px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-medium/40 rounded-lg focus:ring-1 focus:ring-gray-dark/20 focus:border-gray-dark transition-all duration-200 font-body placeholder-gray-medium/70 shadow-sm text-sm"
          placeholder="Enter sub type"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-dark mb-1.5 font-body">
          Dimensions
        </label>
        <input
          type="text"
          value={formData.dimensions}
          onChange={(e) => handleInputChange('dimensions', e.target.value)}
          className="w-full px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-medium/40 rounded-lg focus:ring-1 focus:ring-gray-dark/20 focus:border-gray-dark transition-all duration-200 font-body placeholder-gray-medium/70 shadow-sm text-sm"
          placeholder="Enter dimensions"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-dark mb-1.5 font-body">
          Quantity *
        </label>
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => handleInputChange('quantity', e.target.value)}
          className="w-full px-3 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-medium/40 rounded-lg focus:ring-1 focus:ring-gray-dark/20 focus:border-gray-dark transition-all duration-200 font-body placeholder-gray-medium/70 shadow-sm text-sm"
          placeholder="Enter quantity"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-10 rounded-lg bg-white/80 backdrop-blur-sm border-gray-medium/40 hover:bg-white/90 text-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 h-10 rounded-lg bg-gray-dark hover:bg-gray-800 shadow-lg text-sm"
        >
          Save
        </Button>
      </div>
    </form>
  )
})
EditItemForm.displayName = 'EditItemForm'

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
    phone: searchParams.get('phone') || '+91 99663 30468',
    site: searchParams.get('site') || 'Construction Project',
    address: searchParams.get('address') || 'Project Site Address',
    whatsappName: searchParams.get('name') || 'Construction Team',
    whatsappPhone: searchParams.get('phone') || '+91 99663 30468',
  })

  // Snapshot of original items to detect changes on submit
  const originalSnapshotRef = useRef(new Map()) // id -> { material_name, sub_type, dimensions, quantity }
  const originalIdsRef = useRef(new Set()) // only server-backed ids

  const isUuid = useCallback(
    (v) => typeof v === 'string' && /^[0-9a-fA-F-]{36}$/.test(v),
    []
  )
  const normalize = (v) => (v == null ? '' : String(v).trim())

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
        const response = await fetch(`/api/orders/${uuid}`)

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

          // Build original snapshot for change detection
          const snap = new Map()
          const idSet = new Set()
          for (const it of orderItems) {
            if (isUuid(it.id)) idSet.add(it.id)
            snap.set(it.id, {
              material_name: normalize(it.material_name),
              sub_type: normalize(it.sub_type),
              dimensions: normalize(it.dimensions),
              quantity: Number(it.quantity) || 1,
            })
          }
          originalSnapshotRef.current = snap
          originalIdsRef.current = idSet
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
  }, [uuid, isUuid])

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

  // Edit functionality for mobile
  const handleEditItem = useCallback((item) => {
    setEditingItem(item)
    setEditModalOpen(true)
  }, [])

  const handleSaveEdit = useCallback((updatedItem) => {
    setOrderData((currentData) =>
      currentData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    )
    setEditModalOpen(false)
    setEditingItem(null)
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
      // 1) Persist only changed server-backed items via update-order API
      if (orderData.length > 0) {
        const snap = originalSnapshotRef.current
        const serverIds = originalIdsRef.current
        const changed = orderData.filter((item) => {
          if (!serverIds.has(item.id)) return false // skip new/temporary rows
          const prev = snap.get(item.id)
          if (!prev) return false
          return (
            normalize(item.material_name) !== prev.material_name ||
            normalize(item.sub_type) !== prev.sub_type ||
            normalize(item.dimensions) !== prev.dimensions ||
            (Number(item.quantity) || 1) !== prev.quantity
          )
        })

        if (changed.length) {
          const updateResults = await Promise.all(
            changed.map(async (item) => {
              try {
                const res = await fetch(`/api/orders/${item.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    material_name: item.material_name || '',
                    sub_type: item.sub_type || '',
                    dimensions: item.dimensions || '',
                    quantity: Math.max(1, Number(item.quantity) || 1),
                  }),
                })
                let data = null
                try {
                  data = await res.json()
                } catch {}
                return { id: item.id, ok: res.ok, status: res.status, data }
              } catch (err) {
                return { id: item?.id, ok: false, error: err?.message }
              }
            })
          )

          const failures = updateResults.filter((r) => !r.ok)
          if (failures.length) {
            console.warn('Some items failed to update:', failures)
          }

          // Update snapshot for changed items to prevent repeat updates next submit
          for (const it of changed) {
            originalSnapshotRef.current.set(it.id, {
              material_name: normalize(it.material_name),
              sub_type: normalize(it.sub_type),
              dimensions: normalize(it.dimensions),
              quantity: Math.max(1, Number(it.quantity) || 1),
            })
          }
        }
      }

      // 2) Store customer data and current order items in localStorage
      const customerData = {
        name: customerInfo.name,
        phone: customerInfo.phone,
        site: customerInfo.site,
        address: customerInfo.address,
      }

      localStorage.setItem('customerInfo', JSON.stringify(customerData))

      // Prepare items payload for submission later
      const itemsPayload = orderData.map((it) => ({
        material_name: it.material_name || '',
        sub_type: it.sub_type || '',
        dimensions: it.dimensions || '',
        quantity: Math.max(1, Number(it.quantity) || 1),
      }))
      localStorage.setItem('orderItems', JSON.stringify(itemsPayload))

      // 3) Navigate to vendor selection with only UUID
      const queryParams = new URLSearchParams({
        uuid: uuid || '',
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
    <div className="min-h-screen relative">
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
                    {customerInfo.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-6 mb-6 paper">
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
            <div className="space-y-2">
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
                    onEdit={handleEditItem}
                    onDelete={handleDeleteRow}
                  />
                ))
              )}
            </div>
          )}
        </Card>

        {/* Edit Modal for Mobile */}
        {editModalOpen && editingItem && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-3 z-50 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-md rounded-xl w-full max-w-sm shadow-2xl border border-white/20 transform animate-modalSlideIn relative">
              {/* Enhanced Close Button */}
              <div className="absolute top-3 right-3 z-20">
                <button
                  onClick={() => {
                    setEditModalOpen(false)
                    setEditingItem(null)
                  }}
                  className="w-8 h-8 bg-gray-dark hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 pt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-dark font-heading">
                    Edit Item
                  </h3>
                </div>

                <EditItemForm
                  item={editingItem}
                  onSave={handleSaveEdit}
                  onCancel={() => {
                    setEditModalOpen(false)
                    setEditingItem(null)
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white py-4 -mx-4 px-4 border-t border-gray-medium/20 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            <WhatsAppIcon className="w-4 h-4 mr-2" />
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
  <div className="min-h-screen relative flex items-center justify-center">
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
