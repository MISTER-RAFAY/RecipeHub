import { MetadataRoute } from "next";

const baseUrl = "https://recipe-hub-sepia.vercel.app";

const categories = [
  "appetizers",
  "main-courses",
  "desserts",
  "breakfast",
  "lunch",
  "dinner",
];

const recipes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Recipe detail pages
  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${baseUrl}/categories/${recipe.categoryName}/${recipe.recipeId}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...recipePages];
}