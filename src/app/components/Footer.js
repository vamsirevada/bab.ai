'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  const isOrderPage = pathname?.includes('/orders/')

  return !isOrderPage ? (
    <footer className="text-gray-dark relative overflow-hidden border-t border-gray-medium/20">
      {/* Background decoration */}
      <div className="absolute inset-0"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-gray-medium/5 rounded-full -translate-y-32 -translate-x-32"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gray-medium/5 rounded-full translate-y-24 translate-x-24"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Left Side - Company Info & Social Media */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-dark mb-3 sm:mb-4 font-heading">
                bab.ai
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed mb-4 sm:mb-6 max-w-md font-body">
                Transforming WhatsApp into intelligent construction management
                platform. AI-powered insights for smarter project decisions.
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-dark mb-3 sm:mb-4 font-heading">
                Follow Us
              </h4>
              <div className="flex space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20 text-gray-dark hover:bg-gray-light/20 transition-all duration-300 shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20 text-gray-dark hover:bg-gray-light/20 transition-all duration-300 shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-medium/20 text-gray-dark hover:bg-gray-light/20 transition-all duration-300 shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                  </svg>
                </a>
              </div>

              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-medium/20">
                    <svg
                      className="w-4 h-4 text-gray-dark"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-medium font-body">Email</p>
                    <p className="text-sm font-medium text-gray-dark font-body">
                      team@bab.ai
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 border border-gray-medium/20">
                    <svg
                      className="w-4 h-4 text-gray-dark"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-medium font-body">
                      Location
                    </p>
                    <p className="text-sm font-medium text-gray-dark font-body">
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Newsletter */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <div className="bg-gray-light/20 p-6 rounded-lg border border-gray-medium/20 shadow-sm">
              <h5 className="text-md font-semibold text-gray-dark mb-3 font-heading">
                Stay Connected
              </h5>
              <p className="text-gray-medium text-sm mb-4 font-body">
                Get the latest updates on new features, product insights, and
                construction industry trends.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white text-gray-dark rounded-l-lg border border-gray-medium/30 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm font-body"
                />
                <button className="px-6 py-3 bg-gray-dark text-white rounded-r-lg hover:bg-gray-medium transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md font-body">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-medium mt-2 font-body">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-medium/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-medium text-sm font-body">
              <p>bab.ai@2025</p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-medium hover:text-brand-primary transition-colors duration-200 font-body"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-medium hover:text-brand-primary transition-colors duration-200 font-body"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-gray-medium hover:text-brand-primary transition-colors duration-200 font-body"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  ) : null
}

export default Footer
