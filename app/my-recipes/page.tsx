import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function MyRecipesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">My Recipe Collection</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Save your favorite recipes, create custom collections, and build your personal cookbook
            </p>
          </div>

          {/* Sign In Required Card */}
          <Card className="max-w-2xl mx-auto mb-12 border-2 border-primary/20 shadow-lg">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <CardTitle className="text-2xl text-gray-900">Sign In Required</CardTitle>
              <CardDescription className="text-base">
                Create an account or sign in to start saving your favorite recipes and building your personal collection
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <Link href="/signin">
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    Sign In to Save Recipes
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">Don't have an account? You can create one on the sign in page</p>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save Favorites</h3>
              <p className="text-sm text-gray-600">Keep track of recipes you love with a simple heart tap</p>
            </Card>

            <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
              <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Custom Collections</h3>
              <p className="text-sm text-gray-600">Organize recipes into personalized collections and categories</p>
            </Card>

            <Card className="text-center p-6 bg-white/70 backdrop-blur-sm">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cooking History</h3>
              <p className="text-sm text-gray-600">Track what you've cooked and discover new favorites</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
