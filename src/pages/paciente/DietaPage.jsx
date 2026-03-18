import { useState } from 'react';
import Card from '../../components/ui/Card';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

const mealPlan = [
  {
    name: 'Cafe da Manha', icon: '☕', foods: [
      { nome: 'Pao integral', qtd: '2 fatias (50g)', cal: 126, p: 4.7, c: 25, g: 1.5 },
      { nome: 'Ovo cozido', qtd: '1 unidade (50g)', cal: 73, p: 6.7, c: 0.3, g: 4.8 },
      { nome: 'Suco de laranja', qtd: '200ml', cal: 74, p: 2, c: 17.8, g: 0.2 },
    ],
    subs: ['Torrada integral', 'Omelete de claras'],
  },
  {
    name: 'Lanche da Manha', icon: '🍎', foods: [
      { nome: 'Banana prata', qtd: '1 unidade (100g)', cal: 98, p: 1.3, c: 26, g: 0.1 },
      { nome: 'Iogurte natural', qtd: '170g', cal: 87, p: 7, c: 10.4, g: 1.5 },
    ],
    subs: ['Maca', 'Queijo cottage'],
  },
  {
    name: 'Almoco', icon: '🍽️', foods: [
      { nome: 'Arroz integral', qtd: '4 colheres (120g)', cal: 149, p: 3.1, c: 31, g: 1.2 },
      { nome: 'Feijao carioca', qtd: '1 concha (80g)', cal: 61, p: 3.8, c: 10.9, g: 0.4 },
      { nome: 'Frango grelhado', qtd: '120g', cal: 191, p: 38.4, c: 0, g: 3.8 },
      { nome: 'Salada (alface+tomate)', qtd: '100g', cal: 13, p: 1.2, c: 2.4, g: 0.2 },
      { nome: 'Azeite de oliva', qtd: '1 colher (5ml)', cal: 44, p: 0, c: 0, g: 5 },
    ],
    subs: ['Patinho grelhado', 'Quinoa'],
  },
  {
    name: 'Lanche da Tarde', icon: '🥜', foods: [
      { nome: 'Castanha do para', qtd: '3 unidades (12g)', cal: 77, p: 1.7, c: 0.4, g: 7.6 },
      { nome: 'Maca fuji', qtd: '1 unidade (130g)', cal: 73, p: 0.4, c: 19.8, g: 0 },
    ],
    subs: ['Amendoas', 'Morango'],
  },
  {
    name: 'Jantar', icon: '🌙', foods: [
      { nome: 'Salmao grelhado', qtd: '120g', cal: 292, p: 31.3, c: 0, g: 18.7 },
      { nome: 'Batata doce', qtd: '150g', cal: 116, p: 0.9, c: 27.6, g: 0.2 },
      { nome: 'Brocolis cozido', qtd: '100g', cal: 25, p: 2.1, c: 4.4, g: 0.3 },
    ],
    subs: ['Atum grelhado', 'Mandioca'],
  },
  {
    name: 'Ceia', icon: '🍵', foods: [
      { nome: 'Cha de camomila', qtd: '200ml', cal: 2, p: 0, c: 0.5, g: 0 },
      { nome: 'Aveia', qtd: '2 colheres (20g)', cal: 79, p: 2.8, c: 13.3, g: 1.7 },
    ],
    subs: ['Cha verde', 'Biscoito integral'],
  },
];

export default function DietaPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [expanded, setExpanded] = useState(0);
  const [checked, setChecked] = useState(mealPlan.map(() => false));

  const dayTotals = mealPlan.reduce(
    (acc, meal) => {
      const mealTotals = meal.foods.reduce((a, f) => ({ cal: a.cal + f.cal, p: a.p + f.p, c: a.c + f.c, g: a.g + f.g }), { cal: 0, p: 0, c: 0, g: 0 });
      return { cal: acc.cal + mealTotals.cal, p: acc.p + mealTotals.p, c: acc.c + mealTotals.c, g: acc.g + mealTotals.g };
    },
    { cal: 0, p: 0, c: 0, g: 0 }
  );

  return (
    <div className="px-4 py-6 pb-4 animate-fade-in">
      <h1 className="font-heading text-xl font-bold text-text-primary mb-1">Meu Plano Alimentar</h1>
      <p className="text-xs text-text-muted mb-4">10/03 - 10/04/2025 &bull; Dr. Carlos Silva</p>

      {/* Day selector */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {weekDays.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 cursor-pointer transition-colors ${selectedDay === i ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted'}`}>
            {d}
          </button>
        ))}
      </div>

      {/* Meals */}
      <div className="flex flex-col gap-3 mb-4">
        {mealPlan.map((meal, mi) => {
          const mealCal = meal.foods.reduce((s, f) => s + f.cal, 0);
          const isOpen = expanded === mi;
          return (
            <Card key={mi} padding="none">
              <button onClick={() => setExpanded(isOpen ? -1 : mi)}
                className="w-full flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{meal.icon}</span>
                  <span className="font-medium text-sm text-text-primary">{meal.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-primary">{mealCal} kcal</span>
                  {isOpen ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-border-light">
                  {meal.foods.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 py-2.5 border-b border-border-light last:border-0">
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">{f.nome}</p>
                        <p className="text-xs text-text-muted">{f.qtd}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{f.cal}cal</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-info/10 text-info">{f.p}P</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-warning/10 text-warning">{f.c}C</span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-danger/10 text-danger">{f.g}G</span>
                      </div>
                    </div>
                  ))}
                  {meal.subs.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-text-muted mb-1">Substituicoes:</p>
                      <p className="text-xs text-text-secondary">{meal.subs.join(', ')}</p>
                    </div>
                  )}
                  <button onClick={() => setChecked(prev => prev.map((v, i) => i === mi ? !v : v))}
                    className={`mt-3 flex items-center gap-2 text-sm cursor-pointer ${checked[mi] ? 'text-success' : 'text-text-muted'}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${checked[mi] ? 'bg-success border-success text-white' : 'border-gray-300'}`}>
                      {checked[mi] && <Check size={12} />}
                    </div>
                    {checked[mi] ? 'Consumido' : 'Marcar como consumido'}
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Day totals */}
      <div className="bg-white rounded-xl border border-border p-4 sticky bottom-16">
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: 'Calorias', value: Math.round(dayTotals.cal), unit: 'kcal', color: 'text-primary' },
            { label: 'Proteinas', value: dayTotals.p.toFixed(0), unit: 'g', color: 'text-info' },
            { label: 'Carbos', value: dayTotals.c.toFixed(0), unit: 'g', color: 'text-warning' },
            { label: 'Gorduras', value: dayTotals.g.toFixed(0), unit: 'g', color: 'text-danger' },
          ].map(t => (
            <div key={t.label}>
              <p className={`text-lg font-bold ${t.color}`}>{t.value}</p>
              <p className="text-[11px] text-text-muted">{t.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
