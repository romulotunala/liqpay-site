import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn', () => {
  it('junta as classes com espaço', () => {
    expect(cn('card', 'card--dark')).toBe('card card--dark');
  });

  it('ignora valores falsos', () => {
    const isActive = false;

    expect(cn('card', isActive && 'active', null, undefined, '')).toBe('card');
  });

  it('retorna texto vazio sem classes', () => {
    expect(cn()).toBe('');
  });
});
