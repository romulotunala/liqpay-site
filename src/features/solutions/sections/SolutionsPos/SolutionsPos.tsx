import { useId } from 'react';
import { Reveal, Stagger } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './SolutionsPos.module.scss';

// Dimensões finais do mockup da maquininha (pendente).
const POS_MOCKUP = { width: 480, height: 560 } as const;

const POS_FEATURES = [
  'Aceita cartões de débito e crédito, à vista ou parcelado',
  'PIX por QR Code direto na tela',
  'Conexão Wi-Fi e 4G',
  'Impressão rápida do comprovante',
  'Troca expressa em caso de defeito',
  'Sem aluguel, conforme o faturamento',
] as const;

export function SolutionsPos() {
  const titleId = useId();

  return (
    <Section tone='light' labelledBy={titleId}>
      <div className={styles.layout}>
        <Reveal effect='fadeInScale' className={styles.visual}>
          <ImagePlaceholder width={POS_MOCKUP.width} height={POS_MOCKUP.height} />
        </Reveal>

        <div className={styles.content}>
          <Reveal>
            <SectionHeader
              title='Maquininha LiqPay'
              titleId={titleId}
              description={(
                <p>
                  Uma maquininha moderna, rápida e conectada, para você vender sem interrupções.
                </p>
              )}
            />
          </Reveal>
          <Stagger as='ul' className={styles.features}>
            {POS_FEATURES.map((feature) => (
              <li key={feature} className={styles.feature}>{feature}</li>
            ))}
          </Stagger>
          <Reveal>
            <Button whatsappContext='pos' analyticsLocation='solutions_pos' size='lg'>
              Quero minha maquininha
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
