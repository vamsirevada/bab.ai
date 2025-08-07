'use client'
import { Building2, Truck, HardHat, Star, CheckCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const TargetAudienceSection = () => {
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

  const audiences = [
    {
      icon: Building2,
      title: 'Builders & Developers',
      subtitle: 'Project Orchestrators',
      description:
        'Transform WhatsApp conversations into actionable project intelligence. Monitor progress, predict delays, and manage multiple sites effortlessly.',
      benefits: [
        'Real-time project monitoring',
        'Automated progress tracking',
        'Vendor performance insights',
      ],
    },
    {
      icon: Truck,
      title: 'Vendors & Suppliers',
      subtitle: 'Material Partners',
      description:
        'Streamline order management and delivery tracking through WhatsApp. Build trust with builders through transparent communication.',
      benefits: [
        'Instant quote submissions',
        'Order status tracking',
        'Payment visibility',
      ],
    },
    {
      icon: HardHat,
      title: 'Site Engineers',
      subtitle: 'Ground Execution',
      description:
        'Report site updates, request materials, and access project data instantly. Stay connected with the project team effortlessly.',
      benefits: [
        'Quick status updates',
        'Material request tracking',
        'Safety issue reporting',
      ],
    },
  ]

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div
        className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-gray-dark/10 border border-gray-dark/20 px-4 py-2 rounded-full mb-6">
          <Star className="w-5 h-5 text-gray-dark" />
          <span className="text-sm font-semibold text-gray-dark uppercase tracking-wider font-body">
            Who Benefits
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-dark mb-6 font-heading leading-tight">
          Built for Construction
          <span className="text-brand-primary"> Professionals</span>
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-medium max-w-4xl mx-auto font-body leading-relaxed">
          Bab.ai seamlessly integrates into your existing WhatsApp workflows,
          empowering every stakeholder in the construction ecosystem
        </p>
      </div>

      {/* Audience Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8">
        {audiences.map((audience, index) => {
          const IconComponent = audience.icon
          return (
            <div
              key={index}
              className={`bg-gray-light rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-medium/20 group delay-${
                index * 200
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Icon and Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm border border-gray-medium/20">
                  <IconComponent className="w-8 h-8 text-gray-dark" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-dark mb-2 font-heading leading-tight">
                    {audience.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-medium uppercase tracking-wider font-body">
                    {audience.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-medium text-base sm:text-lg mb-8 leading-relaxed font-body">
                {audience.description}
              </p>

              {/* Benefits List */}
              <div className="space-y-4">
                {audience.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-gray-medium/20">
                      <CheckCircle className="w-4 h-4 text-gray-dark" />
                    </div>
                    <span className="text-gray-dark font-medium font-body text-base sm:text-lg">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TargetAudienceSection
