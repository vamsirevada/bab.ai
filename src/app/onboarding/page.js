"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  LayoutDashboard,
  Info,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Star,
  Phone,
  MessageCircle,
} from 'lucide-react'

export default function OnboardingPage() {
  // Tabs (mobile)
  const [activeTab, setActiveTab] = useState('credit') // 'credit' | 'vendors'

  // Credit mock
  const credit = useMemo(
    () => ({
      total: 500000, // ₹
      used: 125000,
      get available() {
        return this.total - this.used
      },
      rate: '18% p.a.',
      tenure: '60 days',
      trustScore: 782,
      partner: { name: 'ABC Finance', regulated: true },
    }),
    []
  )

  const usedPct = Math.min(100, Math.round((credit.used / credit.total) * 100))

  // Vendors mock
  const vendors = useMemo(
    () => [
      {
        id: 1,
        name: 'BuildPro Materials',
        verified: true,
        onTime: 97,
        pastTxns: 8,
        phone: '919876543210',
        priceEstimate: '₹4.8L',
        delivery: '2–3 days',
      },
      {
        id: 2,
        name: 'ConstructCorp',
        verified: true,
        onTime: 95,
        pastTxns: 5,
        phone: '919812345678',
        priceEstimate: '₹5.1L',
        delivery: '3–4 days',
      },
      {
        id: 3,
        name: 'Steel & Stone Co.',
        verified: true,
        onTime: 92,
        pastTxns: 3,
        phone: '919811112222',
        priceEstimate: '₹4.9L',
        delivery: '2 days',
      },
      {
        id: 4,
        name: 'Metro Building Supply',
        verified: true,
        onTime: 94,
        pastTxns: 6,
        phone: '919800112233',
        priceEstimate: '₹5.0L',
        delivery: '2–3 days',
      },
    ],
    []
  )

  const [drawerVendor, setDrawerVendor] = useState(null)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [rechecking, setRechecking] = useState(false)

  const handleIncreaseLimit = () => {
    setRechecking(true)
    setTimeout(() => setRechecking(false), 1200)
  }

  const openWhatsApp = (vendor) => {
    const text = `Hi, I'd like to confirm a credit-based purchase via bab.ai. Vendor: ${vendor.name}. Please share final quote and delivery timeline.`
    const url = `https://wa.me/${vendor.phone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <main className="relative z-10">
      <section className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-dark mb-2">
            Credit & Vendor Selection
          </h1>
          <p className="text-gray-medium">
            Review your credit details and choose a vendor that supports purchases on credit.
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden mt-6">
          <div className="flex border border-gray-medium/20 rounded-lg p-1 bg-white shadow-sm">
            <button
              className={`flex-1 py-2.5 text-sm rounded-md transition ${
                activeTab === 'credit'
                  ? 'bg-gray-dark text-white'
                  : 'text-gray-dark hover:bg-gray-light/30'
              }`}
              onClick={() => setActiveTab('credit')}
            >
              Credit Information
            </button>
            <button
              className={`flex-1 py-2.5 text-sm rounded-md transition ${
                activeTab === 'vendors'
                  ? 'bg-gray-dark text-white'
                  : 'text-gray-dark hover:bg-gray-light/30'
              }`}
              onClick={() => setActiveTab('vendors')}
            >
              Vendor Selection
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'credit' ? (
              <CreditCard credit={credit} usedPct={usedPct} onIncrease={handleIncreaseLimit} rechecking={rechecking} />
            ) : (
              <VendorsCard vendors={vendors} onOpen={(v) => setDrawerVendor(v)} />
            )}
          </div>
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:grid grid-cols-2 gap-6 mt-8">
          <CreditCard credit={credit} usedPct={usedPct} onIncrease={handleIncreaseLimit} rechecking={rechecking} />
          <VendorsCard vendors={vendors} onOpen={(v) => setDrawerVendor(v)} />
        </div>

        {/* Slide-Over Drawer */}
        {drawerVendor && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setDrawerVendor(null)}
            />
            <div className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-xl border-l border-gray-medium/20">
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-dark">{drawerVendor.name}</h3>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-medium">
                      {drawerVendor.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-xs">
                          <ShieldCheck className="w-3.5 h-3.5" /> Bab.ai Verified
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-xs">
                        On-time {drawerVendor.onTime}%
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-xs">
                        Past Txns {drawerVendor.pastTxns}
                      </span>
                    </div>
                  </div>
                  <button
                    className="p-2 rounded-md hover:bg-gray-light/50 text-gray-medium"
                    onClick={() => setDrawerVendor(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-gray-medium/20 p-3">
                    <span className="text-gray-medium">Price estimate for your PO</span>
                    <span className="font-medium text-gray-dark">{drawerVendor.priceEstimate}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-medium/20 p-3">
                    <span className="text-gray-medium">Delivery timeline</span>
                    <span className="font-medium text-gray-dark">{drawerVendor.delivery}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${drawerVendor.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-medium/20 bg-white px-3 py-2 text-sm text-gray-dark hover:bg-gray-light/40"
                    >
                      <Phone className="w-4 h-4" /> Call
                    </a>
                    <button
                      onClick={() => openWhatsApp(drawerVendor)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-3 py-2 text-sm hover:opacity-90"
                    >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedVendor(drawerVendor)
                      setDrawerVendor(null)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gray-dark text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-medium"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Select Vendor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp confirmation bar */}
        {selectedVendor && (
          <div className="fixed bottom-4 inset-x-0 flex justify-center z-40">
            <div className="bg-white border border-gray-medium/20 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 max-w-lg w-[95%]">
              <div className="flex-1">
                <p className="text-sm text-gray-dark">
                  Confirm with <span className="font-medium">{selectedVendor.name}</span> on WhatsApp?
                </p>
                <p className="text-xs text-gray-medium line-clamp-2">
                  “Hi, I’d like to proceed with a credit-based order via bab.ai. Please share final quote and delivery timeline.”
                </p>
              </div>
              <button
                onClick={() => openWhatsApp(selectedVendor)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] text-white px-3 py-2 text-sm hover:opacity-90"
              >
                <MessageCircle className="w-4 h-4" /> Send
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

function CreditCard({ credit, usedPct, onIncrease, rechecking }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-medium/20 shadow-sm p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-dark">Credit Information</h2>
          <p className="text-sm text-gray-medium">Available limit and usage</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-medium">
          <div className="h-6 w-12 rounded-md bg-white border border-gray-medium/30 overflow-hidden flex items-center justify-center">
            <Image
              src="/assets/icons/NBFC_logo.jpg"
              alt={`${credit.partner.name} logo`}
              width={48}
              height={24}
              className="h-5 w-14 object-contain"
              priority
            />
          </div>
          <div>
            <p className="font-medium text-gray-dark leading-tight">{credit.partner.name}</p>
            <p className="leading-tight">{credit.partner.regulated ? 'Regulated by RBI' : ''}</p>
          </div>
        </div>
      </div>

      {/* Large Bar */}
      <div className="mt-4">
        <div className="h-3 w-full rounded-full bg-gray-light/40 border border-gray-medium/20 overflow-hidden">
          <div
            className="h-full bg-gray-dark rounded-full"
            style={{ width: `${usedPct}%` }}
            aria-label={`Used ${usedPct}%`}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-medium">Used {usedPct}%</span>
          <span className="text-gray-dark font-medium">Available ₹{(credit.available / 1000).toFixed(0)}k</span>
        </div>
      </div>

      {/* Trust Score */}
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="font-medium text-gray-dark">Bab.ai Trust Score: {credit.trustScore}</span>
        <div className="relative group">
          <Info className="w-4 h-4 text-gray-medium" />
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block rounded-md border border-gray-medium/20 bg-white p-2 text-xs text-gray-dark shadow">
            Based on payment history, business details, and order behavior.
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs sm:text-sm">
        <BreakdownItem label="Total Credit Limit" value={`₹${(credit.total / 1000).toFixed(0)}k`} />
        <BreakdownItem label="Used Credit" value={`₹${(credit.used / 1000).toFixed(0)}k`} />
        <BreakdownItem label="Available Credit" value={`₹${(credit.available / 1000).toFixed(0)}k`} />
        <BreakdownItem label="Rate / Tenure" value={`${credit.rate} • ${credit.tenure}`} />
      </div>

      <div className="mt-4">
        <button
          onClick={onIncrease}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-medium/20 px-3 py-2 text-sm text-gray-dark hover:bg-gray-light/40"
        >
          {rechecking ? 'Checking…' : 'Increase my limit'}
          {!rechecking && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

function BreakdownItem({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-medium/20 p-2.5 sm:p-3 bg-white">
      <p className="text-[11px] sm:text-xs text-gray-medium leading-tight">{label}</p>
      <p className="mt-0.5 sm:mt-1 font-medium text-gray-dark">{value}</p>
    </div>
  )
}

function VendorsCard({ vendors, onOpen }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-medium/20 shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-dark">Vendors supporting credit</h2>
          <p className="text-sm text-gray-medium">Choose a vendor to proceed</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {vendors.map((v) => (
          <button
            key={v.id}
            onClick={() => onOpen(v)}
            className="w-full text-left rounded-xl border border-gray-medium/20 hover:border-gray-medium/40 hover:bg-gray-light/30 transition p-3 sm:p-4"
          >
            <div className="flex items-start justify-between gap-2.5 sm:gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-medium text-gray-dark truncate flex-1 min-w-0">{v.name}</h3>
                  {v.verified && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-[10px]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Bab.ai Verified
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-medium">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20">
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-500 fill-current" /> On-time {v.onTime}%
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20">
                    Past transactions {v.pastTxns}
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20">
                    Price est. {v.priceEstimate}
                  </span>
                </div>
                {/* Delivery on a new line for mobile to keep title row clean */}
                <div className="mt-1 text-xs text-gray-medium md:hidden">Delivery {v.delivery}</div>
              </div>
              <div className="hidden md:flex shrink-0 text-xs text-gray-medium flex-col items-end">
                <span className="font-medium text-gray-dark">{v.delivery}</span>
                <span className="flex items-center gap-1 mt-1" aria-hidden>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
