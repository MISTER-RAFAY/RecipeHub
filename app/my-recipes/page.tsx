import type { Metadata } from "next";
import MyRecipesPage from "./myrecipesclient";

export const metadata: Metadata = {
  title: "My Saved Recipes – Your Personal Collection",
  description: "View and manage your personal recipe collection on RecipeHub. Save your favorite recipes, access them anytime and build your own digital cookbook for free.",
  openGraph: {
    type: "website",
    url: "https://recipe-hub-sepia.vercel.app/my-recipes",
    title: "My Saved Recipes – Your Personal Collection | RecipeHub",
    description: "View and manage your personal recipe collection on RecipeHub. Save your favorite recipes, access them anytime and build your own digital cookbook for free.",
    images: [
      {
        url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Saved Recipes – RecipeHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Saved Recipes – Your Personal Collection | RecipeHub",
    description: "View and manage your personal recipe collection on RecipeHub. Save your favorite recipes, access them anytime and build your own digital cookbook for free.",
    images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
  },
};

export default MyRecipesPage;