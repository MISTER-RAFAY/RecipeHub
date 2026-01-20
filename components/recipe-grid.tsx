import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const featuredRecipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "/mediterranean-quinoa-bowl-with-vegetables.jpg",
    cookTime: "25 min",
    servings: 4,
    rating: 4.8,
    difficulty: "Easy",
    category: "Healthy",
  },
  {
    id: 2,
    title: "Creamy Mushroom Risotto",
    image: "/creamy-mushroom-risotto-in-white-bowl.jpg",
    cookTime: "35 min",
    servings: 6,
    rating: 4.9,
    difficulty: "Medium",
    category: "Italian",
  },
  {
    id: 3,
    title: "Spicy Thai Basil Chicken",
    image: "/spicy-thai-basil-chicken-stir-fry.jpg",
    cookTime: "20 min",
    servings: 4,
    rating: 4.7,
    difficulty: "Easy",
    category: "Asian",
  },
  {
    id: 4,
    title: "Classic Beef Bourguignon",
    image: "/classic-french-beef-bourguignon-stew.jpg",
    cookTime: "2h 30min",
    servings: 8,
    rating: 4.9,
    difficulty: "Hard",
    category: "French",
  },
  {
    id: 5,
    title: "Fresh Caprese Salad",
    image: "/fresh-caprese-salad-with-tomatoes-and-mozzarella.jpg",
    cookTime: "10 min",
    servings: 4,
    rating: 4.6,
    difficulty: "Easy",
    category: "Salad",
  },
  {
    id: 6,
    title: "Chocolate Lava Cake",
    image: "/chocolate-lava-cake-with-molten-center.jpg",
    cookTime: "25 min",
    servings: 2,
    rating: 4.8,
    difficulty: "Medium",
    category: "Dessert",
  },
]

export function RecipeGrid() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Featured Recipes</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover our most popular and seasonal recipes, carefully curated for food lovers like you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{recipe.category}</Badge>
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <svg className="h-3 w-3 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-xs font-medium">{recipe.rating}</span>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-lg mb-3 text-balance group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span>{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <span>{recipe.servings} servings</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/recipes">
            <Button variant="outline" size="lg">
              View All Recipes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
