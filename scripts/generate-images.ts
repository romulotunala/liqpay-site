// Gera as versões otimizadas das logos e os ícones a partir dos originais em docs/imagens/.
// Os originais ficam só na máquina local (fora do Git); os arquivos gerados são versionados.
// Uso: pnpm images
import { existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp, { type Color, type Sharp } from 'sharp';

const SOURCE_DIR = 'docs/imagens';
const IMAGES_DIR = 'public/images';
const APP_DIR = 'src/app';

const INK_950 = '#07110D';
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const RETINA_SCALES = [1, 2] as const;

// Os PNGs originais têm uma margem transparente; o corte faz a altura pedida ser a da logo.
const TRIM_THRESHOLD = 1;
const WEBP_OPTIONS = { quality: 90, alphaQuality: 100, effort: 6 } as const;
// Paleta reduz os ícones a ~1/4 sem perda visível. Não serve para a OG: o degradê do brilho
// ganha anéis visíveis.
const ICON_PNG_OPTIONS = { palette: true, quality: 90, compressionLevel: 9, effort: 10 } as const;
const LOSSLESS_PNG_OPTIONS = { compressionLevel: 9 } as const;

interface LogoVariant {
  readonly source: string;
  readonly name: string;
  /** Altura de exibição em CSS px (1x). A versão @2x tem o dobro. */
  readonly height: number;
  /** Mantém só as N primeiras linhas do original, antes do corte da margem. */
  readonly keepTopRows?: number;
}

// Linha vazia entre as letras de "liqpay" (terminam na 152) e os acentos do slogan (começam na
// 156) em LiqPay_nome.png. O script confere que ela continua vazia se o original mudar.
const WORDMARK_LETTERS_CUT_ROW = 154;
// Alfa até ~3%: resto invisível de suavização das bordas, aceito na linha do corte.
const INVISIBLE_ALPHA = 8;

// Logomarca completa (símbolo, nome e slogan): rodapé, JSON-LD e imagem Open Graph.
const FULL_LOGO_SOURCE = 'LiqPay_logo_4096px.png';

const LOGO_VARIANTS: readonly LogoVariant[] = [
  { source: FULL_LOGO_SOURCE, name: 'logo-full', height: 160 },
  { source: 'LiqPay_nome.png', name: 'logo-wordmark', height: 40 },
  // Sem o slogan: em 32–40px de altura ele fica ilegível. Para o header e o rodapé.
  {
    source: 'LiqPay_nome.png',
    name: 'logo-wordmark-compact',
    height: 32,
    keepTopRows: WORDMARK_LETTERS_CUT_ROW,
  },
  { source: 'LiqPay_simbolo.png', name: 'logo-symbol', height: 40 },
];

const SYMBOL_SOURCE = 'LiqPay_simbolo.png';

// Imagens geradas no tamanho do original, sem @2x: o original não tem resolução para isso.
// Exibidas menores que o arquivo, ficam nítidas em telas 1x e aceitáveis em 2x.
const NATIVE_IMAGES = [
  // Símbolo com a maquininha: imagem provisória do Hero da Home.
  { source: SYMBOL_SOURCE, name: 'logo-symbol-large' },
] as const;

interface ProductImage {
  readonly source: string;
  readonly name: string;
  /** Largura máxima de exibição em CSS px. O arquivo sai no dobro e é exibido em 1x. */
  readonly displayWidth: number;
}

// Um arquivo @2x só, como a logo do header: nítido em telas retina, sem srcset.
const PRODUCT_IMAGE_SCALE = 2;

const PRODUCT_IMAGES: readonly ProductImage[] = [
  // Deitada: tem a proporção do cartão de destaque "Maquininha LiqPay" da Home.
  { source: 'maquininha_deitada_alta_resolucao.png', name: 'pos-terminal', displayWidth: 560 },
  // Em pé e em 3/4: cabe na coluna estreita da seção da maquininha em Soluções.
  {
    source: 'maquininha_liqpay_3-4_alta_resolucao.png',
    name: 'pos-terminal-angled',
    displayWidth: 280,
  },
];

const ICON_SIZE = 512;
const APPLE_ICON_SIZE = 180;
// O iOS preenche transparência de preto; com fundo próprio e respiro, o ícone fica previsível.
const APPLE_ICON_CONTENT_RATIO = 0.78;
const FAVICON_SIZE = 32;

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const OG_LOGO_HEIGHT = 420;

// Formato ICO: cabeçalho de 6 bytes + uma entrada de diretório de 16 bytes, seguidos do PNG.
const ICO_HEADER_SIZE = 6;
const ICO_ENTRY_SIZE = 16;
const ICO_TYPE_ICON = 1;
const ICO_BITS_PER_PIXEL = 32;

interface TrimmedImage {
  readonly buffer: Buffer;
  readonly width: number;
  readonly height: number;
}

interface AlphaMap {
  readonly width: number;
  readonly height: number;
  readonly alphaAt: (x: number, y: number) => number;
}

async function readAlpha(path: string): Promise<AlphaMap> {
  const { data, info } = await sharp(path)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const alphaAt = (x: number, y: number) => data[(y * info.width + x) * info.channels + 3];

  return { width: info.width, height: info.height, alphaAt };
}

function assertTransparentCorners(path: string, { width, height, alphaAt }: AlphaMap): void {
  const corners = [
    alphaAt(0, 0),
    alphaAt(width - 1, 0),
    alphaAt(0, height - 1),
    alphaAt(width - 1, height - 1),
  ];

  if (corners.some((alpha) => alpha !== 0)) {
    throw new Error(`${path} não tem fundo transparente nos cantos.`);
  }
}

function assertTransparentRow(path: string, row: number, { width, alphaAt }: AlphaMap): void {
  const xs = Array.from({ length: width }, (_, x) => x);
  if (xs.some((x) => alphaAt(x, row) > INVISIBLE_ALPHA)) {
    throw new Error(`${path}: a linha ${row} do corte não está vazia; o original mudou?`);
  }
}

async function cropTopRows(path: string, rows: number, width: number): Promise<Buffer> {
  return sharp(path).extract({ left: 0, top: 0, width, height: rows }).png().toBuffer();
}

async function loadTrimmed(source: string, keepTopRows?: number): Promise<TrimmedImage> {
  const path = join(SOURCE_DIR, source);
  if (!existsSync(path)) {
    throw new Error(`Original não encontrado: ${path}. Os originais ficam só na máquina local.`);
  }

  const alpha = await readAlpha(path);
  assertTransparentCorners(path, alpha);

  let input: string | Buffer = path;
  if (keepTopRows !== undefined) {
    assertTransparentRow(path, keepTopRows, alpha);
    input = await cropTopRows(path, keepTopRows, alpha.width);
  }

  // Corte em pipeline separado: no sharp, o trim rodaria antes do extract.
  const { data, info } = await sharp(input)
    .trim({ threshold: TRIM_THRESHOLD })
    .png()
    .toBuffer({ resolveWithObject: true });

  return { buffer: data, width: info.width, height: info.height };
}

function assertNotUpscaled(name: string, targetSize: number, originalSize: number): void {
  if (targetSize > originalSize) {
    throw new Error(
      `${name}: ${targetSize}px pediria ampliar o original (${originalSize}px). `
      + 'Nunca amplie um original; peça uma versão maior.',
    );
  }
}

function writeOutput(path: string, buffer: Buffer): void {
  writeFileSync(path, buffer);
  const kilobytes = (statSync(path).size / 1024).toFixed(1);
  console.log(`  ${path} (${kilobytes} KB)`);
}

async function writeLogoAtScale(
  variant: LogoVariant,
  image: TrimmedImage,
  scale: number,
): Promise<void> {
  const height = variant.height * scale;
  assertNotUpscaled(variant.name, height, image.height);

  const suffix = scale === 1 ? '' : `@${scale}x`;
  const buffer = await sharp(image.buffer).resize({ height }).webp(WEBP_OPTIONS).toBuffer();
  writeOutput(join(IMAGES_DIR, `${variant.name}${suffix}.webp`), buffer);
}

async function generateLogoVariant(variant: LogoVariant): Promise<void> {
  const image = await loadTrimmed(variant.source, variant.keepTopRows);
  await Promise.all(RETINA_SCALES.map((scale) => writeLogoAtScale(variant, image, scale)));
}

async function generateNativeImage({ source, name }: (typeof NATIVE_IMAGES)[number]) {
  const image = await loadTrimmed(source);
  const buffer = await sharp(image.buffer).webp(WEBP_OPTIONS).toBuffer();
  writeOutput(join(IMAGES_DIR, `${name}.webp`), buffer);
}

async function generateProductImage({ source, name, displayWidth }: ProductImage) {
  const image = await loadTrimmed(source);
  const width = displayWidth * PRODUCT_IMAGE_SCALE;
  assertNotUpscaled(name, width, image.width);

  const buffer = await sharp(image.buffer).resize({ width }).webp(WEBP_OPTIONS).toBuffer();
  writeOutput(join(IMAGES_DIR, `${name}.webp`), buffer);
}

function createCanvas(width: number, height: number, background: Color): Sharp {
  return sharp({ create: { width, height, channels: 4, background } });
}

async function fitInSquare(image: TrimmedImage, size: number): Promise<Buffer> {
  return sharp(image.buffer)
    .resize(size, size, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toBuffer();
}

function wrapPngInIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(ICO_HEADER_SIZE);
  header.writeUInt16LE(ICO_TYPE_ICON, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(ICO_ENTRY_SIZE);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(ICO_BITS_PER_PIXEL, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(ICO_HEADER_SIZE + ICO_ENTRY_SIZE, 12);

  return Buffer.concat([header, entry, png]);
}

async function generateIcons(): Promise<void> {
  const symbol = await loadTrimmed(SYMBOL_SOURCE);

  // O símbolo é menor que 512px: fica centralizado no tamanho original, sem ampliar.
  const icon = await createCanvas(ICON_SIZE, ICON_SIZE, TRANSPARENT)
    .composite([{ input: symbol.buffer, gravity: 'center' }])
    .png(ICON_PNG_OPTIONS)
    .toBuffer();
  writeOutput(join(APP_DIR, 'icon.png'), icon);

  const appleContentSize = Math.round(APPLE_ICON_SIZE * APPLE_ICON_CONTENT_RATIO);
  const appleContent = await fitInSquare(symbol, appleContentSize);
  const appleIcon = await createCanvas(APPLE_ICON_SIZE, APPLE_ICON_SIZE, INK_950)
    .composite([{ input: appleContent, gravity: 'center' }])
    .png(ICON_PNG_OPTIONS)
    .toBuffer();
  writeOutput(join(APP_DIR, 'apple-icon.png'), appleIcon);

  const faviconPng = await fitInSquare(symbol, FAVICON_SIZE);
  writeOutput(join(APP_DIR, 'favicon.ico'), wrapPngInIco(faviconPng, FAVICON_SIZE));
}

// Mesmo "brilho esmeralda" das seções escuras do design system.
const EMERALD_GLOW_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="70%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.18" />
      <stop offset="70%" stop-color="#4ADE80" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#glow)" />
</svg>`;

async function generateOgImage(): Promise<void> {
  const logo = await loadTrimmed(FULL_LOGO_SOURCE);
  assertNotUpscaled('og-image', OG_LOGO_HEIGHT, logo.height);

  const resizedLogo = await sharp(logo.buffer).resize({ height: OG_LOGO_HEIGHT }).png().toBuffer();
  const ogImage = await createCanvas(OG_WIDTH, OG_HEIGHT, INK_950)
    .composite([
      { input: Buffer.from(EMERALD_GLOW_SVG) },
      { input: resizedLogo, gravity: 'center' },
    ])
    .png(LOSSLESS_PNG_OPTIONS)
    .toBuffer();
  writeOutput(join(IMAGES_DIR, 'og-image.png'), ogImage);
}

async function main(): Promise<void> {
  mkdirSync(IMAGES_DIR, { recursive: true });

  await Promise.all([
    ...LOGO_VARIANTS.map(generateLogoVariant),
    ...NATIVE_IMAGES.map(generateNativeImage),
    ...PRODUCT_IMAGES.map(generateProductImage),
    generateIcons(),
    generateOgImage(),
  ]);
}

await main();
