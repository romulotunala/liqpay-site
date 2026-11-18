import { describe, it, expect } from 'vitest';
import { createPathHelpers } from '@/lib/paths';
import {
  buildFaqPageJsonLd,
  createMetadataBuilder,
  createOrganizationJsonLd,
  createRobots,
  createSitemap,
} from '@/lib/seo';

const pathHelpers = createPathHelpers({
  siteUrl: 'https://exemplo.github.io/liqpay-site',
  basePath: '/liqpay-site',
});
const buildMetadata = createMetadataBuilder(pathHelpers);

const metadata = buildMetadata({
  title: 'Título da página',
  description: 'Descrição da página.',
  path: '/solucoes',
});

describe('buildMetadata', () => {
  it('repassa título e descrição', () => {
    expect(metadata.title).toBe('Título da página');
    expect(metadata.description).toBe('Descrição da página.');
  });

  it('gera o canonical com o basePath', () => {
    expect(metadata.alternates?.canonical).toBe('https://exemplo.github.io/liqpay-site/solucoes');
  });

  it('gera og:url e og:image absolutas com o basePath', () => {
    expect(metadata.openGraph).toMatchObject({
      url: 'https://exemplo.github.io/liqpay-site/solucoes',
      locale: 'pt_BR',
      images: [
        expect.objectContaining({
          url: 'https://exemplo.github.io/liqpay-site/images/og-image.png',
          width: 1200,
          height: 630,
        }),
      ],
    });
  });
});

describe('createOrganizationJsonLd', () => {
  const organization = createOrganizationJsonLd(pathHelpers);

  it('gera url e logo absolutas com o basePath', () => {
    expect(organization.url).toBe('https://exemplo.github.io/liqpay-site/');
    expect(organization.logo).toMatch(/^https:\/\/exemplo\.github\.io\/liqpay-site\/images\//);
  });

  it('liga a organização ao perfil do Instagram', () => {
    expect(organization.sameAs).toEqual(['https://www.instagram.com/liqpaybank']);
  });
});

describe('buildFaqPageJsonLd', () => {
  it('gera uma Question com Answer para cada pergunta', () => {
    const faqPage = buildFaqPageJsonLd([{ question: 'Pergunta?', answer: 'Resposta.' }]);

    expect(faqPage['@type']).toBe('FAQPage');
    expect(faqPage.mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'Pergunta?',
        acceptedAnswer: { '@type': 'Answer', text: 'Resposta.' },
      },
    ]);
  });
});

describe('createSitemap', () => {
  it('lista cada rota com URL absoluta e o basePath', () => {
    expect(createSitemap(pathHelpers, ['/', '/solucoes'])).toEqual([
      { url: 'https://exemplo.github.io/liqpay-site/' },
      { url: 'https://exemplo.github.io/liqpay-site/solucoes' },
    ]);
  });
});

describe('createRobots', () => {
  it('libera todas as páginas e aponta para o sitemap com o basePath', () => {
    expect(createRobots(pathHelpers)).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://exemplo.github.io/liqpay-site/sitemap.xml',
    });
  });
});

describe('buildMetadata no X', () => {
  it('pede a prévia grande', () => {
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });
});
