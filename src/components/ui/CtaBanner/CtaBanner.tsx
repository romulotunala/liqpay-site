import { useId, type ReactNode } from 'react';
import { Reveal } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import type { WhatsAppContext } from '@/lib/whatsapp';
import styles from './CtaBanner.module.scss';

interface CtaBannerProps {
  readonly title: string;
  readonly description?: ReactNode;
  readonly buttonLabel: string;
  readonly whatsappContext: WhatsAppContext;
}

/** Chamada final de página: seção escura com um único CTA de WhatsApp. */
export function CtaBanner({ title, description, buttonLabel, whatsappContext }: CtaBannerProps) {
  const titleId = useId();

  return (
    <Section tone='dark' labelledBy={titleId}>
      <Reveal effect='fadeInScale' className={styles.banner}>
        <h2 id={titleId} className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        <Button whatsappContext={whatsappContext} analyticsLocation='cta_banner' size='lg'>
          {buttonLabel}
        </Button>
      </Reveal>
    </Section>
  );
}
