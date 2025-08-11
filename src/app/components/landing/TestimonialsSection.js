'use client'
import { useState, useEffect, useRef } from 'react'

// Animated counter component
const AnimatedCounter = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when element is 50% visible and hasn't animated yet
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of element is visible
        rootMargin: '0px 0px -100px 0px', // Start animation a bit earlier
      }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return

    let startTime = null
    const startValue = 0
    const endValue = end

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      // Handle decimal numbers properly
      let currentCount
      if (endValue % 1 !== 0) {
        // For decimal numbers like 4.8
        currentCount = Number(
          (startValue + (endValue - startValue) * easeOutCubic).toFixed(1)
        )
      } else {
        // For whole numbers
        currentCount = Math.floor(
          startValue + (endValue - startValue) * easeOutCubic
        )
      }

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasAnimated, end, duration])

  return (
    <span ref={counterRef} className="inline-block">
      {prefix}
      {typeof count === 'number' && count % 1 !== 0
        ? count
        : count.toLocaleString()}
      {suffix}
    </span>
  )
}

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark mb-4 font-heading leading-tight">
            Trusted by Construction
            <span className="text-brand-primary"> Leaders</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-medium mb-8 font-body leading-relaxed max-w-3xl mx-auto">
            Join the growing community transforming construction through
            WhatsApp AI
          </p>

          {/* Traction Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div
              className={`text-center group transition-all duration-500 delay-100 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter end={25} suffix="+" duration={2000} />
              </div>
              <div className="text-sm sm:text-base text-gray-medium font-body">
                Pilot Projects
              </div>
            </div>
            <div
              className={`text-center group transition-all duration-500 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter end={200} suffix="+" duration={2500} />
              </div>
              <div className="text-sm sm:text-base text-gray-medium font-body">
                Daily Vendor Quotes
              </div>
            </div>
            <div
              className={`text-center group transition-all duration-500 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter
                  end={2.5}
                  prefix="₹"
                  suffix="Cr+"
                  duration={3000}
                />
              </div>
              <div className="text-sm sm:text-base text-gray-medium font-body">
                Procurement via WhatsApp
              </div>
            </div>
            <div
              className={`text-center group transition-all duration-500 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark mb-2 group-hover:scale-110 transition-transform duration-300 font-heading">
                <AnimatedCounter end={4.8} suffix="/5" duration={2200} />
              </div>
              <div className="text-sm sm:text-base text-gray-medium font-body">
                User Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10">
          <div
            className={`bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-medium/20 group delay-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-dark font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300 font-heading border border-gray-medium/20">
                R
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-dark text-lg font-body">
                    Rajesh Kumar
                  </div>
                  <div className="flex text-gray-dark text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <div className="text-sm text-gray-medium font-body">
                  Site Engineer, Metro Projects
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-1 -left-1 text-gray-dark/20 text-3xl font-serif">
                &quot;
              </div>
              <p className="text-gray-medium italic leading-relaxed pl-6 text-base font-body">
                Bab.ai has revolutionized how we handle daily reports and
                material requests. Everything happens on WhatsApp now -
                it&apos;s so much faster than emails and calls.
              </p>
              <div className="absolute -bottom-1 -right-1 text-gray-dark/20 text-3xl font-serif rotate-180">
                &quot;
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-medium/20 group delay-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-dark font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300 font-heading border border-gray-medium/20">
                P
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-dark text-lg font-body">
                    Priya Sharma
                  </div>
                  <div className="flex text-gray-dark text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <div className="text-sm text-gray-medium font-body">
                  Project Director, Residential
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-1 -left-1 text-gray-dark/20 text-3xl font-serif">
                &quot;
              </div>
              <p className="text-gray-medium italic leading-relaxed pl-6 text-base font-body">
                The vendor coordination feature is amazing. We get quotes
                instantly and can compare prices right on WhatsApp. Our
                procurement efficiency has doubled.
              </p>
              <div className="absolute -bottom-1 -right-1 text-gray-dark/20 text-3xl font-serif rotate-180">
                &quot;
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-medium/20 group delay-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-dark font-bold text-lg shadow-sm group-hover:scale-110 transition-transform duration-300 font-heading border border-gray-medium/20">
                A
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-dark text-lg font-body">
                    Amit Patel
                  </div>
                  <div className="flex text-gray-dark text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <div className="text-sm text-gray-medium font-body">
                  Builder, Commercial Projects
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-1 -left-1 text-gray-dark/20 text-3xl font-serif">
                &quot;
              </div>
              <p className="text-gray-medium italic leading-relaxed pl-6 text-base font-body">
                Managing 5 sites simultaneously was chaos before Bab.ai. Now I
                get real-time updates and can make decisions instantly through
                the dashboard.
              </p>
              <div className="absolute -bottom-1 -right-1 text-gray-dark/20 text-3xl font-serif rotate-180">
                &quot;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialsSection
