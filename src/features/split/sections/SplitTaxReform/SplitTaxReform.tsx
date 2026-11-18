import { useId } from 'react';
import { Section } from '@/components/ui/Section';
import { SideHeadingBlock } from '@/components/ui/SideHeadingBlock';
import { SplitDisclaimer } from './SplitDisclaimer';
import styles from './SplitTaxReform.module.scss';

export function SplitTaxReform() {
  const titleId = useId();

  return (
    <Section tone='white' labelledBy={titleId}>
      <SideHeadingBlock
        eyebrow='Reforma Tributária'
        title='Preparado para o novo modelo de tributação'
        titleId={titleId}
      >
        <p>
          A Reforma Tributária prevê o split payment, um sistema em que parte dos novos tributos
          (IBS e CBS) será separada já no momento do pagamento, com implantação gradual nos
          próximos anos. A lógica é a mesma que a LiqPay já aplica hoje: separar na origem o que
          pertence a cada um. Quem já organiza seus recebimentos dessa forma chega mais preparado
          às mudanças.
        </p>
      </SideHeadingBlock>
      {/* Logo abaixo do texto, na mesma seção: o aviso qualifica o que acabou de ser dito. */}
      <SplitDisclaimer className={styles.disclaimer} />
    </Section>
  );
}
