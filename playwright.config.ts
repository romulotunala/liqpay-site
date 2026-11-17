import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';
import { E2E_SERVE_DIR, E2E_SITE_URL } from './e2e/site-url';

if (!existsSync(E2E_SERVE_DIR)) {
  throw new Error(
    `A pasta ${E2E_SERVE_DIR}/ não existe. Rode "pnpm test:e2e" (ou "pnpm build:e2e" antes de `
    + '"pnpm exec playwright test"). Um "pnpm build" comum não serve para o E2E.',
  );
}

// A barra final faz as rotas relativas dos testes ('./', 'solucoes') ficarem dentro do basePath.
const baseURL = `${E2E_SITE_URL}/`;
const { port } = new URL(E2E_SITE_URL);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // --no-port-switching: com a porta ocupada, o serve não sobe numa porta aleatória (onde o
    // Playwright nunca o encontraria).
    command: `pnpm exec serve ${E2E_SERVE_DIR} -p ${port} --no-port-switching`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
