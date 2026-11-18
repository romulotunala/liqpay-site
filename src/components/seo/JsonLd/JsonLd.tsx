// `<` escapado: um texto com "</script>" fecharia a tag antes da hora.
const SCRIPT_BREAKING_CHARACTER = '<';

interface JsonLdProps {
  readonly data: object;
}

/** Dados estruturados (schema.org) gerados no build a partir de objetos do próprio site. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replaceAll(SCRIPT_BREAKING_CHARACTER, String.raw`\u003c`);

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: json }} />;
}
