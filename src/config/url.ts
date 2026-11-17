// Importado por next.config.ts com caminho relativo: não use o alias '@/' aqui.
const DEVELOPMENT_URL = 'http://localhost:3000';

const TRAILING_SLASH = /\/$/;

export interface UrlConfig {
  readonly siteUrl: string;
  /** '/liqpay-site' no GitHub Pages; '' em localhost ou em domínio próprio. */
  readonly basePath: string;
}

// O padrão '' trata variável ausente e vazia do mesmo jeito: ambas caem no valor de
// desenvolvimento, em vez de quebrar o new URL(). Por isso '||', e não '??'.
export function resolveUrlConfig(rawUrl = ''): UrlConfig {
  const siteUrl = (rawUrl.trim() || DEVELOPMENT_URL).replace(TRAILING_SLASH, '');

  return { siteUrl, basePath: new URL(siteUrl).pathname.replace(TRAILING_SLASH, '') };
}

export const { siteUrl, basePath } = resolveUrlConfig(process.env.NEXT_PUBLIC_SITE_URL);
