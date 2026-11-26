import Image from 'next/image';
import { useId } from 'react';
import { Reveal, Stagger } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { withBasePath } from '@/lib/paths';
import styles from './SolutionsPos.module.scss';

// Arquivo @2x exibido em 1x (ver scripts/generate-images.ts).
const POS_IMAGE = {
  src: '/images/pos-terminal-angled.webp',
  width: 280,
  height: 606,
} as const;

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
          <Image
            src={withBasePath(POS_IMAGE.src)}
            width={POS_IMAGE.width}
            height={POS_IMAGE.height}
            alt='Maquininha LiqPay com tela touch e impressora de comprovante'
            loading='lazy'
            decoding='async'
            className={styles.image}
          />
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
