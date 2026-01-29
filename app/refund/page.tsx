import React from "react";

const RefundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
        
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Money-Back Guarantee</h2>
            <p>
              We want you to be satisfied with RecipeHub. If you are not happy with the service, 
              we offer a full refund within <strong>14 days</strong> of your initial purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How to Request a Refund</h2>
            <p>
              To request a refund, please contact our support team at <strong>recipehub120@gmail.com</strong> or use the Paddle customer support link found on your email receipt.
            </p>
            <p className="mt-2">
              Please include your <strong>Order ID</strong> (starts with #) in your email to speed up the process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing Time</h2>
            <p>
              Refunds are processed by Paddle and usually take 5-10 business days to appear on your bank statement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;