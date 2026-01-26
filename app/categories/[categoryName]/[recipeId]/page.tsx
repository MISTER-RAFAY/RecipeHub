"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Printer, Heart, Share2, Check } from "lucide-react"; // Install lucide-react if needed

// --- FULL DATA SOURCE (Populated Main Courses & Others) ---
const extendedRecipeData: any = {
  "appetizers": [
    { 
      id: 1, title: "Mozzarella Sticks", time: "15 min", img: "bg-red-100", 
      ingredients: ["12 Mozzarella sticks", "2 eggs", "1 cup breadcrumbs", "1 cup flour", "Oil for frying"],
      instructions: ["Freeze cheese sticks for 30 mins.", "Coat in flour, then egg, then crumbs.", "Deep fry until golden brown.", "Serve hot with marinara."]
    },
    { 
      id: 2, title: "Bruschetta", time: "10 min", img: "bg-green-100",
      ingredients: ["French baguette", "4 tomatoes (diced)", "Fresh basil", "2 cloves garlic", "Olive Oil", "Balsamic glaze"],
      instructions: ["Slice and toast the bread.", "Mix diced tomatoes, chopped basil, minced garlic, and olive oil.", "Spoon mixture onto bread.", "Drizzle with balsamic glaze."]
    },
    { 
      id: 3, title: "Chicken Wings", time: "30 min", img: "bg-orange-100",
      ingredients: ["2 lbs chicken wings", "1 cup Buffalo sauce", "2 tbsp Butter", "1 tsp Garlic powder"],
      instructions: ["Bake wings at 400°F (200°C) for 25-30 mins.", "Melt butter and mix with buffalo sauce.", "Toss cooked wings in the sauce.", "Serve with ranch or blue cheese."]
    },
  ],
  "main-courses": [
    { 
      id: 4, title: "Grilled Ribeye Steak", time: "45 min", img: "bg-red-200",
      ingredients: ["1 Ribeye steak (1 inch thick)", "Fresh Rosemary", "Fresh Thyme", "3 tbsp Butter", "2 Garlic cloves", "Salt & Pepper"],
      instructions: ["Let steak reach room temperature and season heavily with salt/pepper.", "Sear in a hot skillet for 3-4 mins per side.", "Add butter, garlic, and herbs; baste the steak.", "Let rest for 10 mins before slicing."]
    },
    { 
      id: 5, title: "Roast Chicken", time: "60 min", img: "bg-yellow-100",
      ingredients: ["1 Whole chicken", "1 Lemon", "3 Carrots", "4 Potatoes", "Herb butter"],
      instructions: ["Preheat oven to 375°F.", "Place chopped veggies in a roasting pan.", "Rub chicken with herb butter and stuff with lemon.", "Roast for 1 hour or until internal temp reaches 165°F."]
    },
    { 
      id: 6, title: "Vegetable Lasagna", time: "50 min", img: "bg-green-100",
      ingredients: ["Lasagna noodles", "Spinach", "Ricotta cheese", "Marinara sauce", "Mozzarella", "Zucchini"],
      instructions: ["Boil noodles until al dente.", "Layer sauce, noodles, ricotta, and veggies in a baking dish.", "Top with mozzarella.", "Bake at 375°F for 40 mins."]
    },
    { 
      id: 7, title: "Spaghetti Bolognese", time: "35 min", img: "bg-red-100",
      ingredients: ["Spaghetti pasta", "1lb Ground beef", "1 Onion", "2 tbsp Tomato paste", "1 can Crushed tomatoes"],
      instructions: ["Cook pasta according to package.", "Brown beef with chopped onions.", "Stir in tomato paste and crushed tomatoes; simmer for 15 mins.", "Toss pasta with sauce and serve."]
    },
    { 
      id: 8, title: "Beef Tacos", time: "25 min", img: "bg-orange-50",
      ingredients: ["1lb Ground beef", "Taco seasoning packet", "Taco shells", "Lettuce", "Cheddar Cheese", "Salsa"],
      instructions: ["Brown the beef in a skillet.", "Add seasoning and a splash of water; simmer.", "Warm the taco shells.", "Assemble tacos with beef and toppings."]
    },
  ],
  "breakfast": [
    { 
      id: 101, title: "Fluffy Pancakes", time: "20 min", img: "bg-orange-100",
      ingredients: ["2 cups Flour", "1.5 cups Milk", "2 Eggs", "2 tsp Baking powder", "Maple syrup"],
      instructions: ["Whisk wet and dry ingredients separately, then combine.", "Pour batter onto a hot, buttered griddle.", "Flip when bubbles form on top.", "Serve warm with syrup."]
    },
    { 
      id: 102, title: "Avocado Toast", time: "10 min", img: "bg-green-100",
      ingredients: ["2 slices Sourdough bread", "1 Ripe avocado", "Red chili flakes", "Lemon juice", "Sea Salt"],
      instructions: ["Toast the bread until golden.", "Mash avocado with lemon juice and salt.", "Spread generously on toast.", "Sprinkle with chili flakes."]
    },
    { 
      id: 103, title: "Omelette Supreme", time: "15 min", img: "bg-yellow-100",
      ingredients: ["3 Eggs", "1/4 cup Bell peppers", "1/4 cup Onions", "Cheddar cheese", "Diced Ham"],
      instructions: ["Whisk eggs in a bowl.", "Sauté peppers, onions, and ham in a pan.", "Pour eggs over veggies.", "Add cheese, fold, and cook until set."]
    },
  ],
  "lunch": [
    { 
      id: 201, title: "Chicken Caesar Salad", time: "25 min", img: "bg-green-100",
      ingredients: ["Romaine lettuce", "1 Grilled chicken breast", "Croutons", "Parmesan shavings", "Caesar dressing"],
      instructions: ["Wash and chop lettuce.", "Slice the warm grilled chicken.", "Toss lettuce with dressing and croutons.", "Top with chicken and parmesan."]
    },
    { 
      id: 202, title: "Grilled Cheese", time: "15 min", img: "bg-orange-100",
      ingredients: ["2 slices Sourdough bread", "Cheddar cheese", "Gruyere cheese", "2 tbsp Butter"],
      instructions: ["Butter the outside of each bread slice.", "Place cheese between slices.", "Grill in a pan on medium heat.", "Flip and cook until golden and melted."]
    },
    { 
      id: 203, title: "Tomato Soup", time: "20 min", img: "bg-red-100",
      ingredients: ["1 can Whole tomatoes", "1/2 cup Heavy cream", "1 Onion", "2 cloves Garlic", "Fresh Basil"],
      instructions: ["Sauté onion and garlic.", "Add tomatoes and simmer for 15 mins.", "Blend until smooth.", "Stir in heavy cream and basil."]
    },
  ],
  "dinner": [
    { 
      id: 301, title: "Steak & Potatoes", time: "45 min", img: "bg-red-100",
      ingredients: ["Sirloin steak", "Baby potatoes", "Butter", "Parsley", "Garlic"],
      instructions: ["Roast potatoes in oven at 400°F.", "Pan sear steak 3 mins per side.", "Combine in pan with butter.", "Garnish with parsley."]
    },
    { 
      id: 302, title: "Pasta Alfredo", time: "30 min", img: "bg-yellow-100",
      ingredients: ["Fettuccine pasta", "1 cup Heavy cream", "1 cup Parmesan cheese", "Butter", "Nutmeg"],
      instructions: ["Cook pasta.", "Melt butter and cream in a skillet.", "Whisk in cheese until smooth.", "Toss pasta in sauce."]
    },
    { 
      id: 303, title: "Salmon Fillet", time: "25 min", img: "bg-orange-100",
      ingredients: ["Salmon fillet", "Lemon slices", "Fresh Dill", "Asparagus", "Olive oil"],
      instructions: ["Season salmon with salt and dill.", "Sear in pan skin-side down for 5 mins.", "Flip and cook 2 more mins.", "Serve with steamed asparagus."]
    },
  ],
  "desserts": [
    { 
      id: 401, title: "Chocolate Lava Cake", time: "60 min", img: "bg-amber-900",
      ingredients: ["Dark chocolate", "Butter", "2 Eggs", "Sugar", "1 tbsp Flour"],
      instructions: ["Melt chocolate and butter.", "Whisk eggs and sugar until pale.", "Fold in chocolate and flour.", "Bake in ramekins at 400°F for 12 mins (center should be soft)."]
    },
    { 
      id: 402, title: "Cheesecake", time: "4 hours", img: "bg-yellow-50",
      ingredients: ["Cream cheese", "Graham cracker crumbs", "Sugar", "3 Eggs", "Vanilla extract"],
      instructions: ["Mix crumbs and butter; press into pan.", "Beat cream cheese and sugar; add eggs.", "Pour over crust.", "Bake at 325°F for 50 mins, then chill."]
    },
    { 
      id: 403, title: "Ice Cream Sundae", time: "5 min", img: "bg-pink-100",
      ingredients: ["Vanilla ice cream", "Chocolate syrup", "Whipped cream", "Maraschino Cherries", "Sprinkles"],
      instructions: ["Scoop 3 scoops of ice cream into a bowl.", "Drizzle generously with chocolate syrup.", "Top with whipped cream and sprinkles.", "Add a cherry on top."]
    },
  ]
};

const RecipeDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { isLoaded, userId } = useAuth();
  
  const [isPremium, setIsPremium] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [isSaved, setIsSaved] = useState(false); // State for save button

  // Normalize params
  const rawCategory = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;
  const safeCategory = rawCategory?.toLowerCase() || "";
  
  const rawId = Array.isArray(params.recipeId) ? params.recipeId[0] : params.recipeId;
  const recipeId = Number(rawId);

  // Find Recipe
  const categoryRecipes = extendedRecipeData[safeCategory] || [];
  const recipe = categoryRecipes.find((r: any) => r.id === recipeId);

  // Check Premium Status
  useEffect(() => {
    if (!isLoaded) return;
    
    // Check Premium status from LocalStorage
    const premiumStatus = localStorage.getItem("isPremium");
    if (premiumStatus === "true") {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
    
    // Check if recipe was previously saved (Mock implementation)
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    if (savedRecipes.includes(recipeId)) {
      setIsSaved(true);
    }

    setCheckingStatus(false);
  }, [isLoaded, userId, recipeId]);

  // --- HANDLERS ---

  const handlePrint = () => {
    if (!userId) {
      // Redirect to sign in if not logged in
      router.push("/sign-in");
      return;
    }
    window.print();
  };

  const handleSave = () => {
    if (!userId) {
      // Redirect to sign in if not logged in
      router.push("/sign-in");
      return;
    }

    // Toggle save state
    const newState = !isSaved;
    setIsSaved(newState);

    // Mock saving to local storage
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    if (newState) {
      savedRecipes.push(recipeId);
    } else {
      const index = savedRecipes.indexOf(recipeId);
      if (index > -1) savedRecipes.splice(index, 1);
    }
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  };

  if (!isLoaded || checkingStatus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-500">Loading recipe...</p>
      </div>
    );
  }

  // Handle Recipe Not Found
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Recipe not found</h2>
        <p className="text-gray-500 mb-6">We couldn't find a recipe with ID {recipeId} in {safeCategory}.</p>
        <Link href={`/categories/${safeCategory}`}>
          <Button className="bg-green-600 hover:bg-green-700">Back to {safeCategory}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      
      {/* PREMIUM LOCK OVERLAY */}
      {!isPremium && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-50/95 backdrop-blur-sm pt-20">
           <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100 animate-in zoom-in-95">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Premium Recipe</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Unlock full access to ingredients and instructions for <strong>{recipe.title}</strong>.
              </p>
              <Link href="/pricing" className="block w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg">
                  Subscribe to Unlock
                </Button>
              </Link>
              <Link href={`/categories/${safeCategory}`} className="block mt-4 text-sm text-gray-500 hover:underline">
                  Cancel and go back
              </Link>
            </div>
        </div>
      )}

      {/* RECIPE CONTENT (Blurred if not premium) */}
      <div className={`container mx-auto py-12 px-4 max-w-4xl transition-all duration-500 ${!isPremium ? "blur-md overflow-hidden h-screen" : ""}`}>
        
        {/* Navigation - Hidden when printing */}
        <div className="flex justify-between items-center mb-6 print:hidden">
            <Link href={`/categories/${safeCategory}`}>
               <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-gray-600">← Back to {safeCategory}</Button>
            </Link>

            {/* ACTION BUTTONS (Save / Print) */}
            <div className="flex gap-2">
                <Button 
                  onClick={handleSave} 
                  variant="outline" 
                  className={`flex items-center gap-2 ${isSaved ? "bg-red-50 text-red-600 border-red-200" : "text-gray-600"}`}
                >
                  {isSaved ? <Heart className="fill-current w-4 h-4" /> : <Heart className="w-4 h-4" />}
                  {isSaved ? "Saved" : "Save"}
                </Button>
                
                <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                   <Printer className="w-4 h-4" />
                   Print
                </Button>
            </div>
        </div>

        {/* Hero Section */}
        <div className={`w-full h-80 ${recipe.img} rounded-3xl flex items-center justify-center mb-8 shadow-inner relative overflow-hidden print:h-40 print:border`}>
           <div className="absolute inset-0 bg-black/10"></div>
           <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold text-gray-800 bg-white/80 px-8 py-4 rounded-xl backdrop-blur-md shadow-sm text-center">
             {recipe.title}
           </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-10 print:block">
          
          {/* Left Column: Details & Ingredients */}
          <div className="md:col-span-1 space-y-8 print:mb-8">
             <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm print:bg-white print:border-gray-200">
                <h3 className="font-bold text-green-800 mb-4 uppercase tracking-wide text-xs">Overview</h3>
                <div className="space-y-3 text-sm">
                   <div className="flex justify-between border-b border-green-100 pb-2">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-semibold text-gray-900">{recipe.time}</span>
                   </div>
                   <div className="flex justify-between border-b border-green-100 pb-2">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold text-gray-900 capitalize">{safeCategory}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-gray-600">Servings:</span>
                      <span className="font-semibold text-gray-900">2-4 People</span>
                   </div>
                </div>
             </div>

             <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  Ingredients
                </h3>
                <ul className="space-y-3">
                  {recipe.ingredients?.map((item: string, index: number) => (
                    <li key={index} className="flex items-start text-gray-700 text-sm md:text-base">
                      {/* Bullet point - hidden on print for cleaner list */}
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 print:bg-black"></span>
                      {item}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Right Column: Instructions */}
          <div className="md:col-span-2">
             <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">
               Step-by-Step Instructions
             </h3>
             <div className="space-y-8">
               {recipe.instructions?.map((step: string, index: number) => (
                 <div key={index} className="flex group print:mb-4">
                    <div className="flex-shrink-0 mr-5">
                       <div className="w-10 h-10 rounded-full bg-gray-100 text-green-700 border border-green-200 flex items-center justify-center font-bold text-lg group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 print:border-black print:text-black print:bg-white">
                         {index + 1}
                       </div>
                    </div>
                    <div>
                      <p className="text-gray-700 leading-relaxed text-lg">{step}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;