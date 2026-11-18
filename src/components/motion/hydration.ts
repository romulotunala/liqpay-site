// Contrato entre o script inline (JsClassScript) e o JavaScript do site.

/** Posto no <html> quando o JavaScript do site está rodando. */
export const MOTION_READY_ATTRIBUTE = 'data-motion-ready';

/**
 * Prazo para o JavaScript do site carregar. Vencido sem a marca acima, a página volta ao
 * modo sem JS: tudo visível e o header com fundo sólido.
 */
export const HYDRATION_TIMEOUT_MS = 4000;

export function markMotionReady() {
  document.documentElement.toggleAttribute(MOTION_READY_ATTRIBUTE, true);
}
