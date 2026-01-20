import Link from "next/link";
import PaddleCheckout from "@/components/paddle-checkout";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  // ⚠️ CRITICAL: Go to Paddle Dashboard > Catalog to get these REAL IDs
  const PRICES = {
    monthly: "pri_01hxxxx...",   // Replace with your Monthly Price ID
    sixMonth: "pri_01hyyyy...",  // Replace with your 6-Month Price ID
    yearly: "pri_01hzzzz...",    // Replace with your Yearly Price ID
    lifetime: "pri_01haaaa..."   // Replace with your Lifetime Price ID
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with Back Button */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Choose Your Plan</h1>
        <Button asChild variant="outline">
          <Link href="/">Back to Recipes</Link>
        </Button>
      </div>

      {/* The Pricing Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <PaddleCheckout planName="Monthly ($5)" priceId={PRICES.monthly} />
        <PaddleCheckout planName="6 Months ($25)" priceId={PRICES.sixMonth} />
        <PaddleCheckout planName="Yearly ($45)" priceId={PRICES.yearly} />
        <PaddleCheckout planName="Lifetime ($99)" priceId={PRICES.lifetime} />
      </div>
    </div>
  );
}