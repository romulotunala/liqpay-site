import { PageHero } from '@/components/ui/PageHero';

export function AboutHero() {
  return (
    <PageHero
      title='Soluções de pagamento com atendimento de verdade'
      description={(
        <>
          <p>
            A LiqPay nasceu para simplificar a forma como empresas recebem e organizam seus
            pagamentos. Reunimos maquininha, PIX, link de pagamento, boleto e split em uma só
            solução, com atendimento humano e condições ajustadas à realidade de cada negócio.
          </p>
          <p>Atendemos empresas de todos os tamanhos, em todo o Brasil.</p>
        </>
      )}
    />
  );
}
