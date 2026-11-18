import type { InternalHref } from '@/types/navigation';

const TRAILING_SLASHES = /\/+$/;

function normalizePath(path: string): string {
  return path.replace(TRAILING_SLASHES, '') || '/';
}

/** Compara a rota atual com um item de menu, ignorando a barra final (`/sobre/` = `/sobre`). */
export function isCurrentPage(pathname: string, href: InternalHref): boolean {
  return normalizePath(pathname) === normalizePath(href);
}
