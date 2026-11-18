import { ContactChannels, ContactHero } from '@/features/contact';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contato – LiqPay',
  description: 'Fale com um especialista da LiqPay pelo WhatsApp. Atendimento humano, 24 horas '
    + 'por dia.',
  path: '/contato',
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
    </>
  );
}
