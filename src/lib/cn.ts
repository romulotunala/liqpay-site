type ClassNameValue = string | false | null | undefined;

/** Junta classes ignorando valores falsos: cn(styles.card, isActive && styles.active). */
export function cn(...classNames: readonly ClassNameValue[]): string {
  return classNames.filter(Boolean).join(' ');
}
