"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

export default function PricingPage() {
  const [paddle, setPaddle] = useState<Paddle>();

  // ✅ YOUR PRICE IDs (Kept from your code)
  const PRICES = {
    monthly: "pri_01kfec2bwrj3vwzfe8q1hqbdjp",
    sixMonth: "pri_01kfegd2ez4j54kbw05dp33abc",
    yearly: "pri_01kfeg7cm6p22p39g6aasem41a",
    lifetime: "pri_01kfeg9zfeqckjyj2q7r5ktj4t",
  };

  // 1. Initialize Paddle
  useEffect(() => {
    initializePaddle({ 
      environment: 'sandbox', 
      // ⚠️ REPLACE THIS WITH YOUR PADDLE CLIENT TOKEN (From Paddle Dashboard > Developer Tools > Authentication)
      token: 'test_85ba0ecc9ef60893790b460fdd8' 
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      }
    );
  }, []);

  // 2. Function to Open Checkout
  const openCheckout = (priceId: string) => {
    if (!paddle) {
      alert("Paddle is still loading... please wait a moment.");
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "light",
        // 🟢 CRITICAL: Redirects to the success page to unlock Premium
        successUrl: "http://localhost:3000/checkout/success", 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with Back Button */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Choose Your Plan</h1>
            <p className="text-gray-500 mt-2">Unlock unlimited access to all recipes.</p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      {/* The Pricing Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Monthly Plan */}
        <PricingCard 
          title="Monthly" 
          price="$49" 
          description="Billed every month"
          onClick={() => openCheckout(PRICES.monthly)}
        />

        {/* 6 Month Plan */}
        <PricingCard 
          title="6 Months" 
          price="$99" 
          description="Save on half-year"
          onClick={() => openCheckout(PRICES.sixMonth)}
          highlight
        />

        {/* Yearly Plan */}
        <PricingCard 
          title="Yearly" 
          price="$199" 
          description="Best value for money"
          onClick={() => openCheckout(PRICES.yearly)}
        />

        {/* Lifetime Plan */}
        <PricingCard 
          title="Lifetime" 
          price="$499" 
          description="One-time payment"
          onClick={() => openCheckout(PRICES.lifetime)}
        />

      </div>
    </div>
  ); 
}

// Simple internal component to keep the code clean
function PricingCard({ title, price, description, onClick, highlight = false }: any) {
    return (
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border transition-all hover:scale-105 duration-300 flex flex-col ${highlight ? 'border-green-500 ring-2 ring-green-500 ring-offset-2' : 'border-gray-200'}`}>
            {highlight && <div className="bg-green-500 text-white text-center text-xs font-bold py-1 uppercase tracking-wide">Most Popular</div>}
            <div className="p-8 flex-grow flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <div className="mt-4 mb-2">
                    <span className="text-4xl font-extrabold text-gray-900">{price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-6">{description}</p>
                
                <ul className="text-left text-sm text-gray-600 space-y-3 mb-8 w-full px-4">
                    <li className="flex items-center">✅ Unlimited Recipes</li>
                    <li className="flex items-center">✅ Save Favorites</li>
                    <li className="flex items-center">✅ Print Support</li>
                </ul>

                <Button 
                    onClick={onClick} 
                    className={`w-full font-bold py-6 ${highlight ? 'bg-green-600 hover:bg-green-700' : ''}`}
                >
                    Subscribe
                </Button>
            </div>
        </div>
    )
}