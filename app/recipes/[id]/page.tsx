"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ---------------------------------------------------------
// 🥘 FULL RECIPE DATA
// ---------------------------------------------------------
const RECIPES = [
  { 
    id: 1, 
    title: "Classic Spaghetti Carbonara", 
    time: "30 min", 
    difficulty: "Medium", 
    image: "/product/mozrella.jpg", 
    description: "A Roman classic! Creamy, peppery, and rich without using any actual cream. The sauce is made from fresh eggs, hard cheese, cured pork, and black pepper.",
    ingredients: ["400g Spaghetti", "200g Guanciale or Pancetta", "4 large fresh Eggs", "100g Pecorino Romano", "Black Pepper"],
    instructions: ["Boil pasta.", "Fry guanciale.", "Whisk eggs and cheese.", "Combine hot pasta with egg mixture away from heat."]
  },
  { 
    id: 2, 
    title: "Avocado Toast Supreme", 
    time: "10 min", 
    difficulty: "Easy", 
    image: "/food/avocado.jpg", 
    description: "The perfect breakfast. Crunchy sourdough topped with creamy, zesty avocado and a kick of chili flakes.",
    ingredients: ["2 slices Sourdough", "1 Avocado", "Lemon juice", "Chili Flakes", "Olive Oil"],
    instructions: ["Toast bread.", "Mash avocado with seasonings.", "Spread on toast.", "Top with chili flakes and oil."]
  },
  { 
    id: 3, 
    title: "Homemade Margherita Pizza", 
    time: "45 min", 
    difficulty: "Hard", 
    image: "/food/pizza.jpg", 
    description: "Neapolitan-style pizza with a thin, airy crust, tangy tomato sauce, and fresh mozzarella cheese.",
    ingredients: ["Pizza Dough", "San Marzano Tomato Sauce", "Fresh Mozzarella", "Basil Leaves", "Olive Oil"],
    instructions: ["Stretch dough.", "Add sauce and cheese.", "Bake at high heat (500°F) for 8-10 mins.", "Top with basil."]
  },
  { id: 4, title: "Healthy Berry Smoothie", time: "5 min", difficulty: "Easy", image: "/food/smoothie.jpg", description: "A power-packed smoothie loaded with antioxidants.", ingredients: ["Mixed Berries", "Banana", "Yogurt", "Milk"], instructions: ["Blend all ingredients until smooth."] },
  { id: 5, title: "Grilled Atlantic Salmon", time: "25 min", difficulty: "Medium", image: "/food/salmon.jpg", description: "Tender, flaky salmon fillets with a crispy skin.", ingredients: ["Salmon Fillets", "Garlic", "Butter", "Lemon", "Parsley"], instructions: ["Pan sear salmon skin-side down.", "Flip and baste with butter and garlic."] },
  { id: 6, title: "Chocolate Lava Cake", time: "40 min", difficulty: "Medium", image: "/food/cake.jpg", description: "Decadent dessert with a molten chocolate center.", ingredients: ["Dark Chocolate", "Butter", "Eggs", "Sugar", "Flour"], instructions: ["Melt chocolate/butter.", "Whisk eggs/sugar.", "Combine and bake for 12 mins."] },
  { id: 7, title: "Fresh Garden Salad", time: "15 min", difficulty: "Easy", image: "/food/salad.jpg", description: "Light, crisp, and refreshing salad.", ingredients: ["Mixed Greens", "Cucumber", "Tomatoes", "Feta Cheese", "Vinaigrette"], instructions: ["Chop veggies.", "Toss with dressing.", "Top with cheese."] },
  { id: 8, title: "Juicy Beef Burger", time: "20 min", difficulty: "Medium", image: "/food/burger.jpg", description: "Classic American cheeseburger.", ingredients: ["Ground Beef", "Brioche Bun", "Cheddar Cheese", "Lettuce/Tomato", "Sauce"], instructions: ["Grill patties.", "Melt cheese.", "Toast buns.", "Assemble burger."] },
  { id: 9, title: "Japanese Ramen", time: "60 min", difficulty: "Hard", image: "/food/ramen.jpg", description: "Rich, umami-packed noodle soup.", ingredients: ["Ramen Noodles", "Pork Broth", "Soy Sauce", "Soft-boiled Egg", "Chashu Pork"], instructions: ["Simmer broth.", "Cook noodles.", "Assemble bowl with toppings."] },
];

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  // LOGIN STATE
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
  const [actionType, setActionType] = useState(""); 

  const recipeId = parseInt(params.id);
  const recipe = RECIPES.find((r) => r.id === recipeId);

  // CHECK LOGIN STATUS
  useEffect(() => {
    const user = localStorage.getItem("user_token") || localStorage.getItem("isLoggedIn");
    if (user) {
        setIsLoggedIn(true);
    }
  }, []);

  if (!recipe) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="mb-4">Recipe not found.</p>
            <Link href="/recipes" className="text-blue-500 underline">Go Back</Link>
        </div>
    );
  }

  // 🔴 UPDATED HANDLER LOGIC (THE FIX IS HERE)
  const handleAction = (type: string) => {
    if (isLoggedIn) {
        // ✅ USER IS LOGGED IN
        if (type === "Print") {
            window.print();
        } else {
            // ----------------------------------------------------
            // 1. SAVE TO LOCAL STORAGE (The Missing Part)
            // ----------------------------------------------------
            const currentSaved = JSON.parse(localStorage.getItem("savedRecipeIds") || "[]");
            
            // Only add if it's not already saved
            if (!currentSaved.includes(recipeId)) {
                const newSaved = [...currentSaved, recipeId];
                localStorage.setItem("savedRecipeIds", JSON.stringify(newSaved));
            }

            // 2. Show Success Alert
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000); 
        }
    } else {
        // ❌ USER IS NOT LOGGED IN
        setActionType(type);
        setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Back Button */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <Link href="/recipes" className="text-green-600 font-bold hover:underline">
            ← Back to All Recipes
          </Link>
          <span className={`text-xs px-2 py-1 rounded-full ${isLoggedIn ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {isLoggedIn ? "Status: Signed In" : "Status: Guest"}
          </span>
        </div>

        {/* Recipe Image */}
        <div className="relative h-96 w-full">
            <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
            onError={(e) => { 
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/800x400?text=No+Image"; 
            }}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Recipe Content */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
                <div className="flex gap-4 text-sm text-gray-500 font-medium mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">⏱️ {recipe.time}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">📊 {recipe.difficulty}</span>
                </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
                <button 
                    onClick={() => handleAction("Save")}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all font-medium text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Save
                </button>
                <button 
                    onClick={() => handleAction("Print")}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all font-medium text-gray-700"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                </button>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">{recipe.description}</p>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Ingredients</h3>
                <ul className="space-y-3 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                            <span className="text-green-500 mr-2 font-bold">•</span> {ingredient}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">Instructions</h3>
                <ol className="space-y-6">
                    {recipe.instructions.map((step, index) => (
                        <li key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                            <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                        </li>
                    ))}
                </ol>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ SUCCESS ALERT */}
      {showSuccessAlert && (
        <div className="fixed top-10 right-10 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div>
                <h4 className="font-bold">Success!</h4>
                <p className="text-sm">Recipe has been saved to your cookbook.</p>
            </div>
        </div>
      )}

      {/* 🔒 AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform scale-100">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🔒</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Account Required</h2>
            <p className="text-gray-500 mb-6">
                You must be logged in to <span className="font-bold text-gray-800">{actionType}</span> this recipe. 
                <br/>Join our community to unlock full features!
            </p>
            <div className="flex flex-col gap-3">
                <Link href="/login" className="w-full">
                    <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all">Sign In</button>
                </Link>
                <Link href="/signup" className="w-full">
                    <button className="w-full py-3 px-4 bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-xl font-bold transition-all">Create Free Account</button>
                </Link>
            </div>
            <button onClick={() => setShowAuthModal(false)} className="mt-6 text-sm text-gray-400 hover:text-gray-600 font-medium">No thanks, I'll do this later</button>
          </div>
        </div>
      )}

    </div>
  );
}