import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavLink } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { HeaderFrame } from './HeaderFrame';
import styles from './Header.module.scss';

export function Header() {
  return (
    <HeaderFrame data-tone='dark' className={styles.header}>
      <div className={styles.inner}>
        <Logo loading='eager' />
        <nav aria-label='Principal' className={styles.nav}>
          <ul className={styles.navList}>
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className={styles.navLink}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button whatsappContext='general' analyticsLocation='header' className={styles.cta}>
          Fale conosco
        </Button>
        <MobileMenu className={styles.mobileMenu} />
      </div>
    </HeaderFrame>
  );
}
