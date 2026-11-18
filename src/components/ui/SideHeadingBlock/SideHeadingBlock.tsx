import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion';
import { IconRing } from '@/components/ui/IconRing';
import type { IconComponent } from '@/components/ui/icons';
import styles from './SideHeadingBlock.module.scss';

interface SideHeadingBlockProps {
  readonly title: string;
  /** Use o mesmo id no `labelledBy` da Section. */
  readonly titleId: string;
  readonly eyebrow?: string;
  readonly icon?: IconComponent;
  /** Parágrafos (em tamanho de subtítulo) e, se houver, botões ou links. */
  readonly children: ReactNode;
}

/** Título (h2) numa coluna e o texto na outra, no desktop. No mobile, um abaixo do outro. */
export function SideHeadingBlock({
  title,
  titleId,
  eyebrow,
  icon,
  children,
}: SideHeadingBlockProps) {
  return (
    <Reveal className={styles.block}>
      <div className={styles.heading}>
        {icon && <IconRing icon={icon} />}
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 id={titleId} className={styles.title}>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </Reveal>
  );
}
