import React from "react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as your email address when you create an account. 
              We do not store your credit card information on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Payment Processing</h2>
            <p>
              Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. 
              Paddle provides all customer service inquiries and handles returns.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. Cookies</h2>
            <p>
              We use cookies to maintain your login session and save your preferences (like your favorite recipes).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Third-Party Services</h2>
            <p>
              We use Clerk for authentication and Paddle for payments. Please refer to their respective privacy policies for how they handle data.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;