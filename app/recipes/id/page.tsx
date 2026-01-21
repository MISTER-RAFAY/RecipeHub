import Link from "next/link";
import { notFound } from "next/navigation";

// 1. We paste the data here so this page knows about the recipes too.
// (In a real app, you would fetch this from a database)
const RECIPES = [
  { id: 1, title: "Classic Spaghetti Carbonara", time: "30 min", difficulty: "Medium", image: "/food/carbonara.jpg", description: "A classic Italian pasta dish made with eggs, hard cheese, cured pork, and black pepper." },
  { id: 2, title: "Avocado Toast Supreme", time: "10 min", difficulty: "Easy", image: "/food/avocado.jpg", description: "Crispy toast topped with creamy avocado, radish, and seasonings." },
  { id: 3, title: "Homemade Margherita Pizza", time: "45 min", difficulty: "Hard", image: "/food/pizza.jpg", description: "Authentic pizza with fresh basil, mozzarella, and tomato sauce." },
  { id: 4, title: "Healthy Berry Smoothie", time: "5 min", difficulty: "Easy", image: "/food/smoothie.jpg", description: "A refreshing blend of mixed berries, yogurt, and honey." },
  { id: 5, title: "Grilled Atlantic Salmon", time: "25 min", difficulty: "Medium", image: "/food/salmon.jpg", description: "Perfectly grilled salmon fillet with lemon and herbs." },
  { id: 6, title: "Chocolate Lava Cake", time: "40 min", difficulty: "Medium", image: "/food/cake.jpg", description: "Rich chocolate cake with a molten chocolate center." },
  { id: 7, title: "Fresh Garden Salad", time: "15 min", difficulty: "Easy", image: "/food/salad.jpg", description: "Crisp greens, fresh vegetables, and a light vinaigrette." },
  { id: 8, title: "Juicy Beef Burger", time: "20 min", difficulty: "Medium", image: "/food/burger.jpg", description: "A thick beef patty with lettuce, tomato, and cheese on a bun." },
  { id: 9, title: "Japanese Ramen", time: "60 min", difficulty: "Hard", image: "/food/ramen.jpg", description: "Traditional noodle soup with rich broth and toppings." },
];

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  // 2. Find the recipe that matches the ID in the URL
  const recipeId = parseInt(params.id);
  const recipe = RECIPES.find((r) => r.id === recipeId);

  // 3. If recipe doesn't exist (e.g. /recipes/999), show 404
  if (!recipe) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Back Button */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="text-green-600 font-bold hover:underline">
            ← Back to All Recipes
          </Link>
        </div>

        {/* Recipe Image */}
        <div className="relative h-96 w-full">
            <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
            // Fallback for broken images
            onError={(e) => { 
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/800x400?text=No+Image"; 
            }}
            />
        </div>

        {/* Recipe Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{recipe.title}</h1>
                <div className="flex gap-4 text-sm text-gray-500 font-medium">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{recipe.time}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{recipe.difficulty}</span>
                </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {recipe.description || "A delicious recipe waiting for you to cook!"}
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Ingredients</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Ingredient 1 (Placeholder)</li>
            <li>Ingredient 2 (Placeholder)</li>
            <li>Ingredient 3 (Placeholder)</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mb-3">Instructions</h3>
          <ol className="list-decimal list-inside text-gray-600 space-y-3">
            <li>Step 1: Prepare your ingredients.</li>
            <li>Step 2: Cook following the time guidelines.</li>
            <li>Step 3: Serve and enjoy your {recipe.title}!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}