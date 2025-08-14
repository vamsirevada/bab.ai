'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {  Clock, CheckCircle2, CreditCard, FileText, ShieldCheck } from 'lucide-react'

function OrderConfirmationContent() {
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
      title: "Express Purchase Intent with Credit",
      icon: CreditCard,
      description: "Choose your vendor and tell Bab.ai you want to purchase from them using your available credit.",
      whatHappens: "We notify the vendor instantly via WhatsApp.",
      status: "current",
      time: "Instant"
    },
    {
      stage: 2,
      title: "Vendor Interested & Uploads Invoice",
      icon: FileText,
      description: "If the vendor is interested — whether through Bab.ai or from your prior offline discussions — they confirm and upload the official invoice.",
      whatHappens: " Bab.ai stores the invoice securely and prepares the payment channel.",
      status: "upcoming",
      time: "2-4 hours"
    },
    {
      stage: 3,
      title: "You Approve & Proceed to Payment",
      icon: ShieldCheck,
      description: "You review the invoice, confirm it officially, and proceed with payment via Bab.ai’s secure credit flow.",
      whatHappens: "You’ll instantly receive an official payment button on WhatsApp, where you can choose your EMI plan and credit options. Bab.ai then pays the vendor and delivery arrangements are executed.",
      status: "upcoming",
      time: "24 hours"
    }
  ] : []

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
    <div className="min-h-screen py-4 sm:py-6">
      <div className="max-w-xl mx-auto px-4">
        {/* Compact Content */}
        <div className="rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4">
          {/* Success Receipt Card - Compact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Compact Header */}
            <div className="text-center py-2 px-4 bg-gray-25 border-b border-gray-100">
              <div className="text-xs text-gray-500">Order Confirmed</div>
            </div>

            {/* Compact Success Section */}
            <div className="bg-gradient-to-b from-green-25 to-green-50 py-4 px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">{vendor.priceEstimate}</span>
              </div>
              <p className="text-xs text-gray-600">Estimated • {vendor.name}</p>
            </div>

            {/* Compact Details */}
            <div className="px-4 py-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Order #{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                <button
                  onClick={handleGoBack}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Change Vendor
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Next Steps Section */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-100">
              <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                What happens next?
              </h2>
              <p className="text-sm text-blue-700 font-medium">
                Follow these steps to complete your order
              </p>
            </div>
          </div>

          {/* Compact Steps */}
          <div className="space-y-3 mb-4">
            {nextSteps.map((step, index) => {
              const isCurrent = step.status === 'current'
              const isUpcoming = step.status === 'upcoming'

              return (
                <div key={step.stage} className="flex gap-2.5">
                  {/* Smaller step indicator */}
                  <div className="flex flex-col items-center">

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs ${
                        isCurrent
                          ? 'bg-blue-100 border border-blue-400 text-blue-600'
                          : 'bg-gray-100 border border-gray-300 text-gray-500'
                      }`}
                    >
                      <step.icon className="w-4 h-4 text-gray-500" />
                    </div>
                    {index < nextSteps.length - 1 && (
                      <div className="w-0.5 h-18 bg-gray-200 mt-1.5" />
                    )}
                  </div>

                  {/* Compact step content */}
                  <div className="flex-1 min-w-0">
                    {/* Line 1: Title with Icon */}
                    <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1">
                      {step.title}
                    </h3>

                    {/* Line 2: Description */}
                    <p className="text-xs text-gray-600 leading-snug mb-1">
                      {step.description}
                    </p>

                    {/* Line 3: What Happens */}
                    <p className="text-[10px] text-gray-600 leading-snug mb-1.5">
                      <span className="font-medium text-blue-700">What happens now:</span> {step.whatHappens}
                    </p>

                    {/* Line 4: Time & Status Badges - Right Aligned */}
                    <div className="flex items-center justify-end gap-2">
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-[9px] font-medium">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {step.time}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[9px] font-medium">
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-2.5 h-2.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-0.5">Payment Information</h4>
                <p className="text-xs text-blue-700 leading-snug">
                  A secure payment link will be sent to your registered WhatsApp number. Complete the payment to confirm your order.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Footer */}
        <div className="mt-4 text-center">
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

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
        <p className="text-gray-600 text-sm">Loading order confirmation...</p>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
