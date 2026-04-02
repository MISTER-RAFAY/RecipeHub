import type { Metadata } from "next";
import CategoriesPage from "./categoriesclient";

export const metadata: Metadata = {
  title: "Recipe Categories – Browse by Meal Type",
  description: "Explore RecipeHub's recipe categories including appetizers, main courses, breakfast, lunch, dinner, and desserts. Find the perfect recipe for every meal type.",
  openGraph: {
    type: "website",
    url: "https://recipe-hub-sepia.vercel.app/categories",
    title: "Recipe Categories – Browse by Meal Type | RecipeHub",
    description: "Explore RecipeHub's recipe categories including appetizers, main courses, breakfast, lunch, dinner, and desserts. Find the perfect recipe for every meal type.",
    images: [
      {
        url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Recipe Categories – RecipeHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Categories – Browse by Meal Type | RecipeHub",
    description: "Explore RecipeHub's recipe categories including appetizers, main courses, breakfast, lunch, dinner, and desserts.",
    images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
  },
};

export default CategoriesPage;