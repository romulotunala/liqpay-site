import { basePath, siteUrl, type UrlConfig } from '@/config/url';

export interface PathHelpers {
  /** Prefixa o basePath em caminhos que o Next não prefixa sozinho (ex.: src do next/image). */
  readonly withBasePath: (path: string) => string;
  /** URL absoluta para canonical, Open Graph, sitemap, robots e JSON-LD. */
  readonly absoluteUrl: (path: string) => string;
}

function ensureLeadingSlash(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

function hasBasePath(path: string, basePath: string): boolean {
  return basePath !== '' && (path === basePath || path.startsWith(`${basePath}/`));
}

export function createPathHelpers({ siteUrl, basePath }: UrlConfig): PathHelpers {
  return {
    withBasePath(path) {
      const normalizedPath = ensureLeadingSlash(path);

      return hasBasePath(normalizedPath, basePath) ? normalizedPath : basePath + normalizedPath;
    },
    absoluteUrl(path) {
      const normalizedPath = ensureLeadingSlash(path);

      // O siteUrl já contém o basePath: um caminho prefixado geraria o prefixo duas vezes.
      if (hasBasePath(normalizedPath, basePath)) {
        throw new Error(
          `absoluteUrl('${path}') recebeu um caminho com o basePath. `
          + 'Não combine absoluteUrl() com withBasePath().',
        );
      }

      return siteUrl + normalizedPath;
    },
  };
}

export const { withBasePath, absoluteUrl } = createPathHelpers({ siteUrl, basePath });
