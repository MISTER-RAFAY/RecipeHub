"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FacebookCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    const code = searchParams.get("code")
    const error = searchParams.get("error")

    if (error) {
      setStatus("error")
      console.error("Facebook OAuth error:", error)
      return
    }

    if (code) {
      handleFacebookCallback(code)
    } else {
      setStatus("error")
    }
  }, [searchParams])

  const handleFacebookCallback = async (code: string) => {
    try {
      // In a real app, you would send this code to your backend
      // to exchange it for an access token and get user info
      console.log("Facebook authorization code:", code)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStatus("success")

      // Redirect to dashboard or home page after successful authentication
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error) {
      console.error("Error handling Facebook callback:", error)
      setStatus("error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {status === "loading" && "Signing you in..."}
            {status === "success" && "Welcome to RecipeHub!"}
            {status === "error" && "Sign In Failed"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {status === "loading" && "Please wait while we complete your Facebook sign-in."}
            {status === "success" && "You have successfully signed in with Facebook. Redirecting..."}
            {status === "error" && "There was an error signing you in. Please try again."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === "loading" && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
            </div>
          )}
          {status === "success" && (
            <div className="text-emerald-600">
              <svg className="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="text-red-600">
              <svg className="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <button
                onClick={() => router.push("/signin")}
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
