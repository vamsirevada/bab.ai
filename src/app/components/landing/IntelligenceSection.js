'use client'
import React, { useState, useEffect, useMemo } from 'react'

const TypingAnimation = () => {
  const words = useMemo(() => ['App', 'Setup', 'Learning'], [])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    if (isTyping) {
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        }, 150) // Typing speed
        return () => clearTimeout(timeout)
      } else {
        // Word complete, wait then start deleting
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000) // Pause at complete word
        return () => clearTimeout(timeout)
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1))
        }, 100) // Deleting speed
        return () => clearTimeout(timeout)
      } else {
        // Word deleted, move to next word
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsTyping(true)
      }
    }
  }, [currentText, isTyping, currentWordIndex, words])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className="text-brand-primary">
      {currentText}
      <span
        className={`text-brand-primary ${
          showCursor ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-200`}
      >
        _
      </span>
    </span>
  )
}

const IntelligenceSection = () => {
  return (
    <div
      className="w-full py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-white"
      data-next-section
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-dark mb-4 sm:mb-6 font-heading flex items-center justify-center gap-2 sm:gap-3 flex-wrap leading-tight">
            <span>No</span>
            <TypingAnimation />
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-medium max-w-3xl mx-auto font-body leading-relaxed">
            Start using AI-powered construction management instantly on WhatsApp
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* Procurement AI */}
          <div className="group relative overflow-hidden bg-white border border-gray-medium/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:border-gray-dark/30 h-80 sm:h-96">
            {/* Video Container */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <video
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                loading="lazy"
                poster="/assets/posters/Procure-poster.png"
              >
                <source src="/assets/videos/Procure.webm" type="video/webm" />
                <source src="/assets/videos/Procure.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay on Hover/Touch */}
              <div className="absolute inset-0 bg-gray-dark/90 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-center transform translate-y-6 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl border border-gray-medium/20">
                    <p className="text-gray-dark text-center leading-relaxed text-xs sm:text-sm md:text-base font-medium font-body">
                      &quot;Gets instant quotes from vendors, compares prices,
                      generates purchase orders, and tracks deliveries&quot;
                    </p>
                    <div className="w-12 h-0.5 bg-gray-dark mx-auto rounded-full mt-4"></div>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-dark/50 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-md rounded-xl py-2 sm:py-3 px-3 sm:px-4 shadow-lg border border-gray-medium/20 group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
                <div className="text-sm sm:text-base font-bold text-gray-dark font-body">
                  Your Purchase Manager
                </div>
                <div className="text-xs text-gray-medium font-medium mt-1 uppercase tracking-wider">
                  In Your Pocket
                </div>
              </div>
            </div>
          </div>

          {/* Credit */}
          <div className="group relative overflow-hidden bg-white border border-gray-medium/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:border-gray-dark/30 h-80 sm:h-96">
            {/* Video Container */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <video
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                loading="lazy"
                poster="/assets/posters/Credit-poster.png"
              >
                <source src="/assets/videos/Credit.webm" type="video/webm" />
                <source src="/assets/videos/Credit.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay on Hover/Touch */}
              <div className="absolute inset-0 bg-gray-dark/90 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-center transform translate-y-6 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl border border-gray-medium/20">
                    <p className="text-gray-dark text-center leading-relaxed text-xs sm:text-sm md:text-base font-medium font-body">
                      &quot;No Guesswork. Smart limits. Simple terms. Releases
                      credit straight to vendors.&quot;
                    </p>
                    <div className="w-12 h-0.5 bg-gray-dark mx-auto rounded-full mt-4"></div>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-dark/50 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-md rounded-xl py-2 sm:py-3 px-3 sm:px-4 shadow-lg border border-gray-medium/20 group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
                <div className="text-sm sm:text-base font-bold text-gray-dark font-body">
                  Your Personal Banker
                </div>
                <div className="text-xs text-gray-medium font-medium mt-1 uppercase tracking-wider">
                  Instant Credit
                </div>
              </div>
            </div>
          </div>
          {/* SiteOps AI */}
          <div className="group relative overflow-hidden bg-white border border-gray-medium/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:border-gray-dark/30 h-80 sm:h-96">
            {/* Video Container */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <video
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay
                muted
                loop
                playsInline
                loading="lazy"
                poster="/assets/posters/SiteOps-poster.png"
              >
                <source src="/assets/videos/SiteOps.webm" type="video/webm" />
                <source src="/assets/videos/SiteOps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Coming Soon Badge */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-20">
                <div className="bg-gray-dark text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm font-body">
                  Coming Soon
                </div>
              </div>

              {/* Overlay on Hover/Touch */}
              <div className="absolute inset-0 bg-gray-dark/90 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm">
                <div className="text-center transform translate-y-6 group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-xl border border-gray-medium/20">
                    <p className="text-gray-dark text-center leading-relaxed text-xs sm:text-sm md:text-base font-medium font-body">
                      &quot;Tracks work, people, and progress smartly. Provides
                      in detail analysis and suggestions.&quot;
                    </p>
                    <div className="w-12 h-0.5 bg-gray-dark mx-auto rounded-full mt-4"></div>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-dark/50 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Bottom Badge */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-md rounded-xl py-2 sm:py-3 px-3 sm:px-4 shadow-lg border border-gray-medium/20 group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
                <div className="text-sm sm:text-base font-bold text-gray-dark font-body">
                  Your Site Supervisor
                </div>
                <div className="text-xs text-gray-medium font-medium mt-1 uppercase tracking-wider">
                  On Duty Always
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntelligenceSection
