import { useState } from 'react';
import Card from '../../components/ui/Card';
import { Droplets, Calendar, Check } from 'lucide-react';

const meals = [
  { name: 'Cafe da Manha', foods: 'Pao integral + Ovo + Suco', cal: 350, done: true },
  { name: 'Lanche', foods: 'Banana + Iogurte', cal: 180, done: true },
  { name: 'Almoco', foods: 'Arroz + Feijao + Frango + Salada', cal: 520, done: false },
  { name: 'Lanche Tarde', foods: 'Castanhas + Fruta', cal: 200, done: false },
  { name: 'Jantar', foods: 'Sopa de legumes', cal: 320, done: false },
  { name: 'Ceia', foods: 'Cha + Biscoito integral', cal: 120, done: false },
];

const macros = [
  { label: 'Calorias', current: 890, target: 1800, unit: 'kcal', color: 'bg-primary' },
  { label: 'Proteinas', current: 45, target: 90, unit: 'g', color: 'bg-info' },
  { label: 'Carboidratos', current: 110, target: 220, unit: 'g', color: 'bg-warning' },
  { label: 'Gorduras', current: 28, target: 60, unit: 'g', color: 'bg-danger' },
];

export default function PacienteDashboardPage() {
  const [water, setWater] = useState(5);
  const [mealsDone, setMealsDone] = useState(meals.map(m => m.done));
  const waterGlasses = 8;
  const waterMl = water * 250;

  function toggleMeal(i) {
    setMealsDone(prev => prev.map((v, idx) => idx === i ? !v : v));
  }

  return (
    <div className="px-4 py-6 pb-4 animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Ola, Maria!</h1>
        <p className="text-sm text-text-secondary mt-1">Voce esta no caminho certo!</p>
      </div>

      {/* Water */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={18} className="text-info" />
            <h3 className="font-semibold text-text-primary text-sm">Agua</h3>
          </div>
          <span className="text-xs text-text-muted">{waterMl}ml de {waterGlasses * 250}ml</span>
        </div>
        <div className="flex gap-2 mb-3">
          {Array.from({ length: waterGlasses }).map((_, i) => (
            <button key={i} onClick={() => setWater(i + 1)}
              className={`flex-1 h-8 rounded-lg transition-colors cursor-pointer ${i < water ? 'bg-info' : 'bg-gray-100'}`} />
          ))}
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-info rounded-full transition-all" style={{ width: `${(water / waterGlasses) * 100}%` }} />
        </div>
      </Card>

      {/* Today's Meals */}
      <Card className="mb-4">
        <h3 className="font-semibold text-text-primary text-sm mb-3">Refeicoes de Hoje</h3>
        <div className="flex flex-col gap-2">
          {meals.map((meal, i) => (
            <button key={i} onClick={() => toggleMeal(i)}
              className={`flex items-center gap-3 p-3 rounded-lg text-left w-full cursor-pointer transition-colors ${mealsDone[i] ? 'bg-success/5' : 'bg-gray-50'}`}>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${mealsDone[i] ? 'bg-success border-success text-white' : 'border-gray-300'}`}>
                {mealsDone[i] && <Check size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${mealsDone[i] ? 'line-through text-text-muted' : 'text-text-primary'}`}>{meal.name}</p>
                <p className="text-xs text-text-muted truncate">{meal.foods}</p>
              </div>
              <span className="text-xs text-text-muted shrink-0">{meal.cal} kcal</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Macros */}
      <Card className="mb-4">
        <h3 className="font-semibold text-text-primary text-sm mb-3">Resumo Nutricional</h3>
        <div className="grid grid-cols-2 gap-3">
          {macros.map(m => (
            <div key={m.label} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-text-muted">{m.label}</span>
                <span className="text-xs font-medium text-text-primary">{m.current}/{m.target}{m.unit}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${m.color}`} style={{ width: `${Math.min((m.current / m.target) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Next Appointment */}
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">Proxima Consulta</p>
            <p className="text-xs text-text-muted">Dr. Carlos Silva</p>
            <p className="text-xs text-primary mt-0.5">Qua, 19/03 - 14:00</p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-info/10 text-info">Retorno</span>
        </div>
      </Card>
    </div>
  );
}
