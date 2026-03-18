export async function generateMealSuggestion(patientData, preferences = '') {
  const apiKey = import.meta.env.VITE_ANTHROPIC_KEY;
  if (!apiKey || apiKey === 'sk-ant-your-key') {
    return 'Chave da API Anthropic nao configurada. Configure VITE_ANTHROPIC_KEY no arquivo .env para usar o assistente IA.';
  }

  const userMessage = `Paciente: ${patientData.nome || 'Paciente'}
Peso: ${patientData.peso || '?'}kg, Altura: ${patientData.altura || '?'}cm
Objetivo: ${patientData.objetivo || 'Saude geral'}
Restricoes: ${patientData.restricoes || 'Nenhuma'}
${preferences ? `Preferencias: ${preferences}` : ''}

Sugira um plano alimentar completo para um dia (6 refeicoes) com alimentos brasileiros comuns, incluindo quantidades em gramas e valores nutricionais aproximados.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: 'Voce e um nutricionista assistente virtual brasileiro. Sugira refeicoes saudaveis e equilibradas baseadas nos dados do paciente. Use alimentos da tabela TACO. Responda em portugues.',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return `Erro na API: ${res.status}. Verifique sua chave.`;
    }

    const data = await res.json();
    return data.content?.[0]?.text || 'Sem resposta da IA.';
  } catch (err) {
    return `Erro ao conectar com IA: ${err.message}`;
  }
}
