import { CtaBanner } from '@/components/ui/CtaBanner';
import {
  SplitAudience,
  SplitBenefits,
  SplitHero,
  SplitProblem,
  SplitSteps,
  SplitTaxReform,
} from '@/features/split';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Split de pagamentos – LiqPay',
  description: 'Divida cada venda automaticamente entre sua empresa e seus parceiros. Cada um '
    + 'recebe e declara apenas a sua parte.',
  path: '/split-de-pagamentos',
});

export default function SplitPage() {
  return (
    <>
      <SplitHero />
      <SplitProblem />
      <SplitSteps />
      <SplitBenefits />
      <SplitAudience />
      <SplitTaxReform />
      <CtaBanner
        title='Descubra se o split faz sentido para o seu negócio'
        buttonLabel='Falar com um especialista'
        whatsappContext='split'
      />
    </>
  );
}
