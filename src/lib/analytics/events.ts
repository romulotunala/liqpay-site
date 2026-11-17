import type { WhatsAppContext } from '@/lib/whatsapp';

// Catálogo de eventos do site. Nomes em snake_case com até 40 caracteres e propriedades
// simples: compatível com Umami e GA4, para a troca de ferramenta não exigir renomear nada.
// Nunca inclua dados pessoais (nome, telefone, e-mail, texto digitado).

// Onde está o elemento clicado. Todo CTA novo precisa de um valor específico daqui; nunca um
// genérico como 'section'.
export const ANALYTICS_LOCATIONS = [
  'header',
  'hero',
  'cta_banner',
  'float',
  'footer',
  'contact_card',
  'faq',
  'solutions_pos',
  'home_conditions',
  'not_found',
] as const;

export type AnalyticsLocation = (typeof ANALYTICS_LOCATIONS)[number];

export interface AnalyticsEventMap {
  whatsapp_click: {
    readonly context: WhatsAppContext;
    readonly location: AnalyticsLocation;
    /** Pathname sem o basePath, para os dados não mudarem quando o domínio mudar. */
    readonly page: string;
  };
  instagram_click: { readonly location: AnalyticsLocation; readonly page: string };
  email_click: { readonly location: AnalyticsLocation; readonly page: string };
  faq_open: { readonly question: string };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type LinkClickEventName = Extract<AnalyticsEventName, 'instagram_click' | 'email_click'>;
