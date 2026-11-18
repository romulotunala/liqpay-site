import 'react';

// Permite custom properties (`--reveal-delay`) em `style` sem type assertion.
declare module 'react' {
  interface CSSProperties {
    [customProperty: `--${string}`]: string | number | undefined;
  }
}
