"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs"; // 1. Import Clerk Hook

// ---------------------------------------------------------
// 🥘 SAME RECIPE DATA (To ensure images load)
// ---------------------------------------------------------
const RECIPES = [
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
  // 2. GET USER STATUS FROM CLERK
  const { isLoaded, isSignedIn } = useUser();
  
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [isLoadingStorage, setIsLoadingStorage] = useState(true);

  useEffect(() => {
    // Only load data if Clerk is done loading and user is signed in
    if (isLoaded && isSignedIn) {
      const savedIds = JSON.parse(localStorage.getItem("savedRecipeIds") || "[]");
      const filtered = RECIPES.filter((r) => savedIds.includes(r.id));
      setSavedRecipes(filtered);
      setIsLoadingStorage(false);
    } else if (isLoaded && !isSignedIn) {
      // If loaded but not signed in, stop loading (display locked screen)
      setIsLoadingStorage(false);
    }
  }, [isLoaded, isSignedIn]); // Run this whenever auth status changes

  // ---------------------------------------------------------
  // 3. SHOW LOADING SPINNER WHILE CHECKING AUTH
  // ---------------------------------------------------------
  if (!isLoaded || isLoadingStorage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 4. IF NOT SIGNED IN -> SHOW LOCKED SCREEN
  // ---------------------------------------------------------
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">My Cookbook</h1>
            <p className="text-gray-500 mb-8 text-lg">
                Please sign in to view your saved recipes and manage your personal collection.
            </p>
            
            <div className="flex flex-col gap-3">
                <Link href="/sign-in" className="w-full">
                    <button className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition-all">
                        Sign In
                    </button>
                </Link>
                <Link href="/sign-up" className="w-full">
                    <button className="w-full py-3 px-6 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-xl font-bold text-lg transition-all">
                        Create Free Account
                    </button>
                </Link>
            </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // 5. IF SIGNED IN -> SHOW RECIPES
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">My Cookbook</h1>
                <p className="text-gray-500 mt-2">Your personally curated collection of favorites.</p>
            </div>
            <span className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg">
                {savedRecipes.length} Saved
            </span>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-gray-500 mb-4">You haven't saved any recipes yet.</h3>
            <Link href="/recipes">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold transition-all">
                    Browse Recipes
                </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                <div className="relative h-56 w-full">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = "https://placehold.co/600x400?text=No+Image"; 
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                    {recipe.time}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
                  <div className="flex gap-2 mb-6">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">{recipe.difficulty}</span>
                  </div>
                  <Link href={`/recipes/${recipe.id}`} className="mt-auto">
                    <button className="w-full py-3 border border-green-600 text-green-600 hover:bg-green-50 rounded-xl font-bold transition-all">
                        View Details
                    </button>
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