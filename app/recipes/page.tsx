"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Dummy data for recipes
const RECIPES = [
  { id: 1, title: "Classic Spaghetti Carbonara", desc: "A Roman pasta dish with eggs, cheese, bacon, and black pepper.", image: "🍝" },
  { id: 2, title: "Avocado Toast Supreme", desc: "Toasted sourdough with smashed avocado and poached eggs.", image: "🥑" },
  { id: 3, title: "Homemade Pizza", desc: "Fresh basil, mozzarella, and tomato sauce on crispy crust.", image: "🍕" },
  { id: 4, title: "Berry Smoothie Bowl", desc: "Mixed berries blended with yogurt and topped with granola.", image: "🫐" },
  { id: 5, title: "Grilled Salmon", desc: "Fresh Atlantic salmon with lemon and herbs.", image: "🐟" },
  { id: 6, title: "Chocolate Lava Cake", desc: "Rich chocolate cake with a molten center.", image: "🍰" },
];

export default function RecipesPage() {
  const router = useRouter();
  const [viewedCount, setViewedCount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(14);
  const [isLocked, setIsLocked] = useState(false);

  // 1. Check User Status on Load
  useEffect(() => {
    const startDate = localStorage.getItem("trialStartDate");
    const viewed = parseInt(localStorage.getItem("recipesViewed") || "0");

    setViewedCount(viewed);

    if (startDate) {
      // Calculate days passed
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diffTime = Math.abs(now - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      const remaining = 14 - diffDays;
      setDaysLeft(remaining);

      // 🔒 LOCK if 14 days passed OR 3 recipes viewed
      if (diffDays > 14 || viewed >= 3) {
        setIsLocked(true);
      }
    }
  }, []);

  // 2. Handle Clicking a Recipe
  const handleViewRecipe = (recipeId: number) => {
    if (isLocked) {
      alert("🔒 Your free trial has ended! Please subscribe to view more.");
      router.push("/pricing");
      return;
    }

    // Increment count
    const newCount = viewedCount + 1;
    localStorage.setItem("recipesViewed", newCount.toString());
    setViewedCount(newCount);

    // If this was the 3rd recipe, lock them out next time
    if (newCount >= 3) {
      setIsLocked(true);
      alert("⚠️ You have used your last free recipe! You must subscribe to view more.");
    } else {
      alert(`✅ Recipe Unlocked! You have ${3 - newCount} free views left.`);
    }

    // In a real app, you would go to /recipes/[id] here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* TRIAL STATUS BANNER */}
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8 rounded shadow-sm">
          <p className="font-bold">Free Trial Status:</p>
          <div className="flex justify-between items-center mt-1">
            <span>📅 {daysLeft > 0 ? `${daysLeft} days remaining` : "Trial Expired"}</span>
            <span className="font-bold">
              {viewedCount >= 3 ? "0 Free views left" : `${3 - viewedCount} Free views left`}
            </span>
          </div>
          {isLocked && (
             <p className="text-red-600 font-bold mt-2">⛔ Limit Reached. <Link href="/pricing" className="underline">Subscribe now</Link></p>
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">All Recipes</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECIPES.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl">
                {recipe.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{recipe.desc}</p>
                
                <Button 
                  onClick={() => handleViewRecipe(recipe.id)}
                  className={`w-full ${isLocked ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isLocked ? "🔒 Subscribe to Unlock" : "View Recipe"}
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
