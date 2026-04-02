import type { Metadata } from "next";
import PricingPage from "./pricingclient";

export const metadata: Metadata = {
  title: "RecipeHub Pricing – Unlimited Recipe Access",
  description: "Choose a RecipeHub plan and get unlimited access to thousands of recipes. Monthly, 6-month, yearly, and lifetime plans available. Start cooking better today.",
  openGraph: {
    type: "website",
    url: "https://recipe-hub-sepia.vercel.app/pricing",
    title: "RecipeHub Pricing – Unlimited Recipe Access",
    description: "Choose a RecipeHub plan and get unlimited access to thousands of recipes. Monthly, 6-month, yearly, and lifetime plans available. Start cooking better today.",
    images: [
      {
        url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RecipeHub Pricing Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeHub Pricing – Unlimited Recipe Access",
    description: "Choose a RecipeHub plan and get unlimited access to thousands of recipes. Monthly, 6-month, yearly, and lifetime plans available.",
    images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
  },
};

export default PricingPage;