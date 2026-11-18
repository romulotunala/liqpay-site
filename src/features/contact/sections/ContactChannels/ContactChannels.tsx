import { Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CardGrid } from '@/components/ui/CardGrid';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/icons';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/config/site';
import { linkClickAttributes } from '@/lib/analytics/attributes';
import { NEW_TAB_LINK_PROPS, whatsappLinkProps } from '@/lib/links';

/** Sem título de seção: os cartões usam h2 para a hierarquia não pular níveis. */
export function ContactChannels() {
  const { whatsapp, email, instagram } = siteConfig.contact;

  return (
    <Section tone='light'>
      <CardGrid>
        <Card
          title='WhatsApp da Central'
          icon={WhatsAppIcon}
          headingLevel='h2'
          link={whatsappLinkProps('general', 'contact_card')}
        >
          <p>{whatsapp.display}</p>
        </Card>
        <Card
          title='E-mail'
          icon={Mail}
          headingLevel='h2'
          link={{ href: `mailto:${email}`, ...linkClickAttributes('email_click', 'contact_card') }}
        >
          <p>{email}</p>
        </Card>
        <Card
          title='Instagram'
          icon={InstagramIcon}
          headingLevel='h2'
          link={{
            href: instagram.url,
            ...NEW_TAB_LINK_PROPS,
            ...linkClickAttributes('instagram_click', 'contact_card'),
          }}
        >
          <p>{instagram.handle}</p>
        </Card>
      </CardGrid>
    </Section>
  );
}
