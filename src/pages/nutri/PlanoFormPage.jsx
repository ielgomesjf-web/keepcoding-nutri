import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { ArrowLeft, Plus, X, Search, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { searchFoods, calculateNutrients } from '../../services/taco';
import { generateMealSuggestion } from '../../services/ai';
import { useToast } from '../../components/shared/Toast';

const mealSlots = [
  { key: 'cafe', name: 'Cafe da Manha', icon: '☕' },
  { key: 'lanche1', name: 'Lanche da Manha', icon: '🍎' },
  { key: 'almoco', name: 'Almoco', icon: '🍽️' },
  { key: 'lanche2', name: 'Lanche da Tarde', icon: '🥜' },
  { key: 'jantar', name: 'Jantar', icon: '🌙' },
  { key: 'ceia', name: 'Ceia', icon: '🍵' },
];

export default function PlanoFormPage() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [metaCalorias, setMetaCalorias] = useState(1800);
  const [macros, setMacros] = useState({ proteina: 30, carb: 50, gordura: 20 });
  const [meals, setMeals] = useState(() => Object.fromEntries(mealSlots.map(s => [s.key, []])));
  const [expandedMeal, setExpandedMeal] = useState('cafe');
  const [searchModal, setSearchModal] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [grams, setGrams] = useState('100');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [showAi, setShowAi] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      searchFoods(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  function addFood(mealKey) {
    if (!selectedFood) return;
    const g = Number(grams) || 100;
    const nutrients = calculateNutrients(selectedFood, g);
    setMeals(prev => ({
      ...prev,
      [mealKey]: [...prev[mealKey], { ...selectedFood, grams: g, ...nutrients }],
    }));
    setSearchModal(null);
    setSelectedFood(null);
    setQuery('');
    setGrams('100');
  }

  function removeFood(mealKey, index) {
    setMeals(prev => ({
      ...prev,
      [mealKey]: prev[mealKey].filter((_, i) => i !== index),
    }));
  }

  const allFoods = Object.values(meals).flat();
  const totals = {
    calorias: allFoods.reduce((s, f) => s + f.calorias, 0),
    proteinas: allFoods.reduce((s, f) => s + f.proteinas, 0),
    carboidratos: allFoods.reduce((s, f) => s + f.carboidratos, 0),
    gorduras: allFoods.reduce((s, f) => s + f.gorduras, 0),
  };

  const macroGrams = {
    proteinas: Math.round((metaCalorias * macros.proteina / 100) / 4),
    carboidratos: Math.round((metaCalorias * macros.carb / 100) / 4),
    gorduras: Math.round((metaCalorias * macros.gordura / 100) / 9),
  };

  function pctBar(current, target) {
    const pct = target > 0 ? Math.min((current / target) * 100, 150) : 0;
    const diff = target > 0 ? Math.abs(current - target) / target * 100 : 0;
    const color = diff <= 5 ? 'bg-success' : diff <= 15 ? 'bg-warning' : 'bg-danger';
    return { pct: Math.min(pct, 100), color };
  }

  async function handleAI() {
    setAiLoading(true);
    const result = await generateMealSuggestion({ nome: 'Francine', peso: 72, altura: 165, objetivo: 'Emagrecimento', restricoes: 'Intolerancia a lactose' });
    setAiResult(result);
    setShowAi(true);
    setAiLoading(false);
  }

  function handleSave() {
    console.log('Plano:', { inicio, fim, metaCalorias, macros, meals });
    showToast('Plano alimentar salvo com sucesso!', 'success');
  }

  return (
    <div className="animate-fade-in">
      <Link to={`/nutri/pacientes/${id}`} className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4">
        <ArrowLeft size={16} /> Voltar
      </Link>
      <h1 className="font-heading text-2xl font-bold text-text-primary mb-6">Novo Plano Alimentar</h1>

      <Card className="mb-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input label="Data inicio" type="date" value={inicio} onChange={e => setInicio(e.target.value)} />
          <Input label="Data fim" type="date" value={fim} onChange={e => setFim(e.target.value)} />
          <Input label="Meta calorias (kcal)" type="number" value={metaCalorias} onChange={e => setMetaCalorias(Number(e.target.value))} />
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Macros (%)</label>
            <div className="flex gap-2">
              {[['P', 'proteina'], ['C', 'carb'], ['G', 'gordura']].map(([l, k]) => (
                <div key={k} className="flex-1">
                  <label className="text-xs text-text-muted">{l}</label>
                  <input type="number" value={macros[k]} onChange={e => setMacros(p => ({ ...p, [k]: Number(e.target.value) }))}
                    className="w-full px-2 py-2.5 rounded-lg border border-border text-sm text-center min-h-[44px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end mb-4">
        <Button variant="outline" icon={Sparkles} onClick={handleAI} loading={aiLoading}>Sugerir com IA</Button>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {mealSlots.map(slot => {
          const mealFoods = meals[slot.key];
          const mealTotal = {
            cal: mealFoods.reduce((s, f) => s + f.calorias, 0),
            p: mealFoods.reduce((s, f) => s + f.proteinas, 0),
            c: mealFoods.reduce((s, f) => s + f.carboidratos, 0),
            g: mealFoods.reduce((s, f) => s + f.gorduras, 0),
          };
          const isOpen = expandedMeal === slot.key;
          return (
            <Card key={slot.key} padding="none">
              <button onClick={() => setExpandedMeal(isOpen ? null : slot.key)}
                className="w-full flex items-center justify-between p-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{slot.icon}</span>
                  <span className="font-medium text-text-primary">{slot.name}</span>
                  <span className="text-xs text-text-muted">({mealFoods.length} itens)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-primary">{mealTotal.cal} kcal</span>
                  {isOpen ? <ChevronUp size={18} className="text-text-muted" /> : <ChevronDown size={18} className="text-text-muted" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 border-t border-border-light">
                  {mealFoods.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      {mealFoods.map((f, i) => (
                        <div key={i} className="py-2 border-b border-border-light last:border-0">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="flex-1 text-text-primary truncate">{f.nome}</span>
                            <span className="text-text-muted text-xs">{f.grams}g</span>
                            <button onClick={() => removeFood(slot.key, i)} className="p-1.5 text-text-muted hover:text-danger cursor-pointer"><X size={16} /></button>
                          </div>
                          <div className="flex gap-3 mt-1 text-xs">
                            <span className="text-primary font-medium">{f.calorias}kcal</span>
                            <span className="text-info">{f.proteinas}P</span>
                            <span className="text-warning">{f.carboidratos}C</span>
                            <span className="text-danger">{f.gorduras}G</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button variant="ghost" size="sm" icon={Plus} onClick={() => { setSearchModal(slot.key); setQuery(''); setResults([]); setSelectedFood(null); }} className="mt-3">
                    Adicionar Alimento
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Daily Total */}
      <Card className="mb-6">
        <h3 className="font-semibold text-text-primary mb-4">Total Diario</h3>
        {[
          { label: 'Calorias', current: totals.calorias, target: metaCalorias, unit: 'kcal' },
          { label: 'Proteinas', current: totals.proteinas, target: macroGrams.proteinas, unit: 'g' },
          { label: 'Carboidratos', current: totals.carboidratos, target: macroGrams.carboidratos, unit: 'g' },
          { label: 'Gorduras', current: totals.gorduras, target: macroGrams.gorduras, unit: 'g' },
        ].map(item => {
          const bar = pctBar(item.current, item.target);
          return (
            <div key={item.label} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">{item.label}</span>
                <span className="text-text-primary font-medium">{Math.round(item.current)} / {item.target} {item.unit}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${bar.color}`} style={{ width: `${bar.pct}%` }} />
              </div>
            </div>
          );
        })}
      </Card>

      <Button fullWidth size="lg" onClick={handleSave}>Salvar Plano</Button>

      {/* Search Food Modal */}
      <Modal isOpen={!!searchModal} onClose={() => setSearchModal(null)} title="Adicionar Alimento" size="lg">
        <Input icon={Search} placeholder="Buscar alimento (ex: arroz, frango)..." value={query} onChange={e => setQuery(e.target.value)} className="mb-4" />
        {!selectedFood ? (
          <div className="max-h-60 overflow-y-auto flex flex-col gap-1">
            {results.map(food => (
              <button key={food.id} onClick={() => setSelectedFood(food)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left w-full cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-text-primary">{food.nome}</p>
                  <p className="text-xs text-text-muted">{food.grupo}</p>
                </div>
                <span className="text-sm text-primary">{food.calorias} kcal/100g</span>
              </button>
            ))}
            {query.length >= 2 && results.length === 0 && (
              <p className="text-sm text-text-muted text-center py-4">Nenhum alimento encontrado</p>
            )}
          </div>
        ) : (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="font-medium text-text-primary">{selectedFood.nome}</p>
              <p className="text-xs text-text-muted mb-3">por 100g: {selectedFood.calorias}kcal | P:{selectedFood.proteinas}g | C:{selectedFood.carboidratos}g | G:{selectedFood.gorduras}g</p>
              <Input label="Quantidade (g)" type="number" value={grams} onChange={e => setGrams(e.target.value)} />
              {grams && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-sm">
                  {Object.entries(calculateNutrients(selectedFood, Number(grams) || 0)).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="bg-white rounded p-2">
                      <p className="font-bold text-text-primary">{v}</p>
                      <p className="text-xs text-text-muted">{k}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setSelectedFood(null)} className="flex-1">Voltar</Button>
              <Button onClick={() => addFood(searchModal)} className="flex-1">Adicionar</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* AI Result Modal */}
      <Modal isOpen={showAi} onClose={() => setShowAi(false)} title="Sugestao da IA" size="xl">
        <div className="whitespace-pre-wrap text-sm text-text-secondary leading-relaxed">{aiResult}</div>
      </Modal>
    </div>
  );
}
