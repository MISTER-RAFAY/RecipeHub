"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock Data
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

const MAX_FREE_RECIPES = 3; // Limit set to 3

export default function RecipesPage() {
  const router = useRouter();
  
  // 1. PREMIUM CHECK (Set to true if user paid)
  const hasActiveSubscription = false; 

  const [viewedCount, setViewedCount] = useState(0);
  const [daysLeft, setDaysLeft] = useState(14);
  const [isLocked, setIsLocked] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // Modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  // ---------------------------------------------------------
  // 2. SYNCHRONIZATION LOGIC (The Magic Part)
  // ---------------------------------------------------------
  const checkAccessStatus = () => {
    // A. Check Time Limit
    let startDate = localStorage.getItem("trialStartDate");
    if (!startDate) {
        startDate = new Date().toISOString();
        localStorage.setItem("trialStartDate", startDate);
    }
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24));
    const remainingDays = 14 - diffDays;
    setDaysLeft(remainingDays > 0 ? remainingDays : 0);

    // B. Check Recipe Count Limit
    const history = JSON.parse(localStorage.getItem("viewedHistoryIds") || "[]");
    const count = history.length;
    setViewedCount(count);

    // C. Determine if Locked
    // Locked if: More than 14 days OR viewed 3 or more recipes
    if (diffDays > 14 || count >= MAX_FREE_RECIPES) {
        setIsLocked(true);
    } else {
        setIsLocked(false);
    }

    // D. Load Saved IDs
    const saved = JSON.parse(localStorage.getItem("savedRecipeIds") || "[]");
    setSavedIds(saved);
  };

  useEffect(() => {
    // Run immediately on load
    checkAccessStatus();

    // Run whenever 'storage' changes (e.g., user opened a recipe in a NEW TAB)
    window.addEventListener("storage", checkAccessStatus);
    
    // Cleanup
    return () => window.removeEventListener("storage", checkAccessStatus);
  }, []);

  // ---------------------------------------------------------
  // HANDLERS
  // ---------------------------------------------------------

  const handleSaveClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasActiveSubscription) {
        setShowPremiumModal(true);
        return;
    }
    let newSaved;
    if (savedIds.includes(id)) {
      newSaved = savedIds.filter(savedId => savedId !== id);
    } else {
      newSaved = [...savedIds, id];
    }
    setSavedIds(newSaved);
    localStorage.setItem("savedRecipeIds", JSON.stringify(newSaved));
    // Trigger storage event manually for other components if needed
    window.dispatchEvent(new Event("storage"));
  };

  const handlePrintClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!hasActiveSubscription) {
          setShowPremiumModal(true);
          return;
      }
      alert("Printing...");
  }

  const handleViewRecipe = (recipe: any) => {
    // Always re-read storage right before deciding to prevent hacks
    const history = JSON.parse(localStorage.getItem("viewedHistoryIds") || "[]");
    
    // 1. If Locked, Stop them immediately
    if (isLocked) {
      setShowLimitModal(true);
      return;
    }

    // 2. If it's a new recipe, add to history
    if (!history.includes(recipe.id)) {
        // Double check limit before adding
        if (history.length >= MAX_FREE_RECIPES) {
            setIsLocked(true);
            setShowLimitModal(true);
            return;
        }

        const newHistory = [...history, recipe.id];
        localStorage.setItem("viewedHistoryIds", JSON.stringify(newHistory));
        
        // Update local state immediately
        setViewedCount(newHistory.length);
        if (newHistory.length >= MAX_FREE_RECIPES) setIsLocked(true);
        
        // Notify other tabs
        window.dispatchEvent(new Event("storage"));
    }

    // 3. Open the recipe
    setSelectedRecipe(recipe);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      
      {/* BANNER STATUS */}
      <div className={`max-w-7xl mx-auto mb-10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center shadow-sm ${isLocked ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <span className="text-2xl">{isLocked ? "🔒" : "🎁"}</span>
          <div>
            <h3 className={`font-bold ${isLocked ? 'text-red-800' : 'text-green-800'}`}>
              {isLocked ? "Free Trial Ended" : "Free Trial Active"}
            </h3>
            <p className="text-sm text-gray-600">
              {isLocked 
                ? "You have used all 3 free recipes. Upgrade to continue." 
                : `${daysLeft} days remaining • ${Math.max(0, MAX_FREE_RECIPES - viewedCount)} free recipes left`}
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
            
            {/* ACTION BUTTONS */}
            <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button onClick={handlePrintClick} className="p-2 rounded-full bg-white/90 shadow-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition" title="Print Recipe">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" /></svg>
                </button>
                <button onClick={(e) => handleSaveClick(recipe.id, e)} className="p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition" title="Save Recipe">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-colors ${savedIds.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
            </div>

            {/* IMAGE AREA */}
            <div className="relative h-56 w-full bg-gray-200">
               {/* Fixed the No Image issue by using a better placeholder service */}
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/600x400?text=Delicious+Food"; }}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
                {recipe.time}
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">A delicious and authentic dish that is perfect for any meal.</p>
              
              {/* VIEW BUTTON - Changes based on Lock Status */}
              <Button 
                onClick={() => handleViewRecipe(recipe)}
                className={`w-full py-6 text-lg font-medium shadow-none transition-all ${isLocked ? "bg-gray-200 text-gray-500 hover:bg-gray-300" : "bg-green-600 hover:bg-green-700 text-white"}`}
              >
                {isLocked ? (
                    <span className="flex items-center gap-2">🔒 Locked</span>
                ) : (
                    "View Recipe"
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODALS --- */}

      {/* 1. VIEW RECIPE SUCCESS */}
      {showSuccessModal && selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Unlocked!</h2>
            <p className="text-green-700 font-bold mb-4">{selectedRecipe.title}</p>
            <Button onClick={() => router.push(`/recipes/${selectedRecipe.id}`)} className="w-full bg-green-600 text-white">Continue to Recipe</Button>
          </div>
        </div>
      )}

      {/* 2. LIMIT REACHED (The Paywall) */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border-t-8 border-red-600 animate-in zoom-in-95 duration-200">
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900">Limit Reached 🔒</h2>
            <p className="text-gray-600 mb-6">You have used all 3 free recipes. To continue exploring and cooking, please upgrade.</p>
            <Link href="/pricing"><Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold shadow-lg">Unlock Unlimited Access</Button></Link>
            <Button onClick={() => setShowLimitModal(false)} variant="ghost" className="w-full mt-2 text-gray-400">Close</Button>
          </div>
        </div>
      )}

      {/* 3. PREMIUM FEATURE (Save/Print) */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center border-t-8 border-yellow-400">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-3xl">💎</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Feature</h2>
            <p className="text-gray-600 mb-6">Saving and printing recipes are exclusive to Premium Members.</p>
            <Link href="/pricing"><Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-6 text-lg">Upgrade Now</Button></Link>
            <Button onClick={() => setShowPremiumModal(false)} variant="ghost" className="w-full mt-2 text-gray-400">Maybe Later</Button>
          </div>
        </div>
      )}

    </div>
  );
}