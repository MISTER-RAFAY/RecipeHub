"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      router.push("/recipes")
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for recipes, ingredients, or cuisines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 pr-4 py-3 text-base bg-card border-border focus:ring-2 focus:ring-primary/20"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <Button type="submit" size="lg" className="px-6">
        Search
      </Button>
    </form>
  )
}
