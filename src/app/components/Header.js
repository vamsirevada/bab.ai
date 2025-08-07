import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-center">
          {/* Center - Logo and bab.ai text with verification */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="relative transition-transform duration-300 group-hover:scale-110">
              {/* Main Logo Container */}
              <div className="w-10 h-10 bg-brand-dark rounded-full flex items-center justify-center shadow-lg transition-shadow duration-300 group-hover:shadow-2xl border-2 border-gray-dark">
                <span className="text-brand-light font-bold text-lg font-heading transition-transform duration-300 group-hover:scale-110">
                  C
                </span>
              </div>
            </div>

            {/* bab.ai text with verification */}
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark font-heading leading-none">
                bab.ai
              </h1>
              <Image
                src="/assets/icons/blue-verified.svg"
                alt="Verified badge"
                width={16}
                height={16}
                className="flex-shrink-0 mt-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
