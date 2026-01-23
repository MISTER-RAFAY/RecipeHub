import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <SignIn 
        path="/sign-in" 
        // 👇 This sends them to the homepage (or /pricing) after login
        fallbackRedirectUrl="/"  
        signUpUrl="/sign-up"
      />
    </div>
  );
}