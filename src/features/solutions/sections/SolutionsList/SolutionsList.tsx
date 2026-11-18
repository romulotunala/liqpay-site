import { Barcode, Link, QrCode, Split } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { IconComponent } from '@/components/ui/icons';
import { Section, type SectionTone } from '@/components/ui/Section';
import { SideHeadingBlock } from '@/components/ui/SideHeadingBlock';
import type { InternalHref } from '@/types/navigation';

interface Solution {
  /** Também é a âncora da seção (ex.: /solucoes#pix). */
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconComponent;
  readonly tone: SectionTone;
  readonly link?: { readonly label: string; readonly href: InternalHref };
}

const SOLUTIONS: readonly Solution[] = [
  {
    slug: 'pix',
    title: 'PIX',
    description: 'Receba por QR Code na maquininha ou online. O pagamento é confirmado na hora e '
      + 'conciliado automaticamente, sem você precisar conferir extrato.',
    icon: QrCode,
    tone: 'white',
  },
  {
    slug: 'link-de-pagamento',
    title: 'Link de pagamento',
    description: 'Venda sem estar no balcão. Gere um link e envie pelo WhatsApp, e-mail ou redes '
      + 'sociais. Seu cliente paga no cartão, à vista ou parcelado.',
    icon: Link,
    tone: 'light',
  },
  {
    slug: 'boleto',
    title: 'Boleto',
    description: 'Emita boletos para cobrar seus clientes de forma simples e organizada, com '
      + 'acompanhamento dos pagamentos.',
    icon: Barcode,
    tone: 'white',
  },
  {
    slug: 'split',
    title: 'Split de pagamentos',
    description: 'Divida cada venda automaticamente entre a sua empresa e seus parceiros. Cada um '
      + 'recebe a sua parte direto na própria conta.',
    icon: Split,
    tone: 'light',
    link: { label: 'Saiba mais sobre o split', href: '/split-de-pagamentos' },
  },
];

function SolutionBlock({ slug, title, description, icon, tone, link }: Readonly<Solution>) {
  const titleId = `${slug}-titulo`;

  return (
    <Section tone={tone} id={slug} labelledBy={titleId}>
      <SideHeadingBlock title={title} titleId={titleId} icon={icon}>
        <p>{description}</p>
        {link && <Button href={link.href} variant='ghost' icon='arrow'>{link.label}</Button>}
      </SideHeadingBlock>
    </Section>
  );
}

/** Um bloco por solução, alternando os tons claros. */
export function SolutionsList() {
  return SOLUTIONS.map((solution) => <SolutionBlock key={solution.slug} {...solution} />);
}
