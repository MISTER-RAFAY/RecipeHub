import { Navigation } from "@/components/navigation"

export default function CategoriesPage() {
  const categories = [
    {
      name: "Appetizers",
      description: "Start your meal with delicious small bites",
      image: "/appetizers-platter-with-various-small-dishes.jpg",
      recipeCount: 45,
    },
    {
      name: "Main Courses",
      description: "Hearty and satisfying dishes for your main meal",
      image: "/main-course-dish-with-meat-and-vegetables.jpg",
      recipeCount: 128,
    },
    {
      name: "Desserts",
      description: "Sweet treats to end your meal perfectly",
      image: "/chocolate-berry-dessert.png",
      recipeCount: 67,
    },
    {
      name: "Breakfast",
      description: "Start your day with nutritious morning meals",
      image: "/fruit-breakfast-bowl.png",
      recipeCount: 52,
    },
    {
      name: "Lunch",
      description: "Quick and satisfying midday meals",
      image: "/fresh-lunch-salad-with-protein.jpg",
      recipeCount: 89,
    },
    {
      name: "Dinner",
      description: "Elegant evening meals for special occasions",
      image: "/elegant-dinner-plate-with-garnish.jpg",
      recipeCount: 94,
    },
    {
      name: "Vegetarian",
      description: "Plant-based recipes full of flavor",
      image: "/colorful-vegetarian-dish-with-vegetables.jpg",
      recipeCount: 73,
    },
    {
      name: "Quick & Easy",
      description: "Recipes ready in 30 minutes or less",
      image: "/quick-pasta-dish-in-pan.jpg",
      recipeCount: 61,
    },
    {
      name: "Healthy",
      description: "Nutritious recipes for a balanced lifestyle",
      image: "/healthy-bowl-with-quinoa-and-vegetables.jpg",
      recipeCount: 85,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Recipe Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Explore our diverse collection of recipes organized by category. Find exactly what you're craving for any
            meal or occasion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">{category.recipeCount} recipes</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>

                <div className="mt-4 flex items-center text-primary font-medium text-sm">
                  <span>Explore recipes</span>
                  <svg
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-2xl mx-auto border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Can't find what you're looking for?</h2>
            <p className="text-gray-600 mb-6">Use our search feature to find specific recipes or ingredients</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Search All Recipes
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Browse All Categories
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
