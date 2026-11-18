import { Handshake, Store, UserRound, Wrench } from 'lucide-react';
import { useId } from 'react';
import { Reveal, Stagger } from '@/components/motion';
import { ICON_SIZE, ICON_STROKE_WIDTH, type IconComponent } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './HomeAudience.module.scss';

interface AudienceChip {
  readonly label: string;
  readonly icon: IconComponent;
}

const AUDIENCE_CHIPS: readonly AudienceChip[] = [
  { label: 'Comércios', icon: Store },
  { label: 'Prestadores de serviço', icon: Wrench },
  { label: 'Autônomos', icon: UserRound },
  { label: 'Empresas com parceiros', icon: Handshake },
];

export function HomeAudience() {
  const titleId = useId();

  return (
    <Section tone='light' labelledBy={titleId}>
      <div className={styles.layout}>
        <Reveal>
          <SectionHeader
            title='Feito para quem vende todos os dias'
            titleId={titleId}
            description={(
              <p>
                Comércios, prestadores de serviço, profissionais autônomos e empresas que trabalham
                com parceiros. Atendemos negócios de todos os tamanhos, em todo o Brasil.
              </p>
            )}
          />
        </Reveal>

        {/* Repetem o texto acima: escondidos do leitor de tela para não ler tudo duas vezes. */}
        <Stagger as='ul' className={styles.chips}>
          {AUDIENCE_CHIPS.map(({ label, icon: Icon }) => (
            <li key={label} className={styles.chip} aria-hidden='true'>
              <Icon size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} className={styles.chipIcon} />
              {label}
            </li>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
