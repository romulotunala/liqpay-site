import Image from 'next/image';
import { useId } from 'react';
import { enterAttributes } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { withBasePath } from '@/lib/paths';
import styles from './HomeHero.module.scss';

// Provisório, para aprovação do cliente: o símbolo com a maquininha, exibido maior que o original.
// A versão definitiva entra pelo script de imagens (1x e @2x) trocando só src e dimensões.
const HERO_IMAGE = { src: '/images/logo-symbol-large.webp', width: 331, height: 302 } as const;

export function HomeHero() {
  const titleId = useId();

  return (
    <Section tone='dark' backdrop='glow' labelledBy={titleId} className={styles.hero}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <h1 id={titleId} className={styles.title} {...enterAttributes(1)}>
            Receba suas vendas com segurança e pague imposto{' '}
            <span className={styles.highlight}>só sobre o que é seu</span>.
          </h1>
          <p className={styles.lead} {...enterAttributes(2)}>
            Maquininha, PIX, link de pagamento e boleto em uma só solução, com dinheiro na conta no
            dia seguinte e atendimento humano 24 horas.
          </p>
          <div className={styles.actions} {...enterAttributes(3)}>
            <Button whatsappContext='general' analyticsLocation='hero' size='lg'>
              Falar com um especialista
            </Button>
            <Button href='/solucoes' variant='secondary' size='lg'>
              Conheça as soluções
            </Button>
          </div>
        </div>

        <div className={styles.visual} {...enterAttributes(4)}>
          <div className={styles.device}>
            <Image
              src={withBasePath(HERO_IMAGE.src)}
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              alt='Maquininha LiqPay diante do símbolo da marca'
              preload
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
