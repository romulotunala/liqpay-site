import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';

export function ContactHero() {
  return (
    <PageHero
      title='Fale com a LiqPay'
      description={(
        <p>
          Nossa equipe está pronta para entender o seu negócio e apresentar a melhor condição para
          você. Atendimento humano, 24 horas por dia.
        </p>
      )}
      actions={(
        <Button whatsappContext='general' analyticsLocation='hero' size='lg'>
          Chamar no WhatsApp
        </Button>
      )}
    />
  );
}
