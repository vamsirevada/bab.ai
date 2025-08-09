'use client'
import React from 'react'

const HeroSection = () => {
  return (
    <div
      className="mx-auto max-w-7xl pt-2 sm:pt-4 lg:pt-8 pb-2 sm:pb-4 lg:pb-6 px-4 sm:px-6 lg:px-8 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between"
      data-hero-section
    >
      <div className="flex-1 flex flex-col justify-center">
        {/* Hello I'm Babai - Main Hero Heading - Top of section for better UX */}
        <div className="w-full flex justify-center mb-3 sm:mb-4 lg:mb-6">
          <div className="group/badge text-center px-4">
            <div className="relative">
              <div className="text-gray-dark font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-2 transform group-hover/badge:scale-105 transition-all duration-300 font-cursive">
                <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                  Hello,
                </span>{' '}
                <span className="text-brand-primary font-medium relative inline-block">
                  <span className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                    I&apos;m Babai
                  </span>
                  {/* Subtle underline */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary/50 group-hover/badge:w-full transition-all duration-500 rounded-full"></div>
                </span>
              </div>

              {/* Mobile-optimized subtitle */}
              <p className="text-gray-medium text-xs sm:text-sm md:text-base lg:text-lg font-normal opacity-80 transform group-hover/badge:opacity-100 transition-all duration-300 font-body">
                Your AI Construction Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 items-center">
          <LeftSection />

          {/* Center Divider - Hidden on mobile and tablet */}
          <div className="hidden xl:flex col-span-0 justify-center">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent"></div>
          </div>

          <RightSection />
        </div>
      </div>

      {/* Bottom spacer to ensure content doesn't touch bottom - Responsive */}
      <div className="h-4 sm:h-8 lg:h-12 flex-shrink-0"></div>
    </div>
  )
}

// Left Section Component - Just the video now - Mobile optimized
const LeftSection = () => (
  <div className="w-full col-span-12 lg:col-span-5 xl:col-span-6 flex flex-col justify-center items-center animate-slide-in-left py-2 sm:py-4 lg:py-6">
    <IntroVideo />
  </div>
)

// Right Section Component - Mobile responsive with proper spacing
const RightSection = () => (
  <div
    className="w-full col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center lg:items-start animate-slide-in-right space-y-3 sm:space-y-4 lg:space-y-6 py-2 sm:py-4 lg:py-6 px-4 sm:px-6 lg:px-0 transition-all duration-300"
    id="right-section"
  >
    <MainHeading />
    <Description />
    <BenefitsBadges />
    <CTASection />
  </div>
)

// Intro Video Component - Enhanced 3D perspective effect
const IntroVideo = () => (
  <div
    className="w-full animate-fade-in-up animation-delay-300"
    style={{ perspective: '1500px', perspectiveOrigin: 'center center' }}
  >
    <div
      className="relative overflow-hidden shadow-2xl bg-gradient-to-br from-gray-light via-brand-light to-gray-light transform transition-all duration-700 hover:scale-110 group cursor-pointer"
      style={{
        borderRadius: '28px',
        transform: 'rotateX(12deg) rotateY(-8deg) rotateZ(2deg)',
        transformStyle: 'preserve-3d',
        boxShadow:
          '0 30px 60px -15px rgba(0, 0, 0, 0.35), 0 10px 25px -5px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.15)',
        background:
          'linear-gradient(135deg, #3b82f6 0%, #1f2937 50%, #3b82f6 100%)',
        padding: '12px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          'rotateX(15deg) rotateY(-12deg) rotateZ(3deg) scale(1.05)'
        // Move right section significantly when video is hovered
        const rightSection = document.getElementById('right-section')
        if (rightSection) {
          rightSection.style.transform = 'translateX(24px)'
          rightSection.style.transition = 'transform 0.3s ease-out'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          'rotateX(12deg) rotateY(-8deg) rotateZ(2deg) scale(1)'
        // Reset right section position
        const rightSection = document.getElementById('right-section')
        if (rightSection) {
          rightSection.style.transform = 'translateX(0px)'
          rightSection.style.transition = 'transform 0.3s ease-out'
        }
      }}
    >
      {/* Enhanced glass morphism inner container */}
      <div
        className="relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500"
        style={{
          borderRadius: '20px',
          backdropFilter: 'blur(15px)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow:
            'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <video
          poster="/assets/posters/intro-poster.png"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover aspect-video transform transition-transform duration-500 group-hover:scale-[1.01]"
          style={{
            aspectRatio: '16/9',
            borderRadius: '16px',
            filter: 'contrast(1.1) saturate(1.2)',
          }}
        >
          <source src="/assets/videos/intro.webm" type="video/webm" />
          <source src="/assets/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Enhanced 3D highlight overlay with animation */}
        <div
          className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(125deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.2) 100%)',
            borderRadius: '16px',
            animation: 'shimmer 3s ease-in-out infinite alternate',
          }}
        />

        {/* Reflective edge highlights */}
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          style={{ borderRadius: '16px 16px 0 0' }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent opacity-30"
          style={{ borderRadius: '0 0 16px 16px' }}
        />
      </div>

      {/* Multiple depth shadows for enhanced 3D effect */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(31, 41, 55, 0.4) 50%, rgba(59, 130, 246, 0.4) 100%)',
          borderRadius: '28px',
          transform: 'translateZ(-30px) translateX(15px) translateY(15px)',
          filter: 'blur(25px)',
        }}
      />

      {/* Secondary shadow for more depth */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(31, 41, 55, 0.2) 100%)',
          borderRadius: '28px',
          transform: 'translateZ(-50px) translateX(25px) translateY(25px)',
          filter: 'blur(40px)',
        }}
      />

      {/* Ambient glow effect */}
      <div
        className="absolute inset-0 -z-30 group-hover:opacity-60 opacity-40 transition-opacity duration-700"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.3) 0%, rgba(31, 41, 55, 0.2) 40%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translateZ(-70px) scale(1.5)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  </div>
)

