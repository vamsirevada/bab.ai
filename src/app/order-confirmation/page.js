'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [vendor, setVendor] = useState(null)

  useEffect(() => {
    // Get vendor data from URL params or localStorage
    const vendorData = searchParams.get('vendor')
    if (vendorData) {
      try {
        setVendor(JSON.parse(decodeURIComponent(vendorData)))
      } catch (error) {
        console.error('Error parsing vendor data:', error)
        router.push('/onboarding')
      }
    } else {
      router.push('/onboarding')
    }
  }, [searchParams, router])

  const nextSteps = vendor ? [
    {
      stage: 1,
      title: "Order Processing",
      description: "Your order is being prepared and validated",
      status: "current",
      time: "15 min"
    },
    {
      stage: 2,
      title: "Vendor Confirmation",
      description: `${vendor.name} confirms availability and pricing`,
      status: "upcoming",
      time: "2 hours"
    },
    {
      stage: 3,
      title: "Order Fulfillment",
      description: "Materials delivered to site",
      status: "upcoming",
      time: "As scheduled"
    }
  ] : []

  const handleContinue = () => {
    router.push('/orders/place-order')
  }

  const handleGoBack = () => {
    router.push('/onboarding')
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-xl mx-auto px-4">
        {/* Compact Content */}
        <div className="rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
          <div className="bg-gray-50 rounded-lg p-4 mb-5">
            <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Selected Vendor
            </h3>
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-gray-900 text-sm">{vendor.name}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                  <span>{vendor.onTime}% on-time</span>
                  <span>•</span>
                  <span>{vendor.pastTxns} orders</span>
                  <span>•</span>
                  <span>{vendor.delivery}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-semibold text-gray-900">{vendor.priceEstimate}</p>
                <p className="text-xs text-gray-600">Estimated</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-right">
              <button
                onClick={handleGoBack}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                Change Vendor
              </button>
            </div>
          </div>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              What happens next?
            </h2>
            <p className="text-sm text-gray-600">
              Step-by-step process for your order
            </p>
          </div>

          {/* Compact Steps */}
          <div className="space-y-4 mb-6">
            {nextSteps.map((step, index) => {
              const isCurrent = step.status === 'current'
              const isUpcoming = step.status === 'upcoming'

              return (
                <div key={step.stage} className="flex gap-3">
                  {/* Smaller step indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                        isCurrent
                          ? 'bg-blue-100 border border-blue-400 text-blue-600'
                          : 'bg-gray-100 border border-gray-300 text-gray-500'
                      }`}
                    >
                      {step.stage}
                    </div>
                    {index < nextSteps.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                    )}
                  </div>

                  {/* Compact step content */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Time Row */}
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                      <span className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-3 h-3" />
                        {step.time}
                      </span>
                    </div>

                    {/* Description and Status Row */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-gray-600 leading-relaxed flex-1">{step.description}</p>
                      {isCurrent && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-normal flex-shrink-0">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Payment Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">Payment Information</h4>
                <p className="text-xs text-blue-700">
                  A secure payment link will be sent to your registered WhatsApp number. Complete the payment to confirm your order.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Need help?{' '}
            <a href="mailto:team@bab.ai" className="text-blue-600 hover:underline">
              team@bab.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
