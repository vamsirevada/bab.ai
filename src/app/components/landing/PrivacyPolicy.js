import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">
            <strong>Last Updated:</strong> July 20, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Bab.ai is committed to safeguarding your privacy and ensuring
              transparency in how we handle your personal information. This
              policy outlines the nature of data collected during your
              interaction with our assistant on messaging platforms, its
              intended use, and your rights in controlling it.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We collect only the data essential to delivering a functional and
              responsive user experience.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                a. Conversation Data
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Messages, images, documents, or media you actively send</li>
                <li>
                  Structured responses or button selections initiated by you
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                b. Session Metadata
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Your phone number (used solely to manage your session)</li>
                <li>
                  Profile name and profile image, if shared by the platform
                </li>
              </ul>
            </div>

            <p className="text-gray-600 mb-6 italic">
              <strong>Note:</strong> We do not collect contact lists, device
              identifiers, background activity, or unsolicited metadata.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Deliver contextually accurate responses to your queries</li>
              <li>
                Maintain continuity of your active session (e.g., construction
                project details)
              </li>
              <li>Improve the responsiveness and quality of user assistance</li>
            </ul>

            <div className="mb-6">
              <p className="text-gray-900 font-semibold mb-2">We do not:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Use your data for advertising, profiling, or analytics</li>
                <li>
                  Send unsolicited messages or trigger outreach without user
                  action
                </li>
                <li>Share your data with unauthorized third parties</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Data Access & Retention
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Access is limited to authorized Bab.ai personnel</li>
              <li>
                Infrastructure providers operate under secure data-processing
                agreements
              </li>
            </ul>
            <p className="text-gray-600 mb-6">
              <strong>Data Retention:</strong> Inactive session data is
              automatically purged after a limited duration. You may request
              deletion at any time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Data Security Measures
            </h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>TLS/SSL encryption for all data in transit</li>
              <li>Role-based access control and audit logs</li>
              <li>
                Hosting on secure, standards-compliant cloud infrastructure
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Your Rights & Controls
            </h2>
            <p className="text-gray-600 mb-4">
              Bab.ai empowers users with full control over their data. At any
              time, you may:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Choose not to share optional information</li>
              <li>End your interaction and close the session</li>
              <li>
                Request full deletion of all data associated with your session
              </li>
            </ul>
            <p className="text-gray-600 mb-6">
              We will never act unless you initiate interaction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Data Deletion Policy
            </h2>
            <p className="text-gray-600 mb-4">
              In accordance with Meta&apos;s Platform Terms and industry best
              practices, we honor all user requests for permanent data deletion.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                What Can Be Deleted:
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  Messages, documents, and interaction logs tied to your phone
                  number
                </li>
                <li>Associated metadata and session records</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How to Request Data Deletion:
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Via WhatsApp:</strong> Send the phrase{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    Delete my data
                  </code>{' '}
                  from your original phone number.
                </li>
                <li>
                  <strong>Via Email:</strong> Email{' '}
                  <a
                    href="mailto:privacy@bab-ai.com"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    privacy@bab-ai.com
                  </a>{' '}
                  with your phone number.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Timeline:
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Initial processing within 48 hours</li>
                <li>Full deletion from backups within 7 business days</li>
              </ul>
            </div>

            <p className="text-gray-600 mb-6">
              <strong>Important:</strong> Deletion is irreversible and applies
              only to verified requests from the same phone number used during
              the interaction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Policy Updates
            </h2>
            <p className="text-gray-600 mb-6">
              This policy may be updated to reflect service improvements or
              regulatory changes. All updates will be posted at{' '}
              <a
                href="https://www.bab-ai.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                www.bab-ai.com/privacy
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have questions or concerns:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                <strong>Bab.ai Privacy Team</strong>
                <br />
                📧{' '}
                <a
                  href="mailto:team@bab-ai.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  team@bab-ai.com
                </a>
                <br />
                🌐{' '}
                <a
                  href="https://www.bab-ai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  www.bab-ai.com
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
              Bab.ai @ 2025 | All Rights Reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
