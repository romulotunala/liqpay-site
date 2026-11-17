import { Children, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import styles from './FeatureGrid.module.scss';

interface FeatureGridProps {
  /** Cartão de destaque: 2×2 no desktop e sempre primeiro no mobile. */
  readonly featured: ReactNode;
  readonly children: ReactNode;
  readonly className?: string;
}

/** Grade "bento": um destaque grande e cartões menores ao lado. */
export function FeatureGrid({ featured, children, className }: FeatureGridProps) {
  return (
    <ul className={cn(styles.grid, className)}>
      <li className={styles.featured}>{featured}</li>
      {Children.map(children, (child) => (
        <li className={styles.item}>{child}</li>
      ))}
    </ul>
  );
}
