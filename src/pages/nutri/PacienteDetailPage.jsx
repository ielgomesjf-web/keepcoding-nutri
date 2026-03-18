import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import { calcIMC, classificarIMC } from '../../utils/calculos';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const patient = {
  id: '1', nome: 'Maria Silva', email: 'maria@email.com', telefone: '(11) 99999-1234',
  nascimento: '15/05/1990', sexo: 'F', peso: 72, altura: 165, objetivo: 'Emagrecimento',
  restricoes: 'Intolerancia a lactose', status: 'Ativo',
  metaCalorias: 1800, metaProteinas: 90, metaCarbs: 220, metaGorduras: 60,
};

const plans = [
  { id: 'p1', inicio: '01/03/2025', fim: '31/03/2025', calorias: 1800, status: 'Ativo' },
  { id: 'p2', inicio: '01/02/2025', fim: '28/02/2025', calorias: 2000, status: 'Encerrado' },
];

const weightHistory = [
  { mes: 'Out', peso: 76 }, { mes: 'Nov', peso: 75 }, { mes: 'Dez', peso: 74.2 },
  { mes: 'Jan', peso: 73.5 }, { mes: 'Fev', peso: 73 }, { mes: 'Mar', peso: 72 },
];

const measurements = [
  { data: '15/03/2025', peso: 72, imc: 26.4, cintura: 78, quadril: 100, braco: 28 },
  { data: '15/02/2025', peso: 73, imc: 26.8, cintura: 80, quadril: 101, braco: 28.5 },
  { data: '15/01/2025', peso: 74.2, imc: 27.3, cintura: 82, quadril: 102, braco: 29 },
];

const consultas = [
  { data: '15/03/2025', notas: 'Boa evolucao. Mantendo dieta com disciplina.' },
  { data: '15/02/2025', notas: 'Paciente relatou dificuldade nos fins de semana.' },
  { data: '15/01/2025', notas: 'Primeira consulta. Definidos objetivos e plano inicial.' },
];

export default function PacienteDetailPage() {
  const { id } = useParams();
  const [tab, setTab] = useState('geral');
  const imc = calcIMC(patient.peso, patient.altura);
  const tabs = ['geral', 'planos', 'evolucao', 'consultas'];

  return (
    <div className="animate-fade-in">
      <Link to="/nutri/pacientes" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-4">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xl font-bold shrink-0">MS</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-heading text-xl font-bold text-text-primary">{patient.nome}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">{patient.status}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{patient.objetivo}</span>
            </div>
            <p className="text-sm text-text-secondary mt-1">{patient.email} &bull; {patient.telefone}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/nutri/pacientes/${id}/plano`}><Button icon={Plus} size="sm">Criar Plano</Button></Link>
            <Button variant="outline" icon={Edit} size="sm">Editar</Button>
          </div>
        </div>
      </Card>

      <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors capitalize cursor-pointer ${tab === t ? 'bg-white text-text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}>
            {t === 'geral' ? 'Visao Geral' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'geral' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card><div className="grid grid-cols-2 gap-4">
            {[
              ['Nascimento', patient.nascimento], ['Sexo', patient.sexo === 'F' ? 'Feminino' : 'Masculino'],
              ['Peso', `${patient.peso} kg`], ['Altura', `${patient.altura} cm`],
              ['IMC', `${imc} (${classificarIMC(imc)})`], ['Objetivo', patient.objetivo],
            ].map(([l, v]) => (
              <div key={l}><p className="text-xs text-text-muted">{l}</p><p className="font-medium text-text-primary text-sm">{v}</p></div>
            ))}
            <div className="col-span-2"><p className="text-xs text-text-muted">Restricoes</p><p className="font-medium text-text-primary text-sm">{patient.restricoes}</p></div>
          </div></Card>
          <Card><h3 className="font-semibold text-text-primary mb-4">Metas Diarias</h3>
            {[
              { label: 'Calorias', value: patient.metaCalorias, unit: 'kcal', color: 'bg-primary' },
              { label: 'Proteinas', value: patient.metaProteinas, unit: 'g', color: 'bg-info' },
              { label: 'Carboidratos', value: patient.metaCarbs, unit: 'g', color: 'bg-warning' },
              { label: 'Gorduras', value: patient.metaGorduras, unit: 'g', color: 'bg-danger' },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">{m.label}</span>
                <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${m.color}`} /><span className="font-medium text-sm text-text-primary">{m.value} {m.unit}</span></div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === 'planos' && (
        <div className="flex flex-col gap-4">
          {plans.map(p => (
            <Card key={p.id}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">{p.inicio} — {p.fim}</p>
                  <p className="text-sm text-text-muted">{p.calorias} kcal/dia</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Ativo' ? 'bg-success/10 text-success' : 'bg-gray-100 text-text-muted'}`}>{p.status}</span>
              </div>
            </Card>
          ))}
          <Link to={`/nutri/pacientes/${id}/plano`}><Button icon={Plus} fullWidth variant="outline">Criar Novo Plano</Button></Link>
        </div>
      )}

      {tab === 'evolucao' && (
        <div className="flex flex-col gap-6">
          <Card>
            <h3 className="font-semibold text-text-primary mb-4">Evolucao de Peso</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weightHistory}>
                <defs><linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Area type="monotone" dataKey="peso" stroke="#10b981" strokeWidth={2} fill="url(#greenGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-semibold text-text-primary mb-4">Medidas</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  {['Data', 'Peso', 'IMC', 'Cintura', 'Quadril', 'Braco'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-text-muted font-medium">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {measurements.map(m => (
                    <tr key={m.data} className="border-b border-border-light">
                      <td className="py-2 px-3 text-text-primary">{m.data}</td>
                      <td className="py-2 px-3">{m.peso}kg</td>
                      <td className="py-2 px-3">{m.imc}</td>
                      <td className="py-2 px-3">{m.cintura}cm</td>
                      <td className="py-2 px-3">{m.quadril}cm</td>
                      <td className="py-2 px-3">{m.braco}cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {tab === 'consultas' && (
        <div className="flex flex-col gap-4">
          {consultas.map(c => (
            <Card key={c.data}>
              <p className="text-sm font-medium text-primary mb-1">{c.data}</p>
              <p className="text-sm text-text-secondary">{c.notas}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
