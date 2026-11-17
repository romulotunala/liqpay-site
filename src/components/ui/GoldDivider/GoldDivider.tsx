import { cn } from '@/lib/cn';
import styles from './GoldDivider.module.scss';

interface GoldDividerProps {
  readonly className?: string;
}

/** Linha dourada decorativa de 1px. Separa seções seguidas no mesmo tom. */
export function GoldDivider({ className }: GoldDividerProps) {
  return <hr className={cn(styles.divider, className)} aria-hidden='true' />;
}
