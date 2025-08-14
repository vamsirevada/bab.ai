'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-600">
            <strong>Last Updated:</strong> August 14, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to Bab.ai, your intelligent construction management platform.
              These Terms of Service (&quot;Terms&quot;) govern your use of the Bab.ai platform,
              services, and AI-powered insights. By accessing or using our services,
              you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 mb-6">
              By creating an account, accessing, or using any part of the Bab.ai platform,
              you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service and our Privacy Policy. If you do not agree to these terms,
              you may not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-600 mb-4">
              Bab.ai provides:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>AI-powered construction project management insights</li>
              <li>Vendor management and procurement solutions</li>
              <li>Credit-based purchasing and financing options</li>
              <li>WhatsApp integration for communication</li>
              <li>Project analytics and reporting tools</li>
              <li>Material sourcing and vendor verification services</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts and Registration
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Account Creation
              </h3>
              <p className="text-gray-600 mb-4">
                You must provide accurate, current, and complete information during
                registration. You are responsible for maintaining the confidentiality
                of your account credentials and for all activities under your account.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Eligibility
              </h3>
              <p className="text-gray-600 mb-4">
                You must be at least 18 years old and have the legal capacity to
                enter into contracts. By using our services, you represent and
                warrant that you meet these requirements.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                c. Business Use
              </h3>
              <p className="text-gray-600 mb-4">
                Our services are designed for business and commercial use in the
                construction industry. Personal use is permitted but limited to
                non-commercial construction projects.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Credit and Financial Services
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Credit Facilities
              </h3>
              <p className="text-gray-600 mb-4">
                Bab.ai partners with licensed financial institutions to provide
                credit facilities. Credit approval is subject to our partners&apos;
                terms and conditions, creditworthiness assessment, and regulatory
                compliance.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Trust Score
              </h3>
              <p className="text-gray-600 mb-4">
                Our proprietary Trust Score is based on payment history, business
                details, and order behavior. This score influences credit limits
                and terms but does not guarantee approval.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                c. Financial Responsibility
              </h3>
              <p className="text-gray-600 mb-4">
                You are fully responsible for all credit obligations, interest
                charges, and fees as per the terms agreed with our financial partners.
                Bab.ai acts as a facilitator and is not liable for credit decisions
                or disputes.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Vendor and Procurement Services
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Vendor Network
              </h3>
              <p className="text-gray-600 mb-4">
                We maintain a network of verified vendors for construction materials
                and services. Verification includes business registration, past
                performance, and compliance checks, but does not guarantee quality
                or performance.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Order Processing
              </h3>
              <p className="text-gray-600 mb-4">
                Bab.ai facilitates order placement and communication but is not a
                party to the actual transaction between you and vendors. All contracts,
                warranties, and liabilities are between you and the vendor.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                c. Price Estimates
              </h3>
              <p className="text-gray-600 mb-4">
                Price estimates provided on our platform are indicative and subject
                to change. Final pricing, delivery terms, and specifications must be
                confirmed directly with vendors.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. User Conduct and Prohibited Uses
            </h2>
            <p className="text-gray-600 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Provide false, inaccurate, or misleading information</li>
              <li>Interfere with or disrupt the platform&apos;s functionality</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to access or interact with our services</li>
              <li>Harass, abuse, or harm other users or vendors</li>
              <li>Engage in fraudulent activities or schemes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property Rights
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Platform Content
              </h3>
              <p className="text-gray-600 mb-4">
                All content, features, and functionality of the Bab.ai platform,
                including but not limited to text, graphics, logos, algorithms,
                and software, are owned by Bab.ai and protected by intellectual
                property laws.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. User Content
              </h3>
              <p className="text-gray-600 mb-4">
                You retain ownership of content you submit but grant Bab.ai a
                non-exclusive, worldwide, royalty-free license to use, modify,
                and display such content for providing and improving our services.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Data Protection and Privacy
            </h2>
            <p className="text-gray-600 mb-6">
              Your privacy is important to us. Our collection, use, and protection
              of your personal information is governed by our Privacy Policy, which
              is incorporated into these Terms by reference. We comply with applicable
              data protection laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Disclaimers and Limitations of Liability
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Service Availability
              </h3>
              <p className="text-gray-600 mb-4">
                We strive to maintain platform availability but cannot guarantee
                uninterrupted service. We may experience downtime for maintenance,
                updates, or unforeseen technical issues.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. AI and Automated Services
              </h3>
              <p className="text-gray-600 mb-4">
                Our AI-powered insights and recommendations are provided for
                informational purposes only. You should verify all information
                and make independent decisions regarding your construction projects.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                c. Third-Party Services
              </h3>
              <p className="text-gray-600 mb-4">
                Bab.ai is not responsible for the quality, performance, or actions
                of third-party vendors, financial institutions, or other service
                providers accessed through our platform.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                d. Limitation of Liability
              </h3>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law, Bab.ai shall not be liable
                for any indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits or revenues, whether incurred
                directly or indirectly.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Indemnification
            </h2>
            <p className="text-gray-600 mb-6">
              You agree to indemnify, defend, and hold harmless Bab.ai, its officers,
              directors, employees, and agents from any claims, damages, losses,
              liabilities, and expenses arising from your use of the platform,
              violation of these Terms, or infringement of any rights of another party.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Termination
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Termination by You
              </h3>
              <p className="text-gray-600 mb-4">
                You may terminate your account at any time by contacting our
                support team. Termination does not relieve you of any outstanding
                financial obligations.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Termination by Bab.ai
              </h3>
              <p className="text-gray-600 mb-4">
                We may suspend or terminate your account immediately if you violate
                these Terms, engage in prohibited activities, or pose a risk to
                our platform or other users.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Dispute Resolution
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Governing Law
              </h3>
              <p className="text-gray-600 mb-4">
                These Terms are governed by the laws of India, without regard to
                conflict of law principles.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Arbitration
              </h3>
              <p className="text-gray-600 mb-4">
                Any disputes arising from these Terms or your use of our services
                shall be resolved through binding arbitration in accordance with
                the Arbitration and Conciliation Act, 2015.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these Terms at any time. We will notify
              you of significant changes via email or platform notifications.
              Continued use of our services after changes take effect constitutes
              acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              14. Contact Information
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-gray-600 mb-6">
              <p><strong>Email:</strong> team@bab.ai</p>
              <p><strong>Address:</strong> India</p>
              <p><strong>Phone:</strong> Available via platform support</p>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> These terms are effective as of the last updated
                date shown above. Please review them periodically as they may change.
                Your continued use of Bab.ai constitutes acceptance of any modifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
