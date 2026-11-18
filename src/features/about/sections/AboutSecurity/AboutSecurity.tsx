import { ShieldCheck } from 'lucide-react';
import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { IconRing } from '@/components/ui/IconRing';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './AboutSecurity.module.scss';

export function AboutSecurity() {
  const titleId = useId();

  return (
    <Section tone='dark' backdrop='glow' labelledBy={titleId}>
      <Reveal className={styles.content}>
        <IconRing icon={ShieldCheck} />
        <SectionHeader
          title='Tecnologia e segurança de quem é referência'
          titleId={titleId}
          align='center'
          description={(
            <p>
              A LiqPay opera em parceria com instituições autorizadas pelo Banco Central. A captura
              das transações é feita pela Cappta, em ambiente com certificação PCI-DSS, o padrão
              internacional de segurança para pagamentos com cartão.
            </p>
          )}
        />
      </Reveal>
    </Section>
  );
}
