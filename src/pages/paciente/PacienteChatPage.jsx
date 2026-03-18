import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';

const mockMessages = [
  { id: 1, from: 'nutri', text: 'Ola Maria! Como esta se sentindo com o novo plano?', time: '09:00', date: 'Ontem' },
  { id: 2, from: 'patient', text: 'Oi doutor! Estou gostando, mas sinto muita fome no lanche da tarde', time: '09:15', date: 'Ontem' },
  { id: 3, from: 'nutri', text: 'Podemos aumentar a porcao do lanche. Tente adicionar mais uma fruta ou um punhado de castanhas', time: '09:20', date: 'Ontem' },
  { id: 4, from: 'patient', text: 'Ok, vou tentar! Posso substituir o iogurte por queijo cottage?', time: '09:25', date: 'Ontem' },
  { id: 5, from: 'nutri', text: 'Sim, pode! O queijo cottage tem mais proteina inclusive. Boa escolha!', time: '09:30', date: 'Ontem' },
  { id: 6, from: 'patient', text: 'Obrigada! E sobre o exercicio, posso fazer caminhada?', time: '14:00', date: 'Hoje' },
  { id: 7, from: 'nutri', text: 'Com certeza! Recomendo 30 minutos de caminhada moderada, 5x por semana', time: '14:10', date: 'Hoje' },
  { id: 8, from: 'patient', text: 'Perfeito, vou comecar amanha!', time: '14:15', date: 'Hoje' },
];

export default function PacienteChatPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMsg, setNewMsg] = useState('');
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function handleSend() {
    if (!newMsg.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), from: 'patient', text: newMsg.trim(),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      date: 'Hoje',
    }]);
    setNewMsg('');
  }

  let lastDate = '';

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-border shrink-0">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">CS</div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">Dr. Carlos Silva</p>
          <p className="text-xs text-success">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2 bg-gray-50">
        {messages.map(msg => {
          let showDate = false;
          if (msg.date !== lastDate) { showDate = true; lastDate = msg.date; }
          return (
            <div key={msg.id}>
              {showDate && (
                <div className="text-center my-3">
                  <span className="text-xs text-text-muted bg-white px-3 py-1 rounded-full">{msg.date}</span>
                </div>
              )}
              <div className={`flex ${msg.from === 'patient' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.from === 'patient'
                    ? 'bg-primary text-white rounded-br-md'
                    : 'bg-white text-text-primary rounded-bl-md shadow-sm'
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.from === 'patient' ? 'text-white/60' : 'text-text-muted'}`}>{msg.time}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-border flex items-end gap-2 shrink-0">
        <button className="p-3 text-text-muted hover:text-text-secondary cursor-pointer">
          <Paperclip size={18} />
        </button>
        <textarea
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder="Digite sua mensagem..."
          rows={1}
          className="flex-1 px-4 py-2 rounded-xl bg-gray-50 border-none text-sm outline-none resize-none"
        />
        <button
          onClick={handleSend}
          disabled={!newMsg.trim()}
          className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 cursor-pointer shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
