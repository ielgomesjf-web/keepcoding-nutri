import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { Plus, Search } from 'lucide-react';
import { useToast } from '../../components/shared/Toast';
import { calcIMC, classificarIMC } from '../../utils/calculos';

const mockPatients = [
  { id: '1', nome: 'Francine Silva', email: 'francine@email.com', objetivo: 'Emagrecimento', status: 'Ativo', peso: 72, altura: 165, ultimaConsulta: '15/03/2025' },
  { id: '2', nome: 'Joao Santos', email: 'joao@email.com', objetivo: 'Ganho Massa', status: 'Ativo', peso: 68, altura: 178, ultimaConsulta: '14/03/2025' },
  { id: '3', nome: 'Ana Oliveira', email: 'ana@email.com', objetivo: 'Manutencao', status: 'Ativo', peso: 58, altura: 160, ultimaConsulta: '13/03/2025' },
  { id: '4', nome: 'Pedro Costa', email: 'pedro@email.com', objetivo: 'Saude', status: 'Ativo', peso: 90, altura: 175, ultimaConsulta: '12/03/2025' },
  { id: '5', nome: 'Lucia Ferreira', email: 'lucia@email.com', objetivo: 'Emagrecimento', status: 'Inativo', peso: 85, altura: 162, ultimaConsulta: '01/02/2025' },
  { id: '6', nome: 'Carlos Souza', email: 'carlos@email.com', objetivo: 'Ganho Massa', status: 'Ativo', peso: 75, altura: 182, ultimaConsulta: '10/03/2025' },
  { id: '7', nome: 'Fernanda Lima', email: 'fernanda@email.com', objetivo: 'Emagrecimento', status: 'Ativo', peso: 68, altura: 158, ultimaConsulta: '09/03/2025' },
  { id: '8', nome: 'Roberto Alves', email: 'roberto@email.com', objetivo: 'Manutencao', status: 'Ativo', peso: 78, altura: 170, ultimaConsulta: '08/03/2025' },
];

export default function PacientesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ nome: '', email: '', telefone: '', nascimento: '', sexo: 'F', peso: '', altura: '', objetivo: 'Emagrecimento', restricoes: '', obs: '' });
  const navigate = useNavigate();
  const { showToast } = useToast();

  const filtered = mockPatients.filter(p => {
    if (filter !== 'Todos' && p.status !== filter) return false;
    if (search && !p.nome.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const imc = newPatient.peso && newPatient.altura ? calcIMC(Number(newPatient.peso), Number(newPatient.altura)) : null;

  function handleSave() {
    showToast('Paciente cadastrado com sucesso!', 'success');
    setShowModal(false);
    setNewPatient({ nome: '', email: '', telefone: '', nascimento: '', sexo: 'F', peso: '', altura: '', objetivo: 'Emagrecimento', restricoes: '', obs: '' });
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-text-primary">Pacientes</h1>
        <Button icon={Plus} onClick={() => setShowModal(true)}>Novo Paciente</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input icon={Search} placeholder="Buscar paciente..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 rounded-lg border border-border text-sm text-text-primary">
          <option>Todos</option>
          <option>Ativo</option>
          <option>Inativo</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(p => {
          const patientIMC = calcIMC(p.peso, p.altura);
          return (
            <Card key={p.id} hover onClick={() => navigate(`/nutri/pacientes/${p.id}`)}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold shrink-0">
                  {p.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary">{p.nome}</p>
                  <p className="text-sm text-text-muted truncate">{p.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{p.objetivo}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Ativo' ? 'bg-success/10 text-success' : 'bg-gray-100 text-text-muted'}`}>{p.status}</span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-text-muted">
                    <span>IMC: {patientIMC} ({classificarIMC(patientIMC)})</span>
                    <span>{p.ultimaConsulta}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Novo Paciente" size="lg">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nome" value={newPatient.nome} onChange={e => setNewPatient(p => ({ ...p, nome: e.target.value }))} className="col-span-2" />
            <Input label="Email" type="email" value={newPatient.email} onChange={e => setNewPatient(p => ({ ...p, email: e.target.value }))} />
            <Input label="Telefone" value={newPatient.telefone} onChange={e => setNewPatient(p => ({ ...p, telefone: e.target.value }))} />
            <Input label="Data Nascimento" type="date" value={newPatient.nascimento} onChange={e => setNewPatient(p => ({ ...p, nascimento: e.target.value }))} />
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Sexo</label>
              <select value={newPatient.sexo} onChange={e => setNewPatient(p => ({ ...p, sexo: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border text-text-primary">
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
              </select>
            </div>
            <Input label="Peso (kg)" type="number" value={newPatient.peso} onChange={e => setNewPatient(p => ({ ...p, peso: e.target.value }))} />
            <Input label="Altura (cm)" type="number" value={newPatient.altura} onChange={e => setNewPatient(p => ({ ...p, altura: e.target.value }))} />
          </div>
          {imc && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              IMC: <strong>{imc}</strong> — {classificarIMC(imc)}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Objetivo</label>
            <select value={newPatient.objetivo} onChange={e => setNewPatient(p => ({ ...p, objetivo: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg border border-border text-text-primary">
              <option>Emagrecimento</option>
              <option>Ganho de Massa</option>
              <option>Manutencao</option>
              <option>Saude</option>
            </select>
          </div>
          <Input label="Restricoes alimentares" type="textarea" value={newPatient.restricoes} onChange={e => setNewPatient(p => ({ ...p, restricoes: e.target.value }))} />
          <Input label="Observacoes" type="textarea" value={newPatient.obs} onChange={e => setNewPatient(p => ({ ...p, obs: e.target.value }))} />
          <Button fullWidth onClick={handleSave}>Salvar Paciente</Button>
        </div>
      </Modal>
    </div>
  );
}
