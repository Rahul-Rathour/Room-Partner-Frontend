import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 pt-28 pb-16 px-4 sm:px-6 lg:px-24 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Effective Date: July 13, 2025
        </p>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to RoomPartner. This Privacy Policy describes how we collect, use, and protect your personal information when you use our platform. Your privacy is very important to us.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Personal details (name, email address, contact info)</li>
            <li>Usage data (pages visited, time spent)</li>
            <li>Device information (IP address, browser type)</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We use your data to provide and improve our services, personalize your experience, communicate with you, and ensure platform security.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">4. Cookies & Tracking</h2>
          <p className="text-gray-600 leading-relaxed">
            We use cookies and similar technologies to analyze traffic and enhance your experience. You can manage your cookie preferences in your browser settings.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">5. Information Sharing</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell your data. We may share it with trusted third-party services (e.g., payment processors, analytics) strictly for operational purposes.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">6. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement strict security measures to protect your data from unauthorized access, alteration, or disclosure.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">7. Your Choices & Rights</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>You can access, update, or delete your personal data anytime.</li>
            <li>You can unsubscribe from emails or disable cookies.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">8. Updates to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Effective Date."
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">9. Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, feel free to <Link to="/contact" className="text-green-600 hover:underline">contact us</Link>.
          </p>
        </section>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
