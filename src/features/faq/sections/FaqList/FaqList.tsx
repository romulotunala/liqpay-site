import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo';
import { faqOpenAttributes } from '@/lib/analytics/attributes';
import { buildFaqPageJsonLd } from '@/lib/seo';
import { FaqAnswer } from './FaqAnswer';
import { FAQ_ITEMS, faqAnswerText } from './faqItems';
import styles from './FaqList.module.scss';

const ACCORDION_ITEMS: readonly AccordionItem[] = FAQ_ITEMS.map(({ id, question, answer }) => ({
  id,
  question,
  answer: <FaqAnswer answer={answer} />,
  analytics: faqOpenAttributes(id),
}));

const FAQ_PAGE_JSON_LD = buildFaqPageJsonLd(
  FAQ_ITEMS.map(({ question, answer }) => ({ question, answer: faqAnswerText(answer) })),
);

export function FaqList() {
  return (
    <Section tone='light'>
      <Accordion
        items={ACCORDION_ITEMS}
        defaultOpenId={FAQ_ITEMS[0]?.id}
        className={styles.accordion}
      />
      <JsonLd data={FAQ_PAGE_JSON_LD} />
    </Section>
  );
}
