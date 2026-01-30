"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { useSearchParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { Printer, Heart, Lock, Crown, Search, X } from "lucide-react";

const allRecipes = [
  { 
    id: 1, 
    title: "Mozzarella Sticks", 
    time: "15 min", 
    // 👇 FIX 1: Changed 'ImageSrc' to 'imageSrc' (lowercase i)
    imageSrc: "/mozrella.jpg",
    desc: "Crispy cheesy goodness.", 
    category: "appetizers" 
  },
  { 
    id: 2, 
    title: "Bruschetta", 
    time: "10 min", 
    imageSrc: "/Burchestta.png", 
    desc: "Tomato and basil on toast.", 
    category: "appetizers" 
  },
  { 
    id: 3, 
    title: "Chicken Wings", 
    time: "30 min", 
    imageSrc: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=600&auto=format&fit=crop", 
    desc: "Spicy buffalo wings.", 
    category: "appetizers" 
  },
  { 
    id: 4, 
    title: "Grilled Ribeye Steak", 
    time: "45 min", 
    imageSrc: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop", 
    desc: "Perfectly seared beef.", 
    category: "main-courses" 
  },
  { 
    id: 5, 
    title: "Roast Chicken", 
    time: "60 min", 
    imageSrc: "/Roastchicken.jpg", 
    desc: "Herb crusted whole chicken.", 
    category: "main-courses" 
  },
  { 
    id: 6, 
    title: "Vegetable Lasagna", 
    time: "50 min", 
    imageSrc: "https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=600&auto=format&fit=crop", 
    desc: "Cheesy pasta layers.", 
    category: "main-courses" 
  },
  { 
    id: 7, 
    title: "Spaghetti Bolognese", 
    time: "35 min", 
    imageSrc: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=600&auto=format&fit=crop", 
    desc: "Classic Italian meat sauce.", 
    category: "main-courses" 
  },
  { 
    id: 102, 
    title: "Avocado Toast", 
    time: "10 min", 
    imageSrc: "/Avocado.jpg", 
    desc: "Healthy breakfast choice.", 
    category: "breakfast" 
  },
  { 
    id: 303, 
    title: "Grilled Salmon", 
    time: "25 min", 
    imageSrc: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=600&auto=format&fit=crop", 
    desc: "Rich in Omega-3.", 
    category: "dinner" 
  },
  { 
    id: 401, 
    title: "Lava Cake", 
    time: "40 min", 
    imageSrc: "/Lava.jpg", 
    desc: "Decadent dessert.", 
    category: "desserts" 
  },
];

const RecipesContent = () => {
  const { isLoaded, userId } = useAuth();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get("q") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [isPremium, setIsPremium] = useState(false);
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!userId) {
      setIsPremium(false);
      setCheckedStorage(true);
      return;
    }
    const premiumStatus = localStorage.getItem("isPremium");
    setIsPremium(premiumStatus === "true");
    setCheckedStorage(true);
  }, [isLoaded, userId]); 

  const filteredRecipes = allRecipes.filter((recipe) => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderBanner = () => {
    if (!isLoaded || !checkedStorage) return null; 

    if (userId && isPremium) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shadow-sm">
          <Crown className="text-yellow-600 w-6 h-6" />
          <div>
            <h3 className="font-bold text-yellow-800">Premium Membership Active</h3>
            <p className="text-sm text-yellow-700">You have unlimited access to all recipes!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Lock className="text-blue-600 w-6 h-6" />
          <div>
            <h3 className="font-bold text-blue-900">Unlock All Features</h3>
            <p className="text-sm text-blue-700">
               {userId ? "Upgrade to Premium to view full ingredients." : "Sign up and subscribe to view full ingredients."}
            </p>
          </div>
        </div>
        <Link href="/pricing">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap shadow-md">Subscribe Now</Button>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-12 px-4">
        
        {renderBanner()}

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Explore Recipes</h1>
          
          <div className="relative mt-4 md:mt-0 w-full md:w-80">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Filter recipes..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-9 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
             />
             {searchTerm && (
               <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                 <X className="w-4 h-4" />
               </button>
             )}
          </div>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
             <p className="text-xl text-gray-500">No recipes found for "{searchTerm}"</p>
             <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2 text-green-600">Clear Search</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden group">
                
                <div className="relative h-48 w-full bg-gray-100">
                  {/* 👇 FIX 2: Changed 'Src' to 'src' (lowercase s) */}
                  <Image 
                    src={recipe.imageSrc} 
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                     <div className="bg-white p-2 rounded-full shadow-sm text-gray-400 hover:text-green-600 cursor-pointer transition">
                        <Printer className="w-4 h-4" />
                     </div>
                     <div className="bg-white p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 cursor-pointer transition">
                        <Heart className="w-4 h-4" />
                     </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-700 z-10 shadow-sm">
                    {recipe.time}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{recipe.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{recipe.desc}</p>
                  <Link href={`/categories/${recipe.category}/${recipe.id}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">View Recipe</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const RecipesPage = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading recipes...</div>}>
      <RecipesContent />
    </Suspense>
  );
};

export default RecipesPage;