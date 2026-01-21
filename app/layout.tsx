import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'; // 👈 IMPORT THIS
import "./globals.css";
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
    // 👇 THIS WRAPPER IS REQUIRED FOR CLERK TO WORK
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}