# LiqPay — site institucional

Site da **LiqPay** (maquininha, PIX, link de pagamento, boleto e split de pagamentos).
A única conversão é o contato pelo WhatsApp.

Criado a partir do boilerplate [`nextforge`](https://github.com/romulotunala/nextforge):
Next.js 16 (App Router), React 19, TypeScript estrito e SCSS Modules, com export estático
publicado no GitHub Pages.

**Endereço atual (temporário):** https://romulotunala.github.io/liqpay-site

## Requisitos

- Node >= 24
- pnpm 11 (fixado em `packageManager`)

## Rodando localmente

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Localmente o site roda na raiz (`basePath` vazio). Nenhuma variável de ambiente é obrigatória.

## Scripts

```bash
pnpm dev          # desenvolvimento
pnpm build        # export estático em out/
pnpm lint         # ESLint + Stylelint
pnpm lint:fix     # corrige o que for automático
pnpm typecheck    # tsc --noEmit
pnpm test         # testes unitários (Vitest)
pnpm test:e2e     # build próprio com basePath + testes E2E (Playwright)
```

Teste E2E isolado, reaproveitando o último `build:e2e`:
`pnpm exec playwright test e2e/<arquivo>.spec.ts -g "<nome>"`.

## Variáveis de ambiente

| Variável | Uso | Onde é definida |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública; dela sai o `basePath` | CI: `base_url` do `actions/configure-pages`. Local: não definir |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | `umami` ou `none` (padrão) | Variável do repositório (Settings → Variables) |
| `NEXT_PUBLIC_ANALYTICS_ID` | ID do site no Umami | Variável do repositório (Settings → Variables) |

Sem as variáveis de analytics, nenhum script de analytics é carregado.

## URL e `basePath`

No GitHub Pages o site fica em `/liqpay-site`. O `basePath` é derivado da URL pública em
`src/config/url.ts` e nunca é escrito no código.

O E2E roda com o mesmo prefixo de produção: `pnpm test:e2e` faz um build próprio e serve uma
cópia do `out/` em `.e2e-site/liqpay-site/`. Um `pnpm build` comum não serve para o E2E.

## Deploy

Push na `main` dispara o workflow `.github/workflows/deploy.yml`: lint → typecheck → test →
build → publicação no GitHub Pages. Em **Settings → Pages**, a fonte deve ser **GitHub
Actions**.

**Não apague `public/.nojekyll`**: sem ele, o GitHub Pages não publica a pasta `_next/` e o
site sobe sem CSS e sem JS.

### Migrar para domínio próprio

1. Configurar o domínio em **Settings → Pages** e o DNS no provedor do domínio. O `basePath`
   passa a ser vazio sozinho, sem mudança de código.
2. Atualizar o domínio no cadastro do Umami.

## Git

Commits seguem Conventional Commits (validados pelo commitlint no Husky), com a descrição em
português.
