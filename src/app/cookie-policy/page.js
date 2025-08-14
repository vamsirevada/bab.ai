'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CookiePolicy = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600">
            <strong>Last Updated:</strong> August 14, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              This Cookie Policy explains how Bab.ai uses cookies and similar
              technologies to recognize you when you visit our platform. It
              explains what these technologies are, why we use them, and your
              rights to control our use of them.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. What Are Cookies?
            </h2>
            <p className="text-gray-600 mb-6">
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. They are widely used by
              website owners to make their websites work more efficiently and
              provide reporting information. Cookies set by the website owner
              are called &quot;first-party cookies.&quot; Cookies set by parties
              other than the website owner are called &quot;third-party
              cookies.&quot;
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Why Do We Use Cookies?
            </h2>
            <p className="text-gray-600 mb-4">
              We use cookies for several reasons:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>To ensure our platform functions properly and securely</li>
              <li>To remember your preferences and settings</li>
              <li>
                To analyze how our platform is used and improve user experience
              </li>
              <li>To provide personalized content and recommendations</li>
              <li>To maintain your login session</li>
              <li>To prevent fraud and enhance security</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Types of Cookies We Use
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Essential Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies are strictly necessary for the operation of our
                platform. They enable core functionality such as security,
                network management, and accessibility. Without these cookies,
                services you have asked for cannot be provided.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Examples:</strong> Authentication cookies, security
                  cookies, load balancing cookies, preference cookies
                </p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Performance Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies collect information about how visitors use our
                platform, such as which pages are visited most often and if
                users get error messages. This data helps us improve how our
                platform works.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Examples:</strong> Google Analytics, error tracking,
                  page load time measurement
                </p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                c. Functionality Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies allow our platform to remember choices you make
                and provide enhanced, more personal features. They may be set by
                us or by third-party providers whose services we have added to
                our pages.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Examples:</strong> Language preferences, region
                  settings, dashboard customization, vendor preferences
                </p>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                d. Targeting/Advertising Cookies
              </h3>
              <p className="text-gray-600 mb-4">
                These cookies are used to deliver content more relevant to you
                and your interests. They may be used to deliver targeted
                advertising or to limit the number of times you see an
                advertisement.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Examples:</strong> Google Ads, Facebook Pixel,
                  LinkedIn Insight Tag, retargeting pixels
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Third-Party Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              We work with trusted third-party service providers who may place
              cookies on your device. These include:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Analytics Services
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>Google Analytics:</strong> Helps us understand how
                  users interact with our platform
                </li>
                <li>
                  <strong>Hotjar:</strong> Provides heatmaps and user session
                  recordings
                </li>
                <li>
                  <strong>Mixpanel:</strong> Tracks user events and behaviors
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Communication Tools
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>WhatsApp Business API:</strong> Enables seamless
                  communication with vendors
                </li>
                <li>
                  <strong>Intercom:</strong> Provides customer support chat
                  functionality
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Security and Fraud Prevention
              </h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>Cloudflare:</strong> Provides security and performance
                  optimization
                </li>
                <li>
                  <strong>reCAPTCHA:</strong> Protects against spam and abuse
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. How Long Do Cookies Stay on My Device?
            </h2>
            <p className="text-gray-600 mb-4">
              The length of time a cookie stays on your device depends on its
              type:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>
                <strong>Session Cookies:</strong> Temporary cookies that are
                deleted when you close your browser
              </li>
              <li>
                <strong>Persistent Cookies:</strong> Remain on your device for a
                set period (typically 30 days to 2 years)
              </li>
              <li>
                <strong>Authentication Cookies:</strong> Usually expire after 30
                days of inactivity
              </li>
              <li>
                <strong>Preference Cookies:</strong> May last up to 1 year to
                remember your settings
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Your Cookie Choices
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Browser Settings
              </h3>
              <p className="text-gray-600 mb-4">
                Most web browsers allow you to control cookies through their
                settings. You can typically:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>View cookies stored on your device</li>
                <li>Delete existing cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block third-party cookies</li>
                <li>Delete all cookies when you close the browser</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Platform Cookie Settings
              </h3>
              <p className="text-gray-600 mb-4">
                When you first visit our platform, you will see a cookie consent
                banner where you can choose which types of cookies to accept.
                You can change your preferences at any time by accessing the
                cookie settings in your account dashboard.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                c. Opt-Out Tools
              </h3>
              <p className="text-gray-600 mb-4">
                You can opt out of certain third-party cookies using these
                tools:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                <li>
                  <strong>Google Analytics:</strong>{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-blue-600 hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  <strong>Google Ads:</strong>{' '}
                  <a
                    href="https://adssettings.google.com"
                    className="text-blue-600 hover:underline"
                  >
                    Google Ad Settings
                  </a>
                </li>
                <li>
                  <strong>Industry Opt-out:</strong>{' '}
                  <a
                    href="http://www.aboutads.info/choices/"
                    className="text-blue-600 hover:underline"
                  >
                    Digital Advertising Alliance
                  </a>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Impact of Disabling Cookies
            </h2>
            <p className="text-gray-600 mb-4">
              While you have the right to disable cookies, please note that
              doing so may affect your experience on our platform:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Some features may not work properly or at all</li>
              <li>You may need to re-enter information more frequently</li>
              <li>
                Personalized content and recommendations may not be available
              </li>
              <li>We may not be able to remember your preferences</li>
              <li>Security features may be compromised</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Mobile Applications
            </h2>
            <p className="text-gray-600 mb-6">
              Our mobile applications may use similar technologies to cookies,
              such as SDKs (Software Development Kits) and local storage. These
              serve similar purposes to cookies and are governed by this policy.
              You can control these through your device settings or app
              preferences.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Updates to This Policy
            </h2>
            <p className="text-gray-600 mb-6">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on our platform and updating the
              &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Cookie Policy or our use of
              cookies, please contact us:
            </p>
            <div className="text-gray-600 mb-6">
              <p>
                <strong>Email:</strong> team@bab.ai
              </p>
              <p>
                <strong>Subject Line:</strong> Cookie Policy Inquiry
              </p>
              <p>
                <strong>Address:</strong> India
              </p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Quick Cookie Settings
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                Manage your cookie preferences:
              </p>
              <div className="space-y-2">
                <button className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md bg-white text-blue-700 hover:bg-blue-50 text-sm">
                  Manage Cookie Preferences
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md bg-white text-blue-700 hover:bg-blue-50 text-sm ml-2">
                  Accept All Cookies
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-blue-300 rounded-md bg-white text-blue-700 hover:bg-blue-50 text-sm ml-2">
                  Reject Non-Essential
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> This Cookie Policy is part of our Privacy
                Policy and Terms of Service. By using our platform, you
                acknowledge that you have read and understood this policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy
