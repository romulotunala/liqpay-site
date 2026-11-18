import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList, type Step } from '@/components/ui/StepList';
import styles from './SplitSteps.module.scss';

const SPLIT_STEPS: readonly Step[] = [
  {
    title: 'O cliente paga.',
    description: 'No cartão ou no PIX, na maquininha ou no link de pagamento.',
  },
  {
    title: 'A transação é processada.',
    description: 'Com segurança, por parceiros autorizados.',
  },
  {
    title: 'A LiqPay divide o valor.',
    description: 'De acordo com o percentual combinado entre você e o seu parceiro.',
  },
  {
    title: 'Cada um recebe a sua parte.',
    description: 'O dinheiro cai na conta de cada um, no dia seguinte.',
  },
];

export function SplitSteps() {
  const titleId = useId();

  return (
    <Section tone='dark' backdrop='glow' labelledBy={titleId}>
      <Reveal className={styles.header}>
        <SectionHeader title='Como funciona' titleId={titleId} />
      </Reveal>
      <StepList steps={SPLIT_STEPS} />
    </Section>
  );
}
