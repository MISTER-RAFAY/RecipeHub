import type { Metadata } from "next";
import CategoryPage from "./categoryclient";

export async function generateMetadata({ params }: { params: { categoryName: string } }) {
  const titles: Record<string, string> = {
    appetizers: "Appetizer Recipes – Easy Starters & Small Bites",
    "main-courses": "Main Course Recipes – Hearty Dinner & Lunch Ideas",
    desserts: "Dessert Recipes – Cakes, Cookies & Sweet Treats",
    breakfast: "Breakfast Recipes – Quick & Healthy Morning Meals",
    lunch: "Lunch Recipes – Fresh & Easy Midday Meals",
    dinner: "Dinner Recipes – Easy & Healthy Evening Meals",
  };

  const descriptions: Record<string, string> = {
    appetizers: "Discover easy appetizer recipes perfect for parties and gatherings. From mozzarella sticks to bruschetta, find delicious starters and small bites on RecipeHub.",
    "main-courses": "Explore hearty main course recipes for dinner and lunch. From grilled steak to vegetable lasagna, find satisfying meals for the whole family on RecipeHub.",
    desserts: "Indulge in our collection of dessert recipes including cakes, cookies, and sweet treats. Find easy and decadent dessert ideas for every occasion on RecipeHub.",
    breakfast: "Start your day right with quick and healthy breakfast recipes. From fluffy pancakes to avocado toast, find easy morning meal ideas for every day on RecipeHub.",
    lunch: "Find fresh and easy lunch recipes perfect for midday meals. From salads to soups and sandwiches, discover quick and delicious lunch ideas daily on RecipeHub.",
    dinner: "Cook easy and healthy dinner recipes for the whole family. From grilled salmon to pasta alfredo, find delicious evening meal ideas every night on RecipeHub.",
  };

  const title = titles[params.categoryName] ?? "Recipes";
  const description = descriptions[params.categoryName] ?? "Browse delicious recipes by category on RecipeHub. Find easy meals for breakfast, lunch, dinner, desserts and more.";
  const url = `https://recipe-hub-sepia.vercel.app/categories/${params.categoryName}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url,
      title: `${title} | RecipeHub`,
      description,
      images: [
        {
          url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${title} – RecipeHub`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | RecipeHub`,
      description,
      images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
    },
  };
}

export default CategoryPage;