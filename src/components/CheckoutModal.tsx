import React, { useState } from 'react';
import { X, ShieldCheck, Truck, CheckCircle2, Copy, Check, Plus, Minus, Sparkles } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedDoor: number | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  unlockedDoor,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [includeExtraBells, setIncludeExtraBells] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);

  if (!isOpen) return null;

  const baseUnitOriginal = 249.90;
  const baseUnitPromo = 89.99;
  const extraBellsPrice = 19.90;

  const subtotalOriginal = baseUnitOriginal * quantity + (includeExtraBells ? 49.90 : 0);
  const totalPromo = baseUnitPromo * quantity + (includeExtraBells ? extraBellsPrice : 0);
  const totalSavings = subtotalOriginal - totalPromo;

  const formatBRL = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !cep.trim()) return;
    setOrderCompleted(true);
  };

  const pixPayload =
    '00020126580014BR.GOV.BCB.PIX0136atelier-natalino-oficial-2026520400005303986540589.995802BR5924ATELIER NATALINO DECOR6009SAO PAULO62070503***6304E2A9';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0F1928] border-l border-[#C9A24A]/30 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between text-[#F9F6F0] shadow-2xl">
        <div>
          {/* Topo do Drawer */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div>
              <span className="text-xs font-medium text-[#FFD54A] uppercase tracking-wider">
                {unlockedDoor !== null
                  ? `Porta 0${unlockedDoor + 1} Premiada · 75% OFF Aplicado`
                  : 'Oferta Especial de Natal · 75% OFF Ativo'}
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                Finalizar Pedido com Desconto
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!orderCompleted ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Resumo do Produto Principal */}
              <div className="p-4 rounded-xl bg-[#162336] border border-[#C9A24A]/30 flex gap-4 items-center">
                <img
                  src="/assets/aistudio/image_099138c9.png"
                  alt="Conjunto com 4 Renas Iluminadas + 1 Árvore de 1,30m"
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover rounded-lg border border-[#C9A24A]/40 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Conjunto 4 Renas LED + Árvore Nevada 1,30m + Kit Sinos de Natal
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Inclui laços vermelhos de veludo, estrela de topo, bolas, pinhas e sinos dourados.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs line-through text-slate-400 font-mono-num">
                        R$ 249,90
                      </span>
                      <span className="text-base font-bold text-[#FFD54A] font-mono-num">
                        R$ 89,99
                      </span>
                    </div>

                    {/* Controle de Quantidade */}
                    <div className="flex items-center gap-2 bg-[#0B131E] border border-white/15 rounded-lg px-2 py-1">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-1 text-slate-300 hover:text-white cursor-pointer"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold font-mono-num w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                        className="p-1 text-slate-300 hover:text-white cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Bump Natalino (Sinos Dourados Extras) */}
              <label className="block p-4 rounded-xl bg-[#132030] border border-dashed border-[#FFD54A]/40 cursor-pointer hover:bg-[#172639] transition-colors">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={includeExtraBells}
                    onChange={(e) => setIncludeExtraBells(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#D42426] rounded cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-[#FFD54A]">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        ADICIONAR KIT EXTRA 8 SINOS DOURADOS + CASCATA LED
                      </span>
                      <span className="font-mono-num">+ R$ 19,90</span>
                    </div>
                    <p className="text-slate-300 mt-1">
                      Leve mais 8 sinos natalinos metálicos dourados com laço + 10m de pisca-pisca LED branco quente (De R$ 49,90 por R$ 19,90).
                    </p>
                  </div>
                </div>
              </label>

              {/* Dados de Entrega */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  1. Dados para Entrega (Frete Grátis Expresso)
                </h3>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Maria Aparecida Silva"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09101A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FFD54A]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">WhatsApp / Telefone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#09101A] border border-white/15 text-sm text-white font-mono-num focus:outline-none focus:border-[#FFD54A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">CEP *</label>
                    <input
                      type="text"
                      required
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="00000-000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#09101A] border border-white/15 text-sm text-white font-mono-num focus:outline-none focus:border-[#FFD54A]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Endereço Completo com Número *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, Número, Bairro e Cidade"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09101A] border border-white/15 text-sm text-white focus:outline-none focus:border-[#FFD54A]"
                  />
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  2. Forma de Pagamento
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'bg-[#1A2C42] border-[#FFD54A] text-white'
                        : 'bg-[#09101A] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">PIX Imediato</div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      Envio prioritário hoje
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#1A2C42] border-[#FFD54A] text-white'
                        : 'bg-[#09101A] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Cartão de Crédito</div>
                    <div className="text-[11px] text-slate-300 mt-0.5 font-mono-num">
                      Até 12x de R$ 8,99
                    </div>
                  </button>
                </div>
              </div>

              {/* Resumo de Valores */}
              <div className="p-4 rounded-xl bg-[#09101A] border border-white/10 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Valor Original:</span>
                  <span className="line-through font-mono-num">{formatBRL(subtotalOriginal)}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto Porta Premiada (75%):</span>
                  <span className="font-mono-num">- {formatBRL(totalSavings)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Frete Expresso com Seguro:</span>
                  <span className="text-emerald-400 font-semibold">GRÁTIS</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="font-bold text-white">Total a Pagar:</span>
                  <span className="text-2xl font-bold text-[#FFD54A] font-mono-num">
                    {formatBRL(totalPromo)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D42426] to-[#A81618] hover:brightness-110 text-white font-bold text-base shadow-[0_10px_28px_rgba(212,36,38,0.4)] border border-[#FFD54A]/40 transition-all cursor-pointer"
              >
                Concluir Pedido por {formatBRL(totalPromo)}
              </button>
            </form>
          ) : (
            /* Tela de Pedido Confirmado */
            <div className="mt-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-mono-num uppercase tracking-widest text-[#FFD54A]">
                  Pedido #NATAL-8492 Reservado
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Parabéns, {name}! Sua Oferta Está Garantida
                </h3>
                <p className="text-sm text-slate-300 mt-2">
                  Reservamos {quantity}x <strong>Conjunto 4 Renas LED + Árvore 1,30m + Sinos de Natal</strong> pelo valor promocional de <strong className="text-[#FFD54A] font-mono-num">{formatBRL(totalPromo)}</strong> para o CEP <span className="font-mono-num">{cep}</span>.
                </p>
              </div>

              {paymentMethod === 'pix' && (
                <div className="p-4 rounded-xl bg-[#09101A] border border-[#C9A24A]/40 text-left space-y-3">
                  <div className="text-xs font-semibold text-[#FFD54A] uppercase tracking-wider">
                    Código PIX Copia e Cola (Aprovação Imediata):
                  </div>
                  <div className="p-2.5 rounded bg-[#142030] font-mono text-[11px] text-slate-300 break-all select-all">
                    {pixPayload}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPix}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#FFD54A] text-[#0B131E] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#f2c438] transition-colors cursor-pointer"
                  >
                    {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{pixCopied ? 'Código PIX Copiado!' : 'Copiar Código PIX'}</span>
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setOrderCompleted(false);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Voltar para a Página
              </button>
            </div>
          )}
        </div>

        {/* Rodapé de Segurança do Drawer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Garantia Total de 90 Dias
          </span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#FFD54A]" />
            Envio com Código de Rastreio
          </span>
        </div>
      </div>
    </div>
  );
};
