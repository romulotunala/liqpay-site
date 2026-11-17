import type { ComponentType } from 'react';

export interface IconProps {
  readonly className?: string;
  readonly size?: number;
  readonly strokeWidth?: number;
}

/** Aceita ícones do lucide-react e os ícones de marca desta pasta. */
export type IconComponent = ComponentType<IconProps>;

/** Padrão do design system: 24px, traço de 1.5px, sempre decorativo. */
export const ICON_SIZE = 24;
export const ICON_STROKE_WIDTH = 1.5;
