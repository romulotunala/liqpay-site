import { CalendarClock, Eye, Headset, TrendingUp } from 'lucide-react';
import { useId } from 'react';
import { Reveal, Stagger } from '@/components/motion';
import { IconRing } from '@/components/ui/IconRing';
import type { IconComponent } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './AboutValues.module.scss';

interface Value {
  readonly name: string;
  readonly description: string;
  readonly icon: IconComponent;
}

const VALUES: readonly Value[] = [
  {
    name: 'Proximidade',
    description: 'atendimento humano 24 horas, por WhatsApp e telefone.',
    icon: Headset,
  },
  {
    name: 'Transparência',
    description: 'sem adesão, sem mensalidade, sem taxa de saque.',
    icon: Eye,
  },
  {
    name: 'Agilidade',
    description: 'dinheiro das vendas na conta no dia seguinte.',
    icon: CalendarClock,
  },
  {
    name: 'Eficiência',
    description: 'ferramentas que ajudam sua empresa a pagar imposto apenas sobre o que é seu.',
    icon: TrendingUp,
  },
];

export function AboutValues() {
  const titleId = useId();

  return (
    <Section tone='light' labelledBy={titleId}>
      <Reveal className={styles.header}>
        <SectionHeader title='Nosso compromisso' titleId={titleId} />
      </Reveal>
      {/* Rótulo e texto na mesma frase, como "Proximidade: atendimento humano…". */}
      <Stagger as='ul' className={styles.values}>
        {VALUES.map(({ name, description, icon }) => (
          <li key={name} className={styles.value}>
            <IconRing icon={icon} />
            <p className={styles.text}>
              <strong className={styles.name}>{name}:</strong> {description}
            </p>
          </li>
        ))}
      </Stagger>
    </Section>
  );
}
