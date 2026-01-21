import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 👇 IMPORTANT: Make sure this path points to where you saved your Navigation file
// If your file is in a folder named 'components', this is correct.
import { Navigation } from "@/components/navigation"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecipeHub",
  description: "Discover your next favorite recipe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 👇 This makes the Navigation bar appear on EVERY page */}
        <Navigation />
        
        {/* This renders the page content (Home, Pricing, etc.) underneath */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}