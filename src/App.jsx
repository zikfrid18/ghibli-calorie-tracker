
import { useState } from 'react';

const sampleData = [
  { name: 'Apple', caloriesPer100g: 52 },
  { name: 'Banana', caloriesPer100g: 89 },
  { name: 'Rice', caloriesPer100g: 130 },
];

export default function App() {
  const [foodLog, setFoodLog] = useState([]);
  const [gramsInput, setGramsInput] = useState({});
  
  const handleAdd = (item) => {
    const grams = gramsInput[item.name] || 100;
    const calories = (item.caloriesPer100g / 100) * grams;

    setFoodLog([...foodLog, { ...item, grams, calories }]);
    setGramsInput((prev) => ({ ...prev, [item.name]: '' }));
  };

  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div className="min-h-screen bg-green-100 p-8 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center text-green-800">🍃 Ghibli Calorie Tracker</h1>

      <div className="space-y-4">
        {sampleData.map((item) => (
          <div key={item.name} className="bg-white p-4 rounded-xl shadow flex items-center justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.caloriesPer100g} ккал / 100г</p>
            </div>

            <input
              type="number"
              placeholder="г"
              className="w-20 p-1 border rounded mr-2"
              value={gramsInput[item.name] || ''}
              onChange={(e) => setGramsInput((prev) => ({ ...prev, [item.name]: e.target.value }))}
            />

            <button
              onClick={() => handleAdd(item)}
              className="bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded-lg"
            >
              Добавить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">🍽️ Съедено:</h2>
        {foodLog.length === 0 && <p className="text-gray-500">Пока ничего не добавлено</p>}
        <ul>
          {foodLog.map((item, i) => (
            <li key={i}>
              {item.name} — {item.grams}г → {item.calories.toFixed(1)} ккал
            </li>
          ))}
        </ul>

        <p className="mt-4 font-bold text-green-700">
          ✅ Всего: {totalCalories.toFixed(1)} ккал
        </p>
      </div>
    </div>
  );
}
