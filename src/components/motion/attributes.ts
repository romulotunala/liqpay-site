/**
 * Atributos que ligam um elemento ao CSS de motion (styles/base/_motion.scss) e ao
 * RevealObserver. Primitivos que já geram a própria lista (FeatureGrid, Accordion) espalham
 * estes atributos no contêiner em vez de serem envolvidos por um <Stagger>.
 */

export type RevealEffect = 'fadeIn' | 'fadeInUp' | 'fadeInScale';

/** Passo da entrada do Hero: título → subtítulo → botões → imagem. */
export type EnterStep = 1 | 2 | 3 | 4;

export interface RevealAttributes {
  readonly 'data-reveal': RevealEffect | 'drawLine';
}

export interface StaggerAttributes extends RevealAttributes {
  readonly 'data-stagger': '';
}

export function revealAttributes(effect: RevealEffect): RevealAttributes {
  return { 'data-reveal': effect };
}

/** Os filhos diretos entram em sequência quando o contêiner aparece. */
export function staggerAttributes(effect: RevealEffect): StaggerAttributes {
  return { 'data-reveal': effect, 'data-stagger': '' };
}

/**
 * Marca o elemento para o observer sem escondê-lo: o componente desenha a própria linha a
 * partir de `[data-revealed]`.
 */
export const drawLineAttributes: RevealAttributes = { 'data-reveal': 'drawLine' };

/** Entrada no carregamento (acima da dobra), sem IntersectionObserver. */
export function enterAttributes(step: EnterStep) {
  return { 'data-enter': String(step) };
}
