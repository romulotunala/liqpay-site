import type { ReactNode } from 'react';
import { staggerAttributes, type RevealEffect } from '../attributes';

export type StaggerElement = 'div' | 'ul' | 'ol';

interface StaggerProps {
  readonly effect?: RevealEffect;
  readonly as?: StaggerElement;
  readonly className?: string;
  /** Cada filho direto entra com `--stagger` de atraso em relação ao anterior. */
  readonly children: ReactNode;
}

export function Stagger({
  effect = 'fadeInUp',
  as: Element = 'div',
  className,
  children,
}: Readonly<StaggerProps>) {
  return (
    <Element {...staggerAttributes(effect)} className={className}>
      {children}
    </Element>
  );
}
