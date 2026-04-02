import type { Metadata } from "next";
import RecipeDetailPage from "./recipedetailclient";

const extendedRecipeData: any = {
  "appetizers": [
    { id: 1, title: "Mozzarella Sticks", time: "15 min", ingredients: ["12 Mozzarella sticks", "2 eggs", "1 cup breadcrumbs", "1 cup flour", "Oil for frying"], instructions: ["Freeze cheese sticks for 30 mins.", "Coat in flour, then egg, then crumbs.", "Deep fry until golden brown.", "Serve hot with marinara."] },
    { id: 2, title: "Bruschetta", time: "10 min", ingredients: ["French baguette", "4 tomatoes (diced)", "Fresh basil", "2 cloves garlic", "Olive Oil", "Balsamic glaze"], instructions: ["Slice and toast the bread.", "Mix diced tomatoes, chopped basil, minced garlic, and olive oil.", "Spoon mixture onto bread.", "Drizzle with balsamic glaze."] },
    { id: 3, title: "Chicken Wings", time: "30 min", ingredients: ["2 lbs chicken wings", "1 cup Buffalo sauce", "2 tbsp Butter", "1 tsp Garlic powder"], instructions: ["Bake wings at 400°F for 25-30 mins.", "Melt butter and mix with buffalo sauce.", "Toss cooked wings in the sauce.", "Serve with ranch or blue cheese."] },
  ],
  "main-courses": [
    { id: 4, title: "Grilled Ribeye Steak", time: "45 min", ingredients: ["1 Ribeye steak", "Fresh Rosemary", "Fresh Thyme", "3 tbsp Butter", "2 Garlic cloves", "Salt & Pepper"], instructions: ["Season steak with salt/pepper.", "Sear in a hot skillet for 3-4 mins per side.", "Add butter, garlic, and herbs; baste the steak.", "Let rest for 10 mins before slicing."] },
    { id: 5, title: "Roast Chicken", time: "60 min", ingredients: ["1 Whole chicken", "1 Lemon", "3 Carrots", "4 Potatoes", "Herb butter"], instructions: ["Preheat oven to 375°F.", "Place chopped veggies in a roasting pan.", "Rub chicken with herb butter and stuff with lemon.", "Roast for 1 hour or until internal temp reaches 165°F."] },
    { id: 6, title: "Vegetable Lasagna", time: "50 min", ingredients: ["Lasagna noodles", "Spinach", "Ricotta cheese", "Marinara sauce", "Mozzarella", "Zucchini"], instructions: ["Boil noodles until al dente.", "Layer sauce, noodles, ricotta, and veggies.", "Top with mozzarella.", "Bake at 375°F for 40 mins."] },
    { id: 7, title: "Spaghetti Bolognese", time: "35 min", ingredients: ["Spaghetti pasta", "1lb Ground beef", "1 Onion", "2 tbsp Tomato paste", "1 can Crushed tomatoes"], instructions: ["Cook pasta according to package.", "Brown beef with chopped onions.", "Stir in tomato paste and crushed tomatoes; simmer for 15 mins.", "Toss pasta with sauce and serve."] },
    { id: 8, title: "Beef Tacos", time: "25 min", ingredients: ["1lb Ground beef", "Taco seasoning packet", "Taco shells", "Lettuce", "Cheddar Cheese", "Salsa"], instructions: ["Brown the beef in a skillet.", "Add seasoning and a splash of water; simmer.", "Warm the taco shells.", "Assemble tacos with beef and toppings."] },
  ],
  "breakfast": [
    { id: 101, title: "Fluffy Pancakes", time: "20 min", ingredients: ["2 cups Flour", "1.5 cups Milk", "2 Eggs", "2 tsp Baking powder", "Maple syrup"], instructions: ["Whisk wet and dry ingredients separately, then combine.", "Pour batter onto a hot, buttered griddle.", "Flip when bubbles form on top.", "Serve warm with syrup."] },
    { id: 102, title: "Avocado Toast", time: "10 min", ingredients: ["2 slices Sourdough bread", "1 Ripe avocado", "Red chili flakes", "Lemon juice", "Sea Salt"], instructions: ["Toast the bread until golden.", "Mash avocado with lemon juice and salt.", "Spread generously on toast.", "Sprinkle with chili flakes."] },
    { id: 103, title: "Omelette Supreme", time: "15 min", ingredients: ["3 Eggs", "1/4 cup Bell peppers", "1/4 cup Onions", "Cheddar cheese", "Diced Ham"], instructions: ["Whisk eggs in a bowl.", "Sauté peppers, onions, and ham in a pan.", "Pour eggs over veggies.", "Add cheese, fold, and cook until set."] },
  ],
  "lunch": [
    { id: 201, title: "Chicken Caesar Salad", time: "25 min", ingredients: ["Romaine lettuce", "1 Grilled chicken breast", "Croutons", "Parmesan shavings", "Caesar dressing"], instructions: ["Wash and chop lettuce.", "Slice the warm grilled chicken.", "Toss lettuce with dressing and croutons.", "Top with chicken and parmesan."] },
    { id: 202, title: "Grilled Cheese", time: "15 min", ingredients: ["2 slices Sourdough bread", "Cheddar cheese", "Gruyere cheese", "2 tbsp Butter"], instructions: ["Butter the outside of each bread slice.", "Place cheese between slices.", "Grill in a pan on medium heat.", "Flip and cook until golden and melted."] },
    { id: 203, title: "Tomato Soup", time: "20 min", ingredients: ["1 can Whole tomatoes", "1/2 cup Heavy cream", "1 Onion", "2 cloves Garlic", "Fresh Basil"], instructions: ["Sauté onion and garlic.", "Add tomatoes and simmer for 15 mins.", "Blend until smooth.", "Stir in heavy cream and basil."] },
  ],
  "dinner": [
    { id: 301, title: "Steak & Potatoes", time: "45 min", ingredients: ["Sirloin steak", "Baby potatoes", "Butter", "Parsley", "Garlic"], instructions: ["Roast potatoes in oven at 400°F.", "Pan sear steak 3 mins per side.", "Combine in pan with butter.", "Garnish with parsley."] },
    { id: 302, title: "Pasta Alfredo", time: "30 min", ingredients: ["Fettuccine pasta", "1 cup Heavy cream", "1 cup Parmesan cheese", "Butter", "Nutmeg"], instructions: ["Cook pasta.", "Melt butter and cream in a skillet.", "Whisk in cheese until smooth.", "Toss pasta in sauce."] },
    { id: 303, title: "Salmon Fillet", time: "25 min", ingredients: ["Salmon fillet", "Lemon slices", "Fresh Dill", "Asparagus", "Olive oil"], instructions: ["Season salmon with salt and dill.", "Sear in pan skin-side down for 5 mins.", "Flip and cook 2 more mins.", "Serve with steamed asparagus."] },
  ],
  "desserts": [
    { id: 401, title: "Chocolate Lava Cake", time: "60 min", ingredients: ["Dark chocolate", "Butter", "2 Eggs", "Sugar", "1 tbsp Flour"], instructions: ["Melt chocolate and butter.", "Whisk eggs and sugar until pale.", "Fold in chocolate and flour.", "Bake in ramekins at 400°F for 12 mins."] },
    { id: 402, title: "Cheesecake", time: "4 hours", ingredients: ["Cream cheese", "Graham cracker crumbs", "Sugar", "3 Eggs", "Vanilla extract"], instructions: ["Mix crumbs and butter; press into pan.", "Beat cream cheese and sugar; add eggs.", "Pour over crust.", "Bake at 325°F for 50 mins, then chill."] },
    { id: 403, title: "Ice Cream Sundae", time: "5 min", ingredients: ["Vanilla ice cream", "Chocolate syrup", "Whipped cream", "Maraschino Cherries", "Sprinkles"], instructions: ["Scoop 3 scoops of ice cream into a bowl.", "Drizzle generously with chocolate syrup.", "Top with whipped cream and sprinkles.", "Add a cherry on top."] },
  ],
};

