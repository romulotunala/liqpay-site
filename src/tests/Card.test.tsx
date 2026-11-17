import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';
import { linkClickAttributes } from '@/lib/analytics/attributes';

describe('Card', () => {
  it('usa h3 para o título por padrão', () => {
    render(<Card title='Atendimento humano 24h'>Texto</Card>);

    expect(screen.getByRole('heading', { level: 3, name: 'Atendimento humano 24h' }))
      .toBeInTheDocument();
  });

  it('com link, expõe um único link cujo nome é o título', () => {
    render(
      <Card title='E-mail' link={{ href: 'mailto:contato@exemplo.com' }}>
        contato@exemplo.com
      </Card>,
    );

    expect(screen.getAllByRole('link')).toHaveLength(1);
    expect(screen.getByRole('link')).toHaveAccessibleName('E-mail');
  });

  it('avisa no nome acessível quando o link abre em nova aba', () => {
    render(
      <Card
        title='Instagram'
        link={{
          href: 'https://www.instagram.com/exemplo',
          target: '_blank',
          rel: 'noopener noreferrer',
          ...linkClickAttributes('instagram_click', 'contact_card'),
        }}
      >
        @exemplo
      </Card>,
    );
    const link = screen.getByRole('link');

    expect(link).toHaveAccessibleName('Instagram (abre em nova aba)');
    expect(link).toHaveAttribute('data-analytics-event', 'instagram_click');
  });

  it('não aceita link e rodapé juntos (link dentro de link)', () => {
    const compileOnly = () => (
      // @ts-expect-error cartão clicável não pode ter rodapé com outro link
      <Card title='Título' link={{ href: '/contato' }} footer={<a href='/sobre'>Sobre</a>} />
    );

    expect(compileOnly).toBeTypeOf('function');
  });
});
