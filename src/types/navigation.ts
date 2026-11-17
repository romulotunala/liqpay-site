export type InternalHref = `/${string}`;

export interface NavigationItem {
  readonly label: string;
  readonly href: InternalHref;
}
