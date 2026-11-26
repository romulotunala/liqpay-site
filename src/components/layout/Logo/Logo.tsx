import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/paths';
import styles from './Logo.module.scss';

// Arquivos @2x exibidos em 1x: nítidos em telas retina e só alguns KB a mais em telas comuns.
const LOGO_IMAGES = {
  // Só o nome, sem o slogan: o slogan fica ilegível na altura do header.
  compact: { src: '/images/logo-wordmark-compact@2x.webp', width: 108, height: 32 },
  // Símbolo, nome e slogan: para onde há espaço, como o rodapé.
  full: { src: '/images/logo-full@2x.webp', width: 168, height: 160 },
} as const;

interface LogoProps {
  readonly variant?: keyof typeof LOGO_IMAGES;
  /** 'eager' só no header, que está sempre acima da dobra. */
  readonly loading?: 'eager' | 'lazy';
  readonly className?: string;
}

/** Logo da LiqPay com link para a página inicial. */
export function Logo({ variant = 'compact', loading = 'lazy', className }: LogoProps) {
  const image = LOGO_IMAGES[variant];

  return (
    <Link href='/' className={cn(styles.logo, className)}>
      <Image
        src={withBasePath(image.src)}
        width={image.width}
        height={image.height}
        alt='LiqPay – página inicial'
        loading={loading}
      />
    </Link>
  );
}
