import { clerkClient } from "@clerk/nextjs/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const signature = req.headers.get("paddle-signature") || "";
  const rawBody = await req.text();
  const secret = process.env.PADDLE_WEBHOOK_SECRET;

  if (!secret) return new Response("Secret missing", { status: 500 });

  const body = JSON.parse(rawBody);
  const eventType = body.event_type; 
  const customData = body.data.custom_data;
  const userId = customData?.userId;

  if (userId && eventType === "transaction.completed") {
    
    // 1. FIX: Get the client instance first
    const client = await clerkClient();

    // 2. FIX: Use the client instance to update the user
    await client.users.updateUser(userId, {
      privateMetadata: {
        isPremium: true,
        planType: "paddle_pro"
      }
    });

    console.log(`User ${userId} is now Premium!`);
  }

  return new Response("OK", { status: 200 });
}