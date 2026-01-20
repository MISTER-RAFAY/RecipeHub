"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function RecipesPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      setSearchTerm(searchQuery)
    }
  }, [searchParams])

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Vegetarian", "Quick & Easy"]

  const recipes = [
    {
      id: 1,
      title: "Mediterranean Quinoa Bowl",
      image: "/mediterranean-quinoa-bowl-with-vegetables.jpg",
      category: "Lunch",
      cookTime: "25 min",
      difficulty: "Easy",
      rating: 4.8,
      description: "A healthy and colorful bowl packed with fresh vegetables, quinoa, and Mediterranean flavors.",
    },
    {
      id: 2,
      title: "Creamy Mushroom Risotto",
      image: "/creamy-mushroom-risotto-in-white-bowl.jpg",
      category: "Dinner",
      cookTime: "35 min",
      difficulty: "Medium",
      rating: 4.9,
      description: "Rich and creamy risotto with wild mushrooms and fresh herbs.",
    },
    {
      id: 3,
      title: "Thai Basil Chicken",
      image: "/spicy-thai-basil-chicken-stir-fry.jpg",
      category: "Dinner",
      cookTime: "20 min",
      difficulty: "Easy",
      rating: 4.7,
      description: "Spicy and aromatic Thai stir-fry with fresh basil and tender chicken.",
    },
    {
      id: 4,
      title: "French Beef Bourguignon",
      image: "/classic-french-beef-bourguignon-stew.jpg",
      category: "Dinner",
      cookTime: "2h 30min",
      difficulty: "Hard",
      rating: 4.9,
      description: "Classic French stew with tender beef braised in red wine.",
    },
    {
      id: 5,
      title: "Chocolate Berry Dessert",
      image: "/chocolate-berry-dessert.png",
      category: "Dessert",
      cookTime: "15 min",
      difficulty: "Easy",
      rating: 4.6,
      description: "Decadent chocolate dessert topped with fresh berries.",
    },
    {
      id: 6,
      title: "Fresh Breakfast Bowl",
      image: "/fruit-breakfast-bowl.png",
      category: "Breakfast",
      cookTime: "10 min",
      difficulty: "Easy",
      rating: 4.5,
      description: "Nutritious breakfast bowl with fresh fruits and granola.",
    },
    {
      id: 7,
      title: "Garden Fresh Salad",
      image: "/fresh-lunch-salad-with-protein.jpg",
      category: "Lunch",
      cookTime: "15 min",
      difficulty: "Easy",
      rating: 4.4,
      description: "Crisp salad with seasonal vegetables and protein.",
    },
    {
      id: 8,
      title: "Vegetarian Delight",
      image: "/colorful-vegetarian-dish-with-vegetables.jpg",
      category: "Vegetarian",
      cookTime: "30 min",
      difficulty: "Medium",
      rating: 4.7,
      description: "Colorful vegetarian dish packed with seasonal vegetables.",
    },
    {
      id: 9,
      title: "Quick Pasta Special",
      image: "/quick-pasta-dish-in-pan.jpg",
      category: "Quick & Easy",
      cookTime: "15 min",
      difficulty: "Easy",
      rating: 4.3,
      description: "Fast and delicious pasta dish perfect for busy weeknights.",
    },
  ]

  const filteredRecipes = recipes.filter((recipe) => {
    console.log("[v0] Search term:", searchTerm)
    console.log("[v0] Recipe title:", recipe.title)
    console.log("[v0] Recipe description:", recipe.description)

    const matchesSearch =
      searchTerm === "" ||
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())

    console.log("[v0] Matches search:", matchesSearch)

    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory

    console.log("[v0] Final result:", matchesSearch && matchesCategory)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Discover Amazing Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Explore our collection of delicious recipes from around the world. Find your next favorite dish!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-orange-200 focus:border-orange-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white/80 hover:bg-orange-50 text-gray-700 border-orange-200"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                    {recipe.category}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 text-balance">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 text-pretty">{recipe.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {recipe.cookTime}
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{recipe.difficulty}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{recipe.rating}</span>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      View Recipe
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  )
}
