import { useId, type ReactNode } from 'react';
import { enterAttributes } from '@/components/motion';
import { Section } from '@/components/ui/Section';
import styles from './PageHero.module.scss';

interface PageHeroProps {
  readonly title: string;
  /** Um ou mais parágrafos abaixo do título. */
  readonly description?: ReactNode;
  /** Botões, normalmente um CTA de WhatsApp. */
  readonly actions?: ReactNode;
}

/**
 * Abertura das páginas internas: seção escura com o h1. Entra no carregamento (título →
 * texto → botões), sem esperar a rolagem, porque está sempre acima da dobra.
 */
export function PageHero({ title, description, actions }: PageHeroProps) {
  const titleId = useId();

  return (
    <Section tone='dark' backdrop='glow' labelledBy={titleId} className={styles.hero}>
      <div className={styles.content}>
        <h1 id={titleId} className={styles.title} {...enterAttributes(1)}>{title}</h1>
        {description && (
          <div className={styles.description} {...enterAttributes(2)}>{description}</div>
        )}
        {actions && <div className={styles.actions} {...enterAttributes(3)}>{actions}</div>}
      </div>
    </Section>
  );
}
