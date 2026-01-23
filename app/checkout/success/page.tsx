"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // 1. SAVE THE PREMIUM STATUS
    // This tells the rest of your app (Pricing, Categories, Recipes) that the user paid.
    localStorage.setItem("isPremium", "true");
    
    // Optional: Trigger a storage event so other open tabs update immediately
    window.dispatchEvent(new Event("storage"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 text-center">
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
    </div>
  );
}