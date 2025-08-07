// src/pages/ReviewOrder.jsx

import React, { useState, useCallback, memo, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { EditModal } from '../components/ui/edit-modal'
import { useIsMobile } from '../hooks/use-media-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiCall } from '../utils/api'
import { Edit2, Trash2, Plus, Minus } from 'lucide-react'
import EditableCell from '../components/EditableCell' // <-- Import the new component

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
        Order Review
      </p>
    </div>
  </div>
))

// Simplified TableRow component using EditableCell
const TableRow = memo(({ row, onCellEdit, onDeleteRow }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="bg-white px-4 py-2 border-b border-gray-200">
        <EditableCell
          value={row.material_name}
          onSave={(newValue) => onCellEdit(row.id, 'material_name', newValue)}
        />
      </td>
      <td className="bg-white px-4 py-2 border-b border-gray-200">
        <EditableCell
          value={row.sub_type}
          onSave={(newValue) => onCellEdit(row.id, 'sub_type', newValue)}
        />
      </td>
      <td className="bg-white px-4 py-2 border-b border-gray-200">
        <EditableCell
          value={row.dimensions}
          onSave={(newValue) => onCellEdit(row.id, 'dimensions', newValue)}
        />
      </td>
      <td className="bg-white px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-1">
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
      <td className="px-4 py-2 border-b border-gray-200 text-center">
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

// Simplified ItemCard component for mobile
const ItemCard = memo(({ item, onEdit, onDelete }) => (
  <Card className="p-4 mb-4 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">
          {item.material_name || (
            <span className="text-gray-400 italic">Unnamed item</span>
          )}
        </h3>
        {item.sub_type && (
          <p className="text-sm text-gray-600 mt-1">{item.sub_type}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(item)}
          className="h-9 w-9 p-0"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(item.id)}
          className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div className="flex justify-between text-sm">
      <div>
        <span className="text-gray-500">Size/Unit:</span>
        <p className="font-medium mt-1">
          {item.dimensions || (
            <span className="text-gray-400 italic">Not specified</span>
          )}
        </p>
      </div>
      <div className="text-right">
        <span className="text-gray-500">Quantity:</span>
        <p className="font-medium mt-1">{item.quantity || 1}</p>
      </div>
    </div>
  </Card>
))

// Main component
const ReviewOrder = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const uuid = searchParams.get('uuid')

  // Decoupled state
  const [orderData, setOrderData] = useState([])
  const [userProjects, setUserProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: searchParams.get('name') || 'Rajesh Kumar',
    phone: searchParams.get('phone') || '+91 98765 43210',
    site: searchParams.get('site') || 'Residential Construction - Phase 2',
    address:
      searchParams.get('address') ||
      '123 Construction Site, Bangalore, Karnataka 560001',
    whatsappName: searchParams.get('name') || 'Rajesh Kumar',
    whatsappPhone: searchParams.get('phone') || '+91 98765 43210',
  })

  // Data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const promises = [apiCall('projects')]
        if (uuid) {
          promises.push(apiCall(`review-order/${uuid}`))
        }

        const [projectsData, reviewOrderData] = await Promise.all(promises)

        if (projectsData) {
          setUserProjects(Array.isArray(projectsData) ? projectsData : [])
        }

        if (uuid && reviewOrderData) {
          const items = Array.isArray(reviewOrderData)
            ? reviewOrderData
            : [reviewOrderData]
          const orderItems = items.map((item, index) => ({
            id: item.id || Date.now() + index,
            ...item,
          }))
          setOrderData(orderItems)
        }
      } catch (error) {
        console.error('Error loading data:', error)
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
    if (isMobile) {
      setEditingItem(newRow)
      setEditModalOpen(true)
    }
  }, [isMobile])

  const handleEditItem = useCallback((item) => {
    setEditingItem(item)
    setEditModalOpen(true)
  }, [])

  const handleSaveItem = useCallback(
    async (formData) => {
      setOrderData((currentData) =>
        currentData.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      )
      setEditModalOpen(false)
      setEditingItem(null)
    },
    [editingItem]
  )

  const handleSubmit = useCallback(async () => {
    const invalidItems = orderData.filter(
      (item) =>
        !item.material_name?.trim() || !item.quantity || item.quantity <= 0
    )
    if (invalidItems.length > 0) {
      alert('Please fill in all required fields (Item name and valid quantity)')
      return
    }
    if (!customerInfo.address.trim()) {
      alert('Please enter a delivery address.')
      return
    }

    setIsSubmitting(true)
    try {
      const projectId = crypto.randomUUID?.() || Date.now().toString()
      const orderDataPayload = {
        request_id: uuid,
        project_id: projectId,
        sender_id: customerInfo.whatsappPhone.replace(/\D/g, ''),
        status: 'DRAFT',
        delivery_location: customerInfo.address,
        notes: `Order placed via BAB.AI Dashboard for ${customerInfo.site}. Customer: ${customerInfo.whatsappName}`,
        expected_delivery_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        user_editable: true,
        items: orderData.map((item) => ({
          material_name: item.material_name,
          sub_type: item.sub_type || null,
          dimensions: item.dimensions || null,
          quantity: item.quantity || 1,
          quantity_units: 'units',
          unit_price: item.unit_price || null,
          status: 'DRAFT',
        })),
        customerInfo,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem('orderData', JSON.stringify(orderDataPayload))
      navigate(`/select-vendors?uuid=${uuid}`, {
        state: { orderData: orderDataPayload },
      })
    } catch (error) {
      console.error('Order submission failed:', error)
      alert(`Order submission failed: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }, [orderData, customerInfo, navigate, uuid])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-2 sm:px-4 lg:px-6 xl:px-8 py-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                </svg>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {customerInfo.name}
                </div>
                <div className="text-xs text-gray-500">
                  {customerInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-6">
        {/* Site Information */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Select Site/Project *
              </label>
              <select
                value={customerInfo.site}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, site: e.target.value })
                }
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
              >
                <option value="">Choose your project...</option>
                {userProjects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Delivery Address *
              </label>
              <Input
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    address: e.target.value,
                  })
                }
                placeholder="Enter delivery address"
                className="text-sm sm:text-base"
                required
              />
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-semibold">
                Order Items
              </h2>
              <Badge className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                {orderData.length} items
              </Badge>
            </div>
            <Button
              onClick={handleAddRow}
              className="bg-brand-charcoal hover:bg-brand-charcoal/90 text-brand-white h-9 sm:h-10 px-3 sm:px-4 font-body text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              Add Item
            </Button>
          </div>

          {/* Desktop Table */}
          {!isMobile && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Material Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Sub Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Dimensions
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
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
            <div className="space-y-3">
              {orderData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No items added yet.</p>
                  <p className="text-sm mt-1">Tap "Add" to get started.</p>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 border-t border-gray-200 sm:border-t-0 sm:bg-transparent sm:relative sm:py-0 sm:mx-0">
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
            className="flex-1 bg-brand-charcoal hover:bg-brand-charcoal/90 h-12 font-medium text-brand-white font-body"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                Listing Vendors...
              </>
            ) : (
              'Select Vendor'
            )}
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false)
          setEditingItem(null)
        }}
        item={editingItem}
        onSave={handleSaveItem}
        isLoading={isSubmitting}
      />
    </div>
  )
}

export default memo(ReviewOrder)
