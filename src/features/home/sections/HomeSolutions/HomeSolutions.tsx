import { Barcode, CreditCard, Link2, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { withBasePath } from '@/lib/paths';
import styles from './HomeSolutions.module.scss';

// Arquivo @2x exibido em 1x (ver scripts/generate-images.ts).
const POS_IMAGE = { src: '/images/pos-terminal.webp', width: 560, height: 343 } as const;

export function HomeSolutions() {
  const titleId = useId();

  return (
    <Section tone='white' labelledBy={titleId}>
      <Reveal className={styles.header}>
        <SectionHeader
          eyebrow='Soluções'
          title='Tudo o que o seu negócio precisa para receber'
          titleId={titleId}
        />
      </Reveal>

      <FeatureGrid
        featured={(
          <Card
            title='Maquininha LiqPay'
            icon={CreditCard}
            media={(
              // alt vazio: o título do cartão, logo abaixo, já nomeia o produto.
              <Image
                src={withBasePath(POS_IMAGE.src)}
                width={POS_IMAGE.width}
                height={POS_IMAGE.height}
                alt=''
                loading='lazy'
                decoding='async'
                className={styles.posImage}
              />
            )}
          >
            <p>Aceita cartão e PIX, com conexão Wi-Fi e 4G.</p>
          </Card>
        )}
      >
        <Card title='PIX' icon={QrCode}>
          <p>QR Code na maquininha ou online, com conciliação automática.</p>
        </Card>
        <Card title='Link de pagamento' icon={Link2}>
          <p>Venda pelo WhatsApp ou redes sociais, à vista ou parcelado.</p>
        </Card>
        <Card title='Boleto' icon={Barcode}>
          <p>Cobre seus clientes com praticidade.</p>
        </Card>
      </FeatureGrid>

      <Reveal className={styles.more}>
        <Button href='/solucoes' variant='ghost' icon='arrow'>Conheça as soluções</Button>
      </Reveal>
    </Section>
  );
}
