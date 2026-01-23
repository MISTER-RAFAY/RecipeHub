"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. SAVE THE PREMIUM STATUS
    localStorage.setItem("isPremium", "true");

    // 2. SAVE THE SPECIFIC PLAN ID (Received from Pricing Page URL)
    const planId = searchParams.get("plan");
    if (planId) {
        localStorage.setItem("activePlanId", planId);
    }
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event("storage"));
  }, [searchParams]);

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-green-100 animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-4xl">
          🎉
        </div>

        <h1 className="text-3xl font-extrabold text-green-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Welcome to the club! You have successfully unlocked:
        </p>

        <ul className="text-left text-sm text-gray-600 space-y-3 mb-8 bg-gray-50 p-4 rounded-lg">
            <li className="flex items-center">✅ <strong>Unlimited Access</strong> to all categories</li>
            <li className="flex items-center">✅ <strong>Full Recipe Details</strong> & Ingredients</li>
            <li className="flex items-center">✅ <strong>Save & Print</strong> features unlocked</li>
        </ul>

        <div className="space-y-3">
            <Link href="/categories" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg font-bold shadow-lg">
                  Explore Premium Categories
                </Button>
            </Link>
            <Link href="/" className="block">
                <Button variant="ghost" className="w-full text-gray-500 hover:text-gray-700">
                  Back to Home
                </Button>
            </Link>
        </div>
      </div>
  );
}

export default function SuccessPage() {
  // Wrap in Suspense because useSearchParams causes client-side rendering requirements
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 text-center">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}