import { describe, it, expect } from 'vitest';
import { createPathHelpers } from '@/lib/paths';

const pagesHelpers = createPathHelpers({
  siteUrl: 'https://exemplo.github.io/liqpay-site',
  basePath: '/liqpay-site',
});

const rootHelpers = createPathHelpers({
  siteUrl: 'https://www.exemplo.com.br',
  basePath: '',
});

describe('withBasePath', () => {
  it('prefixa o basePath quando o site está em subpasta', () => {
    expect(pagesHelpers.withBasePath('/images/logo.webp')).toBe('/liqpay-site/images/logo.webp');
  });

  it('não altera o caminho quando o basePath é vazio', () => {
    expect(rootHelpers.withBasePath('/images/logo.webp')).toBe('/images/logo.webp');
  });

  it('acrescenta a barra inicial que faltar, sem duplicar barras', () => {
    expect(pagesHelpers.withBasePath('images/logo.webp')).toBe('/liqpay-site/images/logo.webp');
    expect(rootHelpers.withBasePath('images/logo.webp')).toBe('/images/logo.webp');
  });

  it('não prefixa duas vezes um caminho que já tem o basePath', () => {
    expect(pagesHelpers.withBasePath('/liqpay-site/images/logo.webp'))
      .toBe('/liqpay-site/images/logo.webp');
  });

  it('não confunde um caminho que só começa com o mesmo texto do basePath', () => {
    expect(pagesHelpers.withBasePath('/liqpay-site-extra'))
      .toBe('/liqpay-site/liqpay-site-extra');
  });
});

describe('absoluteUrl', () => {
  it('monta a URL a partir do siteUrl, incluindo a subpasta', () => {
    expect(pagesHelpers.absoluteUrl('/solucoes'))
      .toBe('https://exemplo.github.io/liqpay-site/solucoes');
  });

  it('monta a URL na raiz do domínio próprio', () => {
    expect(rootHelpers.absoluteUrl('/solucoes')).toBe('https://www.exemplo.com.br/solucoes');
  });

  it('gera a URL da página inicial com uma única barra', () => {
    expect(pagesHelpers.absoluteUrl('/')).toBe('https://exemplo.github.io/liqpay-site/');
    expect(pagesHelpers.absoluteUrl('')).toBe('https://exemplo.github.io/liqpay-site/');
  });

  it('recusa um caminho que já tem o basePath, em vez de duplicar o prefixo', () => {
    const combined = pagesHelpers.withBasePath('/images/og-image.png');

    expect(() => pagesHelpers.absoluteUrl(combined)).toThrow(/Não combine/);
  });
});
