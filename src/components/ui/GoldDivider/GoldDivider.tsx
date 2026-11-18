import { drawLineAttributes } from '@/components/motion';
import type { SectionTone } from '@/components/ui/Section';
import styles from './GoldDivider.module.scss';

interface GoldDividerProps {
  /**
   * Fundo atrás da linha. Necessário entre duas seções do mesmo tom: sem ele, as pontas
   * transparentes do gradiente (e a linha antes de ser desenhada) mostrariam o fundo da página.
   */
  readonly tone?: SectionTone;
  readonly className?: string;
}

/** Linha dourada decorativa de 1px. Separa seções seguidas no mesmo tom. */
export function GoldDivider({ tone, className }: GoldDividerProps) {
  return (
    <div data-tone={tone} className={className} aria-hidden='true'>
      <hr {...drawLineAttributes} className={styles.divider} />
    </div>
  );
}
