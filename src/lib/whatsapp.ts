import { siteConfig } from '@/config/site';

export const WHATSAPP_CONTEXTS = ['general', 'pos', 'proposal', 'split'] as const;

export type WhatsAppContext = (typeof WHATSAPP_CONTEXTS)[number];

// A mensagem identifica de onde o cliente veio, para o atendimento.
const WHATSAPP_MESSAGES: Record<WhatsAppContext, string> = {
  general: 'Olá! Vim pelo site da LiqPay e gostaria de falar com um especialista.',
  pos: 'Olá! Vim pelo site da LiqPay e tenho interesse na maquininha.',
  proposal: 'Olá! Vim pelo site da LiqPay e gostaria de receber uma proposta.',
  split: 'Olá! Vim pelo site da LiqPay e quero entender o split de pagamentos para o meu negócio.',
};

export function buildWhatsAppUrl(context: WhatsAppContext): string {
  const text = encodeURIComponent(WHATSAPP_MESSAGES[context]);

  return `https://wa.me/${siteConfig.contact.whatsapp.e164}?text=${text}`;
}
