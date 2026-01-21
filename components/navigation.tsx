"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// 👇 Import Clerk Components
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "Categories", href: "/categories" },
    { name: "Pricing", href: "/pricing" },
    { name: "My Recipes", href: "/my-recipes" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary cursor-pointer">RecipeHub</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  {item.name}
                </Link>
              ))}
            </div>

            {/* 👇 CLERK LOGIC START */}
            <div className="flex items-center gap-4">
              {/* Show this if user is Logged IN */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              {/* Show this if user is Logged OUT */}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" size="sm">Sign In</Button>
                </SignInButton>
              </SignedOut>
            </div>
            {/* 👆 CLERK LOGIC END */}
          </div>
        </div>
      </div>
    </nav>
  );
}