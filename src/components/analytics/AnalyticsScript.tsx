import Script from 'next/script';
import { analyticsProvider } from '@/lib/analytics';

/** Carrega o script da ferramenta de analytics. Sem as variáveis de ambiente, não renderiza. */
export function AnalyticsScript() {
  const scriptProps = analyticsProvider.scriptProps();

  return scriptProps ? <Script {...scriptProps} /> : null;
}