export async function generateStaticParams() {
  return [
    { categoryName: "appetizers", recipeId: "1" },
    { categoryName: "appetizers", recipeId: "2" },
    { categoryName: "appetizers", recipeId: "3" },
    { categoryName: "main-courses", recipeId: "4" },
    { categoryName: "main-courses", recipeId: "5" },
    { categoryName: "main-courses", recipeId: "6" },
    { categoryName: "main-courses", recipeId: "7" },
    { categoryName: "main-courses", recipeId: "8" },
    { categoryName: "breakfast", recipeId: "101" },
    { categoryName: "breakfast", recipeId: "102" },
    { categoryName: "breakfast", recipeId: "103" },
    { categoryName: "lunch", recipeId: "201" },
    { categoryName: "lunch", recipeId: "202" },
    { categoryName: "lunch", recipeId: "203" },
    { categoryName: "dinner", recipeId: "301" },
    { categoryName: "dinner", recipeId: "302" },
    { categoryName: "dinner", recipeId: "303" },
    { categoryName: "desserts", recipeId: "401" },
    { categoryName: "desserts", recipeId: "402" },
    { categoryName: "desserts", recipeId: "403" },
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { categoryName: string; recipeId: string };
}): Promise<Metadata> {
  const categoryRecipes = extendedRecipeData[params.categoryName] || [];
  const recipe = categoryRecipes.find((r: any) => r.id === Number(params.recipeId));

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  const title = `${recipe.title} Recipe – ${recipe.time} | RecipeHub`;
  const description = `Learn how to make ${recipe.title} in just ${recipe.time}. Easy step-by-step instructions with ingredients list. A delicious ${params.categoryName} recipe on RecipeHub.`;
  const url = `https://recipe-hub-sepia.vercel.app/categories/${params.categoryName}/${params.recipeId}`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [
        {
          url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${recipe.title} Recipe – RecipeHub`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
    },
  };
}

export default function Page({
  params,
}: {
  params: { categoryName: string; recipeId: string };
}) {
  const categoryRecipes = extendedRecipeData[params.categoryName] || [];
  const recipe = categoryRecipes.find((r: any) => r.id === Number(params.recipeId));

  const jsonLd = recipe
    ? {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: recipe.title,
        description: `Learn how to make ${recipe.title} in just ${recipe.time}.`,
        totalTime: recipe.time.includes("hours")
          ? `PT${recipe.time.replace(" hours", "H")}`
          : `PT${recipe.time.replace(" min", "M")}`,
        recipeCategory: params.categoryName,
        recipeIngredient: recipe.ingredients,
        recipeInstructions: recipe.instructions.map((step: string, i: number) => ({
          "@type": "HowToStep",
          position: i + 1,
          text: step,
        })),
        author: {
          "@type": "Organization",
          name: "RecipeHub",
        },
        publisher: {
          "@type": "Organization",
          name: "RecipeHub",
          url: "https://recipe-hub-sepia.vercel.app",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <RecipeDetailPage />
    </>
  );
}