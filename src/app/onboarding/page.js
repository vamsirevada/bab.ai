import Link from 'next/link'
import { ShoppingCart, CreditCard, LayoutDashboard } from 'lucide-react'

export default function OnboardingPage() {
  return (
    <main className="relative z-10">
      <section className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Floating Dashboard button */}
        <div className="absolute right-4 sm:right-6 top-4 sm:top-6 z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-4 py-2 text-sm font-medium text-brand-dark shadow-md hover:bg-white hover:shadow-lg transition"
            aria-label="Go to Dashboard"
          >
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-3">
            Welcome to bab.ai
          </h1>
          <p className="text-gray-600">
            Choose how you want to get started — procure items or check your credit eligibility.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Procure Card */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-dark text-white flex items-center justify-center">
                <ShoppingCart size={22} />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-brand-dark">
                Procure Items
              </h2>
            </div>
            <p className="mt-4 text-gray-600">
              Compare vendors, request quotes, and place orders seamlessly through our guided flow.
            </p>
            <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Select vendors and request quotes</li>
              <li>Review responses and negotiate</li>
              <li>Place the order securely</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/orders/review-order"
                className="inline-flex items-center justify-center rounded-lg bg-brand-dark text-white px-5 py-2.5 font-medium hover:opacity-90 transition"
              >
                Start Procurement
              </Link>
            </div>
          </div>

          {/* Credit Check Card */}
          <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <CreditCard size={22} />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-brand-dark">
                Check Credit Eligibility
              </h2>
            </div>
            <p className="mt-4 text-gray-600">
              Quickly evaluate your credit eligibility and estimated limit to finance your procurement.
            </p>
            <ul className="mt-4 text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Instant eligibility result</li>
              <li>Indicative limit and APR</li>
              <li>No hard credit pull</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/onboarding/credit"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white px-5 py-2.5 font-medium hover:bg-emerald-700 transition"
              >
                Check Credit
              </Link>
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}
