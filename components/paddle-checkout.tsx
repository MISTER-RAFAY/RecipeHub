"use client";

import { useEffect, useState } from 'react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

interface PaddleCheckoutProps {
  planName: string;
  priceId: string;
}

export default function PaddleCheckout({ planName, priceId }: PaddleCheckoutProps) {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    // 👇 LOGGING TO HELP DEBUG
    console.log("Initializing Paddle with ID:", priceId);

    initializePaddle({ 
      environment: 'sandbox', 
      // ⚠️ DOUBLE CHECK: Does this token start with 'test_'?
      token: 'test_XXXXXXXXXXXXXXXXXXXXXXXXX', // <--- PASTE YOUR REAL TOKEN HERE
      eventCallback: (event) => {
        // 👇 THIS WILL PRINT THE ERROR TO YOUR CONSOLE
        console.log("Paddle Event:", event); 
      }
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
          console.log("Paddle Loaded Successfully");
        } else {
          console.error("Paddle failed to load.");
        }
      },
    );
  }, []);

  const handleCheckout = () => {
    if (!paddle) {
      alert("Paddle is loading... wait 2 seconds.");
      return;
    }
    
    console.log("Opening checkout for:", priceId);
    
    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        successUrl: "https://recipe-hub-sepia.vercel.app" // Redirect after payment
      }
    });
  };

  return (
    <div className="flex flex-col p-6 bg-white border rounded-xl shadow-sm">
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