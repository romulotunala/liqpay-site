import type { AnalyticsLocation } from '@/lib/analytics';
import { whatsappClickAttributes, type AnalyticsAttributes } from '@/lib/analytics/attributes';
import { buildWhatsAppUrl, type WhatsAppContext } from '@/lib/whatsapp';

/** Nova aba sem dar à página de destino acesso a esta (window.opener) nem o Referer. */
export const NEW_TAB_LINK_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const;

export type WhatsAppLinkProps = typeof NEW_TAB_LINK_PROPS
  & AnalyticsAttributes
  & { readonly href: string };

/**
 * Tudo o que um link de WhatsApp precisa: a URL com a mensagem do contexto, a nova aba e o
 * rastreamento do clique. Quem renderiza o link acrescenta o NewTabNotice.
 */
export function whatsappLinkProps(
  context: WhatsAppContext,
  location: AnalyticsLocation,
): WhatsAppLinkProps {
  return {
    href: buildWhatsAppUrl(context),
    ...NEW_TAB_LINK_PROPS,
    ...whatsappClickAttributes(context, location),
  };
}
