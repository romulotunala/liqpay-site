import type { AnalyticsProvider } from '../types';

/** Usado em dev, nos testes e quando faltam as variáveis: não carrega script nem envia nada. */
export const noopProvider: AnalyticsProvider = {
  scriptProps: () => null,
  track: () => undefined,
};
