'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import { findTrackedElement, parseAnalyticsEvent } from '@/lib/analytics/attributes';

/**
 * Único componente cliente do analytics: delega os cliques do documento para os elementos
 * com data-analytics-*. Assim Button e as seções continuam componentes de servidor.
 */
export function AnalyticsListener() {
  // Já vem sem o basePath, como o catálogo exige para `page`.
  const pathname = usePathname();

  useEffect(() => {
    function trackClick(event: MouseEvent) {
      const element = findTrackedElement(event.target);
      const analyticsEvent = element ? parseAnalyticsEvent(element, pathname) : null;

      if (analyticsEvent) {
        trackEvent(analyticsEvent);
      }
    }

    // Captura: o registro não depende de outro handler deixar o evento subir.
    document.addEventListener('click', trackClick, { capture: true });

    return () => document.removeEventListener('click', trackClick, { capture: true });
  }, [pathname]);

  return null;
}
