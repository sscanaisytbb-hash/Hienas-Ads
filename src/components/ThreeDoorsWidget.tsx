import React from 'react';
import { Gift, Sparkles, RotateCcw, Lock, Unlock } from 'lucide-react';
import { GoldenBellSvg } from './FestiveBackdrop';

export const BASE_CHECKOUT_URL = 'https://ggcheckout.app/checkout/v5/pCvAzuhWX2EOjNcmVlOv4Y';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function getCheckoutUrl(): string {
  if (typeof window === 'undefined') return BASE_CHECKOUT_URL;
  const search = window.location.search;
  if (!search) return BASE_CHECKOUT_URL;
  const separator = BASE_CHECKOUT_URL.includes('?') ? '&' : '?';
  return `${BASE_CHECKOUT_URL}${separator}${search.slice(1)}`;
}

export function trackPixelDoorUnlock(doorIndex: number): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: `Porta 0${doorIndex + 1} Premiada - Conjunto 4 Renas + Arvore 1,30m`,
      content_type: 'product',
      value: 89.99,
      currency: 'BRL',
    });
  }
}

export function trackPixelInitiateCheckout(): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: 'Conjunto 4 Renas Iluminadas LED + Arvore 1,30m',
      content_type: 'product',
      value: 89.99,
      currency: 'BRL',
    });
  }
}

interface ThreeDoorsWidgetProps {
  selectedDoor: number | null;
  onSelectDoor: (doorIndex: number) => void;
  onResetDoors: () => void;
}

export const ThreeDoorsWidget: React.FC<ThreeDoorsWidgetProps> = ({
  selectedDoor,
  onSelectDoor,
  onResetDoors,
}) => {
  const checkoutHref = getCheckoutUrl();

  const handleDoorSelection = (index: number) => {
    trackPixelDoorUnlock(index);
    onSelectDoor(index);
  };

  return (
    <div id="portas-premiadas" className="w-full">
      {/* Cabeçalho Instigante Antes de Abrir a Porta */}
      <div className="mb-3 text-center">
        {selectedDoor === null ? (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD54A] animate-float-slow">
            <Lock className="w-3.5 h-3.5 text-[#D42426]" />
            <span>DESAFIO DE NATAL: 1 ÚNICA TENTATIVA POR VISITANTE!</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <Unlock className="w-3.5 h-3.5" />
            <span>PORTA 0{selectedDoor + 1} DESBLOQUEADA COM SUCESSO!</span>
          </div>
        )}
      </div>

      {/* Widget Compacto das 3 Portas Lado a Lado */}
      <div className="pd-wrap">
        <h2 className="pd-title flex items-center justify-center gap-2">
          <GoldenBellSvg className="w-5 h-5 animate-bell shrink-0" />
          {selectedDoor === null ? (
            <span>
              Uma porta guarda <span>75% OFF</span> secreto! Qual você escolhe?
            </span>
          ) : (
            <span>
              Você encontrou a porta com <span>75% OFF</span>!
            </span>
          )}
          <GoldenBellSvg className="w-5 h-5 animate-bell-delayed shrink-0" />
        </h2>

        <div className="pd-container">
          <input
            type="radio"
            name="pd-door"
            id="pd-r0"
            className="pd-radio"
            checked={selectedDoor === 0}
            onChange={() => handleDoorSelection(0)}
          />
          <input
            type="radio"
            name="pd-door"
            id="pd-r1"
            className="pd-radio"
            checked={selectedDoor === 1}
            onChange={() => handleDoorSelection(1)}
          />
          <input
            type="radio"
            name="pd-door"
            id="pd-r2"
            className="pd-radio"
            checked={selectedDoor === 2}
            onChange={() => handleDoorSelection(2)}
          />

          {/* Porta 1 — Dourada */}
          <label htmlFor="pd-r0" className="pd-door group" data-index="0">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <GoldenBellSvg className="w-5 h-5 animate-bell" />
            </div>
            <span className="pd-door-frame">
              <span className="pd-door-inside">
                <span className="pd-percent"></span>
                <span className="pd-subtext"></span>
              </span>
              <span className="pd-door-panel">
                <svg viewBox="0 0 120 200" preserveAspectRatio="none">
                  <rect x="2" y="2" width="116" height="196" rx="10" stroke="#00000033" strokeWidth="2" />
                  <rect x="14" y="16" width="92" height="72" rx="4" fill="#00000018" stroke="#ffffff33" strokeWidth="2" />
                  <rect x="14" y="100" width="92" height="84" rx="4" fill="#00000018" stroke="#ffffff33" strokeWidth="2" />
                  <circle cx="60" cy="52" r="16" fill="none" stroke="#1E5631" strokeWidth="6" />
                  <circle cx="60" cy="36" r="3.5" fill="#D42426" />
                  <text x="60" y="148" textAnchor="middle" fill="#fff6d8" fontSize="26" fontWeight="bold" opacity="0.85">?</text>
                  <circle cx="102" cy="102" r="5" fill="#ffe9a8" stroke="#00000033" strokeWidth="1" />
                </svg>
              </span>
            </span>
            <span className="block text-center mt-1.5 text-[11px] font-bold tracking-wide uppercase text-[#FFD54A] whitespace-nowrap">
              {selectedDoor === null ? 'Abrir Porta 1' : 'Porta 1'}
            </span>
          </label>

          {/* Porta 2 — Pinheiro */}
          <label htmlFor="pd-r1" className="pd-door group" data-index="1">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <GoldenBellSvg className="w-5 h-5 animate-bell-delayed" />
            </div>
            <span className="pd-door-frame">
              <span className="pd-door-inside">
                <span className="pd-percent"></span>
                <span className="pd-subtext"></span>
              </span>
              <span className="pd-door-panel">
                <svg viewBox="0 0 120 200" preserveAspectRatio="none">
                  <rect x="2" y="2" width="116" height="196" rx="10" stroke="#00000033" strokeWidth="2" />
                  <rect x="14" y="16" width="92" height="72" rx="4" fill="#00000018" stroke="#ffffff33" strokeWidth="2" />
                  <rect x="14" y="100" width="92" height="84" rx="4" fill="#00000018" stroke="#ffffff33" strokeWidth="2" />
                  <circle cx="60" cy="52" r="16" fill="none" stroke="#C9A24A" strokeWidth="5" />
                  <circle cx="60" cy="36" r="3.5" fill="#D42426" />
                  <text x="60" y="148" textAnchor="middle" fill="#fff6d8" fontSize="26" fontWeight="bold" opacity="0.85">?</text>
                  <circle cx="102" cy="102" r="5" fill="#ffe9a8" stroke="#00000033" strokeWidth="1" />
                </svg>
              </span>
            </span>
            <span className="block text-center mt-1.5 text-[11px] font-bold tracking-wide uppercase text-emerald-300 whitespace-nowrap">
              {selectedDoor === null ? 'Abrir Porta 2' : 'Porta 2'}
            </span>
          </label>

          {/* Porta 3 — Carmim */}
          <label htmlFor="pd-r2" className="pd-door group" data-index="2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <GoldenBellSvg className="w-5 h-5 animate-bell" />
            </div>
            <span className="pd-door-frame">
              <span className="pd-door-inside">
                <span className="pd-percent"></span>
                <span className="pd-subtext"></span>
              </span>
              <span className="pd-door-panel">
                <svg viewBox="0 0 120 200" preserveAspectRatio="none">
                  <rect x="2" y="2" width="116" height="196" rx="10" stroke="#00000033" strokeWidth="2" />
                  <rect x="14" y="16" width="92" height="72" rx="4" fill="#00000018" stroke="#ffffff33" strokeWidth="2" />
                  <rect x="14" y="100" width="92" height="84" rx="4" fill="#00000018" stroke="#ffffff33" strokeWidth="2" />
                  <circle cx="60" cy="52" r="16" fill="none" stroke="#1E5631" strokeWidth="6" />
                  <circle cx="60" cy="36" r="3.5" fill="#FFD54A" />
                  <text x="60" y="148" textAnchor="middle" fill="#fff6d8" fontSize="26" fontWeight="bold" opacity="0.85">?</text>
                  <circle cx="102" cy="102" r="5" fill="#ffe9a8" stroke="#00000033" strokeWidth="1" />
                </svg>
              </span>
            </span>
            <span className="block text-center mt-1.5 text-[11px] font-bold tracking-wide uppercase text-rose-300 whitespace-nowrap">
              {selectedDoor === null ? 'Abrir Porta 3' : 'Porta 3'}
            </span>
          </label>
        </div>

        {/* Popup de Desbloqueio Automático que leva direto ao GGCheckout com disparo do Pixel */}
        <div className="pd-popup">
          <div className="pd-card">
            <div className="pd-check">✓</div>
            <h3>Incrível! Você achou a porta de 75% OFF!</h3>
            <p className="text-[11px] text-amber-200/90 mt-0.5">
              4 Renas LED + Árvore 1,30m + Sinos de Natal
            </p>
            <div className="pd-price">
              De <s>R$ 249,90</s> por <strong>R$ 89,99</strong>
            </div>
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackPixelInitiateCheckout}
              className="pd-cta w-full min-h-[44px]"
            >
              <Gift className="w-4 h-4 shrink-0" />
              <span>Resgatar Meu Kit por R$ 89,99</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé de status discreto abaixo das portas */}
      <div className="mt-3 flex items-center justify-between gap-2 px-1 text-[11px] text-slate-400">
        <span className="flex items-center gap-1 truncate">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD54A] shrink-0" />
          <span className="truncate">
            {selectedDoor !== null
              ? `Prêmio máximo desbloqueado na Porta ${selectedDoor + 1}!`
              : 'Toque em uma das 3 portas acima para revelar seu desconto'}
          </span>
        </span>

        {selectedDoor !== null && (
          <button
            type="button"
            onClick={onResetDoors}
            className="inline-flex items-center gap-1 text-amber-300/80 hover:text-amber-200 font-medium cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Ver portas</span>
          </button>
        )}
      </div>
    </div>
  );
};
