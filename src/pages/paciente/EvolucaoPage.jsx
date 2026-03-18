import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Plus, TrendingDown, Award, CheckCircle, Flame } from 'lucide-react';
import { calcIMC, classificarIMC } from '../../utils/calculos';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const weightData = [
  { mes: 'Out', peso: 76 }, { mes: 'Nov', peso: 75 }, { mes: 'Dez', peso: 74.2 },
  { mes: 'Jan', peso: 73.5 }, { mes: 'Fev', peso: 73 }, { mes: 'Mar', peso: 72 },
];

const measurements = [
  { data: '15/03', peso: 72, imc: 26.4, cintura: 78, quadril: 100, braco: 28 },
  { data: '15/02', peso: 73, imc: 26.8, cintura: 80, quadril: 101, braco: 28.5 },
  { data: '15/01', peso: 74.2, imc: 27.3, cintura: 82, quadril: 102, braco: 29 },
];

const badges = [
  { icon: CheckCircle, label: 'Primeira Semana', earned: true },
  { icon: TrendingDown, label: '-3kg', earned: true },
  { icon: Flame, label: '7 dias seguidos', earned: true },
  { icon: Award, label: 'IMC Normal', earned: false },
];

export default function EvolucaoPage() {
  const [showModal, setShowModal] = useState(false);
  const [newMeasure, setNewMeasure] = useState({ peso: '', cintura: '', quadril: '', braco: '', obs: '' });

  const currentWeight = 72;
  const goalWeight = 68;
  const currentIMC = calcIMC(currentWeight, 165);
  const progress = 76 - currentWeight;

  return (
    <div className="px-4 py-6 pb-4 animate-fade-in">
      <h1 className="font-heading text-xl font-bold text-text-primary mb-5">Minha Evolucao</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Peso Atual', value: `${currentWeight} kg`, color: 'text-text-primary' },
          { label: 'IMC', value: `${currentIMC}`, sub: classificarIMC(currentIMC), color: currentIMC < 25 ? 'text-success' : 'text-warning' },
          { label: 'Meta', value: `${goalWeight} kg`, color: 'text-primary' },
          { label: 'Progresso', value: `-${progress} kg`, color: 'text-success' },
        ].map(s => (
          <Card key={s.label} padding="sm">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-text-muted">{s.label}</p>
            {s.sub && <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-text-muted">{s.sub}</span>}
          </Card>
        ))}
      </div>

      {/* Weight Chart */}
      <Card className="mb-5">
        <h3 className="font-semibold text-sm text-text-primary mb-3">Evolucao de Peso</h3>
        <div className="h-[160px] sm:h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weightData}>
            <defs>
              <linearGradient id="wGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
            <ReferenceLine y={goalWeight} stroke="#f97316" strokeDasharray="5 5" label={{ value: 'Meta', fill: '#f97316', fontSize: 11 }} />
            <Area type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={2} fill="url(#wGrad)" />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </Card>

      {/* Measurements */}
      <Card className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-text-primary">Medidas</h3>
          <Button variant="ghost" size="sm" icon={Plus} onClick={() => setShowModal(true)}>Adicionar</Button>
        </div>
        {/* Mobile: stacked cards */}
        <div className="flex flex-col gap-3 sm:hidden">
          {measurements.map((m, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium text-primary mb-2">{m.data}</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div><p className="text-xs text-text-muted">Peso</p><p className="font-medium">{m.peso}kg</p></div>
                <div><p className="text-xs text-text-muted">IMC</p><p className="font-medium">{m.imc}</p></div>
                <div><p className="text-xs text-text-muted">Cintura</p><p className="font-medium">{m.cintura}cm</p></div>
                <div><p className="text-xs text-text-muted">Quadril</p><p className="font-medium">{m.quadril}cm</p></div>
                <div><p className="text-xs text-text-muted">Braco</p><p className="font-medium">{m.braco}cm</p></div>
              </div>
            </div>
          ))}
        </div>
        {/* Desktop: table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['Data', 'Peso', 'IMC', 'Cintura', 'Quadril', 'Braco'].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-text-muted font-medium text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {measurements.map((m, i) => (
                <tr key={i} className="border-b border-border-light">
                  <td className="py-2 px-2 text-text-primary">{m.data}</td>
                  <td className="py-2 px-2">{m.peso}kg</td>
                  <td className="py-2 px-2">{m.imc}</td>
                  <td className="py-2 px-2">{m.cintura}cm</td>
                  <td className="py-2 px-2">{m.quadril}cm</td>
                  <td className="py-2 px-2">{m.braco}cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <h3 className="font-semibold text-sm text-text-primary mb-3">Conquistas</h3>
        <div className="grid grid-cols-4 gap-3">
          {badges.map(b => (
            <div key={b.label} className={`flex flex-col items-center text-center gap-1.5 ${b.earned ? '' : 'opacity-30'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${b.earned ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-text-muted'}`}>
                <b.icon size={22} />
              </div>
              <span className="text-xs text-text-muted leading-tight">{b.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Medida" size="md">
        <div className="flex flex-col gap-4">
          <Input label="Peso (kg)" type="number" value={newMeasure.peso} onChange={e => setNewMeasure(p => ({ ...p, peso: e.target.value }))} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Cintura (cm)" type="number" value={newMeasure.cintura} onChange={e => setNewMeasure(p => ({ ...p, cintura: e.target.value }))} />
            <Input label="Quadril (cm)" type="number" value={newMeasure.quadril} onChange={e => setNewMeasure(p => ({ ...p, quadril: e.target.value }))} />
            <Input label="Braco (cm)" type="number" value={newMeasure.braco} onChange={e => setNewMeasure(p => ({ ...p, braco: e.target.value }))} />
          </div>
          <Input label="Observacoes" type="textarea" value={newMeasure.obs} onChange={e => setNewMeasure(p => ({ ...p, obs: e.target.value }))} />
          <Button fullWidth onClick={() => { setShowModal(false); }}>Salvar</Button>
        </div>
      </Modal>
    </div>
  );
}
