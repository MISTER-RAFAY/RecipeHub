"use client"; // If using Next.js App Router
import React from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Import this

const CategoriesPage = () => {
  // Your existing data structure likely looks like this
  const categories = [
    { name: "Appetizers", count: 4, image: "/path/to/img", desc: "Start your meal with delicious small bites" },
    { name: "Main Courses", count: 4, image: "/path/to/img", desc: "Hearty and satisfying dishes for your main meal" },
    { name: "Desserts", count: 4, image: "/path/to/img", desc: "Sweet treats to end your meal perfectly" },
    { name: "Breakfast", count: 4, image: "/path/to/img", desc: "Start your day right" },
    { name: "Lunch", count: 4, image: "/path/to/img", desc: "Mid-day fuel" },
    { name: "Dinner", count: 4, image: "/path/to/img", desc: "Evening feasts" },
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
            {/* Image Section */}
            <div className="relative h-48 w-full mb-4">
              {/* Your image code is here */}
              <span className="absolute top-2 right-2 text-sm font-semibold">{category.count} recipes</span>
            </div>

            {/* Content Section */}
            <h3 className="text-xl font-bold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4 text-sm">{category.desc}</p>

            {/* ▼▼▼ THE CHANGE IS HERE ▼▼▼ */}

            {/* Replace your existing Link with this one */}
            <Link
              // This sends them to: /categories/breakfast  or /categories/lunch
              href={`/categories/${category.name.toLowerCase()}`}
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