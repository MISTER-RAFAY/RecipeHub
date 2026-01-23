import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* 
        We use the official Clerk Component here.
        This connects directly to the database so "My Recipes" can detect the user.
      */}
      <SignUp path="/sign-up" />
    </div>
  );
}