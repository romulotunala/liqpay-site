import { expect, test, type Page } from '@playwright/test';
import { ANALYTICS_LOCATIONS } from '@/lib/analytics/events';
import { buildWhatsAppUrl, WHATSAPP_CONTEXTS, type WhatsAppContext } from '@/lib/whatsapp';
import { EXPECTED_ROUTES } from './routes';
import { findForbiddenTerms } from './third-party-brands';

const MOBILE_VIEWPORT = { width: 360, height: 740 } as const;

/** Respostas com erro (≥ 400) durante o carregamento da página. */
function collectFailedResponses(page: Page): string[] {
  const failed: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) {
      failed.push(`${response.status()} ${response.url()}`);
    }
  });

  return failed;
}

/**
 * Todo texto que o visitante ou um buscador pode ler: corpo (inclusive respostas fechadas do
 * FAQ e o JSON-LD), atributos de texto e metadados. Fica de fora só o código (scripts e CSS).
 */
function readPublishedText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const body = document.body.cloneNode(true) as HTMLElement;
    body.querySelectorAll('script:not([type="application/ld+json"]), style').forEach((node) => {
      node.remove();
    });

    const textAttributes = ['alt', 'title', 'aria-label'];
    const attributes = [...document.querySelectorAll('[alt], [title], [aria-label]')]
      .flatMap((element) => textAttributes.map((name) => element.getAttribute(name)));
    const metadata = [...document.head.querySelectorAll('title, meta[content]')]
      .map((element) => element.getAttribute('content') ?? element.textContent);

    return [body.textContent, ...attributes, ...metadata].filter(Boolean).join('\n');
  });
}

for (const route of EXPECTED_ROUTES) {
  test.describe(`página ${route.navLabel}`, () => {
    test('tem título, descrição e um único h1 conforme o conteúdo aprovado', async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);
      await expect(page.locator('meta[name="description"]'))
        .toHaveAttribute('content', route.description);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(route.h1);
    });

    test('tem header e rodapé, com a página atual marcada no menu', async ({ page }) => {
      await page.goto(route.path);
      const menu = page.getByRole('navigation', { name: 'Principal' });

      await expect(page.getByRole('banner')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toBeVisible();
      await expect(menu.locator('[aria-current="page"]')).toHaveCount(1);
      await expect(menu.getByRole('link', { name: route.navLabel, exact: true }))
        .toHaveAttribute('aria-current', 'page');
    });

    test('todo link de WhatsApp leva a mensagem do contexto e o rastreamento', async ({ page }) => {
      await page.goto(route.path);
      const links = await page.$$eval('a[href^="https://wa.me/"]', (anchors) => anchors.map(
        (anchor) => ({
          href: anchor.getAttribute('href'),
          event: anchor.dataset.analyticsEvent,
          context: anchor.dataset.analyticsContext,
          location: anchor.dataset.analyticsLocation,
        }),
      ));

      expect(links.length).toBeGreaterThan(0);

      for (const link of links) {
        expect(WHATSAPP_CONTEXTS).toContain(link.context);
        expect(link.href).toBe(buildWhatsAppUrl(link.context as WhatsAppContext));
        expect(link.event).toBe('whatsapp_click');
        expect(ANALYTICS_LOCATIONS).toContain(link.location);
      }
    });

    test('não cita marcas de terceiros, percentuais nem promessas proibidas', async ({ page }) => {
      await page.goto(route.path);

      expect(findForbiddenTerms(await readPublishedText(page))).toEqual([]);
    });

    test('carrega sem nenhuma requisição com erro', async ({ page }) => {
      const failed = collectFailedResponses(page);

      const response = await page.goto(route.path);
      await page.waitForLoadState('networkidle');

      expect(response?.status()).toBe(200);
      expect(failed).toEqual([]);
    });

    test('não tem rolagem horizontal em 360px', async ({ page }) => {
      await page.setViewportSize(MOBILE_VIEWPORT);
      await page.goto(route.path);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );

      expect(overflow).toBe(0);
    });

    test('com movimento reduzido, nenhum elemento anima transform', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(route.path);

      const animated = await page.evaluate(() => [...document.querySelectorAll('*')]
        .filter((element) => {
          const style = getComputedStyle(element);
          const hasAnimation = style.animationName !== 'none';
          const durations = style.transitionDuration.split(',').map(Number.parseFloat);
          const hasTransformTransition = /transform|all/.test(style.transitionProperty)
            && durations.some((duration) => duration > 0);

          return hasAnimation || hasTransformTransition;
        })
        .map((element) => `${element.tagName.toLowerCase()}.${element.className}`));

      expect(animated).toEqual([]);
    });
  });
}
