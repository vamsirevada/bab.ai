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

const ProblemSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  return (
    <div ref={sectionRef} className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gray-dark/10 border border-gray-dark/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-dark"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm sm:text-base font-semibold text-gray-dark uppercase tracking-wider font-body">
              The Problem
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-6 sm:mb-8 leading-tight font-heading">
            WhatsApp Communication
            <span className="text-brand-primary"> Chaos</span> We Solve
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-medium max-w-4xl mx-auto leading-relaxed font-body">
            Construction teams rely on WhatsApp for project communication, but
            critical insights get{' '}
            <span className="font-semibold text-gray-dark">
              lost in endless
            </span>{' '}
            chat threads
          </p>
        </div>

        {/* Problem Stats */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-16 sm:mb-20 transition-all duration-1000 ease-out delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white border border-gray-medium/20 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <svg
                  className="w-8 h-8 text-gray-dark"
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
              <div className="text-4xl sm:text-5xl font-bold text-gray-dark mb-4 group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter end={90} suffix="%" duration={2000} />
              </div>
              <div className="text-gray-dark font-semibold text-xl mb-3 font-body">
                Use WhatsApp for Projects
              </div>
              <div className="text-gray-medium text-sm font-medium bg-gray-light px-4 py-2 rounded-full inline-block font-body">
                But insights get lost
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-medium/20 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <svg
                  className="w-8 h-8 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 9H16M8 13H14M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-gray-dark mb-4 group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter end={500} suffix="+" duration={2300} />
              </div>
              <div className="text-gray-dark font-semibold text-xl mb-3 font-body">
                Messages Per Project
              </div>
              <div className="text-gray-medium text-sm font-medium bg-gray-light px-4 py-2 rounded-full inline-block font-body">
                Manual tracking impossible
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-medium/20 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <svg
                  className="w-8 h-8 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-gray-dark mb-4 group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter end={70} suffix="%" duration={2600} />
              </div>
              <div className="text-gray-dark font-semibold text-xl mb-3 font-body">
                Critical Info in Photos
              </div>
              <div className="text-gray-medium text-sm font-medium bg-gray-light px-4 py-2 rounded-full inline-block font-body">
                Buried in chat history
              </div>
            </div>
          </div>
        </div>

        {/* Pain Points */}
        <div
          className={`bg-gray-light rounded-2xl p-8 sm:p-10 lg:p-12 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-medium/20 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-dark mb-8 sm:mb-12 text-center font-heading">
            The Daily Struggle
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div className="text-center group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-gray-medium/20">
                <svg
                  className="w-7 h-7 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-dark mb-3 text-lg font-body">
                Lost Photos
              </h4>
              <p className="text-gray-medium font-body leading-relaxed">
                Site progress photos scattered across conversations
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-gray-medium/20">
                <svg
                  className="w-7 h-7 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 7V13L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-dark mb-3 text-lg font-body">
                Time Wasted
              </h4>
              <p className="text-gray-medium font-body leading-relaxed">
                Hours spent scrolling to find important information
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-gray-medium/20">
                <svg
                  className="w-7 h-7 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-dark mb-3 text-lg font-body">
                Missed Bills
              </h4>
              <p className="text-gray-medium font-body leading-relaxed">
                Vendor invoices buried in endless message threads
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300 border border-gray-medium/20">
                <svg
                  className="w-7 h-7 text-gray-dark"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-dark mb-3 text-lg font-body">
                No Insights
              </h4>
              <p className="text-gray-medium font-body leading-relaxed">
                Raw data without actionable intelligence
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProblemSection
