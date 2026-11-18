import { Barcode, CreditCard, Link2, QrCode } from 'lucide-react';
import { useId } from 'react';
import { Reveal } from '@/components/motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FeatureGrid } from '@/components/ui/FeatureGrid';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './HomeSolutions.module.scss';

// Mockup da maquininha em versão horizontal para o cartão de destaque (pendente).
const POS_CARD_MEDIA = { width: 560, height: 360 } as const;

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
            media={<ImagePlaceholder width={POS_CARD_MEDIA.width} height={POS_CARD_MEDIA.height} />}
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
