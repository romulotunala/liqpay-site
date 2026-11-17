import { ICON_SIZE, ICON_STROKE_WIDTH, type IconComponent } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import styles from './IconRing.module.scss';

interface IconRingProps {
  readonly icon: IconComponent;
  readonly className?: string;
}

/** Ícone dentro de um anel fino sem preenchimento. Nunca quadrado com fundo colorido. */
export function IconRing({ icon: Icon, className }: IconRingProps) {
  return (
    <span className={cn(styles.ring, className)} aria-hidden='true'>
      <Icon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </span>
  );
}
