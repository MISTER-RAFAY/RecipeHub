"use client"

import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const allRecipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "/mediterranean-quinoa-bowl-with-vegetables.jpg",
    category: "Healthy",
    cookTime: "25 min",
    prepTime: "15 min",
    totalTime: "40 min",
    difficulty: "Easy",
    rating: 4.8,
    servings: 4,
    calories: 420,
    description: "A healthy and colorful bowl packed with fresh vegetables, quinoa, and Mediterranean flavors.",
    ingredients: [
      "1 cup quinoa, rinsed",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "2 tomatoes, chopped",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives, pitted",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup fresh parsley, chopped",
      "2 tbsp olive oil",
      "2 tbsp lemon juice",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook quinoa in vegetable broth according to package directions. Let cool.",
      "In a large bowl, combine cooled quinoa, cucumber, tomatoes, and red onion.",
      "Add olives, feta cheese, and parsley.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over quinoa mixture and toss to combine.",
      "Serve immediately or chill for 30 minutes before serving.",
    ],
    tags: ["Healthy", "Mediterranean", "Vegetarian", "Gluten-Free"],
    author: "Chef Maria",
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    image: "/creamy-mushroom-risotto-in-white-bowl.jpg",
    category: "Italian",
    cookTime: "35 min",
    prepTime: "10 min",
    totalTime: "45 min",
    difficulty: "Medium",
    rating: 4.9,
    servings: 6,
    calories: 380,
    description: "Rich and creamy risotto with wild mushrooms and fresh herbs.",
    ingredients: [
      "1 1/2 cups Arborio rice",
      "4-5 cups warm chicken or vegetable broth",
      "1 lb mixed mushrooms, sliced",
      "1 medium onion, finely chopped",
      "3 cloves garlic, minced",
      "1/2 cup dry white wine",
      "1/2 cup grated Parmesan cheese",
      "3 tbsp butter",
      "2 tbsp olive oil",
      "2 tbsp fresh thyme",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Heat olive oil and 1 tbsp butter in a large pan. Sauté mushrooms until golden. Set aside.",
      "In the same pan, sauté onion until translucent. Add garlic and cook 1 minute.",
      "Add rice and stir for 2 minutes until lightly toasted.",
      "Pour in wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring constantly until absorbed before adding more.",
      "Continue for 18-20 minutes until rice is creamy and tender.",
      "Stir in mushrooms, remaining butter, Parmesan, and thyme.",
      "Season with salt and pepper. Garnish with parsley and serve immediately.",
    ],
    tags: ["Italian", "Comfort Food", "Vegetarian"],
    author: "Chef Antonio",
  },
  {
    id: 3,
    title: "Thai Basil Chicken",
    image: "/spicy-thai-basil-chicken-stir-fry.jpg",
    category: "Asian",
    cookTime: "20 min",
    prepTime: "15 min",
    totalTime: "35 min",
    difficulty: "Easy",
    rating: 4.7,
    servings: 4,
    calories: 320,
    description: "Spicy and aromatic Thai stir-fry with fresh basil and tender chicken.",
    ingredients: [
      "1 lb chicken breast, sliced thin",
      "2 cups fresh Thai basil leaves",
      "3 cloves garlic, minced",
      "2 Thai chilies, sliced",
      "1 red bell pepper, sliced",
      "1 onion, sliced",
      "3 tbsp vegetable oil",
      "2 tbsp fish sauce",
      "1 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp sugar",
      "Jasmine rice for serving",
    ],
    instructions: [
      "Heat oil in a wok or large skillet over high heat.",
      "Add garlic and chilies, stir-fry for 30 seconds.",
      "Add chicken and cook until no longer pink, about 5 minutes.",
      "Add bell pepper and onion, stir-fry for 3 minutes.",
      "Mix fish sauce, soy sauce, oyster sauce, and sugar in a small bowl.",
      "Pour sauce over chicken and vegetables, toss to coat.",
      "Add Thai basil leaves and stir until wilted.",
      "Serve immediately over jasmine rice.",
    ],
    tags: ["Thai", "Spicy", "Quick", "Asian"],
    author: "Chef Siriporn",
  },
  {
    id: 4,
    title: "French Beef Bourguignon",
    image: "/classic-french-beef-bourguignon-stew.jpg",
    category: "French",
    cookTime: "2h 30min",
    prepTime: "30 min",
    totalTime: "3h",
    difficulty: "Hard",
    rating: 4.9,
    servings: 8,
    calories: 450,
    description: "Classic French stew with tender beef braised in red wine.",
    ingredients: [
      "3 lbs beef chuck, cut into 2-inch pieces",
      "6 slices bacon, chopped",
      "1 large onion, chopped",
      "2 carrots, sliced",
      "3 cloves garlic, minced",
      "3 tbsp tomato paste",
      "1 bottle red wine",
      "2 cups beef broth",
      "2 bay leaves",
      "3 sprigs fresh thyme",
      "1 lb small potatoes",
      "8 oz mushrooms, quartered",
      "3 tbsp flour",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Preheat oven to 325°F. Season beef with salt and pepper, then coat with flour.",
      "Cook bacon in a Dutch oven until crispy. Remove and set aside.",
      "Brown beef in bacon fat in batches. Remove and set aside.",
      "Sauté onion and carrots until softened. Add garlic and tomato paste.",
      "Return beef and bacon to pot. Add wine, broth, bay leaves, and thyme.",
      "Bring to a boil, then cover and transfer to oven for 1.5 hours.",
      "Add potatoes and mushrooms, continue cooking for 1 hour.",
      "Remove bay leaves and thyme stems. Adjust seasoning.",
      "Garnish with fresh parsley and serve with crusty bread.",
    ],
    tags: ["French", "Comfort Food", "Wine Braised", "Classic"],
    author: "Chef Pierre",
  },
  {
    id: 5,
    title: "Fresh Caprese Salad",
    image: "/fresh-caprese-salad-with-tomatoes-and-mozzarella.jpg",
    category: "Salad",
    cookTime: "10 min",
    prepTime: "10 min",
    totalTime: "20 min",
    difficulty: "Easy",
    rating: 4.6,
    servings: 4,
    calories: 220,
    description: "Simple and elegant salad with fresh tomatoes, mozzarella, and basil.",
    ingredients: [
      "4 large ripe tomatoes, sliced",
      "8 oz fresh mozzarella, sliced",
      "1/2 cup fresh basil leaves",
      "1/4 cup extra virgin olive oil",
      "2 tbsp balsamic vinegar",
      "Salt and freshly ground black pepper",
      "Balsamic glaze for drizzling",
    ],
    instructions: [
      "Arrange tomato and mozzarella slices alternately on a serving platter.",
      "Tuck fresh basil leaves between the tomato and mozzarella slices.",
      "Drizzle with olive oil and balsamic vinegar.",
      "Season with salt and freshly ground black pepper.",
      "Let stand for 10 minutes to allow flavors to meld.",
      "Drizzle with balsamic glaze just before serving.",
    ],
    tags: ["Italian", "Fresh", "Vegetarian", "Summer"],
    author: "Chef Isabella",
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    image: "/chocolate-lava-cake-with-molten-center.jpg",
    category: "Dessert",
    cookTime: "25 min",
    prepTime: "15 min",
    totalTime: "40 min",
    difficulty: "Medium",
    rating: 4.8,
    servings: 2,
    calories: 520,
    description: "Decadent chocolate dessert with a molten center that flows like lava.",
    ingredients: [
      "4 oz dark chocolate, chopped",
      "4 tbsp unsalted butter",
      "2 large eggs",
      "2 tbsp granulated sugar",
      "Pinch of salt",
      "2 tbsp all-purpose flour",
      "Butter for ramekins",
      "Cocoa powder for dusting",
      "Vanilla ice cream for serving",
      "Fresh berries for garnish",
    ],
    instructions: [
      "Preheat oven to 425°F. Butter two 6-oz ramekins and dust with cocoa powder.",
      "Melt chocolate and butter in a double boiler until smooth.",
      "In a bowl, whisk eggs, sugar, and salt until thick and pale.",
      "Stir in melted chocolate mixture, then fold in flour until just combined.",
      "Divide batter between prepared ramekins.",
      "Bake for 12-14 minutes until edges are firm but centers jiggle slightly.",
      "Let cool for 1 minute, then run a knife around edges and invert onto plates.",
      "Serve immediately with vanilla ice cream and fresh berries.",
    ],
    tags: ["Chocolate", "Dessert", "Romantic", "Indulgent"],
    author: "Chef Amelie",
  },
]

