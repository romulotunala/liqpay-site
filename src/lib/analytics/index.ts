import { siteUrl } from '@/config/url';
import { noopProvider } from './providers/noop';
import { createUmamiProvider } from './providers/umami';
import type { AnalyticsEvent, AnalyticsProvider } from './types';

export interface AnalyticsEnvironment {
  readonly provider: string | undefined;
  readonly id: string | undefined;
  /** URL pública do site: o host dela limita onde o provider conta acessos. */
  readonly siteUrl: string;
}

export function selectAnalyticsProvider({
  provider,
  id,
  siteUrl,
}: AnalyticsEnvironment): AnalyticsProvider {
  const trackingId = id?.trim();
  if (!trackingId) {
    return noopProvider;
  }

  // 'ga4' entra aqui quando providers/ga4.ts existir; até lá, qualquer outro valor é noop.
  if (provider === 'umami') {
    return createUmamiProvider({ websiteId: trackingId, domains: [new URL(siteUrl).host] });
  }

  return noopProvider;
}

// Acesso literal a process.env.NEXT_PUBLIC_*: só assim o Next embute o valor no bundle.
export const analyticsProvider = selectAnalyticsProvider({
  provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER,
  id: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  siteUrl,
});

export function createEventTracker(provider: AnalyticsProvider) {
  return function trackEvent(event: AnalyticsEvent): void {
    try {
      provider.track(event);
    } catch {
      // Analytics é acessório: uma falha da ferramenta não pode afetar o site.
    }
  };
}

/** Envia um evento do catálogo. Nunca lança erro nem atrasa a navegação. */
export const trackEvent = createEventTracker(analyticsProvider);

export type { AnalyticsEvent, AnalyticsProvider } from './types';
export type { AnalyticsLocation, AnalyticsEventName } from './events';
export { ANALYTICS_LOCATIONS } from './events';
