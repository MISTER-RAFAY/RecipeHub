import { Button } from "@/components/ui/button"
import { SearchForm } from "./search-form"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-muted/50 to-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Content */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Discover Your Next
            <span className="text-primary block">Favorite Recipe</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Explore thousands of delicious recipes from around the world. Find inspiration for your next meal and create
            unforgettable dining experiences.
          </p>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchForm />
          </div>

          {/* CTA Button */}
          <Button size="lg" className="text-lg px-8 py-3">
            Get Started
          </Button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
