// Rastreamento declarativo: componentes de servidor marcam elementos com atributos data-*
// neutros (sem nome de ferramenta), e o AnalyticsListener lê esses atributos no clique.
// Os nomes dos atributos existem só aqui, para escrita e leitura nunca divergirem.
import { WHATSAPP_CONTEXTS, type WhatsAppContext } from '@/lib/whatsapp';
import { ANALYTICS_LOCATIONS, type AnalyticsLocation, type LinkClickEventName } from './events';
import type { AnalyticsEvent } from './types';

const ATTRIBUTE = {
  event: 'data-analytics-event',
  context: 'data-analytics-context',
  location: 'data-analytics-location',
  question: 'data-analytics-question',
} as const;

type AnalyticsAttributeName = (typeof ATTRIBUTE)[keyof typeof ATTRIBUTE];

export type AnalyticsAttributes = Readonly<Partial<Record<AnalyticsAttributeName, string>>>;

const TRACKED_ELEMENT_SELECTOR = `[${ATTRIBUTE.event}]`;

/** Todo link de WhatsApp do site (o Button com `whatsappContext` sempre leva estes atributos). */
export const WHATSAPP_LINK_SELECTOR = `[${ATTRIBUTE.event}='whatsapp_click']`;

// -----------------------------------------------------------------------------
// Escrita (componentes de servidor)
// -----------------------------------------------------------------------------

export function whatsappClickAttributes(
  context: WhatsAppContext,
  location: AnalyticsLocation,
): AnalyticsAttributes {
  return {
    [ATTRIBUTE.event]: 'whatsapp_click',
    [ATTRIBUTE.context]: context,
    [ATTRIBUTE.location]: location,
  };
}

export function linkClickAttributes(
  event: LinkClickEventName,
  location: AnalyticsLocation,
): AnalyticsAttributes {
  return { [ATTRIBUTE.event]: event, [ATTRIBUTE.location]: location };
}

/** Vai no <summary> da pergunta; `question` é o slug, nunca o texto. */
export function faqOpenAttributes(question: string): AnalyticsAttributes {
  return { [ATTRIBUTE.event]: 'faq_open', [ATTRIBUTE.question]: question };
}

// -----------------------------------------------------------------------------
// Leitura (AnalyticsListener)
// -----------------------------------------------------------------------------

function isOneOf<Value extends string>(
  values: readonly Value[],
  value: string | null,
): value is Value {
  return values.some((item) => item === value);
}

function parseWhatsAppClick(element: Element, page: string): AnalyticsEvent | null {
  const context = element.getAttribute(ATTRIBUTE.context);
  const location = element.getAttribute(ATTRIBUTE.location);

  if (!isOneOf(WHATSAPP_CONTEXTS, context) || !isOneOf(ANALYTICS_LOCATIONS, location)) {
    return null;
  }

  return { name: 'whatsapp_click', properties: { context, location, page } };
}

function parseLinkClick(
  name: LinkClickEventName,
  element: Element,
  page: string,
): AnalyticsEvent | null {
  const location = element.getAttribute(ATTRIBUTE.location);

  return isOneOf(ANALYTICS_LOCATIONS, location) ? { name, properties: { location, page } } : null;
}

function parseFaqOpen(element: Element): AnalyticsEvent | null {
  const question = element.getAttribute(ATTRIBUTE.question);
  const details = element.closest('details');

  // O clique chega antes do toggle: <details> ainda fechado significa que o clique vai abrir.
  // Fechar uma pergunta não conta, e o <details open> inicial não dispara nada.
  if (!question || !details || details.open) {
    return null;
  }

  return { name: 'faq_open', properties: { question } };
}

/** Elemento rastreado mais próximo do alvo do clique (ex.: o ícone dentro de um link). */
export function findTrackedElement(target: EventTarget | null): Element | null {
  return target instanceof Element ? target.closest(TRACKED_ELEMENT_SELECTOR) : null;
}

/**
 * Monta o evento a partir dos atributos do elemento. Retorna null para evento, contexto ou
 * location fora do catálogo, para dado inválido nunca chegar à ferramenta.
 */
export function parseAnalyticsEvent(element: Element, page: string): AnalyticsEvent | null {
  const name = element.getAttribute(ATTRIBUTE.event);

  switch (name) {
    case 'whatsapp_click':
      return parseWhatsAppClick(element, page);
    case 'instagram_click':
    case 'email_click':
      return parseLinkClick(name, element, page);
    case 'faq_open':
      return parseFaqOpen(element);
    default:
      return null;
  }
}
