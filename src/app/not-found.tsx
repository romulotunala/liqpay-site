import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import styles from './not-found.module.scss';

const TITLE_ID = 'pagina-nao-encontrada';

export const metadata: Metadata = {
  title: 'Página não encontrada – LiqPay',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Section tone='dark' backdrop='glow' labelledBy={TITLE_ID} className={styles.section}>
      <SectionHeader
        as='h1'
        titleId={TITLE_ID}
        title='Página não encontrada'
        description='O endereço que você procurou não existe ou mudou de lugar.'
        align='center'
      />
      <div className={styles.actions}>
        <Button href='/' variant='secondary' size='lg'>Voltar para o início</Button>
        <Button whatsappContext='general' analyticsLocation='not_found' size='lg'>
          Falar no WhatsApp
        </Button>
      </div>
    </Section>
  );
}
