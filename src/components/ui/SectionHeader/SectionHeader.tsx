import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  readonly title: ReactNode;
  /** Use o mesmo id no `labelledBy` da Section. */
  readonly titleId?: string;
  readonly eyebrow?: string;
  readonly description?: ReactNode;
  readonly align?: 'start' | 'center';
  /** h1 só no primeiro bloco da página; os demais títulos de seção são h2. */
  readonly as?: 'h1' | 'h2';
  readonly className?: string;
}

export function SectionHeader({
  title,
  titleId,
  eyebrow,
  description,
  align = 'start',
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(styles.header, styles[align], className)}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading id={titleId} className={styles.title}>
        {title}
      </Heading>
      {description && <div className={styles.description}>{description}</div>}
    </header>
  );
}
