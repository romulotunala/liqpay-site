import { useId } from 'react';
import { Section } from '@/components/ui/Section';
import { SideHeadingBlock } from '@/components/ui/SideHeadingBlock';

// Logo do Grupo Verum pendente (arquivo e autorização de uso): por enquanto, só texto.
export function AboutPartner() {
  const titleId = useId();

  return (
    <Section tone='white' labelledBy={titleId}>
      <SideHeadingBlock title='Parceira do Grupo Verum' titleId={titleId}>
        <p>
          A LiqPay é parceira do Grupo Verum, que atua em estratégia financeira, reestruturação de
          empresas e acesso a capital. Essa parceria permite oferecer, além dos meios de pagamento,
          apoio a empresas que precisam reorganizar suas finanças.
        </p>
      </SideHeadingBlock>
    </Section>
  );
}
