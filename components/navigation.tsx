"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState(false); // Keeps track if user is logged in

  // ⚠️ SIMULATION: Check if user is logged in
  // If you use Clerk/NextAuth, replace this with: const { data: session } = useSession();
  useEffect(() => {
    // For now, we check if a dummy 'userToken' exists in browser storage
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(false);
    window.location.href = "/"; // Redirect to home
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Recipes", href: "/recipes" },
    { name: "Categories", href: "/categories" },
    { name: "Pricing", href: "/pricing" },
    { name: "My Recipes", href: "/my-recipes" },
  ]

  return (
    <nav className="bg-background/95 backdrop-blur sticky top-0 z-50 w-full border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
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

            {/* 👇 DYNAMIC BUTTON LOGIC 👇 */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-green-600">My Account</span>
                <Button onClick={handleLogout} variant="outline" size="sm" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/signin">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}
            {/* 👆 END DYNAMIC BUTTON 👆 */}

          </div>

          {/* Mobile Logic (Simplified for brevity - add 'user' check here too if needed) */}
          <div className="md:hidden">
             {/* ... keep your existing mobile button code ... */}
          </div>
        </div>
      </div>
    </nav>
  )
}