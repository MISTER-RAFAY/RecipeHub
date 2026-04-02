import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { Navigation } from "@/components/navigation"; 
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "RecipeHub – Discover Delicious Recipes",
    template: "%s | RecipeHub",
  },
  description: "RecipeHub helps you discover thousands of delicious recipes from around the world. Find easy dinner ideas, healthy breakfast options, desserts and more.",
  openGraph: {
    siteName: "RecipeHub",
    type: "website",
    locale: "en_US",
    url: "https://recipe-hub-sepia.vercel.app",
    title: "RecipeHub – Discover Delicious Recipes",
    description: "RecipeHub helps you discover thousands of delicious recipes from around the world. Find easy dinner ideas, healthy breakfast options, desserts and more.",
    images: [
      {
        url: "https://recipe-hub-sepia.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RecipeHub – Discover Delicious Recipes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeHub – Discover Delicious Recipes",
    description: "RecipeHub helps you discover thousands of delicious recipes from around the world.",
    images: ["https://recipe-hub-sepia.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ScrollToTop />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}