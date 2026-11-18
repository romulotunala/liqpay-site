'use client';

import type { HTMLAttributes } from 'react';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useScrolledPast } from '@/hooks/useScrolledPast';

const SOLID_BACKGROUND_OFFSET = 24;
const HIDE_ON_SCROLL_OFFSET = 400;

/**
 * O <header> em si, com o estado da rolagem em atributos para o CSS: `data-scrolled` (fundo
 * sólido) e `data-hidden` (rolando para baixo). O conteúdo chega pronto do servidor.
 */
export function HeaderFrame(props: Readonly<HTMLAttributes<HTMLElement>>) {
  const isScrolled = useScrolledPast(SOLID_BACKGROUND_OFFSET);
  const direction = useScrollDirection(HIDE_ON_SCROLL_OFFSET);

  return (
    <header
      {...props}
      data-scrolled={isScrolled ? '' : undefined}
      data-hidden={direction === 'down' ? '' : undefined}
    />
  );
}
