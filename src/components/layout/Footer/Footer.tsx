import { Mail } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { ICON_STROKE_WIDTH, InstagramIcon, WhatsAppIcon } from '@/components/ui/icons';
import { NewTabNotice } from '@/components/ui/NewTabNotice';
import { siteConfig } from '@/config/site';
import {
  linkClickAttributes,
  whatsappClickAttributes,
  type AnalyticsAttributes,
} from '@/lib/analytics/attributes';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import styles from './Footer.module.scss';

const CONTACT_ICON_SIZE = 20;

interface ContactLinkProps {
  readonly href: string;
  readonly icon: ReactNode;
  readonly analytics: AnalyticsAttributes;
  readonly opensInNewTab?: boolean;
  readonly children: ReactNode;
}

function ContactLink({ href, icon, analytics, opensInNewTab, children }: ContactLinkProps) {
  const newTabProps = opensInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a {...analytics} {...newTabProps} href={href} className={styles.contactLink}>
      {icon}
      <span>{children}</span>
      {opensInNewTab && <NewTabNotice />}
    </a>
  );
}

export function Footer() {
  const { contact, navigation } = siteConfig;
  // Gerado no build: o ano muda a cada novo deploy.
  const currentYear = new Date().getFullYear();

  return (
    <footer data-tone='dark' className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.tagline}>{siteConfig.tagline}</p>
          </div>

          <nav aria-labelledby='rodape-menu' className={styles.column}>
            <h2 id='rodape-menu' className={styles.columnTitle}>Menu</h2>
            <ul className={styles.list}>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Contato</h2>
            <ul className={styles.list}>
              <li>
                <ContactLink
                  href={buildWhatsAppUrl('general')}
                  icon={<WhatsAppIcon size={CONTACT_ICON_SIZE} />}
                  analytics={whatsappClickAttributes('general', 'footer')}
                  opensInNewTab
                >
                  WhatsApp <span className={styles.phone}>{contact.whatsapp.display}</span>
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  href={`mailto:${contact.email}`}
                  icon={(
                    <Mail
                      size={CONTACT_ICON_SIZE}
                      strokeWidth={ICON_STROKE_WIDTH}
                      aria-hidden='true'
                    />
                  )}
                  analytics={linkClickAttributes('email_click', 'footer')}
                >
                  {contact.email}
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  href={contact.instagram.url}
                  icon={<InstagramIcon size={CONTACT_ICON_SIZE} />}
                  analytics={linkClickAttributes('instagram_click', 'footer')}
                  opensInNewTab
                >
                  Instagram {contact.instagram.handle}
                </ContactLink>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <p>{siteConfig.legalName} · CNPJ {siteConfig.cnpj}</p>
          <p>
            A LiqPay não é uma instituição financeira. Os serviços de pagamento são prestados em
            parceria com instituições autorizadas pelo Banco Central do Brasil. Taxas e condições
            sujeitas a análise.
          </p>
          <p>© {currentYear} {siteConfig.name}. Todos os direitos reservados.</p>
          <p>Desenvolvido por <strong>Rômulo Tunala</strong></p>
        </div>
      </div>
    </footer>
  );
}
