import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ICON_SIZE, ICON_STROKE_WIDTH, WhatsAppIcon } from '@/components/ui/icons';
import { NewTabNotice } from '@/components/ui/NewTabNotice';
import type { AnalyticsLocation } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { whatsappLinkProps } from '@/lib/links';
import type { WhatsAppContext } from '@/lib/whatsapp';
import type { InternalHref } from '@/types/navigation';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';
export type ButtonIcon = 'whatsapp' | 'arrow' | 'none';

interface ButtonStyleProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Padrão: 'whatsapp' nos botões de WhatsApp, 'none' nos demais. */
  readonly icon?: ButtonIcon;
  readonly className?: string;
  readonly children: ReactNode;
}

type AnchorAttributes = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel' | 'children' | 'className'
>;

interface ButtonAsButtonProps
  extends ButtonStyleProps,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  readonly href?: never;
  readonly whatsappContext?: never;
  readonly analyticsLocation?: never;
}

interface ButtonAsLinkProps extends ButtonStyleProps, AnchorAttributes {
  readonly href: InternalHref;
  readonly whatsappContext?: never;
  readonly analyticsLocation?: never;
}

interface ButtonAsWhatsAppProps extends ButtonStyleProps, AnchorAttributes {
  /** Texto puro: o botão completa o nome acessível com o canal quando o rótulo não o cita. */
  readonly children: string;
  readonly whatsappContext: WhatsAppContext;
  /** Obrigatório: todo CTA de WhatsApp informa de onde veio o clique. */
  readonly analyticsLocation: AnalyticsLocation;
  readonly href?: never;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsWhatsAppProps;

function buttonClassName({ variant = 'primary', size = 'md', className }: ButtonStyleProps) {
  return cn(styles.button, styles[variant], styles[size], className);
}

function ButtonContent({ icon, children }: Pick<ButtonStyleProps, 'icon' | 'children'>) {
  return (
    <>
      {icon === 'whatsapp' && <WhatsAppIcon className={styles.icon} size={20} />}
      <span>{children}</span>
      {icon === 'arrow' && (
        <ArrowRight
          className={cn(styles.icon, styles.arrow)}
          size={ICON_SIZE - 4}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden='true'
        />
      )}
    </>
  );
}

const WHATSAPP_MENTION = /whatsapp/i;

/**
 * O ícone já mostra o WhatsApp, então o rótulo visível pode omitir o canal ("Pedir uma
 * proposta"). Para leitor de tela o ícone é decorativo: o canal entra como texto oculto.
 */
function WhatsAppChannelNotice({ label }: Readonly<{ label: string }>) {
  if (WHATSAPP_MENTION.test(label)) {
    return null;
  }

  return (
    <>
      {' '}
      <span className={styles.visuallyHidden}>no WhatsApp</span>
    </>
  );
}

function WhatsAppButton({
  variant,
  size,
  icon = 'whatsapp',
  className,
  children,
  whatsappContext,
  analyticsLocation,
  ...anchorProps
}: Readonly<ButtonAsWhatsAppProps>) {
  return (
    <a
      {...anchorProps}
      {...whatsappLinkProps(whatsappContext, analyticsLocation)}
      className={buttonClassName({ variant, size, className, children })}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
      <WhatsAppChannelNotice label={children} />
      <NewTabNotice />
    </a>
  );
}

function LinkButton({
  variant,
  size,
  icon = 'none',
  className,
  children,
  href,
  ...anchorProps
}: Readonly<ButtonAsLinkProps>) {
  return (
    <Link
      {...anchorProps}
      href={href}
      className={buttonClassName({ variant, size, className, children })}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}

function NativeButton({
  variant,
  size,
  icon = 'none',
  className,
  children,
  type = 'button',
  ...buttonProps
}: Readonly<ButtonAsButtonProps>) {
  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClassName({ variant, size, className, children })}
    >
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </button>
  );
}

/**
 * Botão do design system. O elemento sai dos props: `whatsappContext` gera um link para o
 * WhatsApp com mensagem e analytics; `href` interno usa next/link; sem os dois, <button>.
 */
export function Button(props: ButtonProps) {
  if (props.whatsappContext !== undefined) {
    return <WhatsAppButton {...props} />;
  }

  if (props.href !== undefined) {
    return <LinkButton {...props} />;
  }

  return <NativeButton {...props} />;
}
