import React from 'react'

const IntelligenceSection = () => {
  return (
    <div
      className="w-full pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 lg:px-8"
      data-next-section
    >
      <div className="container mx-auto max-w-7xl">
        {/* Animated Highlight Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-charcoal mb-8 font-heading flex items-center justify-center gap-4 flex-wrap">
            <span>No</span>
            <span className="text-brand-primary">Guesswork</span>
            <span className="text-brand-charcoal">,</span>
            <span className="text-brand-primary">Smart</span>
            <span className="text-brand-charcoal">Limits</span>
          </div>
          <p className="text-lg sm:text-xl text-brand-charcoal/70 max-w-2xl mx-auto font-body">
            Start using AI-powered construction management instantly on WhatsApp
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 transition-all duration-1000 transform opacity-100 translate-y-0'
        }`}
        >
          {/* Procurement AI */}
          <div className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-brand-primary/20 bg-gradient-to-br from-brand-primary/5 to-brand-white hover:from-brand-primary/10 hover:to-brand-white hover:border-brand-primary/30 rounded-2xl h-80">
            {/* Procurement Video */}
            <div className="relative w-full h-full overflow-hidden">
              <video
                className="w-full h-full object-cover"
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

              {/* Video Overlay - Shows on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-primary/90 to-brand-primary/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 backdrop-blur-sm">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl">
                    <p className="text-brand-white text-center leading-relaxed text-base font-medium font-body mb-3">
                      &quot;Gets instant quotes from vendors, compares prices,
                      generates purchase orders, and tracks deliveries&quot;
                    </p>
                    <div className="w-12 h-0.5 bg-white/60 mx-auto rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Key Feature - Positioned at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-md rounded-xl py-4 px-5 shadow-xl border border-white/20 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                <div className="text-base font-bold text-brand-charcoal font-body tracking-wide">
                  Your Purchase Manager
                </div>
                <div className="text-xs text-brand-primary font-medium mt-1 uppercase tracking-widest">
                  In Your Pocket
                </div>
              </div>
            </div>
          </div>

          {/* Credit */}
          <div className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-brand-charcoal/20 bg-gradient-to-br from-brand-charcoal/5 to-brand-white hover:from-brand-charcoal/10 hover:to-brand-white hover:border-brand-charcoal/30 rounded-2xl h-80">
            {/* Credit Video */}
            <div className="relative w-full h-full overflow-hidden">
              <video
                className="w-full h-full object-cover"
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

              {/* Video Overlay - Shows on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal/95 via-brand-charcoal/90 to-brand-charcoal/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 backdrop-blur-sm">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl">
                    <p className="text-brand-white text-center leading-relaxed text-base font-medium font-body mb-3">
                      &quot;No Guesswork. Smart limits. Simple terms. Releases
                      credit straight to vendors.&quot;
                    </p>
                    <div className="w-12 h-0.5 bg-white/60 mx-auto rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Key Feature - Positioned at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-md rounded-xl py-4 px-5 shadow-xl border border-white/20 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                <div className="text-base font-bold text-brand-charcoal font-body tracking-wide">
                  Your Personal Banker
                </div>
                <div className="text-xs text-brand-charcoal font-medium mt-1 uppercase tracking-widest">
                  Instant Credit
                </div>
              </div>
            </div>
          </div>
          {/* SiteOps AI */}
          <div className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-functional-success/20 bg-gradient-to-br from-functional-success/5 to-brand-white hover:from-functional-success/10 hover:to-brand-white hover:border-functional-success/30 rounded-2xl h-80">
            {/* SiteOps Video */}
            <div className="relative w-full h-full overflow-hidden">
              <video
                className="w-full h-full object-cover"
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
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-functional-success text-brand-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm font-body animate-pulse">
                  Coming Soon
                </div>
              </div>

              {/* Video Overlay - Shows on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-functional-success/95 via-functional-success/90 to-functional-success/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-6 backdrop-blur-sm">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl">
                    <p className="text-brand-white text-center leading-relaxed text-base font-medium font-body mb-3">
                      &quot;Tracks work, people, and progress smartly. Provides
                      in detail analysis and suggestions.&quot;
                    </p>
                    <div className="w-12 h-0.5 bg-white/60 mx-auto rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Key Feature - Positioned at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-white/95 backdrop-blur-md rounded-xl py-4 px-5 shadow-xl border border-white/20 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                <div className="text-base font-bold text-brand-charcoal font-body tracking-wide">
                  Your Site Supervisor
                </div>
                <div className="text-xs text-functional-success font-medium mt-1 uppercase tracking-widest">
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
