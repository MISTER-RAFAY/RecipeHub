import type { Metadata } from "next";
import RecipesPage, { allRecipes } from "./recipesclient";

export const metadata: Metadata = {
  title: "All Recipes – Easy Meals from Around the World",
  description: "Browse hundreds of easy recipes from around the world. Find quick dinner ideas, healthy lunch options, and simple meals for every occasion on RecipeHub.",
  openGraph: {
    type: "website",
    url: "https://recipe-hub-sepia.vercel.app/recipes",
    title: "All Recipes – Easy Meals from Around the World | RecipeHub",
    description: "Browse hundreds of easy recipes from around the world. Find quick dinner ideas, healthy lunch options, and simple meals for every occasion on RecipeHub.",
    images: [
      {
        url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "All Recipes – RecipeHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Recipes – Easy Meals from Around the World | RecipeHub",
    description: "Browse hundreds of easy recipes from around the world. Find quick dinner ideas, healthy lunch options, and simple meals for every occasion on RecipeHub.",
    images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
  },
};

export default function Page() {
  return <RecipesPage recipes={allRecipes} />;
}