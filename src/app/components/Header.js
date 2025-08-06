import React from 'react'

const Header = () => {
  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative transition-transform duration-300 group-hover:scale-110">
              {/* Main Logo Container */}
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg transition-shadow duration-300 group-hover:shadow-2xl border-2 border-gray-800">
                <span className="text-white font-bold text-xl font-heading transition-transform duration-300 group-hover:scale-110">
                  B
                </span>
              </div>
            </div>
          </div>

          {/* Center - bab.ai text with verification */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-baseline gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-heading">
                bab.ai
              </h1>
              {/* Realistic blue verification tick */}
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 translate-y-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
              </svg>
            </div>
          </div>
          <div className="w-12"></div>
        </div>
      </div>
    </header>
  )
}

export default Header
