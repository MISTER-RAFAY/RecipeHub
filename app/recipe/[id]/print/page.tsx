"use client"

import { useParams } from "next/navigation"
import { useEffect } from "react"

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

export default function PrintRecipePage() {
  const params = useParams()
  const recipeId = Number.parseInt(params.id as string)
  const recipe = allRecipes.find((r) => r.id === recipeId)

  useEffect(() => {
    const timer = setTimeout(() => {
      window.print()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!recipe) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
        <p>The recipe you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="print-recipe">
      <style jsx>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
          }
          
          .print-recipe {
            max-width: none;
            margin: 0;
            padding: 0.5in;
            background: white;
          }
          
          .page-break {
            page-break-before: always;
          }
          
          .no-break {
            page-break-inside: avoid;
          }
          
          .recipe-header {
            text-align: center;
            margin-bottom: 1in;
            border-bottom: 2px solid #000;
            padding-bottom: 0.25in;
          }
          
          .recipe-title {
            font-size: 24pt;
            font-weight: bold;
            margin-bottom: 0.25in;
          }
          
          .recipe-meta {
            display: flex;
            justify-content: space-around;
            margin: 0.5in 0;
            border: 1px solid #000;
            padding: 0.25in;
          }
          
          .meta-item {
            text-align: center;
          }
          
          .meta-label {
            font-weight: bold;
            font-size: 10pt;
          }
          
          .meta-value {
            font-size: 14pt;
            font-weight: bold;
          }
          
          .ingredients-section, .instructions-section {
            margin: 0.5in 0;
          }
          
          .section-title {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 0.25in;
            border-bottom: 1px solid #000;
            padding-bottom: 0.1in;
          }
          
          .ingredients-list {
            columns: 2;
            column-gap: 0.5in;
            margin-bottom: 0.5in;
          }
          
          .ingredient-item {
            margin-bottom: 0.1in;
            break-inside: avoid;
          }
          
          .instruction-item {
            margin-bottom: 0.25in;
            break-inside: avoid;
          }
          
          .instruction-number {
            font-weight: bold;
            margin-right: 0.25in;
          }
          
          .recipe-footer {
            margin-top: 1in;
            text-align: center;
            font-size: 10pt;
            border-top: 1px solid #000;
            padding-top: 0.25in;
          }
        }
        
        @media screen {
          .print-recipe {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            min-height: 11in;
          }
        }
      `}</style>

      <div className="recipe-header no-break">
        <h1 className="recipe-title">{recipe.title}</h1>
        <p style={{ fontSize: "14pt", fontStyle: "italic", margin: "0.25in 0" }}>{recipe.description}</p>
        <p style={{ fontSize: "12pt" }}>
          <strong>Category:</strong> {recipe.category} | <strong>Difficulty:</strong> {recipe.difficulty} |{" "}
          <strong>Rating:</strong> {recipe.rating}/5 | <strong>By:</strong> {recipe.author}
        </p>
      </div>

      <div className="recipe-meta no-break">
        <div className="meta-item">
          <div className="meta-label">PREP TIME</div>
          <div className="meta-value">{recipe.prepTime}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">COOK TIME</div>
          <div className="meta-value">{recipe.cookTime}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">TOTAL TIME</div>
          <div className="meta-value">{recipe.totalTime}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">SERVINGS</div>
          <div className="meta-value">{recipe.servings}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">CALORIES</div>
          <div className="meta-value">{recipe.calories}</div>
        </div>
      </div>

      <div className="ingredients-section">
        <h2 className="section-title">INGREDIENTS</h2>
        <div className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              • {ingredient}
            </div>
          ))}
        </div>
      </div>

      <div className="page-break"></div>

      <div className="instructions-section">
        <h2 className="section-title">INSTRUCTIONS</h2>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="instruction-item">
            <span className="instruction-number">{index + 1}.</span>
            {instruction}
          </div>
        ))}
      </div>

      <div className="recipe-footer no-break">
        <p>
          <strong>Tags:</strong> {recipe.tags.join(", ")}
        </p>
        <p style={{ marginTop: "0.25in" }}>Printed from Recipe Website | {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}
