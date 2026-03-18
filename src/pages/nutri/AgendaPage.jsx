import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Plus, Clock } from 'lucide-react';
import { useToast } from '../../components/shared/Toast';

const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
const hours = Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);

const mockAppointments = [
  { id: 1, day: 0, hour: '09:00', patient: 'Francine Silva', type: 'Retorno', duration: 30 },
  { id: 2, day: 0, hour: '10:30', patient: 'Carlos Souza', type: 'Primeira Consulta', duration: 60 },
  { id: 3, day: 1, hour: '14:00', patient: 'Ana Oliveira', type: 'Retorno', duration: 30 },
  { id: 4, day: 2, hour: '09:00', patient: 'Pedro Costa', type: 'Avaliacao', duration: 45 },
  { id: 5, day: 3, hour: '11:00', patient: 'Lucia Ferreira', type: 'Retorno', duration: 30 },
];

const todaySchedule = [
  { time: '09:00', patient: 'Francine Silva', type: 'Retorno', status: 'Confirmada' },
  { time: '10:30', patient: 'Carlos Souza', type: 'Primeira Consulta', status: 'Agendada' },
  { time: '14:00', patient: 'Joao Santos', type: 'Retorno', status: 'Agendada' },
  { time: '16:00', patient: 'Fernanda Lima', type: 'Avaliacao', status: 'Confirmada' },
];

export default function AgendaPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [newAppt, setNewAppt] = useState({ patient: '', date: '', time: '', duration: '30', type: 'Retorno', notes: '' });
  const { showToast } = useToast();

  function handleSave() {
    showToast('Consulta agendada com sucesso!', 'success');
    setShowModal(false);
    setNewAppt({ patient: '', date: '', time: '', duration: '30', type: 'Retorno', notes: '' });
  }

  const statusColors = {
    Agendada: 'bg-info/10 text-info',
    Confirmada: 'bg-success/10 text-success',
    Concluida: 'bg-gray-100 text-text-muted',
  };

  const typeColors = {
    Retorno: 'bg-info',
    'Primeira Consulta': 'bg-success',
    Avaliacao: 'bg-warning',
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">Agenda</h1>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Nova Consulta</Button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-4 sm:gap-6">
        {/* Mobile: Day View */}
        <Card padding="none" className="md:hidden">
          <div className="flex overflow-x-auto border-b border-border">
            {days.map((d, i) => (
              <button
                key={d}
                onClick={() => setSelectedDay(i)}
                className={`flex-1 min-w-[3rem] py-3 text-sm font-medium text-center shrink-0 cursor-pointer transition-colors ${
                  selectedDay === i ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-muted'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="divide-y divide-border-light">
            {hours.map(h => {
              const appts = mockAppointments.filter(a => a.day === selectedDay && a.hour === h);
              return (
                <div key={h} className="flex items-start gap-3 px-3 py-2.5 min-h-[44px]">
                  <span className="text-xs text-text-muted w-12 shrink-0 pt-0.5">{h}</span>
                  <div className="flex-1">
                    {appts.map(a => (
                      <div key={a.id} className={`rounded-lg px-3 py-2 mb-1 text-white text-sm ${typeColors[a.type] || 'bg-primary'}`}>
                        <p className="font-medium">{a.patient}</p>
                        <p className="text-xs opacity-80">{a.type} - {a.duration}min</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Desktop: Week Grid */}
        <Card padding="none" className="hidden md:block overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
              <div className="p-2" />
              {days.map(d => (
                <div key={d} className="p-2 text-center text-sm font-medium text-text-secondary border-l border-border-light">{d}</div>
              ))}
            </div>
            <div className="relative">
              {hours.map(h => (
                <div key={h} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border-light">
                  <div className="p-2 text-xs text-text-muted text-right pr-3">{h}</div>
                  {days.map((_, di) => (
                    <div key={di} className="border-l border-border-light h-10 relative">
                      {mockAppointments.filter(a => a.day === di && a.hour === h).map(a => (
                        <div key={a.id} className={`absolute inset-x-0.5 top-0.5 rounded px-1.5 py-0.5 text-white text-xs leading-tight ${typeColors[a.type] || 'bg-primary'}`}>
                          <p className="font-medium truncate">{a.patient}</p>
                          <p className="opacity-80">{a.type}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Clock size={16} /> Hoje
          </h3>
          <div className="flex flex-col gap-3">
            {todaySchedule.map(a => (
              <div key={a.time} className="flex items-center gap-3 p-3 rounded-lg border border-border-light">
                <span className="text-sm font-bold text-primary w-12">{a.time}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{a.patient}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-text-muted">{a.type}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Consulta" size="md">
        <div className="flex flex-col gap-4">
          <Input label="Paciente" placeholder="Nome do paciente" value={newAppt.patient} onChange={e => setNewAppt(p => ({ ...p, patient: e.target.value }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Data" type="date" value={newAppt.date} onChange={e => setNewAppt(p => ({ ...p, date: e.target.value }))} />
            <Input label="Horario" type="time" value={newAppt.time} onChange={e => setNewAppt(p => ({ ...p, time: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Duracao</label>
              <select value={newAppt.duration} onChange={e => setNewAppt(p => ({ ...p, duration: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border text-text-primary">
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Tipo</label>
              <select value={newAppt.type} onChange={e => setNewAppt(p => ({ ...p, type: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border text-text-primary">
                <option>Primeira Consulta</option>
                <option>Retorno</option>
                <option>Avaliacao</option>
              </select>
            </div>
          </div>
          <Input label="Observacoes" type="textarea" value={newAppt.notes} onChange={e => setNewAppt(p => ({ ...p, notes: e.target.value }))} />
          <Button fullWidth onClick={handleSave}>Agendar</Button>
        </div>
      </Modal>
    </div>
  );
}
