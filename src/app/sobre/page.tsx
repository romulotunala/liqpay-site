import { CtaBanner } from '@/components/ui/CtaBanner';
import { AboutHero, AboutPartner, AboutSecurity, AboutValues } from '@/features/about';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sobre a LiqPay',
  description: 'Soluções de pagamento com atendimento humano e condições ajustadas à realidade de '
    + 'cada negócio, em todo o Brasil.',
  path: '/sobre',
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutValues />
      <AboutSecurity />
      <AboutPartner />
      <CtaBanner
        title='Fale com a LiqPay'
        buttonLabel='Chamar no WhatsApp'
        whatsappContext='general'
      />
    </>
  );
}
