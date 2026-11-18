'use client';

import { usePathname } from 'next/navigation';
import {
  useEffect,
  useRef,
  type FocusEvent,
  type HTMLAttributes,
  type ToggleEvent,
} from 'react';

// Ao abrir, o foco vai para o botão de fechar: quem abriu pelo teclado pode sair na hora.
const CLOSE_BUTTON_SELECTOR = 'button[popovertargetaction="hide"]';

type MobileMenuPanelProps = Readonly<Omit<HTMLAttributes<HTMLDivElement>, 'popover'>>;

/**
 * Painel do menu (popover nativo). Abrir e fechar funciona sem JavaScript; este componente só
 * completa o comportamento: foco ao abrir, fechar ao navegar e quando o foco sai do painel.
 */
export function MobileMenuPanel(props: MobileMenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  const pathname = usePathname();

  function hide() {
    if (isOpenRef.current) {
      panelRef.current?.hidePopover();
    }
  }

  // O layout não remonta na navegação client-side: sem isto, o menu ficaria aberto na página
  // nova.
  useEffect(hide, [pathname]);

  function handleToggle(event: ToggleEvent<HTMLDivElement>) {
    isOpenRef.current = event.newState === 'open';

    if (isOpenRef.current) {
      event.currentTarget.querySelector<HTMLElement>(CLOSE_BUTTON_SELECTOR)?.focus();
    }
  }

  // O popover não é modal: sem isto, o Tab seguiria para a página escondida atrás do painel.
  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextFocus = event.relatedTarget;

    if (nextFocus instanceof Node && !event.currentTarget.contains(nextFocus)) {
      hide();
    }
  }

  return (
    <div
      {...props}
      ref={panelRef}
      popover='auto'
      onToggle={handleToggle}
      onBlur={handleBlur}
    />
  );
}
