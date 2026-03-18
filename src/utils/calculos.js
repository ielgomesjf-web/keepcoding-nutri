export function calcIMC(peso, alturaCm) {
  const alturaM = alturaCm / 100;
  return +(peso / (alturaM * alturaM)).toFixed(1);
}

export function classificarIMC(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade I';
  if (imc < 40) return 'Obesidade II';
  return 'Obesidade III';
}

export function calcTMB(peso, alturaCm, idade, sexo) {
  if (sexo === 'M') {
    return Math.round(10 * peso + 6.25 * alturaCm - 5 * idade + 5);
  }
  return Math.round(10 * peso + 6.25 * alturaCm - 5 * idade - 161);
}

export function calcGET(tmb, fatorAtividade) {
  return Math.round(tmb * fatorAtividade);
}

export function calcMacros(calorias, distribuicao = { proteina: 0.3, carb: 0.5, gordura: 0.2 }) {
  return {
    proteinas: Math.round((calorias * distribuicao.proteina) / 4),
    carboidratos: Math.round((calorias * distribuicao.carb) / 4),
    gorduras: Math.round((calorias * distribuicao.gordura) / 9),
  };
}

export function formatCurrency(value) {
  return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
}
