'use client'
import { Camera, Sparkles, Brain, Lightbulb, Heart, Users } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const FeaturesSection = () => {
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

  const features = [
    {
      icon: Camera,
      title: 'WhatsApp Photo Intelligence',
      description:
        'AI analyzes site photos shared in WhatsApp to track progress, identify safety issues, and measure completion rates automatically',
      metric: 'Photo AI',
    },
    {
      icon: Sparkles,
      title: 'Smart Bill Processing',
      description:
        'Automatically extracts quantities, prices, and delivery dates from vendor bills shared in WhatsApp chats',
      metric: 'Auto Extract',
    },
    {
      icon: Brain,
      title: 'Vendor Behavior Learning',
      description:
        'Builds intelligence on vendor reliability, delivery patterns, and quality consistency from chat history',
      metric: 'Smart Learning',
    },
    {
      icon: Lightbulb,
      title: 'Real-time Project Model',
      description:
        'Creates and updates a comprehensive mental model of each project from WhatsApp conversations and media',
      metric: 'Live Model',
    },
    {
      icon: Heart,
      title: 'Conversation Intelligence',
      description:
        'Understands construction context in chat messages to predict delays, budget issues, and quality concerns',
      metric: 'Context AI',
    },
    {
      icon: Users,
      title: 'Builder Consistency Tracking',
      description:
        'Monitors site team performance and execution patterns through WhatsApp communications and updates',
      metric: 'Team Intel',
    },
  ]

  return (
    <div ref={sectionRef} className="bg-white py-8 sm:py-12 lg:py-16 xl:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 font-heading leading-tight">
            Construction
            <span className="text-brand-primary"> Intelligence</span> Platform
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto font-body leading-relaxed">
            Bab.ai continuously builds and updates a comprehensive understanding
            of each project, learning patterns and predicting outcomes based on
            thousands of WhatsApp interactions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6 xl:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 xl:p-7 shadow-sm hover:shadow-md transition-all duration-500 border border-slate-200/60 group delay-${
                  index * 100
                } ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Header with Icon, Title, and Metric */}
                <div className="flex items-start gap-3 mb-4 sm:mb-5">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300 shadow-sm border border-gray-medium/20 flex-shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-dark" />
                  </div>

                  {/* Title and Metric Stacked */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold text-slate-800 leading-tight font-heading mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    <div className="bg-gray-dark/10 border border-gray-dark/20 text-gray-dark text-xs font-medium px-2 py-1 rounded-lg transition-all duration-200 group-hover:bg-gray-dark/20 inline-block font-body">
                      {feature.metric}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed font-body">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
