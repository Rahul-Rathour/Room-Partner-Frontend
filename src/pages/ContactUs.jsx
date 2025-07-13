import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xovlajyo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: new FormData(e.target),
      });

      if (response.ok) {
        setShowModal(true);
        setFormData({ email: '', message: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your message..."
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-block w-full sm:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition duration-200"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-green-600 mb-3">Thank you!</h2>
            <p className="text-gray-700 mb-4">Your message has been sent successfully. We’ll get back to you shortly.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
