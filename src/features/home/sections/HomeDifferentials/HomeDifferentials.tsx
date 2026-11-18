import { CalendarClock, Headset, Split } from 'lucide-react';
import { Stagger } from '@/components/motion';
import { Card } from '@/components/ui/Card';
import type { IconComponent } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import styles from './HomeDifferentials.module.scss';

interface Differential {
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
}

const DIFFERENTIALS: readonly Differential[] = [
  {
    title: 'Atendimento humano 24h',
    description: 'Você fala com pessoas, não com robôs. Suporte por WhatsApp e telefone a qualquer '
      + 'hora.',
    icon: Headset,
  },
  {
    title: 'Dinheiro no dia seguinte',
    description: 'As vendas no cartão caem na sua conta em D+1, para o seu caixa não ficar parado.',
    icon: CalendarClock,
  },
  {
    title: 'Split de pagamentos',
    description: 'Cada venda é dividida automaticamente entre você e seus parceiros. Cada um '
      + 'recebe e declara apenas a sua parte.',
    icon: Split,
  },
];

/** Sem título de seção: os cartões usam h2 para a hierarquia não pular do h1 do Hero ao h3. */
export function HomeDifferentials() {
  return (
    <Section tone='light'>
      <Stagger as='ul' className={styles.grid}>
        {DIFFERENTIALS.map((differential) => (
          <li key={differential.title}>
            <Card title={differential.title} icon={differential.icon} headingLevel='h2'>
              <p>{differential.description}</p>
            </Card>
          </li>
        ))}
      </Stagger>
    </Section>
  );
}
