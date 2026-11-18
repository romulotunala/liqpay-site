import { useId } from 'react';
import { Section } from '@/components/ui/Section';
import { SideHeadingBlock } from '@/components/ui/SideHeadingBlock';

export function SplitProblem() {
  const titleId = useId();

  return (
    <Section tone='light' labelledBy={titleId}>
      <SideHeadingBlock title='Quando todo o valor da venda entra na sua conta' titleId={titleId}>
        <p>
          Muitos negócios dividem o valor das vendas com profissionais parceiros, comissionados ou
          fornecedores. Quando o pagamento inteiro cai na conta da empresa para depois ser
          repassado, ele entra como faturamento. Na prática, a empresa pode acabar recolhendo
          imposto sobre um valor que não é dela, e o mesmo dinheiro acaba tributado mais de uma
          vez.
        </p>
      </SideHeadingBlock>
    </Section>
  );
}
