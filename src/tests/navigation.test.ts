import { describe, it, expect } from 'vitest';
import { isCurrentPage } from '@/lib/navigation';

describe('isCurrentPage', () => {
  it('reconhece a rota exata', () => {
    expect(isCurrentPage('/sobre', '/sobre')).toBe(true);
  });

  it('ignora a barra final', () => {
    expect(isCurrentPage('/sobre/', '/sobre')).toBe(true);
  });

  it('trata a raiz como página inicial', () => {
    expect(isCurrentPage('/', '/')).toBe(true);
    expect(isCurrentPage('/sobre', '/')).toBe(false);
  });

  it('não confunde rotas com o mesmo prefixo', () => {
    expect(isCurrentPage('/solucoes-extra', '/solucoes')).toBe(false);
  });
});
