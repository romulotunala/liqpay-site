import { Children, type ReactNode } from 'react';
import { staggerAttributes } from '@/components/motion';
import { cn } from '@/lib/cn';
import styles from './CardGrid.module.scss';

interface CardGridProps {
  /** Cada filho vira um item da lista (normalmente um Card). */
  readonly children: ReactNode;
  readonly className?: string;
}

/** Grade de cartões iguais: 1 coluna no mobile, 3 a partir do tablet. Entram em sequência. */
export function CardGrid({ children, className }: CardGridProps) {
  return (
    <ul {...staggerAttributes('fadeInUp')} className={cn(styles.grid, className)}>
      {Children.map(children, (child) => <li>{child}</li>)}
    </ul>
  );
}
