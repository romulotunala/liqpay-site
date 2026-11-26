'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { approachTilt, isTiltSettled, pointerToTilt, TILT_AT_REST, type Tilt } from '@/lib/tilt';

// Só com mouse: no toque não existe "pairar", e a imagem fica parada.
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
// Cerca de 600ms para assentar a 60fps: movimento lento passa mais qualidade que rápido.
const SMOOTHING = 0.08;
const SETTLE_TOLERANCE = 0.001;

function canFollowPointer(): boolean {
  return matchMedia(FINE_POINTER_QUERY).matches && !matchMedia(REDUCED_MOTION_QUERY).matches;
}

function writeTilt(element: HTMLElement, tilt: Tilt) {
  element.style.setProperty('--tilt-x', tilt.x.toFixed(4));
  element.style.setProperty('--tilt-y', tilt.y.toFixed(4));
}

function followPointer(element: HTMLElement): () => void {
  let current = TILT_AT_REST;
  let target = TILT_AT_REST;
  let frame = 0;

  const render = () => {
    current = approachTilt(current, target, SMOOTHING);
    // Perto o bastante: encaixa no alvo e para o loop, sem resto de rotação.
    if (isTiltSettled(current, target, SETTLE_TOLERANCE)) {
      current = target;
      frame = 0;
    } else {
      frame = requestAnimationFrame(render);
    }
    writeTilt(element, current);
  };

  const aimAt = (tilt: Tilt) => {
    target = tilt;
    if (frame === 0) {
      frame = requestAnimationFrame(render);
    }
  };

  const onPointerMove = (event: PointerEvent) => {
    aimAt(pointerToTilt(event.clientX, event.clientY, {
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  // Sem relatedTarget, o ponteiro saiu da janela: volta ao repouso.
  const onPointerOut = (event: PointerEvent) => {
    if (event.relatedTarget === null) {
      aimAt(TILT_AT_REST);
    }
  };

  const listen = () => {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerout', onPointerOut);
  };

  const stopListening = () => {
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerout', onPointerOut);
  };

  // Só acompanha o ponteiro enquanto o elemento está na tela.
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      listen();
      return;
    }
    stopListening();
    aimAt(TILT_AT_REST);
  });
  observer.observe(element);

  return () => {
    observer.disconnect();
    stopListening();
    cancelAnimationFrame(frame);
  };
}

interface PointerTiltProps {
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Expõe a posição do mouse como `--tilt-x` e `--tilt-y` (de -1 a 1) para o CSS inclinar o
 * conteúdo. Sem mouse, com movimento reduzido ou sem JavaScript, as variáveis não existem e o
 * conteúdo fica parado.
 */
export function PointerTilt({ className, children }: PointerTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !canFollowPointer()) {
      return undefined;
    }
    return followPointer(element);
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
