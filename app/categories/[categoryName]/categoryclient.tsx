"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const categoryData: any = {
  "appetizers": [
    { id: 1, title: "Mozzarella Sticks", time: "15 min", imageSrc: "/mozrella.jpg", desc: "Crispy cheesy goodness." },
    { id: 2, title: "Bruschetta", time: "10 min", imageSrc: "/Burchestta.png", desc: "Tomato and basil on toast." },
    { id: 3, title: "Chicken Wings", time: "30 min", imageSrc: "/categoriesname/wings.jpg", desc: "Spicy buffalo wings." },
    { id: 9, title: "Garlic Bread", time: "10 min", imageSrc: "/categoriesname/garlicbread.jpg", desc: "Buttery toasted garlic bread." },
    { id: 10, title: "Spring Rolls", time: "25 min", imageSrc: "/categoriesname/springrolls.jpg", desc: "Crispy veggie filled rolls." },
    { id: 11, title: "Stuffed Mushrooms", time: "20 min", imageSrc: "/categoriesname/mushrooms.jpg", desc: "Cheese and herb stuffed caps." },
  ],
  "main-courses": [
    { id: 4, title: "Grilled Ribeye Steak", time: "45 min", imageSrc: "/categoriesname/steak.jpg", desc: "Perfectly seared beef with garlic butter." },
    { id: 5, title: "Roast Chicken", time: "60 min", imageSrc: "/Roastchicken.jpg", desc: "Herb crusted whole chicken with vegetables." },
    { id: 6, title: "Vegetable Lasagna", time: "50 min", imageSrc: "/categoriesname/lasangna.jpg", desc: "Cheesy pasta layers with spinach and marinara." },
    { id: 7, title: "Spaghetti Bolognese", time: "35 min", imageSrc: "/categoriesname/spaghetti.jpg", desc: "Classic Italian meat sauce over fresh pasta." },
    { id: 8, title: "Beef Tacos", time: "25 min", imageSrc: "/categoriesname/tacos.jpg", desc: "Seasoned ground beef with fresh salsa." },
    { id: 12, title: "Butter Chicken", time: "40 min", imageSrc: "/categoriesname/butterchicken.jpg", desc: "Creamy Indian curry with tender chicken." },
    { id: 13, title: "Shrimp Stir Fry", time: "20 min", imageSrc: "/categoriesname/stirfry.jpg", desc: "Quick and flavourful Asian stir fry." },
    { id: 14, title: "BBQ Ribs", time: "90 min", imageSrc: "/categoriesname/ribs.jpg", desc: "Slow cooked fall-off-the-bone ribs." },
  ],
  "breakfast": [
    { id: 101, title: "Fluffy Pancakes", time: "20 min", imageSrc: "/categoriesname/pancakes.jpg", desc: "Classic buttermilk pancakes." },
    { id: 102, title: "Avocado Toast", time: "10 min", imageSrc: "/Avocado.jpg", desc: "Healthy start to the day." },
    { id: 103, title: "Omelette Supreme", time: "15 min", imageSrc: "/categoriesname/omelette.jpg", desc: "Cheese and veggie packed." },
    { id: 104, title: "Acai Bowl", time: "10 min", imageSrc: "/categoriesname/acai.jpg", desc: "Superfood bowl with fresh fruits." },
    { id: 105, title: "French Toast", time: "15 min", imageSrc: "/categoriesname/frenchtoast.jpg", desc: "Golden eggy bread with maple syrup." },
    { id: 106, title: "Breakfast Burrito", time: "20 min", imageSrc: "/categoriesname/burrito.jpg", desc: "Eggs, cheese and salsa wrapped up." },
  ],
  "lunch": [
    { id: 201, title: "Chicken Caesar Salad", time: "25 min", imageSrc: "/categoriesname/salad.jpg", desc: "Fresh and crunchy." },
    { id: 202, title: "Grilled Cheese", time: "15 min", imageSrc: "/categoriesname/cheese.jpg", desc: "Melty perfection." },
    { id: 203, title: "Tomato Soup", time: "20 min", imageSrc: "/categoriesname/soup.jpg", desc: "Creamy and rich." },
    { id: 204, title: "Club Sandwich", time: "15 min", imageSrc: "/categoriesname/clubsandwich.jpg", desc: "Triple decker with turkey and bacon." },
    { id: 205, title: "Quinoa Bowl", time: "25 min", imageSrc: "/categoriesname/quinoa.jpg", desc: "Healthy grain bowl with roasted veggies." },
    { id: 206, title: "Tuna Wrap", time: "10 min", imageSrc: "/categoriesname/tunawrap.jpg", desc: "Light and protein packed wrap." },
  ],
  "dinner": [
    { id: 301, title: "Steak & Potatoes", time: "45 min", imageSrc: "/categoriesname/steak-dinner.jpg", desc: "Hearty meal." },
    { id: 302, title: "Pasta Alfredo", time: "30 min", imageSrc: "/categoriesname/alfredo.jpg", desc: "Creamy white sauce." },
    { id: 303, title: "Salmon Fillet", time: "25 min", imageSrc: "/categoriesname/salmon.jpg", desc: "Pan seared with lemon." },
    { id: 304, title: "Chicken Parmesan", time: "40 min", imageSrc: "/categoriesname/chickenparmesan.jpg", desc: "Crispy breaded chicken with marinara." },
    { id: 305, title: "Lamb Chops", time: "35 min", imageSrc: "/categoriesname/lambchops.jpg", desc: "Herb marinated and grilled to perfection." },
    { id: 306, title: "Prawn Curry", time: "30 min", imageSrc: "/categoriesname/prawncurry.jpg", desc: "Aromatic coconut milk curry with prawns." },
  ],
  "desserts": [
    { id: 401, title: "Chocolate Lava Cake", time: "60 min", imageSrc: "/Lava.jpg", desc: "Rich and moist." },
    { id: 402, title: "Cheesecake", time: "4 hours", imageSrc: "/categoriesname/cheesecake.jpg", desc: "New York style." },
    { id: 403, title: "Ice Cream Sundae", time: "5 min", imageSrc: "/categoriesname/icecream.jpg", desc: "Vanilla with sprinkles." },
    { id: 404, title: "Tiramisu", time: "3 hours", imageSrc: "/categoriesname/tiramisu.jpg", desc: "Classic Italian coffee dessert." },
    { id: 405, title: "Banana Foster", time: "15 min", imageSrc: "/categoriesname/bananafoster.jpg", desc: "Caramelised bananas with vanilla ice cream." },
    { id: 406, title: "Creme Brulee", time: "2 hours", imageSrc: "/categoriesname/cremebrulee.jpg", desc: "Silky custard with caramel crust." },
  ],
};

