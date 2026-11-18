// Fonte única das perguntas: usada pelo Accordion (FaqList) e pelo JSON-LD FAQPage.

/** Trecho da resposta que vira link para o WhatsApp; no JSON-LD, vira o texto puro. */
export interface FaqWhatsAppLink {
  readonly whatsappLink: string;
}

export type FaqAnswerPart = string | FaqWhatsAppLink;

export interface FaqItem {
  /** Slug estável: chave da lista e propriedade `question` do evento faq_open. */
  readonly id: string;
  readonly question: string;
  readonly answer: readonly FaqAnswerPart[];
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'taxas',
    question: 'Quais são as taxas da LiqPay?',
    answer: [
      'As taxas são definidas de acordo com o perfil e o volume de vendas da sua empresa. Fale '
      + 'com um especialista pelo WhatsApp para receber uma proposta.',
    ],
  },
  {
    id: 'adesao-mensalidade',
    question: 'Existe taxa de adesão ou mensalidade?',
    answer: ['Não. A LiqPay não cobra adesão, mensalidade nem taxa de saque.'],
  },
  {
    id: 'custo-maquininha',
    question: 'Preciso pagar pela maquininha?',
    answer: [
      'A maquininha pode ser cedida sem custo, conforme o faturamento da sua empresa. Consulte as '
      + 'condições com nossa equipe.',
    ],
  },
  {
    id: 'prazo-recebimento',
    question: 'Em quanto tempo recebo minhas vendas?',
    answer: ['As vendas no cartão caem na sua conta no dia seguinte (D+1).'],
  },
  {
    id: 'formas-pagamento',
    question: 'Quais formas de pagamento posso aceitar?',
    answer: [
      'Cartões de débito e crédito, à vista ou parcelado, PIX, link de pagamento e boleto.',
    ],
  },
  {
    id: 'o-que-e-split',
    question: 'O que é o split de pagamentos?',
    answer: [
      'É a divisão automática de cada venda entre a sua empresa e seus parceiros. Cada um recebe '
      + 'a sua parte direto na própria conta.',
    ],
  },
  {
    id: 'split-impostos',
    question: 'O split reduz os impostos da minha empresa?',
    answer: [
      'Com o split, sua empresa recebe e registra apenas a parte da venda que é dela, o que pode '
      + 'evitar a tributação sobre valores de terceiros. O efeito depende do regime tributário e '
      + 'da atividade da empresa, por isso recomendamos avaliar com o seu contador.',
    ],
  },
  {
    id: 'split-reforma-tributaria',
    question: 'O split da LiqPay é o mesmo da Reforma Tributária?',
    answer: [
      'Não. O split da LiqPay divide a venda entre você e seus parceiros. O split payment da '
      + 'Reforma Tributária separa os novos tributos no momento do pagamento. Os dois seguem a '
      + 'mesma lógica de separar os valores na origem.',
    ],
  },
  {
    id: 'seguranca',
    question: 'A LiqPay é segura?',
    answer: [
      'Sim. A LiqPay opera com parceiros autorizados pelo Banco Central, e as transações são '
      + 'processadas em ambiente com certificação PCI-DSS.',
    ],
  },
  {
    id: 'cobertura',
    question: 'Vocês atendem a minha cidade?',
    answer: ['Sim. Atendemos empresas em todo o Brasil.'],
  },
  {
    id: 'atendimento',
    question: 'Como funciona o atendimento?',
    answer: [
      'O atendimento é feito por pessoas, 24 horas por dia, pelo WhatsApp e por telefone.',
    ],
  },
  {
    id: 'como-comecar',
    question: 'Como faço para começar?',
    answer: [
      'Chame nossa equipe no ',
      { whatsappLink: 'WhatsApp' },
      '. Um especialista entende o seu negócio e apresenta a proposta.',
    ],
  },
];

/** Resposta em texto puro, para o JSON-LD. */
export function faqAnswerText(answer: readonly FaqAnswerPart[]): string {
  return answer.map((part) => (typeof part === 'string' ? part : part.whatsappLink)).join('');
}
