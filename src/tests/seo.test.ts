import { describe, it, expect } from 'vitest';
import { createPathHelpers } from '@/lib/paths';
import { createMetadataBuilder } from '@/lib/seo';

const buildMetadata = createMetadataBuilder(createPathHelpers({
  siteUrl: 'https://exemplo.github.io/liqpay-site',
  basePath: '/liqpay-site',
}));

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
