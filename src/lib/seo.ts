import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import type { InternalHref } from '@/types/navigation';
import { absoluteUrl, type PathHelpers } from './paths';

export interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  readonly path: InternalHref;
}

export const DEFAULT_OG_IMAGE = {
  path: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Logo da LiqPay',
} as const;

// URLs absolutas montadas aqui, sem metadataBase: ele descartaria o basePath em caminhos
// começando com '/'.
export function createMetadataBuilder({ absoluteUrl }: Pick<PathHelpers, 'absoluteUrl'>) {
  return function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
    const url = absoluteUrl(path);

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        locale: 'pt_BR',
        siteName: siteConfig.name,
        url,
        title,
        description,
        images: [
          {
            url: absoluteUrl(DEFAULT_OG_IMAGE.path),
            width: DEFAULT_OG_IMAGE.width,
            height: DEFAULT_OG_IMAGE.height,
            alt: DEFAULT_OG_IMAGE.alt,
          },
        ],
      },
    };
  };
}

export const buildMetadata = createMetadataBuilder({ absoluteUrl });
