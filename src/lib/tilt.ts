/** Inclinação normalizada: cada eixo vai de -1 a 1; o CSS converte em graus. */
export interface Tilt {
  readonly x: number;
  readonly y: number;
}

export interface ViewportSize {
  readonly width: number;
  readonly height: number;
}

export const TILT_AT_REST: Tilt = { x: 0, y: 0 };

function clampUnit(value: number): number {
  return Math.min(1, Math.max(-1, value));
}

/** Converte a posição do ponteiro na tela em inclinação: o centro da tela é o repouso. */
export function pointerToTilt(clientX: number, clientY: number, viewport: ViewportSize): Tilt {
  return {
    x: clampUnit((clientX / viewport.width) * 2 - 1),
    y: clampUnit((clientY / viewport.height) * 2 - 1),
  };
}

/** Um passo da interpolação: percorre `smoothing` (0–1) da distância até o alvo. */
export function approachTilt(current: Tilt, target: Tilt, smoothing: number): Tilt {
  return {
    x: current.x + (target.x - current.x) * smoothing,
    y: current.y + (target.y - current.y) * smoothing,
  };
}

export function isTiltSettled(current: Tilt, target: Tilt, tolerance: number): boolean {
  return Math.abs(target.x - current.x) < tolerance && Math.abs(target.y - current.y) < tolerance;
}
