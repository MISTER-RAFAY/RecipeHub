import Link from "next/link";
import PaddleCheckout from "@/components/paddle-checkout";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  // ✅ I FIXED THE MISSING COMMA BELOW
  const PRICES = {
    monthly: "pri_01kfec2bwrj3vwzfe8q1hqbdjp",   // <--- Added comma here
    sixMonth: "pri_01kfegd2ez4j54kbw05dp33abc",
    yearly: "pri_01kfeg7cm6p22p39g6aasem41a",
    lifetime: "pri_01kfeg9zfeqckjyj2q7r5ktj4t",
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
        <PaddleCheckout planName="Monthly ($49)" priceId={PRICES.monthly} />
        <PaddleCheckout planName="6 Months ($99)" priceId={PRICES.sixMonth} />
        <PaddleCheckout planName="Yearly ($199)" priceId={PRICES.yearly} />
        <PaddleCheckout planName="Lifetime ($499)" priceId={PRICES.lifetime} />
      </div>
    </div>
  );
}