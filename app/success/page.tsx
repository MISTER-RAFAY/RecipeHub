"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Subscription"; // Gets the plan name from URL

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center border border-green-100">
        
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        
        <div className="bg-gray-50 p-4 rounded-lg my-6 border border-gray-200">
          <p className="text-sm text-gray-500 uppercase tracking-wide">Current Plan</p>
          <p className="text-xl font-bold text-green-700">{plan}</p>
        </div>

        <div className="text-left text-sm text-gray-600 bg-yellow-50 p-4 rounded mb-6 border border-yellow-100">
          <p className="font-bold text-yellow-800 mb-1">⚠️ Renewal Notice:</p>
          <p>
            Your plan is now active. Please note that at the end of your billing cycle, 
            <strong> you must complete a repayment to renew your plan</strong> and keep access to premium recipes.
          </p>
        </div>

        <Link href="/recipes">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
            Start Cooking
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}