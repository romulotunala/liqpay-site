import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/paths';
import styles from './Logo.module.scss';

// Arquivo @2x exibido em 1x: nítido em telas retina e só alguns KB a mais em telas comuns.
const WORDMARK = {
  src: '/images/logo-wordmark-compact@2x.webp',
  width: 108,
  height: 32,
} as const;

interface LogoProps {
  /** 'eager' só no header, que está sempre acima da dobra. */
  readonly loading?: 'eager' | 'lazy';
  readonly className?: string;
}

/** Nome "liqpay" com link para a página inicial. */
export function Logo({ loading = 'lazy', className }: LogoProps) {
  return (
    <Link href='/' className={cn(styles.logo, className)}>
      <Image
        src={withBasePath(WORDMARK.src)}
        width={WORDMARK.width}
        height={WORDMARK.height}
        alt='LiqPay – página inicial'
        loading={loading}
      />
    </Link>
  );
}
