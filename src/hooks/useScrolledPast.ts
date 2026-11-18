import { useSyncExternalStore } from 'react';

function subscribeToScroll(onScroll: () => void) {
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => window.removeEventListener('scroll', onScroll);
}

/**
 * `true` quando a página rolou além de `offset` pixels. Só re-renderiza quando o valor muda,
 * não a cada evento de rolagem. No servidor (e na hidratação) vale `false`.
 */
export function useScrolledPast(offset: number): boolean {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > offset,
    () => false,
  );
}
