import { useId } from 'react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { SideHeadingBlock } from '@/components/ui/SideHeadingBlock';

export function HomeConditions() {
  const titleId = useId();

  return (
    <Section tone='white' labelledBy={titleId}>
      <SideHeadingBlock title='Condições sob medida para o seu negócio' titleId={titleId}>
        <p>
          Sem taxa de adesão, sem mensalidade e sem taxa de saque. As taxas são definidas de
          acordo com o perfil e o volume de vendas da sua empresa, e a maquininha pode sair sem
          custo conforme o seu faturamento.
        </p>
        <Button whatsappContext='proposal' analyticsLocation='home_conditions' size='lg'>
          Pedir uma proposta
        </Button>
      </SideHeadingBlock>
    </Section>
  );
}
