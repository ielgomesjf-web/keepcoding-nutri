import { useState } from 'react';
import Card from '../../components/ui/Card';
import { Search, Send, Paperclip } from 'lucide-react';

const conversations = [
  { id: '1', name: 'Maria Silva', lastMsg: 'Obrigada doutor!', time: '14:30', unread: 2, online: true },
  { id: '2', name: 'Joao Santos', lastMsg: 'Posso trocar o jantar?', time: '12:15', unread: 1, online: false },
  { id: '3', name: 'Ana Oliveira', lastMsg: 'Entendido, vou seguir', time: '09:45', unread: 0, online: true },
  { id: '4', name: 'Pedro Costa', lastMsg: 'Foto do prato enviada', time: 'Ontem', unread: 0, online: false },
  { id: '5', name: 'Lucia Ferreira', lastMsg: 'Ate a proxima consulta!', time: 'Ontem', unread: 0, online: false },
];

const messagesByConv = {
  '1': [
    { id: 1, from: 'nutri', text: 'Ola Maria! Como esta se sentindo com o novo plano?', time: '14:00' },
    { id: 2, from: 'patient', text: 'Oi doutor! Estou gostando bastante, me sinto mais disposta', time: '14:10' },
    { id: 3, from: 'nutri', text: 'Que otimo! Lembre de manter a hidratacao e registrar as refeicoes no app', time: '14:15' },
    { id: 4, from: 'patient', text: 'Sim, estou registrando tudo! So tive dificuldade no fim de semana', time: '14:20' },
    { id: 5, from: 'nutri', text: 'Normal! O importante e retomar na segunda. Nao se cobre demais 😊', time: '14:25' },
    { id: 6, from: 'patient', text: 'Obrigada doutor!', time: '14:30' },
  ],
  '2': [
    { id: 1, from: 'nutri', text: 'Bom dia Joao! Como foi a semana?', time: '11:00' },
    { id: 2, from: 'patient', text: 'Bom dia! Foi boa, mas queria saber se posso trocar o jantar de quinta', time: '12:10' },
    { id: 3, from: 'patient', text: 'Posso trocar o jantar?', time: '12:15' },
  ],
};

export default function ChatPage() {
  const [active, setActive] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMsg, setNewMsg] = useState('');

  const msgs = active ? (messagesByConv[active] || []) : [];
  const activeConv = conversations.find(c => c.id === active);

  function handleSend() {
    if (!newMsg.trim()) return;
    setNewMsg('');
  }

  return (
    <div className="animate-fade-in h-[calc(100vh-7rem)]">
      <h1 className="font-heading text-2xl font-bold text-text-primary mb-6">Chat</h1>

      <div className="flex h-[calc(100%-3rem)] gap-4">
        {/* Conversation List */}
        <Card padding="none" className="w-80 shrink-0 flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Buscar conversa..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border-none text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(conv => (
              <button key={conv.id} onClick={() => setActive(conv.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${active === conv.id ? 'bg-primary/5 border-l-2 border-primary' : 'hover:bg-gray-50 border-l-2 border-transparent'}`}>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">
                    {conv.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {conv.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-text-primary truncate">{conv.name}</p>
                    <span className="text-[10px] text-text-muted shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-text-muted truncate">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center shrink-0">{conv.unread}</span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card padding="none" className="flex-1 flex flex-col">
          {active && activeConv ? (
            <>
              <div className="flex items-center gap-3 px-5 py-3 border-b border-border">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">
                    {activeConv.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {activeConv.online && <span className="absolute bottom-0 right-0 w-2 h-2 bg-success rounded-full border border-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{activeConv.name}</p>
                  <p className="text-xs text-text-muted">{activeConv.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                {msgs.map(msg => (
                  <div key={msg.id} className={`flex ${msg.from === 'nutri' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.from === 'nutri' ? 'bg-primary text-white rounded-br-md' : 'bg-gray-100 text-text-primary rounded-bl-md'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${msg.from === 'nutri' ? 'text-white/60' : 'text-text-muted'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-border flex items-end gap-2">
                <button className="p-2 text-text-muted hover:text-text-secondary cursor-pointer"><Paperclip size={18} /></button>
                <textarea
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Digite sua mensagem..."
                  rows={1}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border-none text-sm outline-none resize-none"
                />
                <button onClick={handleSend} disabled={!newMsg.trim()}
                  className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-40 cursor-pointer">
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-muted text-sm">
              Selecione uma conversa para comecar
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
