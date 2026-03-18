import Card from '../../components/ui/Card';
import { Users, Calendar, ClipboardList, MessageSquare } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { icon: Users, value: '24', label: 'Total Pacientes', color: 'bg-primary/10 text-primary' },
  { icon: Calendar, value: '6', label: 'Consultas Hoje', color: 'bg-info/10 text-info' },
  { icon: ClipboardList, value: '18', label: 'Planos Ativos', color: 'bg-success/10 text-success' },
  { icon: MessageSquare, value: '3', label: 'Mensagens', color: 'bg-warning/10 text-warning' },
];

const weeklyData = [
  { day: 'Seg', value: 8 }, { day: 'Ter', value: 12 }, { day: 'Qua', value: 6 }, { day: 'Qui', value: 10 }, { day: 'Sex', value: 14 },
];

const objectives = [
  { name: 'Emagrecimento', value: 40, color: '#f97316' },
  { name: 'Ganho Massa', value: 25, color: '#10b981' },
  { name: 'Manutencao', value: 20, color: '#3b82f6' },
  { name: 'Saude', value: 15, color: '#8b5cf6' },
];

const recentPatients = [
  { name: 'Francine Silva', objetivo: 'Emagrecimento', data: '15/03/2025' },
  { name: 'Joao Santos', objetivo: 'Ganho Massa', data: '14/03/2025' },
  { name: 'Ana Oliveira', objetivo: 'Manutencao', data: '13/03/2025' },
  { name: 'Pedro Costa', objetivo: 'Saude', data: '12/03/2025' },
  { name: 'Lucia Ferreira', objetivo: 'Emagrecimento', data: '11/03/2025' },
];

const appointments = [
  { time: '09:00', patient: 'Francine Silva', type: 'Retorno' },
  { time: '10:30', patient: 'Carlos Souza', type: 'Primeira Consulta' },
  { time: '14:00', patient: 'Ana Oliveira', type: 'Retorno' },
];

export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="font-heading text-2xl font-bold text-text-primary mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <Card key={s.label} padding="md">
            <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-sm text-text-secondary mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Consultas da Semana</h3>
          <div className="h-[160px] sm:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} formatter={(v) => [v, 'Consultas']} />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Distribuicao de Objetivos</h3>
          <div className="h-[160px] sm:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={objectives} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {objectives.map(o => <Cell key={o.name} fill={o.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Ultimos Pacientes</h3>
          <div className="flex flex-col gap-3">
            {recentPatients.map(p => (
              <div key={p.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{p.name}</p>
                  <p className="text-xs text-text-muted">{p.objetivo}</p>
                </div>
                <span className="text-xs text-text-muted">{p.data}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Proximas Consultas</h3>
          <div className="flex flex-col gap-3">
            {appointments.map(a => (
              <div key={a.time} className="flex items-center gap-4 p-3 rounded-lg border border-border-light">
                <span className="text-sm font-bold text-primary w-12">{a.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{a.patient}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${a.type === 'Retorno' ? 'bg-info/10 text-info' : 'bg-success/10 text-success'}`}>{a.type}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
