"use client"; // If using Next.js App Router
import React from "react";
import Image from "next/image";
import Link from "next/link"; 

const CategoriesPage = () => {
  // 1. Updated with manual image paths
  const categories = [
    { name: "Appetizers", count: 4, image: "/categories/Appetizer.jpg", desc: "Start your meal with delicious small bites" },
    { name: "Main Courses", count: 4, image: "/categories/Maincourse.jpg", desc: "Hearty and satisfying dishes for your main meal" },
    { name: "Desserts", count: 4, image: "/categories/desserts.jpg", desc: "Sweet treats to end your meal perfectly" },
    { name: "Breakfast", count: 4, image: "/categories/breakfast.jpg", desc: "Start your day right" },
    { name: "Lunch", count: 4, image: "/categories/lunch.jpg", desc: "Mid-day fuel" },
    { name: "Dinner", count: 4, image: "/categories/dinner.jpg", desc: "Evening feasts" },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-2">Recipe Categories</h1>
      <p className="text-center text-gray-600 mb-12">
        Explore our diverse collection of recipes...
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
            
            {/* Image Section Updated */}
            <div className="relative h-48 w-full mb-4 bg-gray-100 rounded-md overflow-hidden">
              <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 text-sm font-semibold bg-white/90 px-2 py-1 rounded shadow-sm">
                {category.count} recipes
              </span>
            </div>

            {/* Content Section */}
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4 text-sm">{category.desc}</p>

            <Link
              href={`/categories/${category.name.toLowerCase().replace(" ", "-")}`}
              className="text-green-600 font-semibold hover:text-green-700 flex items-center mt-4"
            >
              Explore recipes &gt;
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;