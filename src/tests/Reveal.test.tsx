import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import { Reveal, RevealObserver, Stagger } from '@/components/motion';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

type ObserverCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

let observerCallback: ObserverCallback;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class FakeIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback;
  }

  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
}

function enterViewport(element: Element) {
  observerCallback([{ target: element, isIntersecting: true }]);
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
  observe.mockClear();
  unobserve.mockClear();
  disconnect.mockClear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Reveal', () => {
  it('mantém o conteúdo no HTML, marcado com o efeito (visível sem JavaScript)', () => {
    render(<Reveal effect='fadeInScale'>Conteúdo</Reveal>);
    const block = screen.getByText('Conteúdo');

    expect(block).toHaveAttribute('data-reveal', 'fadeInScale');
    expect(block).not.toHaveAttribute('data-revealed');
  });

  it('aplica o atraso como custom property', () => {
    render(<Reveal delay={200}>Conteúdo</Reveal>);

    expect(screen.getByText('Conteúdo').style.getPropertyValue('--reveal-delay')).toBe('200ms');
  });

  it('marca o bloco como revelado ao entrar na tela e para de observá-lo', () => {
    render(
      <>
        <Reveal>Conteúdo</Reveal>
        <RevealObserver />
      </>,
    );
    const block = screen.getByText('Conteúdo');

    expect(observe).toHaveBeenCalledWith(block);

    enterViewport(block);

    expect(block).toHaveAttribute('data-revealed');
    expect(unobserve).toHaveBeenCalledWith(block);
  });

  it('não revela o que ainda não entrou na tela', () => {
    render(
      <>
        <Reveal>Conteúdo</Reveal>
        <RevealObserver />
      </>,
    );
    const block = screen.getByText('Conteúdo');

    observerCallback([{ target: block, isIntersecting: false }]);

    expect(block).not.toHaveAttribute('data-revealed');
  });

  it('libera a imagem dentro do reveal quando ela termina de carregar', () => {
    render(
      <>
        <Reveal>
          <Image src='/imagem.webp' alt='Maquininha' width={400} height={300} />
        </Reveal>
        <RevealObserver />
      </>,
    );
    const image = screen.getByAltText('Maquininha');

    expect(image).not.toHaveAttribute('data-loaded');

    image.dispatchEvent(new Event('load'));

    expect(image).toHaveAttribute('data-loaded');
  });

  it('desconecta o observer ao desmontar', () => {
    const { unmount } = render(<RevealObserver />);

    unmount();

    expect(disconnect).toHaveBeenCalled();
  });
});

describe('Stagger', () => {
  it('marca o contêiner para que os filhos entrem em sequência', () => {
    render(
      <Stagger as='ul'>
        <li>Item</li>
      </Stagger>,
    );
    const list = screen.getByRole('list');

    expect(list).toHaveAttribute('data-reveal', 'fadeInUp');
    expect(list).toHaveAttribute('data-stagger');
  });
});
