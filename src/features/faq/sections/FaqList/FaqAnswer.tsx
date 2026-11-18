import { NewTabNotice } from '@/components/ui/NewTabNotice';
import { whatsappClickAttributes } from '@/lib/analytics/attributes';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
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
            {...whatsappClickAttributes('general', 'faq')}
            href={buildWhatsAppUrl('general')}
            target='_blank'
            rel='noopener noreferrer'
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
