'use client'
import Image from 'next/image'
import WhatsAppUI from './WhatsAppUI'
import { useState, useEffect, useRef } from 'react'
import { Brain } from 'lucide-react'

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

const DemoSection = () => {
  const [isPhoneVisible, setIsPhoneVisible] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)
  const phoneRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger phone animation when section becomes visible
        if (entry.isIntersecting && !isPhoneVisible) {
          setIsPhoneVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit earlier
      }
    )

    const contentObserver = new IntersectionObserver(
      ([entry]) => {
        // Trigger content animation when section becomes visible
        if (entry.isIntersecting && !isContentVisible) {
          setIsContentVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (phoneRef.current) {
      observer.observe(phoneRef.current)
    }

    if (contentRef.current) {
      contentObserver.observe(contentRef.current)
    }

    return () => {
      observer.disconnect()
      contentObserver.disconnect()
    }
  }, [isPhoneVisible, isContentVisible])

  return (
    <div className="bg-gray-light py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-24 items-center">
          {/* Left Side - Content */}
          <div
            ref={contentRef}
            className={`text-center lg:text-left flex flex-col justify-center transition-all duration-1000 ease-out ${
              isContentVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Demo Badge */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="inline-flex items-center gap-2 bg-gray-dark/10 border border-gray-dark/20 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <svg
                  className="w-4 h-4 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polygon points="10,8 16,12 10,16" fill="currentColor" />
                </svg>
                <span className="text-sm font-semibold text-gray-dark uppercase tracking-wider font-body">
                  Live Demo
                </span>
              </div>
            </div>

            {/* Enhanced Heading */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 sm:mb-8 leading-tight font-heading">
              <span className="text-brand-primary">Project Intelligence</span>
            </h3>

            {/* Enhanced Description */}
            <div className="max-w-2xl lg:max-w-none mb-8">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-medium mb-8 leading-relaxed font-body">
                Just share your requirement to babai on WhatsApp. Bab.ai
                understands, gets your quotes, and even unlocks credit —
                <span className="font-semibold text-gray-dark">
                  {' '}
                  all in one simple chat.
                </span>
              </p>
            </div>

            {/* Enhanced Combined CTA and Stats Card */}
            <div className="bg-white border border-gray-medium/20 rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-brand-primary/3 group-hover:bg-brand-primary/5 transition-colors duration-500"></div>

              <div className="relative z-10">
                {/* CTA Section */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 bg-gray-dark rounded-full"></div>
                    <span className="text-sm font-medium text-gray-dark uppercase tracking-wider font-body">
                      Get Started Instantly
                    </span>
                    <div className="w-2 h-2 bg-gray-dark rounded-full"></div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-xl sm:text-2xl font-semibold text-gray-dark font-body leading-relaxed">
                      The smartest way to build. Just say &quot;Hi&quot;.
                    </p>

                    {/* Main CTA Button */}
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 shadow-md border border-brand-primary/20 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group/btn">
                      <svg
                        className="w-5 h-5 text-brand-primary group-hover/btn:scale-110 transition-transform duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 12L11 15L16 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="text-xl font-bold text-brand-primary">
                        Try bab.ai now
                      </span>
                      <svg
                        className="w-5 h-5 text-brand-primary group-hover/btn:translate-x-1 transition-transform duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {/* Three Component Badges */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-center">
                      <div className="flex items-center gap-2 bg-white border border-gray-dark/20 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                        <svg
                          className="w-3.5 h-3.5 text-gray-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-gray-dark">
                          Your Project
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-gray-dark/20 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                        <svg
                          className="w-3.5 h-3.5 text-gray-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-sm font-semibold text-gray-dark">
                          Your WhatsApp
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-white border border-gray-dark/20 px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                        <Brain className="w-3.5 h-3.5 text-gray-dark" />
                        <span className="text-sm font-semibold text-gray-dark">
                          Our Brain
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Elegant Divider */}
                <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-medium/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 py-2 bg-white text-gray-dark font-medium rounded-full border border-gray-medium/20 shadow-sm">
                      Real Impact
                    </span>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <div className="group">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-light/50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white border border-gray-dark/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm">
                        <svg
                          className="w-4 h-4 text-gray-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark group-hover:scale-105 transition-transform duration-300">
                          <AnimatedCounter
                            end={99}
                            suffix="K+"
                            duration={2000}
                          />
                        </div>
                        <div className="text-sm text-gray-medium font-medium">
                          Messages Analyzed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-light/50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white border border-gray-dark/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm">
                        <svg
                          className="w-4 h-4 text-gray-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark group-hover:scale-105 transition-transform duration-300">
                          <AnimatedCounter
                            end={9}
                            suffix="K+"
                            duration={2300}
                          />
                        </div>
                        <div className="text-sm text-gray-medium font-medium">
                          Photos Processed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-light/50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white border border-gray-dark/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm">
                        <svg
                          className="w-4 h-4 text-gray-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark group-hover:scale-105 transition-transform duration-300">
                          <AnimatedCounter
                            end={95}
                            suffix="%"
                            duration={2600}
                          />
                        </div>
                        <div className="text-sm text-gray-medium font-medium">
                          Bill Accuracy
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-light/50 transition-colors duration-300">
                      <div className="w-12 h-12 bg-white border border-gray-dark/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm">
                        <svg
                          className="w-4 h-4 text-gray-dark"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark group-hover:scale-105 transition-transform duration-300">
                          <AnimatedCounter end={2} suffix="M" duration={2900} />
                        </div>
                        <div className="text-sm text-gray-medium font-medium">
                          Insights Generated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - iPhone Mockup */}
          <div className="flex justify-center items-center" ref={phoneRef}>
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <div
                className={`transform transition-all duration-1000 ease-out ${
                  isPhoneVisible
                    ? 'translate-x-0 opacity-100 scale-100'
                    : 'translate-x-8 opacity-0 scale-95'
                } hover:scale-105 transition-transform duration-500`}
              >
                <WhatsAppUI />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoSection
