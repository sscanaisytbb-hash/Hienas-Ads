import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Truck,
  Star,
  Check,
  ShoppingBag,
  ChevronRight,
  Award,
  Lock,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { FestiveBackdrop, GoldenBellSvg } from './components/FestiveBackdrop';
import {
  ThreeDoorsWidget,
  getCheckoutUrl,
  trackPixelInitiateCheckout,
} from './components/ThreeDoorsWidget';

type GalleryFocus = 'full' | 'reindeers' | 'tree' | 'bells';

const GALLERY_VIEWS: {
  id: GalleryFocus;
  label: string;
  caption: string;
  imageClass: string;
}[] = [
  {
    id: 'full',
    label: 'Kit Completo',
    caption: '4 Renas Iluminadas LED + Árvore Nevada 1,30m + Sinos Dourados',
    imageClass: 'object-cover object-[50%_38%] scale-105',
  },
  {
    id: 'reindeers',
    label: '4 Renas LED',
    caption: 'Família de 4 Renas em malha dourada LED com laços de veludo',
    imageClass: 'object-cover object-[22%_52%] scale-125',
  },
  {
    id: 'tree',
    label: 'Árvore 1,30m',
    caption: 'Pinheiro Branco Nevado de 1,30m com estrela, laços, bolas e pinhas',
    imageClass: 'object-cover object-[82%_48%] scale-125',
  },
  {
    id: 'bells',
    label: 'Sinos & Laços',
    caption: 'Kit de Sinos Natalinos Dourados, laços duplos e acabamento LED',
    imageClass: 'object-cover object-[50%_25%] scale-110',
  },
];

const INCLUDED_ITEMS = [
  {
    title: 'Família com 4 Renas Iluminadas em LED Branco Quente',
    dims: '1,15m · 0,95m · 2x 0,65m',
    desc: 'Estrutura reforçada anticorrosiva com 420 micro-LEDs de alto brilho e laços de veludo vermelho.',
  },
  {
    title: 'Árvore de Natal Branca Nevada Imperial Completa',
    dims: '1,30 m · 380 Galhos',
    desc: 'Cobertura flocada efeito neve real, base estável e ponteira Estrela de Belém iluminada.',
  },
  {
    title: 'Kit Sinos de Natal Dourados, Laços de Veludo, Pinhas e Bolas',
    dims: '36 Peças Inclusas',
    desc: 'Conjunto completo de sinos natalinos metálicos, bolas vermelhas e douradas, pinhas naturais e festão.',
  },
  {
    title: 'Fonte Bivolt Automática com Proteção Externa IP65',
    dims: '110V / 220V · 8 Funções',
    desc: 'Pode ser instalado no jardim sob chuva ou na sala de estar com baixo consumo de energia.',
  },
];

export default function App() {
  const [activeGallery, setActiveGallery] = useState<GalleryFocus>('full');
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [discountRevealed, setDiscountRevealed] = useState(false);

  const checkoutHref = getCheckoutUrl();

  // Revela o preço de R$ 89,99 no restante da página somente após a animação da porta abrir
  useEffect(() => {
    if (selectedDoor !== null) {
      const timer = setTimeout(() => {
        setDiscountRevealed(true);
      }, 950);
      return () => clearTimeout(timer);
    } else {
      setDiscountRevealed(false);
    }
  }, [selectedDoor]);

  const currentGalleryItem =
    GALLERY_VIEWS.find((v) => v.id === activeGallery) || GALLERY_VIEWS[0];

  const scrollToDoors = () => {
    const el = document.getElementById('portas-premiadas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const testimonials = [
    {
      name: 'Helena Vasconcelos',
      role: 'Arquitetura Residencial · Curitiba, PR',
      outcome: discountRevealed
        ? 'Montagem completa da fachada em 18 minutos com economia de R$ 159,91'
        : 'Montagem completa da fachada em 18 minutos com 75% de desconto na Porta',
      quote: discountRevealed
        ? 'Antes eu gastava mais de R$ 400 comprando renas e árvore separadas. Com esse conjunto de 4 renas e a árvore de 1,30m por R$ 89,99, nossa entrada ficou digna de vitrine e os sinos dourados deram o toque clássico.'
        : 'Antes eu gastava mais de R$ 400 comprando renas e árvore separadas. Abri a porta premiada aqui na página, peguei o cupom de 75% OFF e nossa entrada ficou digna de vitrine com os sinos dourados.',
    },
    {
      name: 'Carlos Eduardo Menezes',
      role: 'Proprietário de Confeitaria · Gramado, RS',
      outcome: '+65% de clientes tirando fotos na entrada da loja na primeira semana',
      quote:
        'Colocamos as 4 renas iluminadas e a árvore branca nevada bem na recepção. O brilho quente do LED chama atenção de longe à noite e a qualidade dos laços e sinos natalinos surpreendeu toda a equipe.',
    },
    {
      name: 'Patrícia Albuquerque',
      role: 'Condomínio Jardim Europa · São Paulo, SP',
      outcome: 'Entregue em 3 dias úteis com todos os 36 adornos e sinos intactos',
      quote: discountRevealed
        ? 'Abri a porta premiada pelo celular, garanti o desconto para R$ 89,99 e comprei 2 kits para o jardim e varanda. As renas têm excelente estabilidade e o efeito nevado da árvore de 1,30m é lindo.'
        : 'Abri a porta premiada pelo celular, acertei a porta de 75% OFF de primeira e comprei 2 kits para o jardim e varanda. As renas têm excelente estabilidade e o efeito nevado da árvore de 1,30m é lindo.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B131E] text-[#F9F6F0] relative pb-20 md:pb-0 selection:bg-[#FFD54A] selection:text-[#0B131E]">
      {/* Neve Suave em Movimento Contínuo */}
      <FestiveBackdrop />

      {/* Top Bar Contract: 3 Zonas Compactas (Altura 54px) */}
      <header className="sticky top-0 z-30 h-14 flex items-center justify-between gap-4 sm:gap-8 px-3.5 sm:px-8 bg-[#0B131E]/92 backdrop-blur-md border-b border-[#C9A24A]/25">
        <a
          href="#"
          className="text-lg sm:text-2xl font-bold tracking-tight text-[#F9F6F0] font-display whitespace-nowrap shrink-0"
        >
          Atelier Natalino
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#conjunto"
            className="hover:text-[#FFD54A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            O Conjunto
          </a>
          <a
            href="#portas-premiadas"
            className="hover:text-[#FFD54A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            3 Portas Premiadas
          </a>
          <a
            href="#especificacoes"
            className="hover:text-[#FFD54A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Especificações
          </a>
          <a
            href="#avaliacoes"
            className="hover:text-[#FFD54A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Avaliações
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          {discountRevealed ? (
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackPixelInitiateCheckout}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-[#0B131E] bg-[#FFD54A] hover:bg-[#f5c838] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-[0_4px_14px_rgba(255,213,74,0.35)]"
            >
              Resgatar · R$ 89,99
            </a>
          ) : (
            <button
              type="button"
              onClick={scrollToDoors}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-[#D42426] hover:bg-[#b81d1f] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer border border-[#FFD54A]/40 shadow-[0_4px_14px_rgba(212,36,38,0.4)]"
            >
              Abrir Porta Premiada
            </button>
          )}
        </div>
      </header>

      {/* Seção Principal Mobile-First: Vitrine + 3 Portas Compactas + Compra */}
      <main id="conjunto" className="relative z-20 max-w-6xl mx-auto px-3.5 sm:px-8 pt-4 sm:pt-8 pb-12">
        {/* Cabeçalho Mobile Compacto com Sinos Animados */}
        <div className="mb-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-xs text-[#E5B94E] font-medium">
            <GoldenBellSvg className="w-5 h-5 animate-bell shrink-0" />
            <span>Especial Natal Iluminado</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-300 font-mono-num">
              <Star className="w-3.5 h-3.5 fill-[#FFD54A] text-[#FFD54A]" />
              4.9 (418 avaliações)
            </span>
          </div>

          <h1 className="mt-1.5 text-2xl sm:text-4xl font-bold text-white leading-tight tracking-tight [text-wrap:balance]">
            Conjunto 4 Renas Iluminadas LED + Árvore Nevada 1,30 m + Sinos de Natal
          </h1>
        </div>

        {/* Grid 2 Colunas no Desktop / Fluxo Direto de Conversão no Celular */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
          {/* Coluna 1: Imagem do Conjunto */}
          <div className="lg:col-span-6 bg-[#101C2C] border border-[#C9A24A]/35 rounded-2xl p-3 sm:p-5 shadow-2xl">
            <div className="relative rounded-xl overflow-hidden bg-[#080F18] aspect-[4/4.6] sm:aspect-[4/4.3] border border-[#C9A24A]/30">
              <img
                src="/assets/aistudio/image_099138c9.png"
                alt="Conjunto com 4 Renas Iluminadas LED + 1 Árvore de 1,30m Natalina"
                referrerPolicy="no-referrer"
                className={`w-full h-full transition-transform duration-500 ease-out ${currentGalleryItem.imageClass}`}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09111B]/95 via-transparent to-black/20" />

              {/* Sinos de Natal animados no topo da imagem */}
              <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-[#0B131E]/85 backdrop-blur-md border border-[#C9A24A]/40 rounded-lg px-2.5 py-1">
                  <GoldenBellSvg className="w-4 h-4 animate-bell" />
                  <span className="text-[11px] font-semibold text-[#FFD54A]">
                    +36 Sinos e Enfeites Inclusos
                  </span>
                </div>
                <span className="bg-[#D42426] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow">
                  {discountRevealed ? '75% OFF ATIVO!' : 'ATÉ 75% OFF'}
                </span>
              </div>

              {/* Placa na Base da Imagem: Esconde o preço de R$ 89,99 antes de abrir a porta! */}
              {!discountRevealed ? (
                <button
                  type="button"
                  onClick={scrollToDoors}
                  className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 bg-gradient-to-r from-[#4A0D13]/95 via-[#6E121A]/95 to-[#4A0D13]/95 backdrop-blur-md border-2 border-[#FFD54A] rounded-xl px-3.5 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.9)] flex items-center justify-between gap-2 text-left cursor-pointer group"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-amber-200 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#FFD54A]" />
                      <span>Preço Tabelado: R$ 249,90</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      Toque em 1 Porta abaixo para revelar seu Desconto!
                    </div>
                  </div>
                  <div className="shrink-0 bg-[#FFD54A] text-[#0B131E] font-extrabold text-xs px-3 py-2 rounded-lg shadow group-hover:scale-105 transition-transform whitespace-nowrap">
                    Abrir Porta ↓
                  </div>
                </button>
              ) : (
                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackPixelInitiateCheckout}
                  className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 bg-gradient-to-r from-[#134E2E]/95 via-[#1B683E]/95 to-[#134E2E]/95 backdrop-blur-md border-2 border-[#FFD54A] rounded-xl px-3.5 py-2.5 sm:py-3 shadow-[0_10px_25px_rgba(0,0,0,0.85)] flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-emerald-200 font-semibold">
                      Prêmio de 75% OFF Desbloqueado!
                    </div>
                    <div className="text-xs text-slate-100">
                      De <s className="text-rose-200 font-mono-num">R$ 249,90</s> por:
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#FFD54A] font-mono-num tracking-tight drop-shadow">
                      R$ 89,99
                    </span>
                    <span className="block text-[10px] text-emerald-200 font-medium">
                      Toque para Resgatar →
                    </span>
                  </div>
                </a>
              )}
            </div>

            {/* Botões de Zoom da Galeria */}
            <div className="mt-3">
              <div className="grid grid-cols-4 gap-1.5">
                {GALLERY_VIEWS.map((view) => (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveGallery(view.id)}
                    className={`min-h-[40px] px-2 py-1.5 text-[11px] font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 truncate cursor-pointer ${
                      activeGallery === view.id
                        ? 'bg-[#C9A24A] text-[#0B131E] border-[#FFD54A] shadow-sm'
                        : 'bg-[#0B131E]/80 text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-slate-300 text-center">
                {currentGalleryItem.caption}
              </p>
            </div>
          </div>

          {/* Coluna 2: Jogo das 3 Portas Pequenas Lado a Lado + Card que Destrava Após Abrir */}
          <div className="lg:col-span-6 space-y-4">
            {/* O Widget das 3 Portas Compacto */}
            <div className="bg-[#101C2C] border-2 border-[#FFD54A]/60 rounded-2xl p-3.5 sm:p-5 shadow-[0_0_30px_rgba(201,162,74,0.18)]">
              <ThreeDoorsWidget
                selectedDoor={selectedDoor}
                onSelectDoor={(index) => setSelectedDoor(index)}
                onResetDoors={() => setSelectedDoor(null)}
              />
            </div>

            {/* Card Abaixo das Portas: ANTES de abrir = Instiga abrir a porta / DEPOIS de abrir = Mostra R$ 89,99 e Link GGCheckout */}
            {!discountRevealed ? (
              <div className="bg-[#101C2C] border border-[#C9A24A]/35 rounded-2xl p-4 sm:p-6 shadow-2xl text-center">
                <div className="w-11 h-11 rounded-full bg-[#FFD54A]/15 border border-[#FFD54A]/40 text-[#FFD54A] flex items-center justify-center mx-auto mb-3">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Seu Desconto de Natal Está Trancado Acima!
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  O valor normal deste conjunto completo é <strong className="text-white font-mono-num">R$ 249,90</strong>, mas se você encontrar a porta premiada acima, leva as <strong>4 Renas Iluminadas LED + Árvore 1,30m + 36 Sinos e Adornos</strong> com <strong className="text-[#FFD54A]">75% de desconto imediato</strong>!
                </p>

                <div className="mt-4 p-3 rounded-xl bg-[#0B131E] border border-dashed border-[#FFD54A]/40 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Preço sem cupom:</span>
                  <span className="font-mono-num font-bold text-slate-300">R$ 249,90</span>
                </div>
                <div className="mt-2 p-3 rounded-xl bg-[#16253A] border border-[#FFD54A]/50 flex items-center justify-between text-xs">
                  <span className="text-[#FFD54A] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Preço na Porta de 75% OFF:
                  </span>
                  <span className="font-mono-num font-bold text-[#FFD54A] bg-[#0B131E] px-2.5 py-1 rounded border border-[#FFD54A]/30">
                    🔒 Toque em 1 Porta Acima
                  </span>
                </div>

                <button
                  type="button"
                  onClick={scrollToDoors}
                  className="mt-4 w-full min-h-[48px] py-3 px-5 rounded-xl bg-gradient-to-r from-[#C9A24A] to-[#A67F27] text-[#0B131E] font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-transform"
                >
                  <KeyRound className="w-4 h-4 shrink-0" />
                  <span>Escolher Minha Porta Agora (Subir ↑)</span>
                </button>
              </div>
            ) : (
              /* Card Desbloqueado após abrir a porta direcionando ao GGCheckout */
              <div className="bg-[#101C2C] border-2 border-emerald-400/60 rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                      ✓ Cupom de 75% OFF Aplicado!
                    </span>
                    <span className="text-xs text-slate-400">
                      De <s className="font-mono-num">R$ 249,90</s> por apenas
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#FFD54A] font-mono-num">
                        R$ 89,99
                      </span>
                      <span className="text-xs text-emerald-400 font-semibold">
                        no PIX ou Cartão
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono-num text-amber-300 font-bold block">
                      Você economiza R$ 159,91
                    </span>
                    <span className="text-[11px] text-slate-300 flex items-center justify-end gap-1 mt-0.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      Frete Grátis
                    </span>
                  </div>
                </div>

                {/* Lista Objetiva dos Itens Inclusos */}
                <ul className="mt-3.5 space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong>4 Renas LED Douradas</strong> (1,15m, 0,95m e 2x 0,65m) com laços de veludo
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong>1 Árvore Branca Nevada 1,30m</strong> completa com 380 galhos
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      <strong>36 Sinos de Natal Dourados</strong>, bolas, pinhas, laços e estrela topo
                    </span>
                  </li>
                </ul>

                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackPixelInitiateCheckout}
                  className="mt-5 w-full min-h-[52px] py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D42426] to-[#A31517] active:scale-[0.99] hover:brightness-110 text-white font-bold text-base shadow-[0_10px_28px_rgba(212,36,38,0.45)] border border-[#FFD54A]/40 flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
                >
                  <ShoppingBag className="w-5 h-5 shrink-0" />
                  <span>Garantir Meu Kit por R$ 89,99</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </a>

                <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Compra Segura GGCheckout
                  </span>
                  <span>·</span>
                  <span>Envio Imediato com Rastreio</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Faixa de Destaques Rápidos */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 sm:p-5 rounded-xl bg-[#101C2C] border border-white/10">
            <div className="text-lg sm:text-2xl font-bold text-[#FFD54A] font-mono-num">
              4 Renas LED
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Malha dourada iluminada com laços vermelhos
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-xl bg-[#101C2C] border border-white/10">
            <div className="text-lg sm:text-2xl font-bold text-[#FFD54A] font-mono-num">
              1,30 Metro
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Árvore Nevada Imperial com estrela iluminada
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-xl bg-[#101C2C] border border-white/10">
            <div className="text-lg sm:text-2xl font-bold text-[#FFD54A] font-mono-num">
              36 Enfeites
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Sinos de Natal dourados, bolas, pinhas e laços
            </div>
          </div>
          <div className="p-3.5 sm:p-5 rounded-xl bg-[#101C2C] border border-white/10">
            <div className="text-lg sm:text-2xl font-bold text-[#FFD54A] font-mono-num">
              IP65 Bivolt
            </div>
            <div className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
              Uso interno e externo resistente à chuva
            </div>
          </div>
        </div>
      </main>

      {/* Seção de Especificações */}
      <section id="especificacoes" className="relative z-20 max-w-6xl mx-auto px-3.5 sm:px-8 py-10 sm:py-16 border-t border-white/10">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E5B94E]">
            O Que Vem na Caixa
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
            Cenário Completo Pronto para Ligar na Tomada
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {INCLUDED_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className="p-4 sm:p-6 rounded-2xl bg-[#101C2C] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#FFD54A] font-mono-num mb-1.5">
                  <span>0{idx + 1}. INCLUSO NO KIT</span>
                  <span>{item.dims}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Avaliações de Clientes */}
      <section id="avaliacoes" className="relative z-20 bg-[#0D1726] border-t border-white/10 py-10 sm:py-16 px-3.5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E5B94E]">
                Avaliações Reais
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight [text-wrap:balance]">
                Quem Já Abriu a Porta e Recebeu o Kit
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Award className="w-5 h-5 text-[#FFD54A] shrink-0" />
              <span className="font-bold text-white font-mono-num">
                4.9/5 · 418 entregas verificadas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="p-4 sm:p-6 rounded-2xl bg-[#111E30] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FFD54A] mb-2">
                    <Star className="w-3.5 h-3.5 fill-[#FFD54A]" />
                    <Star className="w-3.5 h-3.5 fill-[#FFD54A]" />
                    <Star className="w-3.5 h-3.5 fill-[#FFD54A]" />
                    <Star className="w-3.5 h-3.5 fill-[#FFD54A]" />
                    <Star className="w-3.5 h-3.5 fill-[#FFD54A]" />
                  </div>
                  <p className="text-xs font-semibold text-emerald-400 mb-1.5">{t.outcome}</p>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">“{t.quote}”</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-slate-400">{t.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="relative z-20 border-t border-white/10 bg-[#080E17] py-8 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-bold text-white">Atelier Natalino Decor</span> · Conjunto 4 Renas LED + Árvore 1,30m
          </div>
          <div className="flex items-center gap-5">
            <a href="#conjunto" className="hover:text-white transition-colors">
              Topo
            </a>
            <a href="#portas-premiadas" className="hover:text-white transition-colors">
              3 Portas Premiadas
            </a>
            {discountRevealed ? (
              <a
                href={checkoutHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackPixelInitiateCheckout}
                className="text-[#FFD54A] font-semibold hover:underline cursor-pointer"
              >
                Resgatar por R$ 89,99
              </a>
            ) : (
              <button
                type="button"
                onClick={scrollToDoors}
                className="text-[#FFD54A] font-semibold hover:underline cursor-pointer"
              >
                Destravar Desconto nas Portas
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Barra Fixa Inferior para Celular (Muda antes vs depois de abrir a porta) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 px-3.5 bg-[#0B131E]/95 backdrop-blur-md border-t border-[#C9A24A]/35 flex items-center justify-between gap-3">
        {!discountRevealed ? (
          <>
            <div>
              <div className="text-[10px] text-slate-400 leading-none">
                Tabelado: <span className="font-mono-num text-slate-200">R$ 249,90</span>
              </div>
              <div className="text-xs font-bold text-[#FFD54A] leading-tight mt-0.5">
                🔒 Abra 1 porta para até 75% OFF
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToDoors}
              className="h-10 px-4 rounded-lg bg-gradient-to-r from-[#C9A24A] to-[#A67F27] text-[#0B131E] font-extrabold text-xs flex items-center gap-1.5 shadow-lg whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <KeyRound className="w-3.5 h-3.5 shrink-0" />
              <span>Escolher Porta</span>
            </button>
          </>
        ) : (
          <>
            <div>
              <div className="text-[10px] text-slate-400 leading-none">
                De <s className="font-mono-num">R$ 249,90</s> por
              </div>
              <div className="text-lg font-extrabold text-[#FFD54A] font-mono-num leading-tight">
                R$ 89,99 <span className="text-[10px] font-normal text-emerald-400">75% OFF</span>
              </div>
            </div>

            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackPixelInitiateCheckout}
              className="h-10 px-4 rounded-lg bg-gradient-to-r from-[#D42426] to-[#A31517] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg border border-[#FFD54A]/40 whitespace-nowrap shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Resgatar Oferta</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
