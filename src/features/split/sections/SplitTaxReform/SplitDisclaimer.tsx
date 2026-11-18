import { Info } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { ICON_STROKE_WIDTH } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import styles from './SplitDisclaimer.module.scss';

const DISCLAIMER_ICON_SIZE = 20;

interface SplitDisclaimerProps {
  readonly className?: string;
}

export function SplitDisclaimer({ className }: SplitDisclaimerProps) {
  return (
    <Reveal className={cn(styles.disclaimer, className)}>
      <Info
        size={DISCLAIMER_ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        className={styles.icon}
        aria-hidden='true'
      />
      <p role='note'>
        O split organiza a divisão dos recebimentos entre as partes. O impacto tributário depende
        do regime e da atividade de cada empresa. Recomendamos que a adoção seja acompanhada pelo
        seu contador.
      </p>
    </Reveal>
  );
}
