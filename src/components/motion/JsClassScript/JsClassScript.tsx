// Roda no <head>, antes da primeira pintura: sem isso, os blocos com reveal piscariam visíveis
// e depois sumiriam até a hidratação.
const ADD_JS_CLASS = 'document.documentElement.classList.add("js")';

/** Marca o <html> com a classe `js`. Exige `suppressHydrationWarning` no <html>. */
export function JsClassScript() {
  // Conteúdo fixo, sem dado externo: não há risco de injeção.
  return <script dangerouslySetInnerHTML={{ __html: ADD_JS_CLASS }} />;
}
