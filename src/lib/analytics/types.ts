import type { ScriptProps } from 'next/script';
import type { AnalyticsEventMap, AnalyticsEventName } from './events';

/** União discriminada: o nome do evento determina as propriedades aceitas. */
export type AnalyticsEvent = {
  [Name in AnalyticsEventName]: {
    readonly name: Name;
    readonly properties: AnalyticsEventMap[Name];
  };
}[AnalyticsEventName];

/** Props do <Script> do provider, incluindo atributos data-* da ferramenta. */
export type AnalyticsScriptProps = ScriptProps & Record<`data-${string}`, string>;

/** Contrato de toda ferramenta de analytics. Componentes nunca falam com a ferramenta direto. */
export interface AnalyticsProvider {
  scriptProps(): AnalyticsScriptProps | null;
  track(event: AnalyticsEvent): void;
}
