import { afterEach, describe, it, expect, vi } from 'vitest';
import { createEventTracker, selectAnalyticsProvider } from '@/lib/analytics';
import { noopProvider } from '@/lib/analytics/providers/noop';
import { createUmamiProvider } from '@/lib/analytics/providers/umami';
import type { AnalyticsEvent, AnalyticsProvider } from '@/lib/analytics';

const SITE_URL = 'https://exemplo.github.io/liqpay-site';

const whatsappClick: AnalyticsEvent = {
  name: 'whatsapp_click',
  properties: { context: 'pos', location: 'solutions_pos', page: '/solucoes' },
};

afterEach(() => {
  delete window.umami;
});

describe('selectAnalyticsProvider', () => {
  it.each([
    ['sem provider nem ID', undefined, undefined],
    ['sem ID', 'umami', undefined],
    ['com ID vazio', 'umami', '  '],
    ['com provider none', 'none', 'abc-123'],
    ['com provider ainda não implementado', 'ga4', 'G-123'],
  ])('usa o noop %s', (_, provider, id) => {
    expect(selectAnalyticsProvider({ provider, id, siteUrl: SITE_URL })).toBe(noopProvider);
  });

  it('usa o Umami com o ID e o host do site', () => {
    const provider = selectAnalyticsProvider({
      provider: 'umami',
      id: 'abc-123',
      siteUrl: SITE_URL,
    });

    expect(provider.scriptProps()).toEqual({
      src: 'https://cloud.umami.is/script.js',
      strategy: 'lazyOnload',
      'data-website-id': 'abc-123',
      'data-domains': 'exemplo.github.io',
    });
  });
});

describe('noopProvider', () => {
  it('não carrega script', () => {
    expect(noopProvider.scriptProps()).toBeNull();
  });
});

describe('umami.track', () => {
  const umami = createUmamiProvider({ websiteId: 'abc-123', domains: ['exemplo.github.io'] });

  it('envia o nome e as propriedades do evento', () => {
    const track = vi.fn();
    window.umami = { track };

    umami.track(whatsappClick);

    expect(track).toHaveBeenCalledWith('whatsapp_click', {
      context: 'pos',
      location: 'solutions_pos',
      page: '/solucoes',
    });
  });

  it('não lança erro quando o script não carregou (window.umami ausente)', () => {
    expect(() => umami.track(whatsappClick)).not.toThrow();
  });
});

describe('trackEvent', () => {
  it('repassa o evento ao provider', () => {
    const provider: AnalyticsProvider = { scriptProps: () => null, track: vi.fn() };

    createEventTracker(provider)(whatsappClick);

    expect(provider.track).toHaveBeenCalledWith(whatsappClick);
  });

  it('não propaga erro da ferramenta', () => {
    const failingProvider: AnalyticsProvider = {
      scriptProps: () => null,
      track: () => {
        throw new Error('script bloqueado');
      },
    };

    expect(() => createEventTracker(failingProvider)(whatsappClick)).not.toThrow();
  });
});