// Greeting Text Component - Mobile responsive
const GreetingText = () => {
  const greetingStyle = {
    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
    letterSpacing: '0.01em',
  }

  const babaiStyle = {
    ...greetingStyle,
    letterSpacing: '0.03em',
    textShadow:
      '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2)',
  }

  return (
    <div className="w-full flex justify-center mt-3 sm:mt-4 animate-fade-in-up animation-delay-600">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight font-heading text-center">
        <span
          className="text-brand-charcoal/70 inline-block"
          style={{
            ...greetingStyle,
            fontWeight: '500',
            fontSize: '1em',
            animation:
              'helloGlow 4s ease-in-out infinite alternate, slideInLeft 0.8s ease-out 0.8s both',
          }}
        >
          Hello,
        </span>
        <span
          className="text-brand-primary ml-2 sm:ml-3 inline-block"
          style={{
            ...babaiStyle,
            fontWeight: '700',
            fontSize: '1em',
            animation:
              'babaiGlow 3s ease-in-out infinite alternate, slideInRight 0.8s ease-out 1.2s both',
          }}
        >
          I&apos;m Babai
        </span>
      </h1>
    </div>
  )
}

// Main Heading Component - Mobile responsive with proper text wrapping
const MainHeading = () => (
  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-brand-dark mb-1 sm:mb-2 lg:mb-3 leading-tight px-2 sm:px-4 lg:px-0 font-heading text-center lg:text-left animate-fade-in-up animation-delay-200">
    <span className="text-brand-dark drop-shadow-sm">
      Unlock Credit, Build Smart
    </span>
  </h2>
)

// Description Component - Mobile responsive
const Description = () => (
  <div className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-medium font-normal mb-2 sm:mb-3 lg:mb-4 leading-relaxed px-2 sm:px-4 lg:px-0 font-body text-center lg:text-left italic animate-fade-in-up animation-delay-400">
    &quot;Your successful projects are your credit score. Your quality work is
    your qualification&quot;
  </div>
)

// Benefits Badges Component - Mobile responsive with reduced margin
const BenefitsBadges = () => {
  const benefits = [
    'Pick Trusted Vendors',
    'Compare Material prices',
    'Access Instant Credit',
  ]

  const badgeClasses =
    'bg-brand-light hover:bg-gray-light text-brand-dark border border-brand-dark px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 shadow-sm hover:shadow-md transition-all duration-300 text-xs sm:text-sm font-body rounded-md flex-shrink-0'

  return (
    <div className="w-full mb-2 sm:mb-3 lg:mb-5 animate-fade-in-up animation-delay-600">
      <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 items-center justify-center lg:justify-start px-0 sm:px-2 lg:px-0">
        {benefits.map((benefit, index) => (
          <span
            key={index}
            className={`${badgeClasses} animate-fade-in-up text-center`}
            style={{ animationDelay: `${800 + index * 200}ms` }}
          >
            {benefit}
          </span>
        ))}
      </div>
    </div>
  )
}

const CTASection = () => (
  <div className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-4 lg:px-0 mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up animation-delay-1200">
    <OnlineStatus />
    <WhatsAppButton />
  </div>
)

// Online Status Component - Mobile responsive
const OnlineStatus = () => (
  <div className="flex items-center gap-2 flex-shrink-0">
    <div className="relative">
      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
      <div className="absolute inset-0 w-2 h-2 bg-success rounded-full animate-ping opacity-75" />
    </div>
    <p className="text-gray-medium text-sm sm:text-base lg:text-lg font-medium font-body">
      All in one chat
    </p>
  </div>
)

// WhatsApp Button Component - Mobile responsive
const WhatsAppButton = () => {
  const WhatsAppIcon = () => (
    <svg
      className="h-4 w-4 sm:h-5 sm:w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
    </svg>
  )

  return (
    <a
      href="https://wa.me/message/KZJ2G5V4R743F1"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-r from-success to-whatsapp hover:from-whatsapp hover:to-success text-brand-light font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 sm:gap-3 border border-success/30 text-sm sm:text-base flex-shrink-0"
    >
      <WhatsAppIcon />
      Try on WhatsApp
    </a>
  )
}

export default HeroSection
