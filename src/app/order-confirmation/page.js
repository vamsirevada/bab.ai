'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Clock,
  CheckCircle2,
  CreditCard,
  FileText,
  ShieldCheck,
} from 'lucide-react'
import { Card, LoadingPage } from '@/components/ui'

function OrderConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [vendor, setVendor] = useState(null)
  const [animationPhase, setAnimationPhase] = useState(0) // 0: show "1", 1: morphing, 2: show tick
  const [orderId] = useState(() =>
    Math.random().toString(36).substr(2, 6).toUpperCase()
  )

  // Animation cycle for step 1 completion indicator
  useEffect(() => {
    const cycle = () => {
      // Show "1" for 2 seconds
      setTimeout(() => setAnimationPhase(1), 2000) // Start morphing
      setTimeout(() => setAnimationPhase(2), 2500) // Show tick
      setTimeout(() => setAnimationPhase(0), 4500) // Back to "1"
    }

    cycle()
    const interval = setInterval(cycle, 5000) // Repeat every 5 seconds

    return () => clearInterval(interval)
  }, [])

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

  const nextSteps = vendor
    ? [
        {
          stage: 1,
          title: 'Express Purchase Intent with Credit',
          icon: CreditCard,
          description:
            'Choose your vendor and tell Bab.ai you want to purchase from them using your available credit.',
          whatHappens: 'Vendor has been notified via WhatsApp.',
          status: 'completed',
          time: 'Instant',
        },
        {
          stage: 2,
          title: 'Vendor Interested & Uploads Invoice',
          icon: FileText,
          description:
            'If the vendor is interested — whether through Bab.ai or from your prior offline discussions — they confirm and upload the official invoice.',
          whatHappens:
            ' Bab.ai stores the invoice securely and prepares the payment channel.',
          status: 'current',
          time: '2-4 hours',
        },
        {
          stage: 3,
          title: 'You Approve & Proceed to Payment',
          icon: ShieldCheck,
          description:
            'You review the invoice, confirm it officially, and proceed with payment via Bab.ai’s secure credit flow.',
          whatHappens:
            'You’ll instantly receive an official payment button on WhatsApp, where you can choose your EMI plan and credit options. Bab.ai then pays the vendor and delivery arrangements are executed.',
          status: 'upcoming',
          time: '24 hours',
        },
      ]
    : []

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
    <>
      <style jsx>{`
        @keyframes drawTick {
          0% {
            stroke-dashoffset: 20;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .draw-tick {
          animation: drawTick 0.8s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen py-4 sm:py-6">
        <div className="max-w-xl mx-auto px-4">
          {/* Compact Content */}
          <Card className="p-3 sm:p-4">
            {/* Success Receipt Card - Compact */}
            <Card className="overflow-hidden mb-6 min-h-[33vh]">
              {/* Compact Header */}
              <div className="text-center py-3 px-4 bg-gray-25 border-b border-gray-100">
                <div className="text-sm text-gray-600 font-medium">
                  Order confirmed with{' '}
                  <span className="font-bold text-gray-800">
                    &apos;{vendor.name}&apos;
                  </span>
                </div>
              </div>

              {/* Compact Success Section */}
              <div className="bg-gradient-to-b from-green-25 to-green-50 py-8 px-4 text-center relative overflow-hidden flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-center gap-3 mb-3 relative">
                  {/* Custom Success Icon with animations */}
                  <div className="relative">
                    {/* Ripple effects - larger to match video */}
                    <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full animate-ping opacity-25"></div>
                    <div
                      className="absolute inset-0 w-20 h-20 bg-green-300 rounded-full animate-ping opacity-15"
                      style={{
                        animationDelay: '0.3s',
                      }}
                    ></div>

                    {/* Main success video - much larger */}
                    <div className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden shadow-xl shadow-green-300">
                      <video
                        className="w-20 h-20 object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source
                          src="/assets/videos/success.mp4"
                          type="video/mp4"
                        />
                        <source
                          src="/assets/videos/success.webm"
                          type="video/webm"
                        />
                        {/* Fallback SVG for browsers that don't support video */}
                        <svg
                          className="w-14 h-14 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </video>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-green-800">
                    Order Confirmed!
                  </h2>
                  <p className="text-sm text-green-700">
                    Your purchase intent has been successfully submitted
                  </p>
                </div>
              </div>

              {/* Compact Details */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Order #{orderId}</span>
                  <button
                    onClick={handleGoBack}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Change Vendor
                  </button>
                </div>
              </div>
            </Card>

            {/* Enhanced Next Steps Section */}
            <div className="mb-6">
              <div className="p-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  What happens next?
                </h2>
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
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs transition-all duration-500 ${
                          step.status === 'completed'
                            ? 'bg-green-100 border border-green-400 text-green-600'
                            : isCurrent
                            ? 'bg-blue-100 border border-blue-400 text-blue-600'
                            : 'bg-gray-100 border border-gray-300 text-gray-500'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <div className="relative w-4 h-4 flex items-center justify-center">
                            {/* Number "1" */}
                            <span
                              className={`absolute font-bold transition-all duration-500 ${
                                animationPhase === 0
                                  ? 'opacity-100 scale-100 rotate-0'
                                  : animationPhase === 1
                                  ? 'opacity-50 scale-75 rotate-45'
                                  : 'opacity-0 scale-50 rotate-90'
                              }`}
                            >
                              1
                            </span>

                            {/* Hand-drawn style tick mark */}
                            <svg
                              className={`absolute w-4 h-4 transition-all duration-500 ${
                                animationPhase === 0
                                  ? 'opacity-0 scale-50 rotate-45'
                                  : animationPhase === 1
                                  ? 'opacity-50 scale-75 rotate-0'
                                  : 'opacity-100 scale-100 rotate-0'
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            >
                              <path
                                d="M6 12l3 3L18 9"
                                className={
                                  animationPhase === 2 ? 'draw-tick' : ''
                                }
                                style={{
                                  strokeDasharray: '15',
                                  strokeDashoffset:
                                    animationPhase === 2 ? '0' : '15',
                                  transition: 'stroke-dashoffset 0.8s ease-out',
                                }}
                              />
                            </svg>
                          </div>
                        ) : (
                          step.stage
                        )}
                      </div>
                      {index < nextSteps.length - 1 && (
                        <div className="w-0.5 h-18 bg-gray-200 mt-1.5" />
                      )}
                    </div>

                    {/* Compact step content */}
                    <div className="flex-1 min-w-0">
                      {/* Line 1: Title with Icon */}
                      <h3 className="text-sm font-medium text-gray-900 leading-tight mb-1 flex items-center gap-2">
                        <span>{step.title}</span>
                        <step.icon className="w-4 h-4 text-gray-500" />
                      </h3>

                      {/* Line 2: Description */}
                      <p className="text-xs text-gray-600 leading-snug mb-1">
                        {step.description}
                      </p>

                      {/* Line 3: What Happens */}
                      <p className="text-[10px] leading-snug mb-1.5">
                        <span className="font-medium text-blue-700">
                          {step.whatHappens}
                        </span>
                      </p>

                      {/* Line 4: Time & Status Badges - Right Aligned */}
                      {step.status !== 'completed' && (
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
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Payment Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-2.5 h-2.5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-0.5">
                    Payment Information
                  </h4>
                  <p className="text-xs text-blue-700 leading-snug">
                    A secure payment link will be sent to your registered
                    WhatsApp number. Complete the payment to confirm your order.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Compact Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Need help?{' '}
              <a
                href="mailto:team@bab.ai"
                className="text-blue-600 hover:underline"
              >
                team@bab.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<LoadingPage text="Loading order confirmation..." />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
