import { HYDRATION_TIMEOUT_MS, MOTION_READY_ATTRIBUTE } from '../hydration';

// Roda no <head>, antes da primeira pintura: sem isso, os blocos com reveal piscariam visíveis
// e depois sumiriam até a hidratação.
//
// A classe `js` esconde conteúdo até o JavaScript do site revelá-lo. Se esse JavaScript falhar
// (ex.: arquivos de um deploy anterior que já não existem), a classe sai depois do prazo e a
// página volta ao modo sem JS, em vez de ficar em branco.
const SCRIPT = `(() => {
  const root = document.documentElement;
  root.classList.add('js');
  setTimeout(() => {
    if (!root.hasAttribute('${MOTION_READY_ATTRIBUTE}')) root.classList.remove('js');
  }, ${HYDRATION_TIMEOUT_MS});
})();`;

/** Marca o <html> com a classe `js`. Exige `suppressHydrationWarning` no <html>. */
export function JsClassScript() {
  // Conteúdo fixo, sem dado externo: não há risco de injeção.
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
