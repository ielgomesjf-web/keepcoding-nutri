import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/nutri');
    } catch (err) {
      const msgs = {
        'auth/user-not-found': 'Usuario nao encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-credential': 'Credenciais invalidas.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
      };
      setError(msgs[err.code] || 'Erro ao fazer login. Tente novamente.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-text-primary">KeepCoding Nutri</h1>
          <p className="text-text-secondary text-sm mt-2">Entrar na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-danger/10 text-danger text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <Input label="Email" type="email" icon={Mail} placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input label="Senha" type="password" icon={Lock} placeholder="Sua senha" value={password} onChange={e => setPassword(e.target.value)} required />

          <div className="text-right">
            <Link to="/login" className="text-sm text-primary hover:underline">Esqueci minha senha</Link>
          </div>

          <Button type="submit" fullWidth loading={loading}>Entrar</Button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Nao tem conta? <Link to="/register" className="text-primary font-medium hover:underline">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
