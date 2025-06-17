'use client';
import { useState } from "react";

export default function Page() {
  const [meals, setMeals] = useState([]);
  const [mealInput, setMealInput] = useState("");
  const [photo, setPhoto] = useState(null);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [water, setWater] = useState(0);
  const [manualCalories, setManualCalories] = useState("");
  const [manualWater, setManualWater] = useState("");

  const addMeal = () => {
    if (!mealInput.trim()) return;
    const newMeal = {
      name: mealInput,
      kcal: Math.floor(Math.random() * 300) + 100,
      protein: Math.floor(Math.random() * 30) + 10,
      fat: Math.floor(Math.random() * 20) + 5,
      fiber: Math.floor(Math.random() * 10) + 2,
    };
    setMeals([...meals, newMeal]);
    setCalories(calories + newMeal.kcal);
    setProtein(protein + newMeal.protein);
    setFat(fat + newMeal.fat);
    setFiber(fiber + newMeal.fiber);
    setMealInput("");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
    const detectedMeal = {
      name: "Tanımlanan Yemek",
      kcal: 420,
      protein: 25,
      fat: 18,
      fiber: 6,
    };
    setMeals([...meals, detectedMeal]);
    setCalories(calories + detectedMeal.kcal);
    setProtein(protein + detectedMeal.protein);
    setFat(fat + detectedMeal.fat);
    setFiber(fiber + detectedMeal.fiber);
  };

  const addWater = (amount) => setWater(water + amount);

  const updateCalories = () => {
    const kcal = parseInt(manualCalories);
    if (!isNaN(kcal)) setCalories(kcal);
    setManualCalories("");
  };

  const updateWater = () => {
    const ml = parseInt(manualWater);
    if (!isNaN(ml)) setWater(ml);
    setManualWater("");
  };

  return (
    <main className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">YiğitTrack 💪</h1>
      <div className="space-y-2">
        <input value={mealInput} onChange={(e) => setMealInput(e.target.value)} placeholder="Yemek gir" className="border p-2 w-full" />
        <button onClick={addMeal} className="bg-blue-500 text-white px-4 py-2 rounded">Ekle</button>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block mt-2" />
        {photo && <img src={photo} alt="Yemek" className="w-full rounded mt-2" />}
      </div>
      <div>
        <h2 className="text-lg font-semibold">Makrolar</h2>
        <p>Kalori: {calories} kcal</p>
        <p>Protein: {protein} g</p>
        <p>Yağ: {fat} g</p>
        <p>Lif: {fiber} g</p>
        <input value={manualCalories} onChange={(e) => setManualCalories(e.target.value)} placeholder="Kalori gir" className="border p-1 mr-2" />
        <button onClick={updateCalories} className="bg-gray-200 px-2 py-1">Güncelle</button>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Su Takibi</h2>
        <p>Su: {water} ml</p>
        <button onClick={() => addWater(250)} className="bg-blue-200 px-2 py-1 mr-2">+250ml</button>
        <button onClick={() => addWater(500)} className="bg-blue-400 px-2 py-1">+500ml</button>
        <input value={manualWater} onChange={(e) => setManualWater(e.target.value)} placeholder="Su gir" className="border p-1 mt-2 block" />
        <button onClick={updateWater} className="bg-gray-200 px-2 py-1 mt-1">Güncelle</button>
      </div>
      <ul className="list-disc list-inside">
        {meals.map((meal, i) => (
          <li key={i}>{meal.name} - {meal.kcal} kcal, {meal.protein}g protein, {meal.fat}g yağ, {meal.fiber}g lif</li>
        ))}
      </ul>
    </main>
  );
}
