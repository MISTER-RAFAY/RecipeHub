import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const image = formData.get("image") as File | null;
    const file = formData.get("file") as File | null;

    const contentParts: any[] = [];

    // Add image if provided
    if (image) {
      const imageBytes = await image.arrayBuffer();
      const base64Image = Buffer.from(imageBytes).toString("base64");
      const mediaType = image.type as "image/jpeg" | "image/png" | "image/webp";
      contentParts.push({
        type: "image",
        source: {
          type: "base64",
          media_type: mediaType,
          data: base64Image,
        },
      });
    }

    // Add file content if provided
    if (file) {
      const fileText = await file.text();
      contentParts.push({
        type: "text",
        text: `File contents:\n${fileText}\n\n`,
      });
    }

    // Add text message
    contentParts.push({
      type: "text",
      text: message || "What do you see?",
    });

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: `You are RecipeHub's AI assistant — a friendly, expert cooking companion. You help users with:
- Recipe suggestions based on ingredients, photos, or preferences
- Step-by-step cooking instructions
- Calorie calculations and nutritional information
- Meal planning and dietary advice
- Food identification from photos
- Recipe modifications for dietary restrictions

When calculating calories, always provide a breakdown per ingredient and a total.
When identifying food from images, suggest matching recipes from these categories: appetizers, main-courses, breakfast, lunch, dinner, desserts.
Always be encouraging, concise, and practical. Keep responses focused on food and cooking.`,
      messages: [
        {
          role: "user",
          content: contentParts,
        },
      ],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block: any) => block.text)
      .join("");

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}