'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, type HTMLAttributes } from 'react';
import { WHATSAPP_LINK_SELECTOR } from '@/lib/analytics/attributes';

const ENTRANCE_DELAY_MS = 1500;
const ENTRANCE_SCROLL_RATIO = 0.3;

// O CTA do header fica fora: sempre visível, ele esconderia o botão flutuante para sempre.
const COMPETING_CTA_SELECTOR = `main ${WHATSAPP_LINK_SELECTOR}, footer`;

function hasScrolledPastEntranceRatio() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

  return scrollableHeight > 0 && window.scrollY / scrollableHeight >= ENTRANCE_SCROLL_RATIO;
}

/** `true` depois de 1,5s ou de 30% de rolagem, o que vier primeiro. Não volta a `false`. */
function useEntranceReached() {
  const [isReached, setIsReached] = useState(false);

  useEffect(() => {
    if (isReached) {
      return;
    }

    const reach = () => setIsReached(true);
    const timer = window.setTimeout(reach, ENTRANCE_DELAY_MS);

    function reachOnScroll() {
      if (hasScrolledPastEntranceRatio()) {
        reach();
      }
    }

    window.addEventListener('scroll', reachOnScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', reachOnScroll);
    };
  }, [isReached]);

  return isReached;
}

/** `true` enquanto o rodapé ou algum CTA de WhatsApp do conteúdo estiver na tela. */
function useCompetingCtaVisible() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibleTargets = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          visibleTargets.add(entry.target);
        } else {
          visibleTargets.delete(entry.target);
        }
      }

      setIsVisible(visibleTargets.size > 0);
    });

    document.querySelectorAll(COMPETING_CTA_SELECTOR).forEach((target) => {
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return isVisible;
}

/** Controla quando o botão flutuante aparece, via `data-visible` para o CSS. */
export function WhatsAppFloatFrame(props: Readonly<HTMLAttributes<HTMLDivElement>>) {
  const isEntranceReached = useEntranceReached();
  const isCompetingCtaVisible = useCompetingCtaVisible();
  const isVisible = isEntranceReached && !isCompetingCtaVisible;

  return <div {...props} data-visible={isVisible ? '' : undefined} />;
}
