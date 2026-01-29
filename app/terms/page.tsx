import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using RecipeHub ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Subscriptions & Payments</h2>
            <p>
              We use <strong>Paddle</strong> as our Merchant of Record. By subscribing to our service, you agree to Paddle's Checkout User Terms. 
              Payments are billed in advance on a recurring basis (Monthly, Yearly) or as a one-time payment (Lifetime) depending on your plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the security of your account. You must not share your login credentials. 
              We reserve the right to terminate accounts that violate our usage policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Intellectual Property</h2>
            <p>
              All recipes, images, and content provided on RecipeHub are the property of RecipeHub. You may not redistribute or resell our content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at recipehub120@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;