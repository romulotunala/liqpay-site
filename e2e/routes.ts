// O que cada página precisa entregar. Os textos repetem os das seções de propósito: o teste
// confere o resultado publicado, não reaproveita o código que o gerou.

export interface ExpectedRoute {
  /** Relativa ao basePath (sem barra inicial). */
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  /** Item do menu marcado com aria-current. */
  readonly navLabel: string;
}

export const EXPECTED_ROUTES: readonly ExpectedRoute[] = [
  {
    path: './',
    title: 'LiqPay – Maquininha, PIX e split de pagamentos',
    description: 'Receba suas vendas com segurança, dinheiro na conta no dia seguinte e '
      + 'atendimento humano 24h. Maquininha, PIX, link de pagamento, boleto e split.',
    h1: 'Receba suas vendas com segurança e pague imposto só sobre o que é seu.',
    navLabel: 'Início',
  },
  {
    path: 'solucoes',
    title: 'Soluções de pagamento – LiqPay',
    description: 'Maquininha, PIX, link de pagamento, boleto e split de pagamentos em uma só '
      + 'solução, com recebimento em D+1.',
    h1: 'Soluções de pagamento para cada momento da sua venda',
    navLabel: 'Soluções',
  },
  {
    path: 'split-de-pagamentos',
    title: 'Split de pagamentos – LiqPay',
    description: 'Divida cada venda automaticamente entre sua empresa e seus parceiros. Cada um '
      + 'recebe e declara apenas a sua parte.',
    h1: 'Pague imposto apenas sobre o que é seu',
    navLabel: 'Split de pagamentos',
  },
  {
    path: 'sobre',
    title: 'Sobre a LiqPay',
    description: 'Soluções de pagamento com atendimento humano e condições ajustadas à realidade '
      + 'de cada negócio, em todo o Brasil.',
    h1: 'Soluções de pagamento com atendimento de verdade',
    navLabel: 'Sobre',
  },
  {
    path: 'perguntas-frequentes',
    title: 'Perguntas frequentes – LiqPay',
    description: 'Taxas, maquininha, prazos de recebimento, split de pagamentos e segurança: tire '
      + 'suas dúvidas sobre a LiqPay.',
    h1: 'Perguntas frequentes',
    navLabel: 'Perguntas frequentes',
  },
  {
    path: 'contato',
    title: 'Contato – LiqPay',
    description: 'Fale com um especialista da LiqPay pelo WhatsApp. Atendimento humano, 24 horas '
      + 'por dia.',
    h1: 'Fale com a LiqPay',
    navLabel: 'Contato',
  },
];
