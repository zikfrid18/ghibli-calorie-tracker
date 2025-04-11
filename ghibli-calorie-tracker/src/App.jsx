import React, { useState } from "react";
import { motion } from "framer-motion";

const usdaDatabase = [
  { name: "Apple", calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  { name: "Banana", calories: 96, protein: 1.3, fat: 0.3, carbs: 27 },
  { name: "Chicken Breast (100g)", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  { name: "Rice (100g cooked)", calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
  { name: "Egg", calories: 68, protein: 5.5, fat: 4.8, carbs: 0.6 },
];

export default function CalorieTracker() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState([]);

  const addFood = () => {
    const item = usdaDatabase.find(
      (i) => i.name.toLowerCase() === query.toLowerCase()
    );
    if (item) {
      setEntries([...entries, item]);
      setQuery("");
    } else {
      alert("Food not found in USDA database.");
    }
  };

  const total = entries.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.fat += item.fat;
      acc.carbs += item.carbs;
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 p-6 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl text-center font-bold mb-4 text-green-800">
        🌿 Ghibli-Style Calorie Tracker
      </h1>
      <div className="max-w-xl mx-auto">
        <div className="bg-white/80 shadow-xl rounded-2xl p-4">
          <div className="flex gap-2">
            <input
              placeholder="Enter food (e.g. Banana)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 p-2 rounded-lg border"
            />
            <button onClick={addFood} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Add
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            {entries.map((item, index) => (
              <li
                key={index}
                className="flex justify-between bg-green-100 p-2 rounded-xl shadow-sm"
              >
                <span>{item.name}</span>
                <span>{item.calories} kcal</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 rounded-xl bg-green-200 text-green-900">
            <h2 className="text-xl font-semibold mb-2">Total for Today 🍃</h2>
            <p>Calories: {total.calories} kcal</p>
            <p>Protein: {total.protein.toFixed(1)} g</p>
            <p>Fat: {total.fat.toFixed(1)} g</p>
            <p>Carbs: {total.carbs.toFixed(1)} g</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