export default function RecipeDetailPage() {
  const params = useParams()
  const recipeId = Number.parseInt(params.id as string)
  const [isSaved, setIsSaved] = useState(false)

  const recipe = allRecipes.find((r) => r.id === recipeId)

  useState(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]")
    setIsSaved(savedRecipes.includes(recipeId))
  })

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]")
    if (isSaved) {
      const updatedSaved = savedRecipes.filter((id: number) => id !== recipeId)
      localStorage.setItem("savedRecipes", JSON.stringify(updatedSaved))
      setIsSaved(false)
      alert("Recipe removed from saved recipes!")
    } else {
      if (!savedRecipes.includes(recipeId)) {
        savedRecipes.push(recipeId)
        localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes))
      }
      setIsSaved(true)
      alert("Recipe saved successfully!")
    }
  }

  const handlePrintRecipe = () => {
    window.open(`/recipe/${recipeId}/print`, "_blank")
  }

  const handleShareRecipe = async () => {
    const shareData = {
      title: recipe?.title,
      text: `Check out this amazing recipe: ${recipe?.title}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("Recipe URL copied to clipboard!")
      })
      .catch(() => {
        alert("Unable to copy URL. Please copy manually: " + window.location.href)
      })
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
          <Link href="/recipes">
            <Button>Back to Recipes</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/recipes">
            <Button variant="outline" className="bg-white/80 hover:bg-white">
              ← Back to Recipes
            </Button>
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-orange-500 text-white">{recipe.category}</Badge>
                <Badge variant="outline">{recipe.difficulty}</Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">{recipe.title}</h1>

              <p className="text-gray-600 text-lg mb-6 text-pretty">{recipe.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{recipe.prepTime}</div>
                  <div className="text-sm text-gray-600">Prep Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{recipe.cookTime}</div>
                  <div className="text-sm text-gray-600">Cook Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{recipe.servings}</div>
                  <div className="text-sm text-gray-600">Servings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{recipe.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-semibold text-gray-900">{recipe.rating}</span>
                  <span className="text-gray-600">rating</span>
                </div>
                <div className="text-gray-600">by {recipe.author}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className={`${isSaved ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"}`}
              onClick={handleSaveRecipe}
            >
              {isSaved ? "Recipe Saved ✓" : "Save Recipe"}
            </Button>
            <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white" onClick={handlePrintRecipe}>
              Print Recipe
            </Button>
            <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white" onClick={handleShareRecipe}>
              Share Recipe
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
