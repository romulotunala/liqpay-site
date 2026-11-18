'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { isCurrentPage } from '@/lib/navigation';
import type { InternalHref } from '@/types/navigation';

interface NavLinkProps {
  readonly href: InternalHref;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * Link de menu que marca a página atual com `aria-current='page'`. É cliente só para ler a
 * rota; no export estático a marcação já sai no HTML de cada página.
 */
export function NavLink({ href, className, children }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={className}
      aria-current={isCurrentPage(pathname, href) ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
