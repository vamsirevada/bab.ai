import CTASection from '@/app/components/landing/CTASection'
import DemoSection from '@/app/components/landing/DemoSection'
import FeaturesSection from '@/app/components/landing/FeaturesSection'
import HeroSection from '@/app/components/landing/HeroSection'
import IntelligenceSection from '@/app/components/landing/IntelligenceSection'
import ProblemSection from '@/app/components/landing/ProblemSection'
import TargetAudienceSection from '@/app/components/landing/TargetAudienceSection'
import TestimonialsSection from '@/app/components/landing/TestimonialsSection'

const Landing = () => {
  return (
    <>
      <HeroSection />
      <IntelligenceSection />
      <DemoSection />
      <ProblemSection />
      <FeaturesSection />
      <TargetAudienceSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

export default Landing
