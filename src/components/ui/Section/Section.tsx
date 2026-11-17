import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './Section.module.scss';

export type SectionTone = 'dark' | 'light' | 'white';

/** 'glow' acrescenta o brilho esmeralda (Hero e seções escuras de destaque). */
export type SectionBackdrop = 'default' | 'glow';

interface SectionProps {
  readonly tone: SectionTone;
  readonly id?: string;
  /** Id do título da seção, para o leitor de tela anunciar a região pelo nome. */
  readonly labelledBy?: string;
  readonly backdrop?: SectionBackdrop;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Seção de página: aplica o tom (troca as custom properties semânticas), o respiro vertical e
 * o container. Seções escuras recebem o padrão de rede ao fundo.
 */
export function Section({
  tone,
  id,
  labelledBy,
  backdrop = 'default',
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      className={cn(styles.section, backdrop === 'glow' && styles.glow, className)}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
}
