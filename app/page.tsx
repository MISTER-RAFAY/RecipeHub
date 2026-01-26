"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle the search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to recipes page with the query
      router.push(`/recipes?q=${encodeURIComponent(searchQuery)}`);
    } else {
      // If empty, just go to recipes page
      router.push("/recipes");
    }
  };

  // Allow pressing "Enter" key to search
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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

        {/* SEARCH BAR */}
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
    </div>
  );
}