import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { AnalyticsListener, AnalyticsScript } from '@/components/analytics';
import { JsClassScript, RevealObserver } from '@/components/motion';
import '../styles/globals.scss';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LiqPay – Maquininha, PIX e split de pagamentos',
  description: 'Receba suas vendas com segurança, dinheiro na conta no dia seguinte e atendimento '
    + 'humano 24h. Maquininha, PIX, link de pagamento, boleto e split.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: o JsClassScript muda a classe do <html> antes da hidratação.
    <html lang='pt-BR' className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <JsClassScript />
      </head>
      <body>
        {children}
        <RevealObserver />
        <AnalyticsListener />
        <AnalyticsScript />
      </body>
    </html>
  );
}
