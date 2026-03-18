let tacoData = null;

export async function loadTaco() {
  if (tacoData) return tacoData;
  try {
    const res = await fetch('/data/taco.json');
    tacoData = await res.json();
    return tacoData;
  } catch {
    tacoData = [];
    return tacoData;
  }
}

export async function searchFoods(query) {
  const data = await loadTaco();
  if (!query || query.length < 2) return data.slice(0, 20);
  const q = query.toLowerCase();
  return data.filter(f => f.nome.toLowerCase().includes(q)).slice(0, 20);
}

export async function getFoodById(id) {
  const data = await loadTaco();
  return data.find(f => f.id === id) || null;
}

export function calculateNutrients(food, grams) {
  const factor = grams / 100;
  return {
    calorias: Math.round(food.calorias * factor),
    proteinas: +(food.proteinas * factor).toFixed(1),
    carboidratos: +(food.carboidratos * factor).toFixed(1),
    gorduras: +(food.gorduras * factor).toFixed(1),
    fibras: +(food.fibras * factor).toFixed(1),
  };
}
