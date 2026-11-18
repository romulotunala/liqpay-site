import { ClipboardList, FileCheck, Repeat } from 'lucide-react';
import { Stagger } from '@/components/motion';
import { Card } from '@/components/ui/Card';
import type { IconComponent } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import styles from './SplitBenefits.module.scss';

interface Benefit {
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
}

const BENEFITS: readonly Benefit[] = [
  {
    title: 'Mais clareza nos impostos',
    description: 'Sua empresa registra como receita apenas a parte da venda que é dela.',
    icon: FileCheck,
  },
  {
    title: 'Menos trabalho com repasses',
    description: 'Nada de transferências manuais para parceiros no fim do mês. A divisão é '
      + 'automática.',
    icon: Repeat,
  },
  {
    title: 'Controle para a sua contabilidade',
    description: 'Cada divisão fica registrada, o que facilita a conferência pelo seu contador.',
    icon: ClipboardList,
  },
];

/** Sem título de seção: os cartões usam h2 para a hierarquia não pular níveis. */
export function SplitBenefits() {
  return (
    <Section tone='white'>
      <Stagger as='ul' className={styles.grid}>
        {BENEFITS.map((benefit) => (
          <li key={benefit.title}>
            <Card title={benefit.title} icon={benefit.icon} headingLevel='h2'>
              <p>{benefit.description}</p>
            </Card>
          </li>
        ))}
      </Stagger>
    </Section>
  );
}
