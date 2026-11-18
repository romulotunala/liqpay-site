import { expect, test } from '@playwright/test';
import { EXPECTED_ROUTES } from './routes';
import { E2E_SITE_URL } from './site-url';
import { findForbiddenTerms } from './third-party-brands';

const SITE_ROOT = `${E2E_SITE_URL}/`;

test('o sitemap lista todas as páginas com URL absoluta e o basePath', async ({ request }) => {
  const sitemap = await (await request.get('sitemap.xml')).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

  expect(urls).toEqual(EXPECTED_ROUTES.map((route) => new URL(route.path, SITE_ROOT).href));
});

test('o robots.txt aponta para o sitemap', async ({ request }) => {
  const robots = await (await request.get('robots.txt')).text();

  expect(robots).toContain(`Sitemap: ${E2E_SITE_URL}/sitemap.xml`);
});

test('uma rota inexistente mostra a página 404 com o estilo do site', async ({ page }) => {
  const response = await page.goto('rota-que-nao-existe');
  const heroBackground = await page.locator('main section').first()
    .evaluate((section) => getComputedStyle(section).backgroundColor);

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Página não encontrada');
  // Fundo escuro do tema: prova que o CSS carregou dentro do basePath.
  expect(heroBackground).toBe('rgb(7, 17, 13)');
});

test('sem as variáveis de analytics, nenhum script de rastreamento vai para a página', async ({
  page,
}) => {
  await page.goto('./');

  expect(await page.content()).not.toContain('umami');
});

test('o menu mobile abre, navega e fecha sozinho na página nova', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto('./');

  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  const menu = page.getByRole('navigation', { name: 'Principal' });
  await menu.getByRole('link', { name: 'Sobre', exact: true }).click();

  await expect(page).toHaveURL(/\/sobre$/);
  await expect(page.getByRole('heading', { level: 1 }))
    .toHaveText('Soluções de pagamento com atendimento de verdade');
  await expect(menu).toBeHidden();
});

test('se o JavaScript do site não carregar, o conteúdo aparece mesmo assim', async ({ page }) => {
  // Simula os arquivos JS de um deploy anterior, já removidos do servidor.
  await page.route(
    (url) => url.pathname.includes('/_next/static/') && url.pathname.endsWith('.js'),
    (route) => route.fulfill({ status: 404, body: '' }),
  );
  await page.goto('./');

  // Vencido o prazo do script inline, a página volta ao modo sem JS.
  await expect(page.locator('html')).not.toHaveClass(/\bjs\b/, { timeout: 10_000 });
  for (const block of await page.locator('[data-reveal]').all()) {
    await expect(block).toHaveCSS('opacity', '1');
  }
  await expect(page.getByRole('banner')).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});

test('com o JavaScript funcionando, as animações continuam depois do prazo', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-motion-ready', '');

  // Depois do prazo do script inline (4s), a classe js tem de continuar lá.
  await page.waitForTimeout(5000);

  await expect(page.locator('html')).toHaveClass(/\bjs\b/);
});

test.describe('detector de termos proibidos', () => {
  test('encontra marcas com acento, percentuais e promessas', () => {
    expect(findForbiddenTerms('Pagamentos pelo Itaú.')).toEqual(['itaú']);
    expect(findForbiddenTerms('Taxa de 1,99% ao mês')).toEqual(['1,99%']);
    expect(findForbiddenTerms('Fim da bitributação')).toEqual(['bitributação']);
  });

  test('ignora palavras comuns que também são nomes de marca', () => {
    const text = 'Siga nas redes sociais. Para o seu caixa não ficar parado. Padrão '
      + 'internacional de segurança, com parceiros autorizados pelo Banco Central do Brasil.';

    expect(findForbiddenTerms(text)).toEqual([]);
  });
});
