import { describe, it, expect } from 'vitest';
import { siteConfig } from '@/config/site';
import { NEW_TAB_LINK_PROPS, whatsappLinkProps } from '@/lib/links';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

describe('whatsappLinkProps', () => {
  const props = whatsappLinkProps('pos', 'solutions_pos');

  it('aponta para o WhatsApp da LiqPay com a mensagem do contexto', () => {
    expect(props.href).toBe(buildWhatsAppUrl('pos'));
    expect(props.href).toContain(siteConfig.contact.whatsapp.e164);
  });

  it('abre em nova aba sem expor a página de origem', () => {
    expect(props).toMatchObject(NEW_TAB_LINK_PROPS);
    expect(props.rel).toContain('noopener');
  });

  it('leva os atributos do rastreamento do clique', () => {
    expect(props).toMatchObject({
      'data-analytics-event': 'whatsapp_click',
      'data-analytics-context': 'pos',
      'data-analytics-location': 'solutions_pos',
    });
  });
});
