"use client";
import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function PaddleCheckout({ priceId, planName }: { priceId: string, planName: string }) {
  const [paddle, setPaddle] = useState<Paddle>();
  const { user } = useUser();

  // 1. Initialize Paddle when page loads
  useEffect(() => {
    initializePaddle({ 
      environment: 'sandbox', // Change to 'production' later
      token: process.env.test_9b7b38bef870e438dd576d90ad3! 
    }).then(
      (paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      }
    );
  }, []);

  // 2. Function to open checkout
  const openCheckout = () => {
    if (!paddle || !user) return alert("Please sign in first");

    paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customData: {
        userId: user.id // We attach the User ID here!
      },
      customer: {
        email: user.primaryEmailAddress?.emailAddress || "",
      }
    });
  };

  return (
    <div className="border p-6 rounded-lg shadow text-center">
      <h3 className="text-xl font-bold">{planName}</h3>
      <Button onClick={openCheckout} className="mt-4 w-full bg-blue-600 text-white">
        Subscribe Now
      </Button>
    </div>
  );
}