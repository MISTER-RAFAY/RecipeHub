"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Clock, Star, ChefHat, Utensils } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/recipes?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/recipes");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Featured recipes
  const featuredRecipes = [
    { id: 4, category: "main-courses", title: "Grilled Ribeye Steak", time: "45 min", tag: "Most Popular", bg: "bg-red-100" },
    { id: 102, category: "breakfast", title: "Avocado Toast", time: "10 min", tag: "Quick & Easy", bg: "bg-green-100" },
    { id: 401, category: "desserts", title: "Chocolate Lava Cake", time: "60 min", tag: "Fan Favorite", bg: "bg-amber-100" },
  ];

  // Category highlights
  const categories = [
    { name: "Breakfast", slug: "breakfast", emoji: "🍳", desc: "Quick morning meals to start your day right" },
    { name: "Main Courses", slug: "main-courses", emoji: "🍖", desc: "Hearty dinners the whole family will love" },
    { name: "Desserts", slug: "desserts", emoji: "🍰", desc: "Sweet treats and indulgent baked goods" },
    { name: "Appetizers", slug: "appetizers", emoji: "🥗", desc: "Perfect starters and party snacks" },
    { name: "Lunch", slug: "lunch", emoji: "🥪", desc: "Easy midday meals ready in minutes" },
    { name: "Dinner", slug: "dinner", emoji: "🍽️", desc: "Delicious evening recipes for every taste" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Discover Your Next <br />
          <span className="text-green-600">Favorite Recipe</span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Explore thousands of delicious recipes from around the world. Find inspiration for your next meal and create unforgettable dining experiences.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto flex gap-2 mb-12 relative">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recipes (e.g. Avocado, Pasta)..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 h-auto text-lg rounded-lg shadow-md transition-transform active:scale-95"
          >
            Search
          </Button>
        </div>

        <Link href="/recipes">
          <Button size="lg" className="text-lg px-8 py-6 bg-green-800 hover:bg-green-900 shadow-xl">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="bg-green-50 border-y border-green-100 py-8 mb-16">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold text-green-700">20+</p>
            <p className="text-gray-600 text-sm mt-1">Delicious Recipes</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-green-700">6</p>
            <p className="text-gray-600 text-sm mt-1">Meal Categories</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-green-700">5 min</p>
            <p className="text-gray-600 text-sm mt-1">Fastest Recipe</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-green-700">100%</p>
            <p className="text-gray-600 text-sm mt-1">Easy to Follow</p>
          </div>
        </div>
      </div>

      {/* Intro / About Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full">Why RecipeHub?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Cook Better, Eat Healthier, Every Day
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            RecipeHub is your ultimate destination for easy, healthy, and delicious recipes. Whether you're a beginner looking for simple weeknight dinners or an experienced home cook searching for new inspiration, we have the perfect recipe for every occasion.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From quick 10-minute breakfasts to impressive dinner party main courses, every recipe comes with step-by-step instructions, a full ingredients list, and helpful tips to make cooking enjoyable and stress-free.
          </p>
        </div>
      </div>

      {/* Featured Recipes */}
      <div className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full">Hand Picked</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Featured Recipes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Our most loved recipes chosen for their incredible flavour, ease of preparation, and popularity among home cooks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/categories/${recipe.category}/${recipe.id}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                  <div className={`h-48 ${recipe.bg} flex items-center justify-center relative`}>
                    <span className="text-6xl">
                      {recipe.category === "main-courses" ? "🥩" : recipe.category === "breakfast" ? "🥑" : "🍫"}
                    </span>
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {recipe.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">{recipe.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.time}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/recipes">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                View All Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Highlights */}
      <div className="container mx-auto px-4 mb-20">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1 rounded-full">Browse by Type</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Explore Recipe Categories</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Find exactly what you're looking for — from easy breakfast ideas to impressive dinner recipes and indulgent desserts.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`}>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-green-200 transition-all duration-300 group cursor-pointer">
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">{cat.name}</h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-green-50 border-y border-green-100 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How RecipeHub Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Get from craving to cooking in just three simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. Search or Browse</h3>
              <p className="text-gray-500 text-sm">Search by ingredient or browse our six meal categories to find the perfect recipe.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. Follow the Steps</h3>
              <p className="text-gray-500 text-sm">Every recipe includes a clear ingredients list and easy step-by-step cooking instructions.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. Cook & Enjoy</h3>
              <p className="text-gray-500 text-sm">Cook with confidence and enjoy a delicious homemade meal every single time.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Start Cooking?</h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          Join RecipeHub today and unlock unlimited access to easy, healthy, and delicious recipes for every meal of the day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/recipes">
            <Button size="lg" className="text-lg px-8 py-6 bg-green-600 hover:bg-green-700 shadow-xl">
              Browse All Recipes
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-green-600 text-green-700 hover:bg-green-50">
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}