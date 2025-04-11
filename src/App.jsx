import { useState } from "react";

function App() {
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState("");
  const [calories, setCalories] = useState(null);

  // Примерная калорийность на 100 г для демонстрации (можно заменить базой USDA позже)
  const foodCaloriesPer100g = {
    яблоко: 52,
    банан: 96,
    хлеб: 265,
    сыр: 402,
    курица: 239,
    рис: 130,
    яйцо: 155,
  };

  const handleCalculate = () => {
    const foodKey = food.trim().toLowerCase();
    const kcalPer100g = foodCaloriesPer100g[foodKey];

    if (!kcalPer100g) {
      alert("Продукт не найден в базе. Попробуй: яблоко, банан, хлеб, сыр...");
      return;
    }

    const gramValue = parseFloat(grams);
    if (isNaN(gramValue)) {
      alert("Введите корректное количество граммов.");
      return;
    }

    const kcal = (kcalPer100g / 100) * gramValue;
    setCalories(kcal.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-[#f2efe4] text-[#3e3e3e] flex flex-col items-center justify-center p-4 font-[Georgia]">
      <h1 className="text-4xl mb-6 font-bold text-[#5e5c6c]">
        Ghibli Калькулятор Калорий
      </h1>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <label className="block mb-3">
          <span>Продукт:</span>
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="например, яблоко"
            className="mt-1 w-full p-2 border border-gray-300 rounded-xl"
          />
        </label>

        <label className="block mb-4">
          <span>Граммы:</span>
          <input
            type="number"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            placeholder="например, 150"
            className="mt-1 w-full p-2 border border-gray-300 rounded-xl"
          />
        </label>

        <button
          onClick={handleCalculate}
          className="bg-[#8fbfa8] hover:bg-[#6fa896] text-white font-semibold py-2 px-4 rounded-xl w-full"
        >
          Рассчитать
        </button>

        {calories && (
          <div className="mt-4 text-xl text-[#4c4c4c]">
            Калорий: <strong>{calories}</strong> ккал
          </div>
        )}
      </div>

      <p className="mt-8 text-sm text-gray-500">✨ Powered by Ghibli vibes ✨</p>
    </div>
  );
}

export default App;