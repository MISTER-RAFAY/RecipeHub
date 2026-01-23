"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "Categories", href: "/categories" },
    { name: "Pricing", href: "/pricing" },
    { name: "My Recipes", href: "/my-recipes" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur sticky top-0 z-50 w-full border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link href="/">
            <h1 className="text-2xl font-bold text-green-600 cursor-pointer">RecipeHub</h1>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-6">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href ? "text-green-600 font-bold" : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* 👇 CLERK AUTH BUTTONS */}
            <div className="flex items-center gap-4">
              
              {/* IF LOGGED IN: Show Avatar */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              {/* IF LOGGED OUT: Show Buttons */}
              <SignedOut>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                    Sign In
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold">
                    Create Account
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <div className="md:hidden flex items-center gap-4">
             {/* Show User Button on mobile too if logged in */}
             <SignedIn>
                <UserButton afterSignOutUrl="/" />
             </SignedIn>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none p-2"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.name}
              </Link>
            ))}
            
            <SignedOut>
              <div className="pt-4 flex flex-col gap-2 px-3">
                <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">Sign In</Button>
                </Link>
                <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full justify-center bg-green-600 hover:bg-green-700 text-white">Create Free Account</Button>
                </Link>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}