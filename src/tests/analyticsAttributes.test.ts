import { describe, it, expect } from 'vitest';
import {
  faqOpenAttributes,
  findTrackedElement,
  linkClickAttributes,
  parseAnalyticsEvent,
  whatsappClickAttributes,
  type AnalyticsAttributes,
} from '@/lib/analytics/attributes';

const PAGE = '/contato';

function elementWith(attributes: AnalyticsAttributes): HTMLElement {
  const element = document.createElement('a');
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }

  return element;
}

describe('atributos de analytics', () => {
  it('monta os atributos de whatsapp_click', () => {
    expect(whatsappClickAttributes('general', 'header')).toEqual({
      'data-analytics-event': 'whatsapp_click',
      'data-analytics-context': 'general',
      'data-analytics-location': 'header',
    });
  });

  it.each([
    ['whatsapp_click', whatsappClickAttributes('split', 'cta_banner'), {
      name: 'whatsapp_click',
      properties: { context: 'split', location: 'cta_banner', page: PAGE },
    }],
    ['instagram_click', linkClickAttributes('instagram_click', 'footer'), {
      name: 'instagram_click',
      properties: { location: 'footer', page: PAGE },
    }],
    ['email_click', linkClickAttributes('email_click', 'contact_card'), {
      name: 'email_click',
      properties: { location: 'contact_card', page: PAGE },
    }],
  ])('lê de volta o evento %s que os atributos descrevem', (_, attributes, expected) => {
    expect(parseAnalyticsEvent(elementWith(attributes), PAGE)).toEqual(expected);
  });

  it.each([
    ['evento fora do catálogo', { 'data-analytics-event': 'page_scroll' }],
    ['contexto de WhatsApp inválido', {
      ...whatsappClickAttributes('general', 'hero'),
      'data-analytics-context': 'email',
    }],
    ['location fora do catálogo', {
      ...whatsappClickAttributes('general', 'hero'),
      'data-analytics-location': 'section',
    }],
    ['location ausente', { 'data-analytics-event': 'instagram_click' }],
  ])('ignora %s', (_, attributes) => {
    expect(parseAnalyticsEvent(elementWith(attributes), PAGE)).toBeNull();
  });
});

describe('faq_open', () => {
  function faqSummary(isOpen: boolean): HTMLElement {
    const details = document.createElement('details');
    details.open = isOpen;
    const summary = elementWith(faqOpenAttributes('quais-sao-as-taxas'));
    details.append(summary);

    return summary;
  }

  it('registra o clique que abre uma pergunta fechada', () => {
    expect(parseAnalyticsEvent(faqSummary(false), PAGE)).toEqual({
      name: 'faq_open',
      properties: { question: 'quais-sao-as-taxas' },
    });
  });

  it('não registra o clique que fecha uma pergunta aberta', () => {
    expect(parseAnalyticsEvent(faqSummary(true), PAGE)).toBeNull();
  });

  it('ignora o atributo fora de um <details>', () => {
    expect(parseAnalyticsEvent(elementWith(faqOpenAttributes('solta')), PAGE)).toBeNull();
  });
});

describe('findTrackedElement', () => {
  it('encontra o elemento rastreado a partir de um filho (ex.: ícone do link)', () => {
    const link = elementWith(whatsappClickAttributes('general', 'float'));
    const icon = document.createElement('span');
    link.append(icon);

    expect(findTrackedElement(icon)).toBe(link);
  });

  it('retorna null fora de elementos rastreados', () => {
    expect(findTrackedElement(document.createElement('p'))).toBeNull();
    expect(findTrackedElement(null)).toBeNull();
  });
});
