import { useEffect, useState } from 'react';

export type ScrollDirection = 'up' | 'down';

// Ignora variações pequenas (inércia do trackpad) para o header não piscar.
const DIRECTION_TOLERANCE = 8;

/**
 * Direção da última rolagem. Até `activationOffset` pixels do topo vale sempre 'up': perto do
 * topo, quem usa a direção (ex.: esconder o header) não deve reagir.
 */
export function useScrollDirection(activationOffset = 0): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame = 0;

    function updateDirection() {
      frame = 0;
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;

      if (scrollY <= activationOffset) {
        setDirection('up');
        lastScrollY = scrollY;
      } else if (Math.abs(delta) >= DIRECTION_TOLERANCE) {
        setDirection(delta > 0 ? 'down' : 'up');
        lastScrollY = scrollY;
      }
    }

    function scheduleUpdate() {
      frame ||= requestAnimationFrame(updateDirection);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, [activationOffset]);

  return direction;
}
