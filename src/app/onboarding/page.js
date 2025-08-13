"use client"

import { useMemo, useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Info, ShieldCheck, CheckCircle2, ChevronRight, Phone, Truck } from 'lucide-react'

export default function OnboardingPage() {
  // Tabs (mobile)
  const [activeTab, setActiveTab] = useState('credit') // 'credit' | 'vendors'
  const [prevTab, setPrevTab] = useState('credit')

  const handleTabChange = (tab) => {
    setPrevTab(activeTab)
    setActiveTab(tab)
  }

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

  {/* Tabs for mobile and tablet */}
  <div className="lg:hidden mt-6">
          <div className="flex border border-gray-medium/20 rounded-lg p-1 bg-white shadow-sm">
            <button
              className={`flex-1 py-2.5 text-sm rounded-md transition ${
                activeTab === 'credit'
                  ? 'bg-gray-dark text-white'
                  : 'text-gray-dark hover:bg-gray-light/30'
              }`}
              onClick={() => handleTabChange('credit')}
            >
              Credit Information
            </button>
            <button
              className={`flex-1 py-2.5 text-sm rounded-md transition ${
                activeTab === 'vendors'
                  ? 'bg-gray-dark text-white'
                  : 'text-gray-dark hover:bg-gray-light/30'
              }`}
              onClick={() => handleTabChange('vendors')}
            >
              Vendor Selection
            </button>
          </div>

          {/* Animated Panels */}
          <AnimatedPanels
            activeTab={activeTab}
            prevTab={prevTab}
            creditContent={
              <CreditCard
                credit={credit}
                usedPct={usedPct}
                onIncrease={handleIncreaseLimit}
                rechecking={rechecking}
              />
            }
            vendorsContent={<VendorsCard vendors={vendors} onOpen={(v) => setDrawerVendor(v)} />}
          />
        </div>

  {/* Desktop Cards (lg and above) */}
  <div className="hidden lg:grid grid-cols-2 gap-6 mt-8">
          <CreditCard credit={credit} usedPct={usedPct} onIncrease={handleIncreaseLimit} rechecking={rechecking} />
          <VendorsCard vendors={vendors} onOpen={(v) => setDrawerVendor(v)} />
        </div>

        {/* Slide-Over Drawer (Animated) */}
        {drawerVendor && (
          <Portal>
            <SlideOver
              vendor={drawerVendor}
              onDismiss={() => setDrawerVendor(null)}
              onSelectVendor={(v) => {
                setSelectedVendor(v)
                setDrawerVendor(null)
              }}
              openWhatsApp={openWhatsApp}
            />
          </Portal>
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
                <WhatsAppIcon className="w-5 h-5" /> Send
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
        <div className="text-xs text-gray-medium flex flex-col items-end">
          <div className="flex items-center gap-2">
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
            <p className="font-medium text-gray-dark leading-tight whitespace-nowrap">{credit.partner.name}</p>
          </div>
          <p className="leading-tight mt-0.5">{credit.partner.regulated ? 'Regulated by RBI' : ''}</p>
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
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-medium text-gray-dark truncate flex-1 min-w-0">{v.name}</h3>
                  {/* Show Verified next to title only on mobile */}
                  {v.verified && (
                    <span className="inline-flex md:hidden items-center gap-1 px-1.5 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-[10px]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Bab.ai Verified
                    </span>
                  )}
                </div>
                <div className="mt-1 grid items-center gap-1 md:gap-1.5 text-[11px] sm:text-xs text-gray-medium grid-cols-[auto_auto_1fr_auto] md:grid-cols-[auto_auto_auto_1fr_auto]">
                  <span className="inline-flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20 max-w-full">
                    On-time {v.onTime}%
                  </span>
                  <span className="inline-flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20 max-w-full">
                    Past txns {v.pastTxns}
                  </span>
                  {/* Mobile spacer to push delivery to the right */}
                  <span className="block md:hidden" />
                  {/* Delivery chip (mobile) right-aligned */}
                  <span className="md:hidden inline-flex items-center gap-1 px-1 sm:px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20 justify-self-end">
                    <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {v.delivery}
                  </span>
                  {/* Desktop price estimate */}
                  <span className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20">
                    Price est. {v.priceEstimate}
                  </span>
                  {/* Desktop spacer */}
                  <span className="hidden md:block" />
                </div>
              </div>
              <div className="hidden md:flex shrink-0 items-center gap-2" aria-hidden>
                <div className="flex flex-col items-end gap-1 text-xs text-gray-medium">
                  {v.verified && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-[10px]">
                      <ShieldCheck className="w-3.5 h-3.5" /> Bab.ai Verified
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white border border-gray-medium/20 text-gray-dark text-[10px] whitespace-nowrap">
                    <Truck className="w-3.5 h-3.5" /> {v.delivery}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 self-center text-gray-medium" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Animated mobile panels: smoothly slide/fade between tabs and animate container height
function AnimatedPanels({ activeTab, prevTab, creditContent, vendorsContent }) {
  const containerRef = useRef(null)
  const creditRef = useRef(null)
  const vendorsRef = useRef(null)

  // Animate height to fit active panel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const panel = activeTab === 'credit' ? creditRef.current : vendorsRef.current
    if (!panel) return
    const nextHeight = panel.offsetHeight
    container.style.height = container.offsetHeight ? `${container.offsetHeight}px` : 'auto'
    // Force reflow
    void container.offsetHeight
    container.style.transition = 'height 250ms ease'
    container.style.height = `${nextHeight}px`
    const cleanup = () => {
      container.style.height = 'auto'
      container.style.transition = ''
    }
    const t = setTimeout(cleanup, 300)
    return () => clearTimeout(t)
  }, [activeTab])

  const leftActive = activeTab === 'credit'
  const leftWasActive = prevTab === 'credit'

  return (
    <div className="mt-4 relative" ref={containerRef}>
      <div className="relative">
        {/* Credit panel */}
        <div
          ref={creditRef}
          className={`absolute inset-0 will-change-transform transition-[transform,opacity] duration-300 ease-out ${
            leftActive
              ? 'translate-x-0 opacity-100 relative'
              : leftWasActive
              ? '-translate-x-6 opacity-0 pointer-events-none'
              : '-translate-x-6 opacity-0 pointer-events-none'
          }`}
        >
          {creditContent}
        </div>

        {/* Vendors panel */}
        <div
          ref={vendorsRef}
          className={`absolute inset-0 will-change-transform transition-[transform,opacity] duration-300 ease-out ${
            activeTab === 'vendors'
              ? 'translate-x-0 opacity-100 relative'
              : prevTab === 'vendors'
              ? 'translate-x-6 opacity-0 pointer-events-none'
              : 'translate-x-6 opacity-0 pointer-events-none'
          }`}
        >
          {vendorsContent}
        </div>
      </div>
    </div>
  )
}

function Portal({ children }) {
  const [mounted, setMounted] = useState(false)
  const elRef = useRef(null)
  if (!elRef.current) {
    elRef.current = typeof document !== 'undefined' ? document.createElement('div') : null
  }
  useEffect(() => {
    if (!elRef.current || typeof document === 'undefined') return
    document.body.appendChild(elRef.current)
    setMounted(true)
    return () => {
      if (elRef.current?.parentNode) elRef.current.parentNode.removeChild(elRef.current)
    }
  }, [])
  if (!mounted || !elRef.current) return null
  return createPortal(children, elRef.current)
}

// Right slide-over with overlay fade and smooth entrance/exit
function SlideOver({ vendor, onDismiss, onSelectVendor, openWhatsApp }) {
  const [show, setShow] = useState(false)
  const panelRef = useRef(null)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const dragging = useRef(false)
  const [noMotion, setNoMotion] = useState(false)
  const animMs = noMotion ? 0 : 300

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShow(false)
        setTimeout(() => onDismiss?.(), 250)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onDismiss])

  // Mount animation and focus
  useEffect(() => {
    // detect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyPref = () => setNoMotion(!!mq.matches)
    applyPref()
    if (mq.addEventListener) mq.addEventListener('change', applyPref)
    else if (mq.addListener) mq.addListener(applyPref)

    const t = setTimeout(() => setShow(true), noMotion ? 0 : 20)
    // focus first focusable element
    const focusable = panelRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.focus?.()
    return () => {
      clearTimeout(t)
      if (mq.removeEventListener) mq.removeEventListener('change', applyPref)
      else if (mq.removeListener) mq.removeListener(applyPref)
    }
  }, [noMotion])

  const handleClose = () => {
    setShow(false)
    setTimeout(() => onDismiss?.(), 250)
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] ${noMotion ? 'transition-none' : 'transition-opacity duration-300'} ${show ? 'opacity-100' : 'opacity-0'} z-[9999]`}
        onClick={handleClose}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
  className={`absolute right-0 top-0 h-full w-full sm:max-w-md bg-white border-l border-gray-medium/20 shadow-2xl ring-1 ring-gray-900/5 rounded-l-2xl will-change-transform transform-gpu ${noMotion ? 'transition-none' : 'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'} ${
          show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-100'
  } z-[10000] isolate`}
        role="dialog"
        aria-modal="true"
        onTouchStart={(e) => {
          if (noMotion) return
          dragging.current = true
          touchStartX.current = e.touches[0].clientX
          touchDeltaX.current = 0
          if (panelRef.current) panelRef.current.style.transition = 'none'
        }}
        onTouchMove={(e) => {
          if (!dragging.current || noMotion) return
          touchDeltaX.current = Math.max(0, e.touches[0].clientX - touchStartX.current)
          const dx = touchDeltaX.current
          if (panelRef.current) {
            panelRef.current.style.transform = `translateX(${dx}px)`
          }
        }}
        onTouchEnd={() => {
          if (!dragging.current || noMotion) return
          dragging.current = false
          const shouldClose = touchDeltaX.current > 80
          if (shouldClose) {
            // animate out
            if (panelRef.current && !noMotion) panelRef.current.style.transition = `transform ${animMs}ms cubic-bezier(0.16,1,0.3,1)`
            setShow(false)
            setTimeout(() => onDismiss?.(), animMs)
          } else {
            // spring back
            if (panelRef.current) {
              panelRef.current.style.transition = `transform ${animMs}ms cubic-bezier(0.16,1,0.3,1)`
              panelRef.current.style.transform = 'translateX(0px)'
            }
          }
        }}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-dark">{vendor.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-medium">
                {vendor.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" /> Bab.ai Verified
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-xs">
                  On-time {vendor.onTime}%
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-light/40 border border-gray-medium/20 text-gray-dark text-xs">
                  Past Txns {vendor.pastTxns}
                </span>
              </div>
            </div>
            <button
              className="p-2 rounded-md hover:bg-gray-light/50 text-gray-medium"
              onClick={handleClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-gray-medium/20 p-3">
              <span className="text-gray-medium">Price estimate for your PO</span>
              <span className="font-medium text-gray-dark">{vendor.priceEstimate}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-medium/20 p-3">
              <span className="text-gray-medium">Delivery timeline</span>
              <span className="font-medium text-gray-dark">{vendor.delivery}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${vendor.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-medium/20 bg-white px-3 py-2 text-sm text-gray-dark hover:bg-gray-light/40"
              >
                <Phone className="w-4 h-4" /> Call
              </a>
              <button
                onClick={() => openWhatsApp(vendor)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white px-3 py-2 text-sm hover:opacity-90"
              >
                <WhatsAppIcon className="w-4 h-4 text-white drop-shadow-sm" /> WhatsApp
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-2">
            <button
              onClick={() => onSelectVendor?.(vendor)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gray-dark text-white px-4 py-2.5 text-sm font-medium hover:bg-gray-medium"
            >
              <CheckCircle2 className="w-5 h-5" /> Select Vendor
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
  </svg>
)
