import type { ReactNode } from 'react';
import { revealAttributes, type RevealEffect } from '../attributes';

export type RevealElement = 'div' | 'section' | 'article' | 'figure' | 'li';

interface RevealProps {
  readonly effect?: RevealEffect;
  /** Atraso em milissegundos, para escalonar blocos vizinhos. */
  readonly delay?: number;
  readonly as?: RevealElement;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Entrada de um bloco abaixo da dobra. O conteúdo vai no HTML; só com JavaScript ele começa
 * escondido e aparece quando o RevealObserver o encontra na tela.
 */
export function Reveal({
  effect = 'fadeInUp',
  delay,
  as: Element = 'div',
  className,
  children,
}: Readonly<RevealProps>) {
  return (
    <Element
      {...revealAttributes(effect)}
      className={className}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Element>
  );
}
