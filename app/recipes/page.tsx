"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// SAME DATA AS BEFORE
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

export default function RecipesPage() {
  const router = useRouter();
  const [viewedCount, setViewedCount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(14);
  const [isLocked, setIsLocked] = useState(false);
  
  // SAVED LOGIC
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // POPUP STATES
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  
  // UPDATED: Initialize as null instead of empty string to hold the object
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  useEffect(() => {
    // Load Trial Data
    const startDate = localStorage.getItem("trialStartDate");
    const viewed = parseInt(localStorage.getItem("recipesViewed") || "0");
    setViewedCount(viewed);

    if (startDate) {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diffDays = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24)); 
      
      const remaining = 14 - diffDays;
      setDaysLeft(remaining > 0 ? remaining : 0);
      if (diffDays > 14 || viewed >= 3) setIsLocked(true);
    }

    // Load Saved Recipes
    const saved = JSON.parse(localStorage.getItem("savedRecipeIds") || "[]");
    setSavedIds(saved);
  }, []);

  // ❤️ FUNCTION TO TOGGLE SAVE
  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger the view recipe click
    
    let newSaved;
    if (savedIds.includes(id)) {
      newSaved = savedIds.filter(savedId => savedId !== id); // Remove
    } else {
      newSaved = [...savedIds, id]; // Add
    }
    
    setSavedIds(newSaved);
    localStorage.setItem("savedRecipeIds", JSON.stringify(newSaved));
  };

  // UPDATED: Now accepts the whole recipe object instead of just the title
  const handleViewRecipe = (recipe: any) => {
    if (isLocked) {
      setShowLimitModal(true);
      return;
    }
    const newCount = viewedCount + 1;
    localStorage.setItem("recipesViewed", newCount.toString());
    setViewedCount(newCount);
    
    // Store the whole recipe object
    setSelectedRecipe(recipe);
    
    setShowSuccessModal(true);
    if (newCount >= 3) setIsLocked(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* BANNER */}
      <div className={`max-w-7xl mx-auto mb-10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center shadow-sm ${isLocked ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <span className="text-2xl">{isLocked ? "🔒" : "🎁"}</span>
          <div>
            <h3 className={`font-bold ${isLocked ? 'text-red-800' : 'text-green-800'}`}>
              {isLocked ? "Free Trial Ended" : "Free Trial Active"}
            </h3>
            <p className="text-sm text-gray-600">
              {isLocked ? "Limit Reached" : `${daysLeft} days remaining • ${3 - viewedCount} free recipes left`}
            </p>
          </div>
        </div>
        <Link href="/pricing">
          <Button className={`${isLocked ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>
            {isLocked ? "Subscribe Now" : "Upgrade to Premium"}
          </Button>
        </Link>
      </div>

      <div className="text-center max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Our Recipes</h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {RECIPES.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col relative group">
            
            {/* ❤️ SAVE BUTTON (ABSOLUTE POSITION) */}
            <button 
              onClick={(e) => toggleSave(recipe.id, e)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition"
              title="Save Recipe"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transition-colors ${savedIds.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`}
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            <div className="relative h-56 w-full">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=No+Image"; }}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                {recipe.time}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">
                A delicious and authentic dish that is perfect for any meal.
              </p>
              <Button 
                // UPDATED: Pass the entire recipe object here
                onClick={() => handleViewRecipe(recipe)}
                className={`w-full py-6 text-lg font-medium shadow-none transition-all ${isLocked ? "bg-gray-100 text-gray-400" : "bg-green-600 hover:bg-green-700 text-white"}`}
              >
                {isLocked ? "🔒 Locked" : "View Recipe"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALS */}
      {showSuccessModal && selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Unlocked!</h2>
            {/* Display title from the object */}
            <p className="text-green-700 font-bold mb-4">{selectedRecipe.title}</p>
            
            {/* UPDATED: Button now navigates to the specific recipe ID */}
            <Button 
              onClick={() => router.push(`/recipes/${selectedRecipe.id}`)} 
              className="w-full bg-green-600 text-white"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border-t-8 border-red-600">
            <h2 className="text-3xl font-extrabold mb-3">Limit Reached</h2>
            <Link href="/pricing"><Button className="w-full bg-red-600 text-white py-6 text-lg">Unlock Unlimited Access</Button></Link>
            <Button onClick={() => setShowLimitModal(false)} variant="ghost" className="w-full mt-2 text-gray-400">Close</Button>
          </div>
        </div>
      )}

    </div>
  );
}