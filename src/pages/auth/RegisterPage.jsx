import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Mail, Lock, Hash } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmar: '', tipo: 'nutricionista', crn: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.senha !== form.confirmar) {
      setError('As senhas nao coincidem.');
      return;
    }
    if (form.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      await register(form.email, form.senha, {
        nome: form.nome,
        tipo: form.tipo,
        crn: form.crn,
      });
      navigate(form.tipo === 'nutricionista' ? '/nutri' : '/paciente');
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'Este email ja esta cadastrado.',
        'auth/weak-password': 'Senha muito fraca.',
        'auth/invalid-email': 'Email invalido.',
      };
      setError(msgs[err.code] || 'Erro ao criar conta. Tente novamente.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-text-primary">KeepCoding Nutri</h1>
          <p className="text-text-secondary text-sm mt-2">Criar sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-danger/10 text-danger text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <Input label="Nome completo" icon={User} placeholder="Seu nome" value={form.nome} onChange={e => update('nome', e.target.value)} required />
          <Input label="Email" type="email" icon={Mail} placeholder="seu@email.com" value={form.email} onChange={e => update('email', e.target.value)} required />
          <Input label="Senha" type="password" icon={Lock} placeholder="Minimo 6 caracteres" value={form.senha} onChange={e => update('senha', e.target.value)} required />
          <Input label="Confirmar senha" type="password" icon={Lock} placeholder="Repita a senha" value={form.confirmar} onChange={e => update('confirmar', e.target.value)} required />

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Tipo de conta</label>
            <div className="flex gap-3">
              {['nutricionista', 'paciente'].map(tipo => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => update('tipo', tipo)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                    form.tipo === tipo
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-text-secondary hover:border-gray-300'
                  }`}
                >
                  {tipo === 'nutricionista' ? 'Nutricionista' : 'Paciente'}
                </button>
              ))}
            </div>
          </div>

          {form.tipo === 'nutricionista' && (
            <Input label="CRN" icon={Hash} placeholder="Ex: CRN-3 12345" value={form.crn} onChange={e => update('crn', e.target.value)} />
          )}

          <Button type="submit" fullWidth loading={loading}>Criar conta</Button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Ja tem conta? <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
