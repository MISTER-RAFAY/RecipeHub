import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-24 px-4 text-center min-h-screen bg-white">
      {/* Hero Text */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 tracking-tight">
        Discover Your Next
      </h1>
      <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6 tracking-tight">
        Favorite Recipe
      </h1>
      
      <p className="text-gray-600 max-w-2xl text-lg mb-10 leading-relaxed">
        Explore thousands of delicious recipes from around the world.
        Find inspiration for your next meal and create unforgettable
        dining experiences.
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-2xl gap-2 mb-10">
        <div className="relative flex-1">
          <div className="absolute left-3 top-3.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search for recipes, ingredients, or cuisines..." 
            className="w-full border border-gray-200 bg-gray-50 rounded-md px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-green-600 transition-all"
          />
        </div>
        <Button className="bg-green-700 hover:bg-green-800 text-white px-8 h-auto font-medium">
          Search
        </Button>
      </div>

      {/* Get Started Button */}
      <Link href="/recipes">
        <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white px-8 py-6 text-lg font-bold rounded-md">
          Get Started
        </Button>
      </Link>
    </div>
  );
}