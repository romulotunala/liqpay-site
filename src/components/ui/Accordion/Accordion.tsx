import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@/components/ui/icons';
import type { AnalyticsAttributes } from '@/lib/analytics/attributes';
import { cn } from '@/lib/cn';
import styles from './Accordion.module.scss';

export interface AccordionItem {
  /** Slug estável: chave da lista e, no FAQ, a propriedade `question` do analytics. */
  readonly id: string;
  readonly question: string;
  readonly answer: ReactNode;
  /** Atributos de rastreamento do <summary> (ex.: faqOpenAttributes). */
  readonly analytics?: AnalyticsAttributes;
}

interface AccordionProps {
  readonly items: readonly AccordionItem[];
  /** Item que começa aberto. */
  readonly defaultOpenId?: string;
  /** Mesmo `name` em todos os <details>: abrir um fecha os outros (nativo do navegador). */
  readonly exclusiveGroupName?: string;
  readonly className?: string;
}

/**
 * <details>/<summary> nativos: funciona sem JavaScript e é componente de servidor. A animação
 * de altura é só CSS, em ::details-content.
 */
export function Accordion({ items, defaultOpenId, exclusiveGroupName, className }: AccordionProps) {
  return (
    <div className={cn(styles.accordion, className)}>
      {items.map((item) => (
        <details
          key={item.id}
          name={exclusiveGroupName}
          open={item.id === defaultOpenId}
          className={styles.item}
        >
          <summary {...item.analytics} className={styles.summary}>
            <span className={styles.question}>{item.question}</span>
            <Plus
              className={styles.icon}
              size={ICON_SIZE}
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden='true'
            />
          </summary>
          <div className={styles.answer}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
