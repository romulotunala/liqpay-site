import { expect, test } from '@playwright/test';

// Verificação mínima da montagem com basePath. Os critérios completos da spec §8 vêm depois.
test('a página inicial responde dentro do basePath, sem assets quebrados', async ({ page }) => {
  const failedRequests: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto('./');
  await page.waitForLoadState('networkidle');

  expect(response?.status()).toBe(200);
  expect(failedRequests).toEqual([]);
});

test('uma rota inexistente dentro do basePath responde com a página 404', async ({ page }) => {
  const response = await page.goto('rota-que-nao-existe');

  expect(response?.status()).toBe(404);
});
