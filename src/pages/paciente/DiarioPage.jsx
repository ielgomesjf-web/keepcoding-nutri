import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react';

const mockEntries = {
  'Cafe da Manha': [
    { food: 'Pao integral', qty: '50g', cal: 126, time: '07:30' },
    { food: 'Ovo cozido', qty: '50g', cal: 73, time: '07:30' },
  ],
  'Lanche': [
    { food: 'Banana', qty: '100g', cal: 98, time: '10:00' },
  ],
  'Almoco': [
    { food: 'Arroz integral', qty: '120g', cal: 149, time: '12:30' },
    { food: 'Feijao', qty: '80g', cal: 61, time: '12:30' },
    { food: 'Frango', qty: '120g', cal: 191, time: '12:30' },
  ],
};

export default function DiarioPage() {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState(mockEntries);
  const [newEntry, setNewEntry] = useState({ meal: 'Almoco', food: '', qty: '', notes: '' });

  const dateStr = date.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

  function changeDay(d) {
    setDate(prev => { const n = new Date(prev); n.setDate(n.getDate() + d); return n; });
  }

  const totalCal = Object.values(entries).flat().reduce((s, e) => s + e.cal, 0);
  const targetCal = 1800;
  const adherence = Math.min(Math.round((totalCal / targetCal) * 100), 100);
  const adherenceColor = adherence >= 80 ? 'text-success' : adherence >= 60 ? 'text-warning' : 'text-danger';

  function handleSave() {
    const cal = Math.round(Math.random() * 100 + 50);
    const mealKey = newEntry.meal;
    setEntries(prev => ({
      ...prev,
      [mealKey]: [...(prev[mealKey] || []), { food: newEntry.food, qty: newEntry.qty || '100g', cal, time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }],
    }));
    setShowModal(false);
    setNewEntry({ meal: 'Almoco', food: '', qty: '', notes: '' });
  }

  function removeEntry(meal, idx) {
    setEntries(prev => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== idx),
    }));
  }

  return (
    <div className="px-4 py-6 pb-4 animate-fade-in">
      <h1 className="font-heading text-xl font-bold text-text-primary mb-4">Diario Alimentar</h1>

      {/* Date Selector */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <button onClick={() => changeDay(-1)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"><ChevronLeft size={20} className="text-text-secondary" /></button>
        <p className="text-sm font-medium text-text-primary capitalize">{dateStr}</p>
        <button onClick={() => changeDay(1)} className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"><ChevronRight size={20} className="text-text-secondary" /></button>
      </div>

      <Button icon={Plus} fullWidth className="mb-5" onClick={() => setShowModal(true)}>Registrar Refeicao</Button>

      {/* Entries */}
      {Object.entries(entries).map(([meal, items]) => {
        const mealCal = items.reduce((s, e) => s + e.cal, 0);
        return (
          <Card key={meal} className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-text-primary">{meal}</h3>
              <span className="text-xs text-primary font-medium">{mealCal} kcal</span>
            </div>
            {items.map((e, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 text-sm">
                <div className="flex-1">
                  <span className="text-text-primary">{e.food}</span>
                  <span className="text-text-muted ml-2">{e.qty}</span>
                </div>
                <span className="text-xs text-text-muted">{e.time}</span>
                <span className="text-xs text-primary">{e.cal}kcal</span>
                <button onClick={() => removeEntry(meal, i)} className="text-text-muted hover:text-danger cursor-pointer"><X size={14} /></button>
              </div>
            ))}
          </Card>
        );
      })}

      {/* Totals */}
      <Card className="mb-4">
        <h3 className="font-semibold text-sm text-text-primary mb-3">Total do Dia</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Calorias</span>
          <span className="text-sm font-medium text-text-primary">{totalCal} / {targetCal} kcal</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min((totalCal / targetCal) * 100, 100)}%` }} />
        </div>
      </Card>

      {/* Adherence */}
      <Card>
        <div className="text-center">
          <p className={`text-3xl font-bold ${adherenceColor}`}>{adherence}%</p>
          <p className="text-sm text-text-muted mt-1">Aderencia ao plano</p>
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Registrar Refeicao" size="md">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Refeicao</label>
            <select value={newEntry.meal} onChange={e => setNewEntry(p => ({ ...p, meal: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border text-text-primary">
              {['Cafe da Manha', 'Lanche', 'Almoco', 'Lanche Tarde', 'Jantar', 'Ceia'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <Input label="Alimento" placeholder="Ex: Arroz integral" value={newEntry.food} onChange={e => setNewEntry(p => ({ ...p, food: e.target.value }))} />
          <Input label="Quantidade" placeholder="Ex: 120g" value={newEntry.qty} onChange={e => setNewEntry(p => ({ ...p, qty: e.target.value }))} />
          <Input label="Observacoes" type="textarea" value={newEntry.notes} onChange={e => setNewEntry(p => ({ ...p, notes: e.target.value }))} />
          <Button fullWidth onClick={handleSave}>Salvar</Button>
        </div>
      </Modal>
    </div>
  );
}
