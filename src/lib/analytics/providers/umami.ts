import type { AnalyticsProvider } from '../types';

const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

interface UmamiTracker {
  track(eventName: string, eventData?: Readonly<Record<string, string>>): void;
}

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

export interface UmamiConfig {
  readonly websiteId: string;
  /** Hosts em que o Umami conta acessos; ignora localhost e previews. */
  readonly domains: readonly string[];
}

export function createUmamiProvider({ websiteId, domains }: UmamiConfig): AnalyticsProvider {
  return {
    scriptProps: () => ({
      src: UMAMI_SCRIPT_URL,
      strategy: 'lazyOnload',
      'data-website-id': websiteId,
      'data-domains': domains.join(','),
    }),
    // Script bloqueado (adblock) ou ainda carregando: o evento se perde, sem erro.
    track({ name, properties }) {
      window.umami?.track(name, properties);
    },
  };
}
