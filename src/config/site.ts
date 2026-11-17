import type { NavigationItem } from '@/types/navigation';
import { siteUrl } from './url';

// Fonte única dos dados institucionais: nenhum destes valores é repetido em outro arquivo.
export const siteConfig = {
  name: 'LiqPay',
  legalName: 'LiqPay Soluções e Pagamentos Ltda.',
  cnpj: '67.816.825/0001-50',
  tagline: 'LiqPay – Soluções em pagamentos para o seu negócio.',
  url: siteUrl,
  contact: {
    whatsapp: {
      display: '(31) 9 7249-9256',
      e164: '5531972499256',
    },
    email: 'liqpaybank@gmail.com',
    instagram: {
      handle: '@liqpaybank',
      url: 'https://www.instagram.com/liqpaybank',
    },
  },
  navigation: [
    { label: 'Início', href: '/' },
    { label: 'Soluções', href: '/solucoes' },
    { label: 'Split de pagamentos', href: '/split-de-pagamentos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Perguntas frequentes', href: '/perguntas-frequentes' },
    { label: 'Contato', href: '/contato' },
  ] satisfies readonly NavigationItem[],
} as const;
