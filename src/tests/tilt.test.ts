import { describe, expect, it } from 'vitest';
import { approachTilt, isTiltSettled, pointerToTilt, TILT_AT_REST } from '@/lib/tilt';

const VIEWPORT = { width: 1000, height: 800 };

describe('pointerToTilt', () => {
  it('fica em repouso com o ponteiro no centro da tela', () => {
    expect(pointerToTilt(500, 400, VIEWPORT)).toEqual(TILT_AT_REST);
  });

  it('chega a -1 e 1 nas bordas', () => {
    expect(pointerToTilt(0, 0, VIEWPORT)).toEqual({ x: -1, y: -1 });
    expect(pointerToTilt(1000, 800, VIEWPORT)).toEqual({ x: 1, y: 1 });
  });

  it('não passa de 1 com o ponteiro fora da tela', () => {
    expect(pointerToTilt(1500, -200, VIEWPORT)).toEqual({ x: 1, y: -1 });
  });
});

describe('approachTilt', () => {
  it('percorre a fração pedida da distância até o alvo', () => {
    expect(approachTilt(TILT_AT_REST, { x: 1, y: -1 }, 0.25)).toEqual({ x: 0.25, y: -0.25 });
  });

  it('não sai do lugar quando já está no alvo', () => {
    const tilt = { x: 0.4, y: -0.2 };
    expect(approachTilt(tilt, tilt, 0.5)).toEqual(tilt);
  });
});

describe('isTiltSettled', () => {
  it('considera parado quando os dois eixos estão dentro da tolerância', () => {
    expect(isTiltSettled({ x: 0.0005, y: -0.0005 }, TILT_AT_REST, 0.001)).toBe(true);
  });

  it('continua em movimento se um dos eixos ainda está longe', () => {
    expect(isTiltSettled({ x: 0, y: 0.1 }, TILT_AT_REST, 0.001)).toBe(false);
  });
});
