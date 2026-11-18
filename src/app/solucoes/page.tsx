import { CtaBanner } from '@/components/ui/CtaBanner';
import { GoldDivider } from '@/components/ui/GoldDivider';
import {
  SolutionsHero,
  SolutionsList,
  SolutionsPos,
  SolutionsSecurity,
} from '@/features/solutions';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Soluções de pagamento – LiqPay',
  description: 'Maquininha, PIX, link de pagamento, boleto e split de pagamentos em uma só '
    + 'solução, com recebimento em D+1.',
  path: '/solucoes',
});

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsPos />
      <SolutionsList />
      <SolutionsSecurity />
      <GoldDivider tone='dark' />
      <CtaBanner
        title='Qual solução combina com o seu negócio?'
        description='Conte para a gente como você vende e montamos uma proposta sob medida.'
        buttonLabel='Falar com um especialista'
        whatsappContext='proposal'
      />
    </>
  );
}
