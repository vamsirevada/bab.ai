'use client'
import { useState, useEffect, useRef } from 'react'

const CTASection = ({ onGetStarted }) => {
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
    <div ref={sectionRef} className="py-8 sm:py-10 lg:py-12 bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`bg-gray-light/30 text-gray-dark relative overflow-hidden shadow-sm rounded-2xl transition-all duration-700 border border-gray-medium/10 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-medium/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-medium/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative z-10 px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
            {/* Badge */}
            <div
              className={`text-center mb-8 transition-all duration-500 delay-200 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gray-medium/10 rounded-full text-sm font-medium mb-8 backdrop-blur-sm font-body border border-gray-medium/20">
                <svg
                  className="w-4 h-4 mr-2 text-gray-dark"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Trusted by 500+ Construction Teams
              </div>
            </div>

            {/* Main Content */}
            <div
              className={`text-center mb-12 transition-all duration-500 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-dark mb-6 leading-tight font-heading">
                Ready to Revolutionize Your Construction Projects with{' '}
                <span className="text-brand-primary">bab.ai?</span>
              </h1>
              <p className="text-gray-medium text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed font-body">
                Join leading builders who&apos;ve increased project efficiency
                by 40% and reduced delays by 60% using Bab.ai&apos;s
                WhatsApp-native construction intelligence platform.
              </p>
            </div>

            {/* Feature Grid */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto mb-12 transition-all duration-500 delay-400 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-light/20 rounded-2xl backdrop-blur-sm hover:bg-gray-light/30 transition-all duration-300 border border-gray-medium/20">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20">
                  <svg
                    className="w-5 h-5 text-gray-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-center font-body text-gray-dark">
                  No Setup Fees
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-light/20 rounded-2xl backdrop-blur-sm hover:bg-gray-light/30 transition-all duration-300 border border-gray-medium/20">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20">
                  <svg
                    className="w-5 h-5 text-gray-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-center font-body text-gray-dark">
                  Real-Time Dashboard
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-light/20 rounded-2xl backdrop-blur-sm hover:bg-gray-light/30 transition-all duration-300 border border-gray-medium/20">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20">
                  <svg
                    className="w-5 h-5 text-gray-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-center font-body text-gray-dark">
                  Expert Support 24/7
                </span>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-light/20 rounded-2xl backdrop-blur-sm hover:bg-gray-light/30 transition-all duration-300 border border-gray-medium/20">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20">
                  <svg
                    className="w-5 h-5 text-gray-dark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-center font-body text-gray-dark">
                  AI-Powered Insights
                </span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div
              className={`pt-8 border-t border-gray-medium/20 text-center transition-all duration-500 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex flex-wrap justify-center items-center gap-6 text-gray-medium">
                <div className="text-sm font-medium font-body">
                  Featured in Construction Weekly
                </div>
                <div className="text-sm font-medium">•</div>
                <div className="text-sm font-medium font-body">
                  Winner: Best AI Tool 2025
                </div>
                <div className="text-sm font-medium">•</div>
                <div className="text-sm font-medium font-body">
                  ISO 27001 Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTASection
