import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AnalyticsListener } from '@/components/analytics';
import { trackEvent } from '@/lib/analytics';
import { faqOpenAttributes, whatsappClickAttributes } from '@/lib/analytics/attributes';

vi.mock('next/navigation', () => ({ usePathname: () => '/perguntas-frequentes' }));
vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

beforeEach(() => {
  vi.mocked(trackEvent).mockClear();
});

afterEach(() => {
  document.body.innerHTML = '';
});

describe('AnalyticsListener', () => {
  it('registra o clique num link rastreado, com o pathname da página', async () => {
    render(
      <>
        <AnalyticsListener />
        <a href='#whatsapp' {...whatsappClickAttributes('general', 'faq')}>
          <span>WhatsApp</span>
        </a>
      </>,
    );

    await userEvent.click(screen.getByText('WhatsApp'));

    expect(trackEvent).toHaveBeenCalledWith({
      name: 'whatsapp_click',
      properties: { context: 'general', location: 'faq', page: '/perguntas-frequentes' },
    });
  });

  it('ignora cliques sem data-analytics-event', async () => {
    render(
      <>
        <AnalyticsListener />
        <button type='button'>Outro botão</button>
      </>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(trackEvent).not.toHaveBeenCalled();
  });

  it('dispara faq_open ao abrir uma pergunta e não dispara ao fechar', async () => {
    render(
      <>
        <AnalyticsListener />
        <details>
          <summary {...faqOpenAttributes('a-liqpay-e-segura')}>A LiqPay é segura?</summary>
          <p>Resposta</p>
        </details>
      </>,
    );
    const summary = screen.getByText('A LiqPay é segura?');
    const details = summary.closest('details');

    await userEvent.click(summary);
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith({
      name: 'faq_open',
      properties: { question: 'a-liqpay-e-segura' },
    });

    // Garante o estado aberto, mesmo que o jsdom não implemente o toggle do <summary>.
    if (details) {
      details.open = true;
    }
    await userEvent.click(summary);
    expect(trackEvent).toHaveBeenCalledTimes(1);
  });

  it('para de ouvir ao desmontar', async () => {
    const { unmount } = render(<AnalyticsListener />);
    const link = document.createElement('a');
    for (const [name, value] of Object.entries(whatsappClickAttributes('pos', 'hero'))) {
      link.setAttribute(name, value);
    }
    document.body.append(link);

    unmount();
    await userEvent.click(link);

    expect(trackEvent).not.toHaveBeenCalled();
  });
});
