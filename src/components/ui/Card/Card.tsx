import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { IconComponent } from '@/components/ui/icons';
import { IconRing } from '@/components/ui/IconRing';
import type { AnalyticsAttributes } from '@/lib/analytics/attributes';
import { NewTabNotice } from '@/components/ui/NewTabNotice';
import { cn } from '@/lib/cn';
import styles from './Card.module.scss';

export type CardLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>
  & AnalyticsAttributes
  & { readonly href: string };

interface CardBaseProps {
  readonly title: string;
  readonly icon?: IconComponent;
  readonly headingLevel?: 'h2' | 'h3';
  /** Imagem ou ilustração do cartão (ex.: maquininha no bento). */
  readonly media?: ReactNode;
  readonly className?: string;
  readonly children?: ReactNode;
}

interface StaticCardProps extends CardBaseProps {
  readonly link?: never;
  /** Link opcional ao pé do cartão (ex.: Button ghost "Saiba mais"). */
  readonly footer?: ReactNode;
}

interface LinkedCardProps extends CardBaseProps {
  /** Torna o cartão inteiro clicável. Sem `footer`: link dentro de link é inválido. */
  readonly link: CardLinkProps;
  readonly footer?: never;
}

export type CardProps = StaticCardProps | LinkedCardProps;

function CardTitle({ title, link }: Pick<CardProps, 'title' | 'link'>) {
  if (!link) {
    return title;
  }

  return (
    <a {...link} className={styles.link}>
      {title}
      {link.target === '_blank' && <NewTabNotice />}
    </a>
  );
}

/** Composição fixa: mídia → ícone → título → texto → rodapé. */
export function Card({
  title,
  icon,
  headingLevel: Heading = 'h3',
  media,
  link,
  footer,
  className,
  children,
}: CardProps) {
  return (
    <article className={cn(styles.card, link && styles.clickable, className)}>
      {media && <div className={styles.media}>{media}</div>}
      {icon && <IconRing icon={icon} className={styles.ring} />}
      <Heading className={styles.title}>
        <CardTitle title={title} link={link} />
      </Heading>
      {children && <div className={styles.body}>{children}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
}
