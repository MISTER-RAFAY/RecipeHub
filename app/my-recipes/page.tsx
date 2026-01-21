"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Re-using the same image paths from your main page
// In a real app, this would come from a database
const ALL_RECIPES = [
  { id: 1, title: "Classic Spaghetti Carbonara", time: "30 min", difficulty: "Medium", image: "/food/carbonara.jpg" },
  { id: 2, title: "Avocado Toast Supreme", time: "10 min", difficulty: "Easy", image: "/food/avocado.jpg" },
  { id: 3, title: "Homemade Margherita Pizza", time: "45 min", difficulty: "Hard", image: "/food/pizza.jpg" },
  { id: 4, title: "Healthy Berry Smoothie", time: "5 min", difficulty: "Easy", image: "/food/smoothie.jpg" },
  { id: 5, title: "Grilled Atlantic Salmon", time: "25 min", difficulty: "Medium", image: "/food/salmon.jpg" },
  { id: 6, title: "Chocolate Lava Cake", time: "40 min", difficulty: "Medium", image: "/food/cake.jpg" },
  { id: 7, title: "Fresh Garden Salad", time: "15 min", difficulty: "Easy", image: "/food/salad.jpg" },
  { id: 8, title: "Juicy Beef Burger", time: "20 min", difficulty: "Medium", image: "/food/burger.jpg" },
  { id: 9, title: "Japanese Ramen", time: "60 min", difficulty: "Hard", image: "/food/ramen.jpg" },
];

export default function MyRecipesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    // 1. Check if user is logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedInStatus);

    // 2. Load saved recipes from storage
    if (loggedInStatus) {
      const savedIds = JSON.parse(localStorage.getItem("savedRecipeIds") || "[]");
      // Filter the full list to find only the ones the user saved
      const userRecipes = ALL_RECIPES.filter(recipe => savedIds.includes(recipe.id));
      setSavedRecipes(userRecipes);
    }
  }, []);

  // 🔴 VIEW 1: USER IS LOGGED OUT (Your current screenshot)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Recipe Collection</h1>
          <p className="text-gray-600 text-lg">
            Save your favorite recipes, create custom collections, and build your personal cookbook
          </p>
        </div>

        <div className="bg-[#EBF7F3] p-10 rounded-2xl shadow-sm text-center max-w-lg w-full border border-[#D1EBE3]">
          <div className="mx-auto w-16 h-16 bg-[#C4E4D9] rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[#1F4D3C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-8">
            Create an account or sign in to start saving your favorite recipes and building your personal collection.
          </p>

          <Link href="/signin">
            <Button className="w-full bg-[#198055] hover:bg-[#146644] text-white py-6 text-lg rounded-lg">
              Sign In to Save Recipes
            </Button>
          </Link>
          
          <p className="mt-4 text-sm text-gray-500">
            Don't have an account? <Link href="/signup" className="text-[#198055] hover:underline">Sign up here</Link>
          </p>
        </div>
      </div>
    );
  }

  // 🟢 VIEW 2: USER IS LOGGED IN (Show Recipes)
  return (
    <div className="min-h-screen bg-[#FFFDF7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Cookbook</h1>
            <p className="text-gray-600 mt-2">Your personally curated collection of favorites.</p>
          </div>
          <p className="text-[#198055] font-bold text-lg">{savedRecipes.length} Saved</p>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-xl text-gray-500 mb-6">You haven't saved any recipes yet.</p>
            <Link href="/recipes">
              <Button className="bg-[#198055] hover:bg-[#146644] text-white">
                Browse Recipes
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col">
                 <div className="relative h-48 w-full">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
                    />
                 </div>
                 <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <span>⏱️ {recipe.time}</span>
                      <span>📊 {recipe.difficulty}</span>
                    </div>
                    
                    <Link href="/recipes" className="mt-auto">
                      <Button variant="outline" className="w-full border-[#198055] text-[#198055] hover:bg-[#EBF7F3]">
                        View Details
                      </Button>
                    </Link>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}