import { CtaBanner } from '@/components/ui/CtaBanner';
import { FaqHero, FaqList } from '@/features/faq';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Perguntas frequentes – LiqPay',
  description: 'Taxas, maquininha, prazos de recebimento, split de pagamentos e segurança: tire '
    + 'suas dúvidas sobre a LiqPay.',
  path: '/perguntas-frequentes',
});

export default function FaqPage() {
  return (
    <>
      <FaqHero />
      <FaqList />
      <CtaBanner
        title='Não encontrou sua dúvida?'
        description='Fale com nossa equipe. Atendimento humano, 24 horas por dia.'
        buttonLabel='Chamar no WhatsApp'
        whatsappContext='general'
      />
    </>
  );
}
