import { describe, it, expect } from 'vitest';
import { FAQ_ITEMS, faqAnswerText } from '@/features/faq/sections/FaqList/faqItems';

describe('faqAnswerText', () => {
  it('junta as partes e troca o link pelo próprio texto', () => {
    const text = faqAnswerText(['Chame no ', { whatsappLink: 'WhatsApp' }, '. Até já.']);

    expect(text).toBe('Chame no WhatsApp. Até já.');
  });
});

describe('FAQ_ITEMS', () => {
  it('tem ids únicos (chave da lista e propriedade do evento faq_open)', () => {
    const ids = FAQ_ITEMS.map((item) => item.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('não tem resposta vazia', () => {
    for (const item of FAQ_ITEMS) {
      expect(faqAnswerText(item.answer).trim()).not.toBe('');
    }
  });
});
