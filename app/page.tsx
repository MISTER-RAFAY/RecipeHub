"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Signup
    localStorage.setItem("isLoggedIn", "true");
    router.push("/");
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <input type="email" required placeholder="Email" className="w-full border p-2 rounded" 
             onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required placeholder="Password" className="w-full border p-2 rounded" 
             onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">Sign Up</Button>
        </form>
        <p className="text-center text-sm">
          Already have an account? <Link href="/signin" className="text-green-600 font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}