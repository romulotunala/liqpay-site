import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

describe('Button', () => {
  describe('sem href', () => {
    it('renderiza um <button> do tipo button', () => {
      render(<Button>Enviar</Button>);

      expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'button');
    });

    it('repassa os props nativos (onClick, disabled)', async () => {
      const onClick = vi.fn();
      const { rerender } = render(<Button onClick={onClick}>Clique</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledOnce();

      rerender(<Button disabled>Clique</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('com href interno', () => {
    it('renderiza um link para a rota, sem abrir nova aba', () => {
      render(<Button href='/solucoes' variant='ghost' icon='arrow'>Conheça as soluções</Button>);
      const link = screen.getByRole('link', { name: 'Conheça as soluções' });

      expect(link).toHaveAttribute('href', '/solucoes');
      expect(link).not.toHaveAttribute('target');
    });
  });

  describe('com whatsappContext', () => {
    function renderWhatsAppButton() {
      render(
        <Button whatsappContext='pos' analyticsLocation='solutions_pos'>
          Quero minha maquininha
        </Button>,
      );

      return screen.getByRole('link', { name: /Quero minha maquininha/ });
    }

    it('aponta para o WhatsApp com a mensagem do contexto', () => {
      const url = new URL(renderWhatsAppButton().getAttribute('href') ?? '');

      expect(url.pathname).toBe(`/${siteConfig.contact.whatsapp.e164}`);
      expect(url.searchParams.get('text')).toContain('tenho interesse na maquininha');
    });

    it('abre em nova aba com segurança e avisa no nome acessível', () => {
      const link = renderWhatsAppButton();

      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAccessibleName('Quero minha maquininha (abre em nova aba)');
    });

    it('adiciona os atributos de analytics do whatsapp_click', () => {
      const link = renderWhatsAppButton();

      expect(link).toHaveAttribute('data-analytics-event', 'whatsapp_click');
      expect(link).toHaveAttribute('data-analytics-context', 'pos');
      expect(link).toHaveAttribute('data-analytics-location', 'solutions_pos');
    });
  });

  it('rejeita combinações inválidas em tempo de compilação', () => {
    // Nunca executada: o typecheck falha se alguma dessas combinações passar a compilar.
    const compileOnly = () => (
      <>
        {/* @ts-expect-error WhatsApp sem location do analytics */}
        <Button whatsappContext='general'>Chamar</Button>
        {/* @ts-expect-error location fora do catálogo */}
        <Button whatsappContext='general' analyticsLocation='section'>Chamar</Button>
        {/* @ts-expect-error href e WhatsApp juntos */}
        <Button href='/contato' whatsappContext='general' analyticsLocation='hero'>Chamar</Button>
        {/* @ts-expect-error href externo: o Button só aceita rotas internas */}
        <Button href='https://exemplo.com'>Externo</Button>
      </>
    );

    expect(compileOnly).toBeTypeOf('function');
  });
});
