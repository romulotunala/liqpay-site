import { cn } from '@/lib/cn';
import styles from './ImagePlaceholder.module.scss';

interface ImagePlaceholderProps {
  /** Dimensões finais do asset que vai substituir o placeholder (evita CLS na troca). */
  readonly width: number;
  readonly height: number;
  readonly className?: string;
}

/** Ocupa o lugar de um asset pendente. Sem texto falso: é só a forma, na cor da superfície. */
export function ImagePlaceholder({ width, height, className }: ImagePlaceholderProps) {
  return (
    <div
      className={cn(styles.placeholder, className)}
      style={{ aspectRatio: `${width} / ${height}`, maxInlineSize: width }}
      aria-hidden='true'
    />
  );
}
