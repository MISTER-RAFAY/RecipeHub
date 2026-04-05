import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    let userMessage = message || "Hello";

    // Add file content if provided
    if (file) {
      const fileText = await file.text();
      userMessage = `File contents:\n${fileText}\n\n${userMessage}`;
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are RecipeHub's AI assistant — a friendly, expert cooking companion. You help users with:
- Recipe suggestions based on ingredients, photos, or preferences
- Step-by-step cooking instructions
- Calorie calculations and nutritional information
- Meal planning and dietary advice
- Food identification from photos
- Recipe modifications for dietary restrictions

When calculating calories, always provide a breakdown per ingredient and a total.
When identifying food from images, suggest matching recipes from these categories: appetizers, main-courses, breakfast, lunch, dinner, desserts.
Always be encouraging, concise, and practical. Keep responses focused on food and cooking.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      max_tokens: 1024,
    });

    const text = response.choices[0]?.message?.content || "Sorry, I could not generate a response.";

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Chat API error:", error?.message || error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}