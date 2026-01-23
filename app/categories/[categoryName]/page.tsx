"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// 1. Mock Data for demonstration
const recipesData = [
  { id: 1, title: "Classic Delight", time: "30 min", cal: "400 kcal", img: "bg-orange-100" },
  { id: 2, title: "Spicy Special", time: "45 min", cal: "550 kcal", img: "bg-red-100" },
  { id: 3, title: "Healthy Bowl", time: "20 min", cal: "320 kcal", img: "bg-green-100" },
  { id: 4, title: "Chef's Choice", time: "60 min", cal: "600 kcal", img: "bg-yellow-100" },
];

const CategoryDetailPage = () => {
  const params = useParams();
  const categoryName = params.categoryName; // Gets 'breakfast', 'lunch', etc.

  // 2. State to simulate if user is premium (Set to FALSE to see the lock screen)
  const [isPremium, setIsPremium] = useState(false); 

  return (
    <div className="container mx-auto py-12 px-4 relative min-h-screen">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold capitalize mb-2">{categoryName} Recipes</h1>
        <p className="text-gray-600">Here are the top rated recipes for {categoryName}</p>
      </div>

      {/* 
         THE CONTENT AREA 
         If user is NOT premium, we add a 'blur' effect and disable clicks 
      */}
      <div className={`${!isPremium ? "blur-md pointer-events-none select-none" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipesData.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-lg border p-4">
              {/* Fake Image Placeholder */}
              <div className={`h-40 w-full rounded-md mb-4 ${recipe.img} flex items-center justify-center text-gray-400`}>
                Recipe Image
              </div>
              
              <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{recipe.time} • {recipe.cal}</p>
              
              {/* Detail Text */}
              <p className="text-gray-600 text-sm mb-4">
                A delicious recipe perfectly curated for your {categoryName} needs. 
                Full ingredients list and steps included.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm font-semibold border">
                  💾 Save
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm font-semibold border">
                  🖨️ Print
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
         THE PREMIUM LOCK OVERLAY 
         This only shows if isPremium is false
      */}
      {!isPremium && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pt-20">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-lg border border-gray-200">
            <div className="mb-4 text-5xl">🔒</div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Premium Content</h2>
            <p className="text-gray-600 mb-8">
              To view these exclusive <strong>{categoryName}</strong> recipes, save them to your cookbook, or print them, you need to unlock full access.
            </p>
            
            <div className="space-y-3">
              <Link href="/pricing" className="block w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                Upgrade to Premium
              </Link>
              
              <div className="flex justify-center gap-4 text-sm mt-4">
                <Link href="/signin" className="text-green-600 font-semibold hover:underline">
                  Sign In
                </Link>
                <span className="text-gray-400">|</span>
                <Link href="/signup" className="text-green-600 font-semibold hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryDetailPage;