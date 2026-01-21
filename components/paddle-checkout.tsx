"use client";

import { useEffect, useState } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useRouter } from "next/navigation";

interface PaddleCheckoutProps {
  planName: string;
  priceId: string;
}

export default function PaddleCheckout({ planName, priceId }: PaddleCheckoutProps) {
  const [paddle, setPaddle] = useState<Paddle>();
  const router = useRouter();

  useEffect(() => {
    initializePaddle({ 
      environment: 'sandbox', 
      // 👇 PASTE YOUR REAL TOKEN HERE (Keep the one you had that works!)
      token: 'test_85ba0ecc9ef60893790b460fdd8', 
      
      // 👇 THIS IS THE FIX: We handle the success here now
      eventCallback: (event) => {
        if (event.name === "checkout.completed") {
          // 1. Close the checkout popup
          // (Note: paddle instance might not be set in state yet, but this runs globally)
          
          // 2. Redirect to success page
          router.push(`/success?plan=${encodeURIComponent(planName)}`);
        }
      }
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, [planName, router]); // Added dependencies to keep it updated

  const handleCheckout = () => {
    if (!paddle) {
      alert("Paddle is loading...");
      return;
    }
    
    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        // successCallback REMOVED because it causes the error
      }
    });
  };

  return (
    <div className="flex flex-col p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{planName}</h3>
      <div className="mt-auto pt-4">
        <button 
          onClick={handleCheckout} 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}