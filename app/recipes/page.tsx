"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// ❌ Removed "next/image" import to avoid conflicts

// Real-looking data
const RECIPES = [
  { id: 1, title: "Classic Spaghetti Carbonara", time: "30 min", difficulty: "Medium", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Avocado Toast Supreme", time: "10 min", difficulty: "Easy", image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Homemade Margherita Pizza", time: "45 min", difficulty: "Hard", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Healthy Berry Smoothie", time: "5 min", difficulty: "Easy", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Grilled Atlantic Salmon", time: "25 min", difficulty: "Medium", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4974?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Chocolate Lava Cake", time: "40 min", difficulty: "Medium", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: "Fresh Garden Salad", time: "15 min", difficulty: "Easy", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Juicy Beef Burger", time: "20 min", difficulty: "Medium", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
  { id: 9, title: "Japanese Ramen", time: "60 min", difficulty: "Hard", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80" },
];

export default function RecipesPage() {
  const router = useRouter();
  const [viewedCount, setViewedCount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(14);
  const [isLocked, setIsLocked] = useState(false);
  
  // POPUP STATE
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");

  // 1. CHECK FREE TRIAL STATUS
  useEffect(() => {
    const startDate = localStorage.getItem("trialStartDate");
    const viewed = parseInt(localStorage.getItem("recipesViewed") || "0");
    setViewedCount(viewed);

    if (startDate) {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diffDays = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24)); 
      
      const remaining = 14 - diffDays;
      setDaysLeft(remaining > 0 ? remaining : 0);

      if (diffDays > 14 || viewed >= 3) {
        setIsLocked(true);
      }
    }
  }, []);

  // 2. HANDLE CLICKING A RECIPE
  const handleViewRecipe = (recipeTitle: string) => {
    if (isLocked) {
      if(confirm("🔒 Your free trial limit reached! Subscribe to view unlimited recipes.")) {
        router.push("/pricing");
      }
      return;
    }

    const newCount = viewedCount + 1;
    localStorage.setItem("recipesViewed", newCount.toString());
    setViewedCount(newCount);

    setSelectedRecipe(recipeTitle);
    setShowSuccessModal(true);

    if (newCount >= 3) {
      setIsLocked(true);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* TRIAL STATUS BANNER */}
      <div className={`max-w-7xl mx-auto mb-10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center shadow-sm ${isLocked ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <span className="text-2xl">{isLocked ? "🔒" : "🎁"}</span>
          <div>
            <h3 className={`font-bold ${isLocked ? 'text-red-800' : 'text-green-800'}`}>
              {isLocked ? "Free Trial Ended" : "Free Trial Active"}
            </h3>
            <p className="text-sm text-gray-600">
              {isLocked 
                ? "You have reached your limit." 
                : `${daysLeft} days remaining • ${3 - viewedCount} free recipes left`}
            </p>
          </div>
        </div>
        <Link href="/pricing">
          <Button className={`${isLocked ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>
            {isLocked ? "Subscribe Now" : "Upgrade to Premium"}
          </Button>
        </Link>
      </div>

      {/* HEADER */}
      <div className="text-center max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Our Recipes</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          From quick breakfasts to gourmet dinners, find the perfect dish for any occasion.
        </p>
      </div>

      {/* RECIPE GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {RECIPES.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative h-56 w-full">
              
              {/* ✅ CHANGED TO STANDARD IMG TAG TO FIX BROKEN IMAGES */}
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                {recipe.time}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">
                A delicious and authentic dish that is perfect for any meal.
              </p>

              <Button 
                onClick={() => handleViewRecipe(recipe.title)}
                className={`w-full py-6 text-lg font-medium shadow-none transition-all ${
                  isLocked 
                    ? "bg-gray-100 text-gray-400 hover:bg-gray-200 cursor-not-allowed" 
                    : "bg-green-600 hover:bg-green-700 text-white shadow-green-200 hover:shadow-lg"
                }`}
              >
                {isLocked ? "🔒 Locked" : "View Recipe"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* STYLISH HOVER PAGE (MODAL) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all scale-100 border-4 border-green-50">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
              <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Unlocked!</h2>
            <p className="text-gray-600 mb-2">You have successfully opened:</p>
            <p className="text-green-700 font-bold text-lg mb-6">"{selectedRecipe}"</p>
            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-8">
              <p className="text-sm text-yellow-800 font-medium">Thank you!</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                You have {3 - viewedCount} free {3 - viewedCount === 1 ? 'trial' : 'trials'} left
              </p>
            </div>
            <Button onClick={closeModal} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200">
              Continue to Recipe
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}