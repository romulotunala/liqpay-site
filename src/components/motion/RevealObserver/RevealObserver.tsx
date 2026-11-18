'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { markMotionReady } from '../hydration';

const PENDING_REVEAL_SELECTOR = '[data-reveal]:not([data-revealed])';
const REVEAL_IMAGE_SELECTOR = '[data-reveal] img';

export const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px',
};

function markRevealed(element: Element) {
  if (element instanceof HTMLElement) {
    element.dataset.revealed = '';
  }
}

function markImageLoaded(image: HTMLImageElement) {
  image.dataset.loaded = '';
}

function observeReveals() {
  const elements = document.querySelectorAll(PENDING_REVEAL_SELECTOR);

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        markRevealed(entry.target);
        observer.unobserve(entry.target);
      }
    }
  }, REVEAL_OBSERVER_OPTIONS);

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}

// `load` e `error` não borbulham: a captura no document pega qualquer imagem. Erro também
// libera a imagem, senão o texto alternativo ficaria invisível.
function revealImageOnLoad(event: Event) {
  if (event.target instanceof HTMLImageElement) {
    markImageLoaded(event.target);
  }
}

function watchImageLoads() {
  document.addEventListener('load', revealImageOnLoad, true);
  document.addEventListener('error', revealImageOnLoad, true);

  // Imagens que terminaram antes da hidratação não disparam mais o evento.
  document.querySelectorAll<HTMLImageElement>(REVEAL_IMAGE_SELECTOR).forEach((image) => {
    if (image.complete) {
      markImageLoaded(image);
    }
  });

  return () => {
    document.removeEventListener('load', revealImageOnLoad, true);
    document.removeEventListener('error', revealImageOnLoad, true);
  };
}

/**
 * Único observer do site: encontra os blocos com `data-reveal` e os marca com
 * `data-revealed` ao entrarem na tela, uma vez. Refaz a busca a cada navegação.
 */
export function RevealObserver() {
  const pathname = usePathname();

  // Avisa o script inline que o JavaScript do site carregou (ver JsClassScript).
  useEffect(markMotionReady, []);
  useEffect(() => observeReveals(), [pathname]);
  useEffect(() => watchImageLoads(), [pathname]);

  return null;
}
