import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import styles from './HomeConditions.module.scss';

export function HomeConditions() {
  const titleId = useId();

  return (
    <Section tone='white' labelledBy={titleId}>
      <Reveal className={styles.layout}>
        <h2 id={titleId} className={styles.title}>Condições sob medida para o seu negócio</h2>
        <div className={styles.body}>
          <p className={styles.text}>
            Sem taxa de adesão, sem mensalidade e sem taxa de saque. As taxas são definidas de
            acordo com o perfil e o volume de vendas da sua empresa, e a maquininha pode sair sem
            custo conforme o seu faturamento.
          </p>
          <Button whatsappContext='proposal' analyticsLocation='home_conditions' size='lg'>
            Pedir uma proposta
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