const categoryIntros: Record<string, { heading: string; text: string }> = {
  appetizers: {
    heading: "Easy Appetizer Recipes for Every Occasion",
    text: "Start your meal the right way with our collection of easy appetizer recipes. Whether you're hosting a dinner party or looking for quick party snacks, these delicious starters are guaranteed to impress. From crispy mozzarella sticks to classic bruschetta and spicy buffalo wings, every appetizer recipe includes simple step-by-step instructions and a full ingredients list.",
  },
  "main-courses": {
    heading: "Hearty Main Course Recipes for the Whole Family",
    text: "Explore our collection of satisfying main course recipes perfect for weeknight dinners and special occasions alike. From grilled ribeye steak and roast chicken to creamy pasta and flavourful curries, our easy dinner recipes are designed for home cooks of all skill levels. Every main course recipe comes with clear instructions and tips to help you cook with confidence.",
  },
  breakfast: {
    heading: "Quick & Healthy Breakfast Recipes to Start Your Day",
    text: "Fuel your morning with our collection of quick and healthy breakfast recipes. Whether you prefer sweet fluffy pancakes, savoury breakfast burritos, or light and fresh avocado toast, we have the perfect morning meal for every taste. These easy breakfast recipes take under 20 minutes and are packed with nutrients to keep you energised all day.",
  },
  lunch: {
    heading: "Fresh & Easy Lunch Recipes Ready in Minutes",
    text: "Make the most of your midday meal with our fresh and easy lunch recipes. From hearty club sandwiches and creamy tomato soup to light quinoa bowls and crispy Caesar salads, our quick lunch ideas are perfect for busy weekdays. Every recipe is simple to prepare, packed with flavour, and ready in 30 minutes or less.",
  },
  dinner: {
    heading: "Delicious Dinner Recipes for Every Evening",
    text: "End your day with a delicious home-cooked dinner. Our collection of easy dinner recipes covers everything from sizzling steaks and creamy pasta alfredo to aromatic curries and elegant lamb chops. Whether you're cooking for one or feeding the whole family, these healthy dinner recipes are simple to follow and guaranteed to satisfy.",
  },
  desserts: {
    heading: "Indulgent Dessert Recipes for Every Sweet Tooth",
    text: "Treat yourself to our irresistible collection of dessert recipes. From the classic New York cheesecake and gooey chocolate lava cake to elegant crème brûlée and creamy tiramisu, there's a sweet treat for every occasion. These easy dessert recipes are perfect for beginner bakers and experienced pastry lovers alike.",
  },
};

const CategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const { isLoaded, userId } = useAuth();
  
  const [isPremium, setIsPremium] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const rawCategory = Array.isArray(params.categoryName) ? params.categoryName[0] : params.categoryName;
  const safeCategory = rawCategory?.toLowerCase() || "";
  
  const recipes = categoryData[safeCategory] || [];
  const intro = categoryIntros[safeCategory];

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      router.push("/sign-in");
      return;
    }

    const premiumStatus = localStorage.getItem("isPremium");
    if (premiumStatus === "true") {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
    
    setCheckingStatus(false);
  }, [isLoaded, userId, router]);

  if (!isLoaded || checkingStatus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="mt-4 text-gray-500">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="container mx-auto py-12 px-4">
        
        {/* Header — always on top, never covered by overlay */}
        <div className="relative z-50 flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold capitalize text-gray-900">{safeCategory.replace("-", " ")} Recipes</h1>
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        {/* Introductory paragraph with keywords */}
        {intro && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-3">{intro.heading}</h2>
            <p className="text-gray-600 leading-relaxed">{intro.text}</p>
          </div>
        )}

        {/* Content area (blurred if not premium) */}
        <div className={`transition-all duration-300 ${!isPremium ? "blur-md pointer-events-none select-none opacity-60" : ""}`}>
          {recipes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
              <h2 className="text-2xl text-gray-500">More recipes coming soon!</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recipes.map((recipe: any) => (
                <div key={recipe.id} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition group">
                  <div className="relative h-48 w-full bg-gray-200">
                    <Image
                      src={recipe.imageSrc}
                      alt={`${recipe.title} – easy ${safeCategory.replace("-", " ")} recipe on RecipeHub`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{recipe.title}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">⏱ {recipe.time}</span>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{recipe.desc}</p>
                    <Link href={`/categories/${safeCategory}/${recipe.id}`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        View Full Recipe
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lock overlay — starts below header */}
        {!isPremium && (
          <div
            className="absolute inset-x-0 bottom-0 z-40 flex flex-col items-center justify-center"
            style={{ top: "80px" }}
          >
            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Premium Content</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                To view recipes in the <strong>{safeCategory.replace("-", " ")}</strong> category, you must be a premium subscriber.
              </p>
              <Link href="/pricing" className="block w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-green-500/30 transition-all">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;