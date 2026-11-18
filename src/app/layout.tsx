import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { AnalyticsListener, AnalyticsScript } from '@/components/analytics';
import {
  Footer,
  Header,
  MAIN_CONTENT_ID,
  SkipLink,
  WhatsAppFloat,
} from '@/components/layout';
import { JsClassScript, RevealObserver } from '@/components/motion';
import { JsonLd } from '@/components/seo';
import { siteConfig } from '@/config/site';
import { organizationJsonLd } from '@/lib/seo';
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

// Só os padrões do site: título, descrição, canonical e Open Graph vêm de cada página
// (buildMetadata), para nenhuma rota herdar os da página inicial por engano.
export const metadata: Metadata = {
  title: siteConfig.name,
  applicationName: siteConfig.name,
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
        <SkipLink />
        <Header />
        <main id={MAIN_CONTENT_ID}>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={organizationJsonLd} />
        <RevealObserver />
        <AnalyticsListener />
        <AnalyticsScript />
      </body>
    </html>
  );
}
