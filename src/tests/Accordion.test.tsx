import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { faqOpenAttributes } from '@/lib/analytics/attributes';

const items: readonly AccordionItem[] = [
  { id: 'primeira', question: 'Primeira pergunta?', answer: 'Primeira resposta.' },
  {
    id: 'segunda',
    question: 'Segunda pergunta?',
    answer: 'Segunda resposta.',
    analytics: faqOpenAttributes('segunda'),
  },
];

function detailsOf(question: string) {
  return screen.getByText(question).closest('details');
}

describe('Accordion', () => {
  it('abre só o item indicado em defaultOpenId', () => {
    render(<Accordion items={items} defaultOpenId='primeira' />);

    expect(detailsOf('Primeira pergunta?')).toHaveAttribute('open');
    expect(detailsOf('Segunda pergunta?')).not.toHaveAttribute('open');
  });

  it('mantém as respostas no HTML mesmo fechadas (funciona sem JavaScript)', () => {
    render(<Accordion items={items} />);

    expect(screen.getByText('Segunda resposta.')).toBeInTheDocument();
  });

  it('aplica os atributos de analytics no <summary>', () => {
    render(<Accordion items={items} />);
    const summary = screen.getByText('Segunda pergunta?').closest('summary');

    expect(summary).toHaveAttribute('data-analytics-event', 'faq_open');
    expect(summary).toHaveAttribute('data-analytics-question', 'segunda');
  });

  it('agrupa os itens pelo name quando a abertura é exclusiva', () => {
    render(<Accordion items={items} exclusiveGroupName='faq' />);

    expect(detailsOf('Primeira pergunta?')).toHaveAttribute('name', 'faq');
    expect(detailsOf('Segunda pergunta?')).toHaveAttribute('name', 'faq');
  });
});
