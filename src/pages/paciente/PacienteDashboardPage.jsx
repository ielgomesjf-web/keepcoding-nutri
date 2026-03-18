import { useState } from 'react';
import Card from '../../components/ui/Card';
import { Droplets, Calendar, Check, Plus, Minus } from 'lucide-react';

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
      <Card className="mb-4" padding="none">
        <div className="relative overflow-hidden rounded-xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50" />

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0 opacity-20" style={{ height: `${Math.max((water / waterGlasses) * 60, 8)}%`, transition: 'height 0.6s ease' }}>
            <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute top-0 w-full h-5" style={{ transform: 'translateY(-90%)' }}>
              <path d="M0,20 C50,5 100,35 150,20 C200,5 250,35 300,20 C350,5 400,35 400,20 L400,40 L0,40 Z" fill="#0ea5e9" opacity="0.5" />
              <path d="M0,25 C60,10 120,35 180,22 C240,9 300,35 360,22 C380,16 400,28 400,25 L400,40 L0,40 Z" fill="#0ea5e9" opacity="0.3" />
            </svg>
            <div className="w-full h-full bg-gradient-to-t from-sky-400/40 to-sky-300/20" />
          </div>

          <div className="relative p-4 sm:p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center">
                  <Droplets size={18} className="text-sky-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">Hidratacao</h3>
                  <p className="text-xs text-text-muted">Meta diaria: {waterGlasses} copos</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-sky-600">{waterMl}ml</p>
                <p className="text-[11px] text-text-muted">de {waterGlasses * 250}ml</p>
              </div>
            </div>

            {/* Drops grid */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              {Array.from({ length: waterGlasses }).map((_, i) => (
                <button key={i} onClick={() => setWater(i < water ? i : i + 1)}
                  className="group cursor-pointer flex flex-col items-center gap-1"
                >
                  <div className={`relative transition-all duration-300 ${i < water ? 'scale-100' : 'scale-90 opacity-40'}`}>
                    <svg width="32" height="38" viewBox="0 0 32 38" className={`drop-shadow-sm transition-all duration-300 ${i < water ? '' : 'grayscale'}`}>
                      <path d="M16 2 C16 2 4 16 4 24 C4 30.6 9.4 36 16 36 C22.6 36 28 30.6 28 24 C28 16 16 2 16 2Z"
                        fill={i < water ? 'url(#dropGrad)' : '#e5e7eb'}
                        stroke={i < water ? '#0ea5e9' : '#d1d5db'}
                        strokeWidth="1.5"
                      />
                      <defs>
                        <linearGradient id="dropGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7dd3fc" />
                          <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {i < water && (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold pt-2">
                        {i + 1}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Progress bar + controls */}
            <div className="flex items-center gap-3">
              <button onClick={() => setWater(w => Math.max(0, w - 1))}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-muted hover:text-sky-500 hover:border-sky-300 transition-colors cursor-pointer shadow-sm shrink-0">
                <Minus size={16} />
              </button>
              <div className="flex-1">
                <div className="h-3 bg-white/80 rounded-full overflow-hidden shadow-inner border border-gray-100">
                  <div className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-500"
                    style={{ width: `${(water / waterGlasses) * 100}%` }}
                  />
                </div>
                <p className="text-center text-xs text-text-muted mt-1.5">
                  {water >= waterGlasses ? '🎉 Meta atingida!' : `${waterGlasses - water} copos restantes`}
                </p>
              </div>
              <button onClick={() => setWater(w => Math.min(waterGlasses, w + 1))}
                className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white hover:bg-sky-600 transition-colors cursor-pointer shadow-sm shrink-0">
                <Plus size={16} />
              </button>
            </div>
          </div>
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
