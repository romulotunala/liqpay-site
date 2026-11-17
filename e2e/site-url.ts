// Fonte única da URL de E2E. O prefixo simula o GitHub Pages para pegar um
// withBasePath() esquecido. Lido por scripts/build-e2e.ts e por playwright.config.ts.
export const E2E_SITE_URL = 'http://localhost:3000/liqpay-site';

// Pasta servida no E2E: recebe uma cópia de out/ dentro do basePath.
export const E2E_SERVE_DIR = '.e2e-site';
