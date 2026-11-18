import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { MobileMenu } from '@/components/layout/MobileMenu';

vi.mock('next/navigation', () => ({ usePathname: vi.fn() }));

const hidePopover = vi.fn();

// O jsdom não implementa a Popover API: só o fechamento programático importa aqui.
beforeEach(() => {
  vi.mocked(usePathname).mockReturnValue('/sobre');
  hidePopover.mockClear();
  Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
    value: hidePopover,
    configurable: true,
  });
});

afterEach(() => {
  Reflect.deleteProperty(HTMLElement.prototype, 'hidePopover');
});

function getPanel() {
  const toggle = screen.getByRole('button', { name: 'Menu' });
  const panelId = toggle.getAttribute('popovertarget') ?? '';
  const panel = document.getElementById(panelId);

  if (!panel) {
    throw new Error('Painel do menu não encontrado');
  }

  return panel;
}

function setPanelState(panel: HTMLElement, newState: 'open' | 'closed') {
  fireEvent(panel, Object.assign(new Event('toggle'), { newState }));
}

describe('MobileMenu', () => {
  it('liga o botão ao painel pelo popover nativo (abre sem JavaScript)', () => {
    render(<MobileMenu />);
    const panel = getPanel();

    expect(panel).toHaveAttribute('popover', 'auto');
    expect(screen.getByRole('button', { name: 'Fechar menu', hidden: true }))
      .toHaveAttribute('popovertargetaction', 'hide');
  });

  it('marca a página atual com aria-current', () => {
    render(<MobileMenu />);

    expect(screen.getByRole('link', { name: 'Sobre', hidden: true }))
      .toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Contato', hidden: true }))
      .not.toHaveAttribute('aria-current');
  });

  it('leva o foco para dentro do painel ao abrir', () => {
    render(<MobileMenu />);

    setPanelState(getPanel(), 'open');

    expect(screen.getByRole('button', { name: 'Fechar menu', hidden: true })).toHaveFocus();
  });

  it('fecha quando o foco sai do painel', () => {
    render(
      <>
        <MobileMenu />
        <button type='button'>Fora do menu</button>
      </>,
    );
    const panel = getPanel();
    setPanelState(panel, 'open');

    fireEvent.focusOut(screen.getByRole('link', { name: 'Sobre', hidden: true }), {
      relatedTarget: screen.getByRole('button', { name: 'Fora do menu' }),
    });

    expect(hidePopover).toHaveBeenCalledTimes(1);
  });

  it('continua aberto quando o foco anda dentro do painel', () => {
    render(<MobileMenu />);
    setPanelState(getPanel(), 'open');

    fireEvent.focusOut(screen.getByRole('link', { name: 'Sobre', hidden: true }), {
      relatedTarget: screen.getByRole('link', { name: 'Contato', hidden: true }),
    });

    expect(hidePopover).not.toHaveBeenCalled();
  });

  it('fecha ao navegar para outra página', () => {
    const { rerender } = render(<MobileMenu />);
    setPanelState(getPanel(), 'open');

    vi.mocked(usePathname).mockReturnValue('/contato');
    rerender(<MobileMenu />);

    expect(hidePopover).toHaveBeenCalledTimes(1);
  });

  it('não tenta fechar um menu que já está fechado', () => {
    const { rerender } = render(<MobileMenu />);

    vi.mocked(usePathname).mockReturnValue('/contato');
    rerender(<MobileMenu />);

    expect(hidePopover).not.toHaveBeenCalled();
  });
});
