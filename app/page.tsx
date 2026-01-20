import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { RecipeGrid } from "@/components/recipe-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <RecipeGrid />
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">RecipeHub</h3>
            <p className="text-muted-foreground mb-6">
              Your culinary journey starts here. Discover, cook, and share amazing recipes.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                About
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
