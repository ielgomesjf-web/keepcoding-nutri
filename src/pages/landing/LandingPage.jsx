import { Link } from 'react-router-dom';
import { Users, UtensilsCrossed, Brain, Calendar, MessageSquare, BarChart3, Check, ArrowRight } from 'lucide-react';

const features = [
  { icon: Users, title: 'Gestao de Pacientes', desc: 'Cadastre e acompanhe todos seus pacientes em um so lugar' },
  { icon: UtensilsCrossed, title: 'Planos Alimentares', desc: 'Crie planos personalizados com a tabela TACO integrada' },
  { icon: Brain, title: 'Assistente IA', desc: 'Sugestoes inteligentes com inteligencia artificial' },
  { icon: Calendar, title: 'Agenda Online', desc: 'Gerencie consultas e horarios de forma pratica' },
  { icon: MessageSquare, title: 'Chat em Tempo Real', desc: 'Comunicacao direta e segura com seus pacientes' },
  { icon: BarChart3, title: 'Relatorios', desc: 'Acompanhe evolucao com graficos detalhados e exporte PDF' },
];

const plans = [
  {
    name: 'Gratuito',
    price: '0',
    features: ['Ate 5 pacientes', 'Planos alimentares basicos', 'Chat limitado', 'Relatorios simples'],
    popular: false,
  },
  {
    name: 'Profissional',
    price: '97',
    features: ['Pacientes ilimitados', 'Planos com IA', 'Chat ilimitado', 'Relatorios avancados', 'Exportar PDF', 'Suporte prioritario'],
    popular: true,
  },
  {
    name: 'Clinica',
    price: '197',
    features: ['Tudo do Profissional', 'Multi nutricionistas', 'Dashboard da clinica', 'API personalizada', 'Suporte dedicado', 'Marca propria'],
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="font-heading text-xl font-bold text-primary">KeepCoding Nutri</span>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Entrar</Link>
          <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">Comecar</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight">
            Transforme seu consultorio com <span className="text-primary">tecnologia</span>
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-xl">
            Plataforma completa para nutricionistas modernos. Gerencie pacientes, crie planos alimentares e acompanhe resultados com inteligencia artificial.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link to="/register" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
              Comece Agora <ArrowRight size={18} />
            </Link>
            <a href="#features" className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:border-gray-400 hover:text-white transition-colors">
              Saiba Mais
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-20 max-w-lg">
          {[
            { value: '500+', label: 'Nutricionistas' },
            { value: '10k+', label: 'Pacientes' },
            { value: '50k+', label: 'Planos criados' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-heading text-3xl font-bold text-center mb-4">Tudo que voce precisa</h2>
        <p className="text-gray-400 text-center mb-12 max-w-lg mx-auto">Ferramentas poderosas para elevar seu atendimento nutricional</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-heading text-3xl font-bold text-center mb-4">Planos</h2>
        <p className="text-gray-400 text-center mb-12">Escolha o melhor plano para sua necessidade</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map(plan => (
            <div key={plan.name} className={`rounded-xl p-6 border ${plan.popular ? 'border-primary bg-gray-900/80' : 'border-gray-800 bg-gray-900/30'} relative`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
              )}
              <h3 className="font-heading text-xl font-semibold mb-1">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">R$ {plan.price}</span>
                {plan.price !== '0' && <span className="text-gray-500 text-sm">/mes</span>}
              </div>
              <ul className="flex flex-col gap-3 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={16} className="text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block w-full text-center py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  plan.popular
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'border border-gray-600 text-gray-300 hover:border-gray-400'
                }`}
              >
                Comecar
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">2025 KeepCoding Nutri. Todos os direitos reservados.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-300">Termos</a>
            <a href="#" className="hover:text-gray-300">Privacidade</a>
            <a href="#" className="hover:text-gray-300">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
