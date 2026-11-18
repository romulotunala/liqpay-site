import { Mail } from 'lucide-react';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Logo } from '@/components/layout/Logo';
import { ICON_STROKE_WIDTH, InstagramIcon, WhatsAppIcon } from '@/components/ui/icons';
import { NewTabNotice } from '@/components/ui/NewTabNotice';
import { siteConfig } from '@/config/site';
import { linkClickAttributes, type AnalyticsAttributes } from '@/lib/analytics/attributes';
import { NEW_TAB_LINK_PROPS, whatsappLinkProps } from '@/lib/links';
import styles from './Footer.module.scss';

const CONTACT_ICON_SIZE = 20;

type ContactAnchorProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>
  & AnalyticsAttributes
  & { readonly href: string };

interface ContactLinkProps {
  readonly link: ContactAnchorProps;
  readonly icon: ReactNode;
  readonly children: ReactNode;
}

function ContactLink({ link, icon, children }: ContactLinkProps) {
  return (
    <a {...link} className={styles.contactLink}>
      {icon}
      <span>{children}</span>
      {link.target === '_blank' && <NewTabNotice />}
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
                  link={whatsappLinkProps('general', 'footer')}
                  icon={<WhatsAppIcon size={CONTACT_ICON_SIZE} />}
                >
                  WhatsApp <span className={styles.phone}>{contact.whatsapp.display}</span>
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  link={{
                    href: `mailto:${contact.email}`,
                    ...linkClickAttributes('email_click', 'footer'),
                  }}
                  icon={(
                    <Mail
                      size={CONTACT_ICON_SIZE}
                      strokeWidth={ICON_STROKE_WIDTH}
                      aria-hidden='true'
                    />
                  )}
                >
                  {contact.email}
                </ContactLink>
              </li>
              <li>
                <ContactLink
                  link={{
                    href: contact.instagram.url,
                    ...NEW_TAB_LINK_PROPS,
                    ...linkClickAttributes('instagram_click', 'footer'),
                  }}
                  icon={<InstagramIcon size={CONTACT_ICON_SIZE} />}
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
