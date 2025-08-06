'use client'
import React from 'react'

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-start lg:items-center min-h-[calc(100vh-200px)]">
          {/* Left Side - Video and Greeting */}
          <div className="w-full flex justify-center lg:justify-end lg:pr-4">
            <LeftSection />
          </div>

          {/* Right Side - Main Content */}
          <div className="w-full flex justify-center lg:justify-start lg:pl-4 lg:-mt-8">
            <RightSection />
          </div>
        </div>
      </div>
    </div>
  )
}

// Left Section Component - Mobile responsive with adjusted max-width
const LeftSection = () => (
  <div className="w-full max-w-md lg:max-w-lg flex flex-col items-center lg:items-start order-1 lg:order-1 animate-slide-in-left">
    <IntroVideo />
    <GreetingText />
  </div>
)

// Right Section Component - Mobile responsive with adjusted max-width
const RightSection = () => (
  <div className="w-full max-w-md lg:max-w-lg flex flex-col items-center lg:items-start order-2 lg:order-2 animate-slide-in-right">
    <MainHeading />
    <Description />
    <BenefitsBadges />
    <CTASection />
  </div>
)

// Intro Video Component - Mobile responsive
const IntroVideo = () => (
  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg animate-fade-in-up animation-delay-300">
    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg bg-gray-50 p-1 sm:p-2">
      <video
        poster="/intro-poster.png"
        style={{ objectFit: 'cover' }}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto rounded-lg sm:rounded-xl max-h-48 sm:max-h-64 md:max-h-80 lg:max-h-96"
      >
        <source src="/intro.webm" type="video/webm" />
        <source src="/intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
    <div className="w-full flex justify-center lg:justify-start mt-3 sm:mt-4 animate-fade-in-up animation-delay-600">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight font-heading text-center lg:text-left">
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

// Main Heading Component - Mobile responsive with no text wrap
const MainHeading = () => (
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-charcoal mb-2 sm:mb-3 leading-tight px-2 sm:px-4 lg:px-0 font-heading text-center lg:text-left animate-fade-in-up animation-delay-200 whitespace-nowrap">
    <span className="text-brand-charcoal drop-shadow-sm">
      Unlock Credit, Build Smart
    </span>
  </h2>
)

// Description Component - Mobile responsive
const Description = () => (
  <div className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-charcoal/70 font-normal mb-3 sm:mb-4 lg:mb-6 leading-relaxed px-2 sm:px-4 lg:px-0 font-body text-center lg:text-left italic animate-fade-in-up animation-delay-400">
    &quot;Your successful projects are your credit score. Your quality work is
    your qualification&quot;
  </div>
)

// Benefits Badges Component - Mobile responsive with reduced margin
// Benefits Badges Component - Mobile responsive with reduced margin
const BenefitsBadges = () => {
  const benefits = [
    'Pick Trusted Vendors',
    'Compare Material prices',
    'Access Instant Credit',
  ]

  const badgeClasses =
    'bg-white hover:bg-gray-50 text-black border border-black px-1.5 sm:px-2 lg:px-3 py-1 sm:py-1.5 shadow-sm hover:shadow-md transition-all duration-300 text-xs font-body rounded-md whitespace-nowrap flex-shrink-0'

  return (
    <div className="w-full mb-3 sm:mb-4 lg:mb-5 animate-fade-in-up animation-delay-600">
      <div className="flex flex-wrap lg:flex-nowrap gap-1 sm:gap-1.5 lg:gap-2 items-center justify-center lg:justify-start px-0 sm:px-2 lg:px-0">
        {benefits.map((benefit, index) => (
          <span
            key={index}
            className={`${badgeClasses} animate-fade-in-up`}
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
  <div className="w-full flex flex-col lg:flex-row items-center gap-3 sm:gap-4 lg:gap-6 px-2 sm:px-4 lg:px-0 animate-fade-in-up animation-delay-1200">
    <OnlineStatus />
    <WhatsAppButton />
  </div>
)

// Online Status Component - Mobile responsive
const OnlineStatus = () => (
  <div className="flex items-center gap-2 flex-shrink-0">
    <div className="relative">
      <div className="w-2 h-2 bg-functional-success rounded-full animate-pulse" />
      <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
    </div>
    <p className="text-brand-charcoal/80 text-sm sm:text-base lg:text-lg font-medium font-body">
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
      className="bg-gradient-to-r from-functional-success to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2 sm:gap-3 border border-green-400/30 text-sm sm:text-base flex-shrink-0"
    >
      <WhatsAppIcon />
      Try on WhatsApp
    </a>
  )
}

export default HeroSection
