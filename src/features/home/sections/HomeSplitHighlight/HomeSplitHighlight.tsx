import Image from 'next/image';
import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { withBasePath } from '@/lib/paths';
import styles from './HomeSplitHighlight.module.scss';

const SPLIT_ILLUSTRATION = { src: '/images/split-flow.svg', width: 480, height: 320 } as const;

export function HomeSplitHighlight() {
  const titleId = useId();

  return (
    <Section tone='dark' labelledBy={titleId}>
      <div className={styles.layout}>
        <Reveal>
          <SectionHeader
            eyebrow='Split de pagamentos'
            title='Pare de pagar imposto sobre o dinheiro dos outros'
            titleId={titleId}
            description={(
              <p>
                Se você divide vendas com profissionais parceiros ou comissionados, todo o valor
                costuma entrar como faturamento da sua empresa. Com o split da LiqPay, a parte do
                parceiro vai direto para a conta dele. Você declara apenas o que é seu.
              </p>
            )}
          />
          <Button href='/split-de-pagamentos' variant='ghost' icon='arrow'>
            Entenda como funciona o split
          </Button>
        </Reveal>

        <Reveal effect='fadeInScale' delay={150} className={styles.visual}>
          <Image
            src={withBasePath(SPLIT_ILLUSTRATION.src)}
            width={SPLIT_ILLUSTRATION.width}
            height={SPLIT_ILLUSTRATION.height}
            alt='Ilustração de uma venda sendo dividida entre duas contas'
            loading='lazy'
          />
        </Reveal>
      </div>
    </Section>
  );
}
