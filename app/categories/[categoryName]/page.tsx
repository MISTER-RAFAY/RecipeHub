"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

// 1. DATA (Includes Main Courses and others)
const categoryData: any = {
  "appetizers": [
    { id: 1, title: "Mozzarella Sticks", time: "15 min", img: "bg-red-100", desc: "Crispy cheesy goodness." },
    { id: 2, title: "Bruschetta", time: "10 min", img: "bg-green-100", desc: "Tomato and basil on toast." },
    { id: 3, title: "Chicken Wings", time: "30 min", img: "bg-orange-100", desc: "Spicy buffalo wings." },
  ],
  "main-courses": [
    { id: 4, title: "Grilled Ribeye Steak", time: "45 min", img: "bg-red-200", desc: "Perfectly seared beef with garlic butter." },
    { id: 5, title: "Roast Chicken", time: "60 min", img: "bg-yellow-100", desc: "Herb crusted whole chicken with vegetables." },
    { id: 6, title: "Vegetable Lasagna", time: "50 min", img: "bg-green-100", desc: "Cheesy pasta layers with spinach and marinara." },
    { id: 7, title: "Spaghetti Bolognese", time: "35 min", img: "bg-red-100", desc: "Classic Italian meat sauce over fresh pasta." },
    { id: 8, title: "Beef Tacos", time: "25 min", img: "bg-orange-50", desc: "Seasoned ground beef with fresh salsa." },
  ],
  "breakfast": [
    { id: 101, title: "Fluffy Pancakes", time: "20 min", img: "bg-orange-100", desc: "Classic buttermilk pancakes." },
    { id: 102, title: "Avocado Toast", time: "10 min", img: "bg-green-100", desc: "Healthy start to the day." },
    { id: 103, title: "Omelette Supreme", time: "15 min", img: "bg-yellow-100", desc: "Cheese and veggie packed." },
  ],
  "lunch": [
    { id: 201, title: "Chicken Caesar Salad", time: "25 min", img: "bg-green-100", desc: "Fresh and crunchy." },
    { id: 202, title: "Grilled Cheese", time: "15 min", img: "bg-orange-100", desc: "Melty perfection." },
    { id: 203, title: "Tomato Soup", time: "20 min", img: "bg-red-100", desc: "Creamy and rich." },
  ],
  "dinner": [
    { id: 301, title: "Steak & Potatoes", time: "45 min", img: "bg-red-100", desc: "Hearty meal." },
    { id: 302, title: "Pasta Alfredo", time: "30 min", img: "bg-yellow-100", desc: "Creamy white sauce." },
    { id: 303, title: "Salmon Fillet", time: "25 min", img: "bg-orange-100", desc: "Pan seared with lemon." },
  ],
  "desserts": [
    { id: 401, title: "Chocolate Lava Cake", time: "60 min", img: "bg-amber-900", desc: "Rich and moist." },
    { id: 402, title: "Cheesecake", time: "4 hours", img: "bg-yellow-50", desc: "New York style." },
    { id: 403, title: "Ice Cream Sundae", time: "5 min", img: "bg-pink-100", desc: "Vanilla with sprinkles." },
  ]
};

const CategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const { isLoaded, userId } = useAuth();
  
  const [isPremium, setIsPremium] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Normalize category name
  const rawCategory = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;
  const safeCategory = rawCategory?.toLowerCase() || "";
  
  // Fetch recipes
  const recipes = categoryData[safeCategory] || [];

  // 2. CHECK PREMIUM STATUS
  useEffect(() => {
    if (!isLoaded) return;

    // A. Force Sign In
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    // B. Check Payment Status
    const premiumStatus = localStorage.getItem("isPremium");
    if (premiumStatus === "true") {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
    
    setCheckingStatus(false);
  }, [isLoaded, userId, router]);

  if (!isLoaded || checkingStatus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-500">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="container mx-auto py-12 px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold capitalize text-gray-900">{safeCategory.replace("-", " ")} Recipes</h1>
          <Link href="/categories">
              <Button variant="outline">← Back to Categories</Button>
          </Link>
        </div>

        {/* 
            3. CONTENT AREA (BLURRED IF NOT PREMIUM)
        */}
        <div className={`transition-all duration-300 ${!isPremium ? "blur-md pointer-events-none select-none opacity-60" : ""}`}>
           {recipes.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                 <h2 className="text-2xl text-gray-500">More recipes coming soon!</h2>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {recipes.map((recipe: any) => (
                 <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition">
                   {/* Placeholder Image */}
                   <div className={`h-48 w-full ${recipe.img} flex items-center justify-center text-gray-500 font-bold`}>
                     {recipe.title}
                   </div>
                   
                   <div className="p-6">
                     <div className="flex justify-between items-center mb-2">
                         <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                         <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">⏱ {recipe.time}</span>
                     </div>
                     <p className="text-gray-600 mb-4 text-sm">{recipe.desc}</p>
                     
                     {/* 
                         UPDATED LINK: Points to the new Detail Page
                      */}
                     <Link href={`/categories/${safeCategory}/${recipe.id}`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          View Full Recipe
                        </Button>
                     </Link>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>

        {/* 
            4. THE LOCK OVERLAY (Only shows if NOT Premium)
        */}
        {!isPremium && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pt-20">
            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Premium Content</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                To view recipes in the <strong>{safeCategory.replace("-", " ")}</strong> category, you must be a premium subscriber.
              </p>
              
              <Link href="/pricing" className="block w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-green-500/30 transition-all">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;