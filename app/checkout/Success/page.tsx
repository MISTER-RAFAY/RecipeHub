"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 🟢 CRITICAL: This activates Premium Mode
    // In a real production app, you would use a Database Webhook here.
    // For now, we save it to the browser to unlock the features immediately.
    localStorage.setItem("userPlan", "premium");
    
    // Clear the view limits so they have unlimited access
    localStorage.setItem("recipesViewed", "0");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full">
        <div className="mx-auto bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl">🎉</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 text-lg mb-8">
          You are now a <strong>Premium Member</strong>. You have unlimited access to all recipes and features.
        </p>

        <Link href="/recipes">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all shadow-lg shadow-green-200">
            Start Cooking
          </button>
        </Link>
      </div>
    </div>
  );
}