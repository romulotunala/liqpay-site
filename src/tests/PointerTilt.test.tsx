import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { PointerTilt } from '@/components/motion';

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observerCallback: ObserverCallback | undefined;

// Folga para a interpolação assentar no alvo.
const SETTLE_TIME_MS = 3000;

class FakeIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }

  observe = vi.fn();
  disconnect = vi.fn();
}

interface MediaState {
  readonly finePointer: boolean;
  readonly reducedMotion: boolean;
}

function stubMedia({ finePointer, reducedMotion }: MediaState) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('reduced-motion') ? reducedMotion : finePointer,
  }));
}

function renderTilt() {
  render(<PointerTilt><span>maquininha</span></PointerTilt>);
  return screen.getByText('maquininha').parentElement as HTMLElement;
}

function enterViewport() {
  act(() => observerCallback?.([{ isIntersecting: true }]));
}

function movePointerTo(clientX: number, clientY: number) {
  fireEvent.pointerMove(window, { clientX, clientY });
  act(() => {
    vi.advanceTimersByTime(SETTLE_TIME_MS);
  });
}

beforeEach(() => {
  observerCallback = undefined;
  vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] });
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  vi.stubGlobal('innerWidth', 1000);
  vi.stubGlobal('innerHeight', 800);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('PointerTilt', () => {
  it('inclina na direção do mouse enquanto está na tela', () => {
    stubMedia({ finePointer: true, reducedMotion: false });
    const element = renderTilt();
    enterViewport();

    movePointerTo(1000, 0);

    expect(Number(element.style.getPropertyValue('--tilt-x'))).toBe(1);
    expect(Number(element.style.getPropertyValue('--tilt-y'))).toBe(-1);
  });

  it('volta ao repouso quando o mouse sai da janela', () => {
    stubMedia({ finePointer: true, reducedMotion: false });
    const element = renderTilt();
    enterViewport();
    movePointerTo(1000, 0);

    fireEvent.pointerOut(document, { relatedTarget: null });
    act(() => {
      vi.advanceTimersByTime(SETTLE_TIME_MS);
    });

    expect(Number(element.style.getPropertyValue('--tilt-x'))).toBe(0);
  });

  it('fica parado com movimento reduzido', () => {
    stubMedia({ finePointer: true, reducedMotion: true });
    const element = renderTilt();

    expect(observerCallback).toBeUndefined();
    movePointerTo(1000, 0);
    expect(element.style.getPropertyValue('--tilt-x')).toBe('');
  });

  it('fica parado em telas de toque', () => {
    stubMedia({ finePointer: false, reducedMotion: false });
    const element = renderTilt();

    expect(observerCallback).toBeUndefined();
    movePointerTo(1000, 0);
    expect(element.style.getPropertyValue('--tilt-x')).toBe('');
  });
});
