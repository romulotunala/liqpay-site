import { NewTabNotice } from '@/components/ui/NewTabNotice';
import { whatsappLinkProps } from '@/lib/links';
import type { FaqAnswerPart } from './faqItems';
import styles from './FaqList.module.scss';

interface FaqAnswerProps {
  readonly answer: readonly FaqAnswerPart[];
}

export function FaqAnswer({ answer }: FaqAnswerProps) {
  return (
    <p>
      {answer.map((part) => {
        if (typeof part === 'string') {
          return part;
        }

        return (
          <a
            key={part.whatsappLink}
            {...whatsappLinkProps('general', 'faq')}
            className={styles.link}
          >
            {part.whatsappLink}
            <NewTabNotice />
          </a>
        );
      })}
    </p>
  );
}
