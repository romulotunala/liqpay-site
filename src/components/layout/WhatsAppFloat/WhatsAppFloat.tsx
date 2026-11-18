import { WhatsAppIcon } from '@/components/ui/icons';
import { NewTabNotice } from '@/components/ui/NewTabNotice';
import { whatsappClickAttributes } from '@/lib/analytics/attributes';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { WhatsAppFloatFrame } from './WhatsAppFloatFrame';
import styles from './WhatsAppFloat.module.scss';

const FLOAT_ICON_SIZE = 28;

/** Atalho fixo para o WhatsApp. Sem JavaScript, fica sempre visível. */
export function WhatsAppFloat() {
  return (
    <WhatsAppFloatFrame className={styles.frame}>
      <a
        {...whatsappClickAttributes('general', 'float')}
        href={buildWhatsAppUrl('general')}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.button}
      >
        <WhatsAppIcon size={FLOAT_ICON_SIZE} />
        <span className={styles.visuallyHidden}>Fale conosco no WhatsApp</span>
        <NewTabNotice />
      </a>
    </WhatsAppFloatFrame>
  );
}
