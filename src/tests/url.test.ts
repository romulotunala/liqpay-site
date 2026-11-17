import { describe, it, expect } from 'vitest';
import { resolveUrlConfig } from '@/config/url';

describe('resolveUrlConfig', () => {
  it.each([
    ['ausente', undefined],
    ['vazia', ''],
    ['só com espaços', '   '],
  ])('usa a URL de desenvolvimento quando a variável está %s', (_, rawUrl) => {
    expect(resolveUrlConfig(rawUrl)).toEqual({
      siteUrl: 'http://localhost:3000',
      basePath: '',
    });
  });

  it.each([
    'https://exemplo.github.io/liqpay-site',
    'https://exemplo.github.io/liqpay-site/',
  ])('deriva o basePath do caminho da URL (%s)', (rawUrl) => {
    expect(resolveUrlConfig(rawUrl)).toEqual({
      siteUrl: 'https://exemplo.github.io/liqpay-site',
      basePath: '/liqpay-site',
    });
  });

  it.each([
    'https://www.exemplo.com.br',
    'https://www.exemplo.com.br/',
  ])('usa basePath vazio em domínio próprio (%s)', (rawUrl) => {
    expect(resolveUrlConfig(rawUrl)).toEqual({
      siteUrl: 'https://www.exemplo.com.br',
      basePath: '',
    });
  });

  it('falha com uma URL inválida, em vez de gerar um basePath errado', () => {
    expect(() => resolveUrlConfig('liqpay-site')).toThrow(TypeError);
  });
});
