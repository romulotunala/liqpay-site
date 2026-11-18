import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';

export function SplitHero() {
  return (
    <PageHero
      title='Pague imposto apenas sobre o que é seu'
      description={(
        <p>
          Com o split da LiqPay, cada venda é dividida no momento do pagamento. A parte do seu
          parceiro vai direto para ele e não passa pelo faturamento da sua empresa.
        </p>
      )}
      actions={(
        <Button whatsappContext='split' analyticsLocation='hero' size='lg'>
          Quero entender o split para o meu negócio
        </Button>
      )}
    />
  );
}
