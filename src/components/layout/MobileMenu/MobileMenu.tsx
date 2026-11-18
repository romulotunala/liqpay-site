import { Menu, X } from 'lucide-react';
import { useId } from 'react';
import { Logo } from '@/components/layout/Logo';
import { NavLink } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/Button';
import { ICON_SIZE, ICON_STROKE_WIDTH } from '@/components/ui/icons';
import { siteConfig } from '@/config/site';
import { MobileMenuPanel } from './MobileMenuPanel';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  readonly className?: string;
}

/** Menu em tela cheia das telas pequenas. O navegador expõe o estado aberto/fechado no botão. */
export function MobileMenu({ className }: MobileMenuProps) {
  const panelId = useId();

  return (
    <div className={className}>
      <button type='button' popoverTarget={panelId} className={styles.iconButton}>
        <Menu size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} aria-hidden='true' />
        <span className={styles.visuallyHidden}>Menu</span>
      </button>

      <MobileMenuPanel id={panelId} data-tone='dark' className={styles.panel}>
        <div className={styles.panelHeader}>
          <Logo />
          <button
            type='button'
            popoverTarget={panelId}
            popoverTargetAction='hide'
            className={styles.iconButton}
          >
            <X size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} aria-hidden='true' />
            <span className={styles.visuallyHidden}>Fechar menu</span>
          </button>
        </div>

        <nav aria-label='Principal' className={styles.nav}>
          <ul className={styles.list}>
            {siteConfig.navigation.map((item) => (
              <li key={item.href} className={styles.item}>
                <NavLink href={item.href} className={styles.link}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
          <Button whatsappContext='general' analyticsLocation='header' size='lg'>
            Fale conosco
          </Button>
        </nav>
      </MobileMenuPanel>
    </div>
  );
}
