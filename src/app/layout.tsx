import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
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
    <html lang='pt-BR' className={`${sora.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
