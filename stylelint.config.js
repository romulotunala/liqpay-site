export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    // Permite camelCase em CSS Modules (ex: .cardTitle, .statNumber)
    'selector-class-pattern': null,
    // Permite variáveis Sass agrupadas sem linha em branco obrigatória
    'scss/dollar-variable-empty-line-before': null,
    // Permite at-rules (@use, @include) encadeadas sem linha em branco
    'at-rule-empty-line-before': null,
    // Permite vendor prefixes necessários para compatibilidade
    'property-no-vendor-prefix': null,
    // :global() é do CSS Modules (ex.: estilizar pelo tom da seção ancestral)
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    // ::details-content ainda não está na lista do Stylelint (animação do Accordion)
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['details-content'] }],
  },
};
