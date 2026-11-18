import { CtaBanner } from '@/components/ui/CtaBanner';
import {
  HomeAudience,
  HomeConditions,
  HomeDifferentials,
  HomeHero,
  HomeSolutions,
  HomeSplitHighlight,
} from '@/features/home';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'LiqPay – Maquininha, PIX e split de pagamentos',
  description: 'Receba suas vendas com segurança, dinheiro na conta no dia seguinte e atendimento '
    + 'humano 24h. Maquininha, PIX, link de pagamento, boleto e split.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeDifferentials />
      <HomeSolutions />
      <HomeSplitHighlight />
      <HomeAudience />
      <HomeConditions />
      <CtaBanner
        title='Vamos conversar sobre o seu negócio?'
        description={
          'Um especialista da LiqPay entende a sua operação e apresenta a melhor condição para '
          + 'você.'
        }
        buttonLabel='Chamar no WhatsApp'
        whatsappContext='general'
      />
    </>
  );
}
