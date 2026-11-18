import { useId } from 'react';
import { Section } from '@/components/ui/Section';
import { SideHeadingBlock } from '@/components/ui/SideHeadingBlock';

export function SplitAudience() {
  const titleId = useId();

  return (
    <Section tone='light' labelledBy={titleId}>
      <SideHeadingBlock title='Para qualquer negócio que divide vendas' titleId={titleId}>
        <p>
          Salões e clínicas com profissionais parceiros, lojas com representantes comissionados,
          negócios com mais de um sócio ou fornecedor na mesma venda. Se o valor que você recebe
          não é todo seu, o split pode fazer sentido para você.
        </p>
      </SideHeadingBlock>
    </Section>
  );
}
