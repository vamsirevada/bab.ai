'use client'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()

  // Pages that should show footer (landing page and marketing pages)
  const showFooter =
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/legal') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/terms')

  return showFooter ? <Footer /> : null
}
