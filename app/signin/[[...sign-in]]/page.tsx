"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Import this for redirection
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter(); // 👈 Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. (Optional) Add your real backend login logic here.
    // if (email === "test" && password === "123") { ... }

    // 2. ⚠️ THIS IS THE CODE YOU ASKED FOR 👇
    // This tells the browser "I am logged in now"
    localStorage.setItem("isLoggedIn", "true");

    // 3. This redirects the user back to the Home page
    router.push("/");
    // ----------------------------------------
    
    // Force a small reload so the Navbar updates instantly
    setTimeout(() => {
        window.location.reload();
    }, 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to RecipeHub</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                required
                className="w-full border p-2 rounded mt-1"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="w-full border p-2 rounded mt-1"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-green-600 hover:text-green-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}