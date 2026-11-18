import { PageHero } from '@/components/ui/PageHero';

export function SolutionsHero() {
  return (
    <PageHero
      title='Soluções de pagamento para cada momento da sua venda'
      description={(
        <p>
          No balcão, à distância ou na cobrança: receba do seu cliente do jeito que ele preferir,
          com segurança e dinheiro na conta no dia seguinte.
        </p>
      )}
    />
  );
}
