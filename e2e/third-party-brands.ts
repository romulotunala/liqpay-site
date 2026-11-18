// Termos que o texto publicado não pode conter.
//
// Marcas: o site não cita bancos nem empresas de meios de pagamento de terceiros (exceto a
// Cappta, que processa as transações). A lista é ampla de propósito, para cobrir o mercado.
// Palavras comuns que também são marcas ("rede", "caixa", "inter") só contam na forma de marca.

/**
 * Casa o termo como palavra inteira. O `\b` do JavaScript só conhece ASCII: em "itaú" ele não
 * veria o fim da palavra depois do "ú". Aqui a fronteira é qualquer coisa que não seja letra ou
 * dígito, em Unicode.
 */
function wholeWord(source: string): RegExp {
  return new RegExp(String.raw`(?<![\p{L}\d])(?:${source})(?![\p{L}\d])`, 'u');
}

// Em ordem alfabética.
const BRAND_PATTERNS: readonly RegExp[] = [
  String.raw`banco\s+do\s+brasil`,
  String.raw`banco\s+inter`,
  'banrisul',
  'bradesco',
  'btg',
  String.raw`c6\s*bank`,
  String.raw`caixa\s+econ[oô]mica`,
  'cielo',
  'getnet',
  'infinitepay',
  'itau',
  'itaú',
  String.raw`mercado\s*pago`,
  'nubank',
  'pagbank',
  'pagseguro',
  'paypal',
  'picpay',
  String.raw`rede\s+(?:itaú|itau|maquininha)|rede\.com\.br|maquininha\s+rede`,
  'safra',
  'safrapay',
  'santander',
  'sicoob',
  'sicredi',
  'stone',
  'sumup',
].map(wholeWord);

// Promessas que o site não faz: o benefício tributário é sempre condicionado.
const CLAIM_PATTERNS: readonly RegExp[] = [
  String.raw`bitributa[cç][aã]o`,
  String.raw`100\s*%\s*legal`,
  String.raw`quem\s+n[aã]o\s+liquida`,
].map((source) => new RegExp(source, 'u'));

// Percentuais (ex.: "1,99%"): taxas não são publicadas.
const PERCENTAGE_PATTERN = /\d+(?:[.,]\d+)?\s*%/u;

export const FORBIDDEN_PATTERNS: readonly RegExp[] = [
  ...BRAND_PATTERNS,
  ...CLAIM_PATTERNS,
  PERCENTAGE_PATTERN,
];

/** Trechos do texto que casam com algum termo proibido (comparação em minúsculas). */
export function findForbiddenTerms(text: string): string[] {
  const normalized = text.toLowerCase();

  return FORBIDDEN_PATTERNS
    .map((pattern) => pattern.exec(normalized)?.[0])
    .filter((match): match is string => match !== undefined);
}
