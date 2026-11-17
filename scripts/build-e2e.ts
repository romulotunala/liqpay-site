// Build do E2E com o basePath de produção. Roda direto no Node 24, sem tsx.
import { execFileSync } from 'node:child_process';
import { cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { E2E_SERVE_DIR, E2E_SITE_URL } from '../e2e/site-url.ts';
import { resolveUrlConfig } from '../src/config/url.ts';

const EXPORT_DIR = 'out';

function buildWithE2eUrl(): void {
  execFileSync('pnpm', ['exec', 'next', 'build'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: E2E_SITE_URL,
      // Variáveis do ambiente valem mais que o .env.local: um ID do Umami usado em dev não vaza.
      NEXT_PUBLIC_ANALYTICS_PROVIDER: 'none',
      NEXT_PUBLIC_ANALYTICS_ID: '',
    },
  });
}

// Cópia em vez de symlink (o serve não segue links) e sem rewrites (aceitariam URLs sem prefixo).
function mountUnderBasePath(): void {
  const { basePath } = resolveUrlConfig(E2E_SITE_URL);

  rmSync(E2E_SERVE_DIR, { recursive: true, force: true });
  cpSync(EXPORT_DIR, join(E2E_SERVE_DIR, basePath), { recursive: true });
  // O serve só procura o 404.html na raiz da pasta servida.
  cpSync(join(EXPORT_DIR, '404.html'), join(E2E_SERVE_DIR, '404.html'));
}

buildWithE2eUrl();
mountUnderBasePath();
