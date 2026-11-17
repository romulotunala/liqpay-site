import { cn } from '@/lib/cn';
import styles from './StepList.module.scss';

export interface Step {
  readonly title: string;
  readonly description: string;
}

interface StepListProps {
  readonly steps: readonly Step[];
  readonly className?: string;
}

const STEP_NUMBER_DIGITS = 2;

/** Passos numerados (01, 02…) ligados por uma linha: horizontal no desktop, vertical no mobile. */
export function StepList({ steps, className }: StepListProps) {
  return (
    <ol className={cn(styles.list, className)}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          {/* O <ol> já anuncia a posição; o número visível é decorativo. */}
          <span className={styles.number} aria-hidden='true'>
            {String(index + 1).padStart(STEP_NUMBER_DIGITS, '0')}
          </span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.description}>{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
