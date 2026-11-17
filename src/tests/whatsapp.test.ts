import { describe, it, expect, expectTypeOf } from 'vitest';
import { siteConfig } from '@/config/site';
import { buildWhatsAppUrl, WHATSAPP_CONTEXTS, type WhatsAppContext } from '@/lib/whatsapp';

function decodeMessage(url: string): string | null {
  return new URL(url).searchParams.get('text');
}

describe('buildWhatsAppUrl', () => {
  it.each(WHATSAPP_CONTEXTS)('aponta para o número da LiqPay (%s)', (context) => {
    const url = new URL(buildWhatsAppUrl(context));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe(`/${siteConfig.contact.whatsapp.e164}`);
  });

  it.each<[WhatsAppContext, string]>([
    ['general', 'Olá! Vim pelo site da LiqPay e gostaria de falar com um especialista.'],
    ['pos', 'Olá! Vim pelo site da LiqPay e tenho interesse na maquininha.'],
    ['proposal', 'Olá! Vim pelo site da LiqPay e gostaria de receber uma proposta.'],
    [
      'split',
      'Olá! Vim pelo site da LiqPay e quero entender o split de pagamentos para o meu negócio.',
    ],
  ])('pré-preenche a mensagem do contexto %s', (context, message) => {
    expect(decodeMessage(buildWhatsAppUrl(context))).toBe(message);
  });

  it('codifica a mensagem na URL', () => {
    const url = buildWhatsAppUrl('general');

    expect(url).toContain('text=Ol%C3%A1!%20Vim');
    expect(url).not.toContain(' ');
  });

  it('só aceita os contextos do catálogo', () => {
    expectTypeOf(buildWhatsAppUrl).parameter(0).toEqualTypeOf<WhatsAppContext>();

    // Nunca executada: o typecheck falha se um contexto desconhecido passar a compilar.
    const compileOnly = () => {
      // @ts-expect-error contexto fora do catálogo
      buildWhatsAppUrl('email');
    };
    expect(compileOnly).toBeTypeOf('function');
  });
});
