import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Download, FileText } from 'lucide-react';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useToast } from '../../components/shared/Toast';

const stats = [
  { label: 'Total Consultas', value: '48' },
  { label: 'Pacientes Ativos', value: '24' },
  { label: 'Taxa Retorno', value: '85%' },
  { label: 'Satisfacao Media', value: '4.8/5.0' },
];

const consultasMes = [
  { mes: 'Out', value: 32 }, { mes: 'Nov', value: 38 }, { mes: 'Dez', value: 28 },
  { mes: 'Jan', value: 42 }, { mes: 'Fev', value: 45 }, { mes: 'Mar', value: 48 },
];

const novosPacientes = [
  { mes: 'Out', value: 5 }, { mes: 'Nov', value: 3 }, { mes: 'Dez', value: 4 },
  { mes: 'Jan', value: 6 }, { mes: 'Fev', value: 4 }, { mes: 'Mar', value: 7 },
];

const objetivos = [
  { name: 'Emagrecimento', value: 40, color: '#f97316' },
  { name: 'Ganho Massa', value: 25, color: '#10b981' },
  { name: 'Manutencao', value: 20, color: '#3b82f6' },
  { name: 'Saude', value: 15, color: '#8b5cf6' },
];

const horarios = [
  { hora: '08h', value: 4 }, { hora: '09h', value: 12 }, { hora: '10h', value: 10 },
  { hora: '11h', value: 8 }, { hora: '14h', value: 11 }, { hora: '15h', value: 9 },
  { hora: '16h', value: 6 }, { hora: '17h', value: 3 },
];

export default function RelatoriosPage() {
  const [period, setPeriod] = useState('Ultimo Mes');
  const { showToast } = useToast();

  function exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatorio - KeepCoding Nutri', 14, 22);
    doc.setFontSize(11);
    doc.text(`Periodo: ${period}`, 14, 32);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 39);
    doc.autoTable({
      startY: 48,
      head: [['Metrica', 'Valor']],
      body: [
        ['Total Consultas', '48'],
        ['Pacientes Ativos', '24'],
        ['Taxa de Retorno', '85%'],
        ['Satisfacao Media', '4.8/5.0'],
        ['Novos Pacientes (mes)', '7'],
        ['Planos Ativos', '18'],
      ],
      theme: 'striped',
      headStyles: { fillColor: [249, 115, 22] },
    });
    doc.save('relatorio-keepcoding-nutri.pdf');
    showToast('PDF exportado com sucesso!', 'success');
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Relatorios</h1>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="px-4 py-2 rounded-lg border border-border text-sm text-text-primary">
          <option>Ultima Semana</option>
          <option>Ultimo Mes</option>
          <option>Ultimos 3 Meses</option>
          <option>Ultimo Ano</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <Card key={s.label}>
            <p className="text-2xl font-bold text-text-primary">{s.value}</p>
            <p className="text-sm text-text-secondary mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h3 className="font-semibold text-text-primary mb-4">Consultas por Mes</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={consultasMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-text-primary mb-4">Evolucao de Pacientes</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={novosPacientes}>
              <defs><linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#gGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-text-primary mb-4">Distribuicao por Objetivo</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={objetivos} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {objetivos.map(o => <Cell key={o.name} fill={o.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-text-primary mb-4">Horarios Mais Populares</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={horarios}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="hora" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary">Exportar Relatorio</h3>
            <p className="text-sm text-text-secondary mt-1">Gere um relatorio em PDF ou CSV</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon={FileText} onClick={exportPDF}>Exportar PDF</Button>
            <Button variant="ghost" icon={Download} onClick={() => showToast('CSV exportado!', 'success')}>Exportar CSV</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
