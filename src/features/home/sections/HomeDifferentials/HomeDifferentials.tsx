import { CalendarClock, Headset, Split } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CardGrid } from '@/components/ui/CardGrid';
import type { IconComponent } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';

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
      <CardGrid>
        {DIFFERENTIALS.map((differential) => (
          <Card
            key={differential.title}
            title={differential.title}
            icon={differential.icon}
            headingLevel='h2'
          >
            <p>{differential.description}</p>
          </Card>
        ))}
      </CardGrid>
    </Section>
  );
}
