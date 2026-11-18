import { ShieldCheck } from 'lucide-react';
import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { IconRing } from '@/components/ui/IconRing';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './SolutionsSecurity.module.scss';

export function SolutionsSecurity() {
  const titleId = useId();

  return (
    <Section tone='dark' backdrop='glow' labelledBy={titleId}>
      <Reveal className={styles.content}>
        <IconRing icon={ShieldCheck} />
        <SectionHeader
          title='Segurança em cada transação'
          titleId={titleId}
          align='center'
          description={(
            <p>
              As transações são capturadas pela Cappta e processadas em ambiente com certificação
              PCI-DSS, o padrão internacional de segurança para pagamentos com cartão. A LiqPay
              opera em parceria com instituições autorizadas pelo Banco Central.
            </p>
          )}
        />
      </Reveal>
    </Section>
  );
}
