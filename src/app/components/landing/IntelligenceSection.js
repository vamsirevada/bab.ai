import React from 'react'

const IntelligenceSection = () => {
  return (
    <div
      data-next-section
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
    >
      <video poster="/Procure-poster.png" autoPlay loop muted playsInline>
        <source src="/Procure.webm" type="video/webm" />
        <source src="/Procure.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video poster="/Credit-poster.png" autoPlay loop muted playsInline>
        <source src="/Credit.webm" type="video/webm" />
        <source src="/Credit.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video poster="/SiteOps-poster.png" autoPlay loop muted playsInline>
        <source src="/SiteOps.webm" type="video/webm" />
        <source src="/SiteOps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default IntelligenceSection
