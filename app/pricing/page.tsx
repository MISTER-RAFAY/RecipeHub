"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth, useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Script from "next/script"; 

// --- LIVE CONFIGURATION ---
const NEXT_PUBLIC_PADDLE_CLIENT_TOKEN = "live_c0406dbc510405cb550a9a385c1";

const plans = [
  {
    id: "monthly",
    paddlePriceId: "pri_01kg6q96e803hyccnyygesqxvc", 
    name: "Monthly",
    price: "$25",
    period: "Billed every month",
    features: ["Unlimited Recipes", "Save Favorites", "Print Support"],
    popular: false,
  },
  {
    id: "six-month",
    paddlePriceId: "pri_01kg6qbda0s20xvsg06sqkwz8x", 
    name: "6 Months",
    price: "$49",
    period: "Save on half-year",
    features: ["Unlimited Recipes", "Save Favorites", "Print Support"],
    popular: true, 
  },
  {
    id: "yearly",
    paddlePriceId: "pri_01kg6qcykr1tgxfhqk2s3jfjbj", 
    name: "Yearly",
    price: "$99",
    period: "Best value for money",
    features: ["Unlimited Recipes", "Save Favorites", "Print Support"],
    popular: false,
  },
  {
    id: "lifetime",
    paddlePriceId: "pri_01kg6qefnc1ajchk7jt155fcet", 
    name: "Lifetime",
    price: "$199",
    period: "One-time payment",
    features: ["Unlimited Recipes", "Save Favorites", "Print Support"],
    popular: false,
  },
];

const PricingPage = () => {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  
  const [activePlanId, setActivePlanId] = useState<string | null>(null);

  // Helper to handle success after payment
  const handlePaymentSuccess = (data: any) => {
    console.log("Payment Successful:", data);

    // Try to find which plan was bought based on the price ID in the transaction
    const purchasedItem = data.items?.[0]; 
    const matchedPlan = plans.find(p => p.paddlePriceId === purchasedItem?.price?.id);
    const planIdToSave = matchedPlan ? matchedPlan.id : "unknown";

    localStorage.setItem("isPremium", "true");
    localStorage.setItem("activePlanId", planIdToSave);
    setActivePlanId(planIdToSave);
    
    alert(`Success! Subscription active.`);
    router.push("/recipes");
  };

  // 1. Initialize Paddle (Billing V2)
  const initPaddle = () => {
    const paddle = (window as any).Paddle;
    if (paddle) {
      // Prevent re-initialization error
      if (!paddle.Initialized) {
        paddle.Initialize({ 
          token: NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
          environment: 'production', 
          eventCallback: function(data: any) {
             if (data.name === "checkout.completed") {
               handlePaymentSuccess(data.data);
             }
          }
        });
      }
    }
  };

  // 2. Check Active Status
  useEffect(() => {
    initPaddle(); 

    if (!isLoaded) return;
    const premiumStatus = localStorage.getItem("isPremium");
    const savedPlanId = localStorage.getItem("activePlanId");

    if (userId && premiumStatus === "true" && savedPlanId) {
      setActivePlanId(savedPlanId);
    } else {
      setActivePlanId(null);
    }
  }, [userId, isLoaded]);

  // --- HANDLE CHECKOUT ---
  const handlePaddleCheckout = (plan: any) => {
    if (!userId) {
      openSignIn();
      return;
    }

    const paddle = (window as any).Paddle;
    if (!paddle) {
      alert("Paddle is loading... please wait a moment.");
      return;
    }

    // Open Paddle Checkout (V2 Syntax)
    paddle.Checkout.open({
      items: [{ priceId: plan.paddlePriceId, quantity: 1 }], 
      customer: {
        email: user?.primaryEmailAddress?.emailAddress || "",
      },
      settings: {
        displayMode: "overlay",
        theme: "light",
        locale: "en"
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Load V2 Script */}
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js" 
        onLoad={initPaddle}
      />

      <div className="container mx-auto max-w-6xl">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Subscription</h1>
            {/* REMOVED THE TEST MODE BADGE HERE */}
            <p className="text-gray-500 mt-2">
              Unlock unlimited access to all recipes.
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/")}>Back to Home</Button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isActive = activePlanId === plan.id;

            return (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-2xl shadow-sm border transition-all duration-300 flex flex-col
                  ${plan.popular ? "border-green-500 shadow-md transform scale-105 md:scale-100 lg:scale-105 z-10" : "border-gray-200 hover:shadow-lg"}
                `}
              >
                {plan.popular && (
                  <div className="bg-green-500 text-white text-center text-xs font-bold py-2 rounded-t-2xl uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="p-8 flex-grow flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">{plan.price}</div>
                  <p className="text-sm text-gray-500 mb-6">{plan.period}</p>

                  <ul className="space-y-3 mb-8 text-left w-full pl-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto w-full">
                    {isActive ? (
                      <Button 
                        disabled 
                        className="w-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-50 font-bold cursor-default"
                      >
                        ✅ Active Plan
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handlePaddleCheckout(plan)}
                        className={`w-full font-bold ${plan.popular ? "bg-green-600 hover:bg-green-700" : "bg-green-800 hover:bg-green-900"}`}
                      >
                        Subscribe
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;