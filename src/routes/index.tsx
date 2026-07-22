import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Heart, Share2, Camera, ChevronLeft, ChevronRight, Home, User, Layers,
  ShoppingCart, MessageCircle, Star, Box, Copy, Zap, Award, Building2,
  MapPin, Calendar, CheckCircle2, XCircle, ShieldCheck, CreditCard, Truck,
  X, Ticket, BadgePercent, Calculator, Facebook, Youtube, Info, Wallet, Clock,
  Search, SlidersHorizontal, ChevronDown, ImageIcon, Send, Check,
} from "lucide-react";
import iphonePhoto1 from "@/assets/iphone-photo-1.webp.asset.json";
import iphonePhoto2 from "@/assets/iphone-photo-2.webp.asset.json";
import iphonePhoto3 from "@/assets/iphone-photo-3.webp.asset.json";
import olxLogo from "@/assets/olx-logo-clean.png";
import related1 from "@/assets/D_NQ_NP_827775-MLB108006206851_032026-O.webp.asset.json";
import related2 from "@/assets/6d743dd1ee0552aa8fb3ec3144bcc531%20IPHON.jpg";
import sellerAvatar from "@/assets/avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iPhone 13 Pro 256gb - R$ 1.500 | OLX" },
      { name: "description", content: "iPhone 13 Pro 256GB azul, usado em bom estado. Frete grátis, até 10x sem juros." },
    ],
  }),
  component: Index,
});

function Chip({ children, variant = "green" }: { children: React.ReactNode; variant?: "green" | "purple" }) {
  const cls = variant === "green"
    ? "bg-[var(--olx-green-soft)] text-[var(--olx-green-text)]"
    : "bg-[var(--olx-purple-soft)] text-[var(--olx-purple)]";
  return <span className={`${cls} text-xs px-3 py-1.5 rounded-full font-medium`}>{children}</span>;
}

function DetailCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="border border-border rounded-xl p-4">
      <Icon className="w-6 h-6 mb-3 stroke-[1.5]" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

function Index() {
  const [showDelivery, setShowDelivery] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"olx" | "seller">("olx");
  const [showForm, setShowForm] = useState(false);
  const [showDeliveryType, setShowDeliveryType] = useState(false);
  const [showDeliveryDeadline, setShowDeliveryDeadline] = useState(false);
  const [deliveryDeadline, setDeliveryDeadline] = useState<"padrao" | "expressa">("padrao");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const [form, setForm] = useState({
    nome: "", cpf: "", telefone: "", cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "",
  });
  const updateForm = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    const masked = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw;
    setForm((f) => ({ ...f, cep: masked }));
    setCepError("");
    if (raw.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (data.erro) {
          setCepError("CEP não encontrado");
        } else {
          setForm((f) => ({
            ...f,
            rua: data.logradouro || f.rua,
            bairro: data.bairro || f.bairro,
            cidade: data.localidade || f.cidade,
            estado: data.uf || f.estado,
          }));
        }
      } catch {
        setCepError("Erro ao buscar CEP");
      } finally {
        setCepLoading(false);
      }
    }
  };
  const isFormValid = form.nome && form.cpf && form.telefone && form.cep && form.rua && form.numero && form.bairro && form.cidade && form.estado;
  const [showSecurity, setShowSecurity] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [couponCopied, setCouponCopied] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [offerValue, setOfferValue] = useState("");
  const [offerSent, setOfferSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ from: "me" | "seller"; text: string; time: string }[]>([
    { from: "seller", text: "Olá! Obrigada pelo interesse no iPhone 13 Pro 😊", time: "14:32" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== currentPhoto) setCurrentPhoto(idx);
  };

  const copyCoupon = async () => {
    try { await navigator.clipboard.writeText("PROMO20"); } catch { /* noop */ }
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 2000);
  };

  const shareAd = async () => {
    const data = { title: "iPhone 13 Pro 256gb", text: "iPhone 13 Pro 256gb - R$ 1.500 na OLX", url: typeof window !== "undefined" ? window.location.href : "" };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
    } catch { /* user cancelled */ }
  };

  const sendChat = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setChatMessages((m) => [...m, { from: "me", text: t, time }]);
    setChatInput("");
    setTimeout(() => {
      const now2 = new Date();
      const time2 = `${String(now2.getHours()).padStart(2, "0")}:${String(now2.getMinutes()).padStart(2, "0")}`;
      setChatMessages((m) => [...m, { from: "seller", text: "Recebi sua mensagem, respondo em instantes!", time: time2 }]);
    }, 900);
  };

  const submitOffer = () => {
    if (!offerValue) return;
    setOfferSent(true);
    setTimeout(() => { setShowOffer(false); setOfferSent(false); setOfferValue(""); }, 1600);
  };

  const finalizePurchase = () => {
    setShowDeliveryDeadline(false);
    setShowDeliveryType(false);
    setShowDelivery(false);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showChat) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, showChat]);

  useEffect(() => {
    const hidden = localStorage.getItem("olx-security-modal-hidden");
    if (hidden === "true") return;
    const timer = setTimeout(() => setShowSecurity(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10">
        <img src={olxLogo} alt="OLX" className="h-7 w-auto object-contain" />
        <div className="flex items-center gap-4">
          <button onClick={() => setFavorite((f) => !f)} aria-label="Favoritar">
            <Heart className={`w-5 h-5 stroke-[1.5] transition ${favorite ? "fill-red-500 text-red-500" : ""}`} />
          </button>
          <button onClick={shareAd} aria-label="Compartilhar">
            <Share2 className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </header>

      {/* Hero image carousel */}
      <div className="relative bg-muted">
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        >
          {[iphonePhoto1, iphonePhoto2, iphonePhoto3].map((p, i) => (
            <img
              key={i}
              src={p.url}
              alt={`iPhone 13 Pro foto ${i + 1}`}
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover flex-shrink-0 snap-center"
            />
          ))}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" /> {currentPhoto + 1}/3
        </div>
      </div>



      {/* Title + chips */}
      <section className="px-4 pt-5">
        <h1 className="text-2xl font-semibold text-foreground">iPhone 13 Pro 256gb</h1>
        <div className="flex flex-wrap gap-2 mt-4">
          <Chip>Frete grátis</Chip>
          <Chip>Até 10x sem juros</Chip>
          <Chip variant="purple">NuPay em até 24x</Chip>
          <Chip variant="purple">Garantia da OLX</Chip>
        </div>
      </section>

      {/* Price */}
      <section className="px-4 pt-6">
        <p className="text-4xl font-bold text-foreground">R$ 1.500</p>
        <div className="flex items-center gap-1.5 mt-3 flex-wrap">
          <span className="w-9 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white" style={{background:"#32BCAD"}}>PIX</span>
          <span className="w-9 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white" style={{background:"#820AD1"}}>nu</span>
          <span className="w-9 h-7 rounded-md flex items-center justify-center text-[9px] font-bold italic text-white" style={{background:"#1A1F71"}}>VISA</span>
          <span className="w-9 h-7 rounded-md flex items-center justify-center bg-white border border-border">
            <span className="w-3 h-3 rounded-full bg-[#EB001B] -mr-1" />
            <span className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90" />
          </span>
          <span className="w-9 h-7 rounded-md flex items-center justify-center text-[9px] font-bold text-white" style={{background:"#000"}}>elo</span>
          <span className="w-9 h-7 rounded-md flex items-center justify-center text-[8px] font-bold text-white" style={{background:"#A6192E"}}>Hiper</span>
          <span className="w-9 h-7 rounded-md flex items-center justify-center text-[9px] font-bold text-white" style={{background:"#006FCF"}}>AMEX</span>
        </div>
        <p className="text-foreground mt-4 font-medium">10x sem juros de R$ 170,00</p>
        <button className="text-[var(--olx-purple)] font-semibold text-sm mt-2">Mais opções de parcelamento</button>

      </section>

      {/* Actions list */}
      <section className="px-4 pt-6 space-y-4">
        <button onClick={() => setShowOffer(true)} className="flex items-center gap-3 text-[var(--olx-purple)] font-semibold">
          <BadgePercent className="w-5 h-5" /> Fazer oferta
        </button>
        <div className="h-px bg-border" />
        <button className="flex items-center gap-3 text-[var(--olx-purple)] font-semibold">
          <Calculator className="w-5 h-5" /> Simular empréstimo
        </button>
      </section>

      {/* Coupon */}
      <section className="px-4 pt-6">
        <div className="bg-[var(--olx-purple-soft)] rounded-2xl flex overflow-hidden">
          <div className="flex items-start gap-3 p-4 flex-1">
            <Ticket className="w-7 h-7 text-[var(--olx-purple)] shrink-0 mt-0.5 -rotate-12" />
            <div className="text-sm text-foreground">
              <p className="font-bold text-base">R$ 20 OFF</p>
              <p className="mt-1">Copie ou digite <span className="font-bold">PROMO20</span> na etapa de pagamento.</p>
              <p className="text-xs text-muted-foreground mt-2">*Cupons limitados.</p>
            </div>
          </div>
          <button onClick={copyCoupon} className="bg-[var(--olx-purple)] text-white px-6 font-semibold min-w-[92px]">
            {couponCopied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </section>


      {/* Shipping calc */}
      <section className="px-4 pt-6">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Calcule o frete</p>
          <button className="text-[var(--olx-purple)] font-semibold underline text-sm">Não sei meu CEP</button>
        </div>
        <input placeholder="Digite o CEP para ver o frete" className="w-full mt-3 px-4 py-3.5 rounded-xl border border-border text-sm placeholder:text-muted-foreground" />
      </section>

      <div className="h-px bg-border mx-4 mt-8" />

      {/* Description */}
      <section className="px-4 pt-8">
        <h2 className="text-2xl font-semibold">Descrição</h2>
        <p className="mt-5 text-foreground leading-relaxed">
          iPhone 13 Pro com 256GB de armazenamento. Design elegante e desempenho excepcional para todas as suas tarefas e entretenimento.
          <br />COM UM TRINCO APENAS NO VIDRO
        </p>
      </section>

      {/* Details */}
      <section className="px-4 pt-10">
        <h2 className="text-2xl font-semibold mb-5">Detalhes</h2>
        <div className="grid grid-cols-2 gap-3">
          <DetailCard icon={Layers} label="Categoria" value="Celulares E Smartphones" />
          <DetailCard icon={Award} label="Marca" value="Apple" />
          <DetailCard icon={Layers} label="Modelo" value="Iphone 13 Pro" />
          <DetailCard icon={Star} label="Condição" value="Usado - Bom" />
          <DetailCard icon={Box} label="Memória interna" value="256gb" />
          <DetailCard icon={Copy} label="Cor" value="Azul" />
          <DetailCard icon={Zap} label="Saúde da bateria" value="Ok (60% Até 79%)" />
          <DetailCard icon={Layers} label="Aceita trocas" value="Não" />
        </div>
      </section>

      <div className="h-px bg-border mx-4 mt-10" />

      {/* Location */}
      <section className="px-4 pt-8">
        <h2 className="text-2xl font-semibold">Localização</h2>
        <div className="flex items-center gap-4 mt-5">
          <div className="w-14 h-14 rounded-full bg-[var(--olx-purple-soft)] flex items-center justify-center shrink-0">
            <Building2 className="w-7 h-7 text-[var(--olx-purple)]" />
          </div>
          <div>
            <p className="font-semibold">Coroa do Meio</p>
            <p className="text-muted-foreground text-sm">Aracaju, SE, 49035480</p>
          </div>
        </div>
      </section>

      <div className="h-px bg-border mx-4 mt-8" />

      {/* Related */}
      <section className="pt-8">
        <h2 className="text-2xl font-semibold px-4">Também podem te interessar</h2>
        <div className="flex gap-4 overflow-x-auto px-4 pt-5 pb-2">
          {[
            { img: related1, title: "IPHONE 13 PRO MAX", price: "R$ 2200" },
            { img: related2, title: "IPHONE 13 128GB ÚNICA DONA", price: "R$ 2350" },
          ].map((p, i) => (
            <div key={i} className="min-w-[240px] max-w-[240px]">
              <div className="relative">
                <img src={p.img} alt={p.title} width={1024} height={1024} loading="lazy" className="w-full h-56 object-cover rounded-xl" />
                <button className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <p className="font-semibold mt-3 text-sm">{p.title}</p>
              <div className="mt-2"><Chip>Frete grátis</Chip></div>
              <p className="font-bold mt-2">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seller */}
      <section className="px-4 pt-10">
        <h2 className="text-2xl font-semibold">Sobre o anunciante</h2>
        <div className="border border-border rounded-2xl p-4 mt-5">
          <div className="bg-[var(--olx-purple-soft)] rounded-xl p-4 relative">
            <span className="inline-block text-xs font-bold text-white px-3 py-1 rounded-full" style={{background:"linear-gradient(90deg,#a855f7,#ec4899)"}}>Novo</span>
            <button className="absolute top-3 right-3"><X className="w-4 h-4" /></button>
            <p className="mt-3 text-foreground">Esta conta passou por um processo de validação de identidade</p>
            <button className="text-[var(--olx-purple)] font-semibold mt-3">Saiba mais</button>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <img src={sellerAvatar} alt="bruna rodrigues." width={1024} height={1024} loading="lazy" className="w-20 h-20 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                Conta verificada <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />
              </div>
              <p className="text-2xl font-bold mt-1">b.rodrigues.</p>
              <p className="text-muted-foreground text-sm">Último acesso há 8 minutos</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="text-center mb-2">
              <span className="bg-[var(--olx-green-soft)] text-[var(--olx-green-text)] text-sm px-3 py-1 rounded-full">Avançado</span>
            </div>
            <div className="flex items-center gap-1">
              {[0.7,0.6,0.6,1].map((o,i) => (
                <div key={i} className="h-2 flex-1 rounded-full" style={{background:`color-mix(in oklab, var(--olx-purple) ${o*100}%, white)`}} />
              ))}
              <div className="h-2 flex-1 rounded-full bg-muted" />
              <Award className="w-5 h-5 ml-1 text-muted-foreground" />
            </div>
          </div>
          <div className="mt-6 space-y-3 text-foreground">
            <p className="flex items-center gap-3"><Calendar className="w-5 h-5" /> Na OLX desde janeiro de 2022</p>
            <p className="flex items-center gap-3"><MapPin className="w-5 h-5" /> Coroa do Meio, Aracaju - SE</p>
          </div>
          <button onClick={() => setShowProfile(true)} className="w-full mt-6 border border-foreground rounded-full py-3 font-semibold">Acessar perfil do anunciante</button>

          <div className="h-px bg-border my-6" />

          <h3 className="text-xl font-semibold">Histórico de vendas</h3>
          <div className="flex gap-1 mt-3">
            {[0,1,2,3,4].map(i => <Star key={i} className="w-7 h-7 text-muted-foreground" />)}
          </div>
          <p className="text-muted-foreground mt-2">Este anunciante ainda não possui avaliações</p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-6 h-6 text-[var(--olx-green-text)]" /><span className="text-xl">00</span></div>
              <p className="text-sm text-muted-foreground mt-1">Vendas concluídas</p>
            </div>
            <div>
              <div className="flex items-center gap-2"><XCircle className="w-6 h-6 text-red-500" /><span className="text-xl">00</span></div>
              <p className="text-sm text-muted-foreground mt-1">Vendas canceladas</p>
            </div>
          </div>

          <div className="h-px bg-border my-6" />

          <h3 className="text-xl font-semibold">Informações verificadas</h3>
          <ul className="mt-4 space-y-3">
            {["E-mail","Telefone","Identidade","Facebook"].map(l => (
              <li key={l} className="flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-[var(--olx-green-text)]" /> {l}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offers */}
      <section className="px-4 pt-10">
        <h2 className="text-2xl font-semibold">Este anúncio oferece</h2>
        <div className="border border-border rounded-2xl p-5 mt-5 space-y-6">
          <div className="flex gap-4">
            <ShieldCheck className="w-7 h-7 shrink-0" />
            <div>
              <p className="font-semibold">Garantia da OLX</p>
              <p className="text-foreground mt-1">Pague online e receba o que comprou ou a OLX devolve seu dinheiro.</p>
              <button className="text-[var(--olx-purple)] font-semibold underline mt-2">Saiba mais</button>
            </div>
          </div>
          <div className="flex gap-4">
            <CreditCard className="w-7 h-7 shrink-0" />
            <div>
              <p className="font-semibold">Parcelamento sem juros</p>
              <p className="text-foreground mt-1">Parcele suas compras sem juros no cartão de crédito.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Truck className="w-7 h-7 shrink-0" />
            <div>
              <p className="font-semibold">Entrega fácil</p>
              <p className="text-foreground mt-1">Receba ou retire seu produto onde quiser com segurança.</p>
              <button className="text-[var(--olx-purple)] font-semibold mt-2">Saiba mais</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 bg-muted px-4 py-10">
        <ul className="flex flex-col items-center gap-5 text-foreground">
          {["Ajuda","Dicas de segurança","Termos de uso","Política de privacidade","Propriedade intelectual","Mapa do site","Trabalhe conosco","Grupo OLX","ZAP imóveis","Viva Real"].map(l => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <div className="h-px bg-border my-6" />
        <p className="italic text-center text-foreground">© Bom Negócio Atividades de Internet Ltda. - Rua do Catete, 359, Flamengo - 22220-001 - Rio de Janeiro, RJ</p>
        <div className="flex justify-center gap-8 mt-6">
          <Facebook className="w-7 h-7" />
          <Youtube className="w-7 h-7" />
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a5.58 5.58 0 1 0 5.85 5.82v-5.85a7.7 7.7 0 0 0 4.54-1.88z" /></svg>
        </div>
      </footer>

      {/* Sticky bottom actions */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border z-20">
        <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-2">
          <button onClick={() => setShowDelivery(true)} className="bg-[var(--olx-orange)] text-white font-semibold rounded-full py-3.5 flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Comprar
          </button>
          <button onClick={() => setShowChat(true)} className="bg-[var(--olx-orange-soft)] text-[var(--olx-orange)] font-semibold rounded-full py-3.5 flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Chat
          </button>
        </div>
        <div className="bg-muted text-center text-muted-foreground text-sm py-3 mx-4 mt-1 rounded">publicidade</div>
      </div>

      {showDelivery && !showDeliveryType && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto">
          <button onClick={() => setShowDelivery(false)} className="p-5 self-start">
            <X className="w-7 h-7" />
          </button>
          <div className="px-6 pb-6 flex-1">
            <h1 className="text-3xl font-bold text-foreground leading-tight">Como você quer receber o produto?</h1>

            <button
              onClick={() => setDeliveryOption("olx")}
              className={`relative w-full mt-8 rounded-2xl border-2 text-left transition ${deliveryOption === "olx" ? "border-[var(--olx-purple)]" : "border-border"}`}
            >
              <span className="absolute -top-3 left-5 bg-[var(--olx-purple-soft)] text-[var(--olx-purple)] text-xs font-semibold px-3 py-1 rounded-md">Recomendado</span>
              <div className="p-5 flex items-start gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-[var(--olx-purple-soft)] flex items-center justify-center text-4xl">🚚</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-lg text-foreground">Entrega pela OLX</p>
                  {form.rua ? (
                    <>
                      <p className="text-muted-foreground mt-1">{form.rua}, {form.numero}</p>
                      <p className="text-muted-foreground">{form.bairro}, {form.cidade} - {form.estado}</p>
                    </>
                  ) : (
                    <p className="text-muted-foreground mt-1 italic">Nenhum endereço cadastrado</p>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${deliveryOption === "olx" ? "border-[var(--olx-purple)]" : "border-muted-foreground"}`}>
                  {deliveryOption === "olx" && <div className="w-3.5 h-3.5 rounded-full bg-[var(--olx-purple)]" />}
                </div>
              </div>
              <div className="h-px bg-border mx-5" />
              <p onClick={(e) => { e.stopPropagation(); setShowForm(true); }} className="text-[var(--olx-purple)] font-semibold px-5 py-4 cursor-pointer">
                {form.rua ? "Alterar endereço" : "Cadastrar endereço"}
              </p>
            </button>

            <button
              onClick={() => setDeliveryOption("seller")}
              className={`w-full mt-6 rounded-2xl border-2 text-left transition ${deliveryOption === "seller" ? "border-[var(--olx-purple)]" : "border-border"}`}
            >
              <div className="p-5 flex items-start gap-4">
                <div className="w-20 h-20 shrink-0 rounded-full bg-[var(--olx-purple)] flex items-center justify-center text-4xl">🤝</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-lg text-foreground">Retirar com vendedor</p>
                  <p className="text-muted-foreground mt-1">Combine diretamente com ele através do chat da OLX.</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${deliveryOption === "seller" ? "border-[var(--olx-purple)]" : "border-muted-foreground"}`}>
                  {deliveryOption === "seller" && <div className="w-3.5 h-3.5 rounded-full bg-[var(--olx-purple)]" />}
                </div>
              </div>
              <div className="h-px bg-border mx-5" />
              <p className="flex items-center gap-2 text-foreground px-5 py-4">
                <MapPin className="w-5 h-5" /> Coroa do Meio, Aracaju - SE
              </p>
            </button>

            <div className="mt-6 rounded-2xl bg-sky-50 p-5 flex gap-3">
              <Info className="w-6 h-6 text-sky-600 shrink-0" />
              <div className="text-sky-800">
                <p className="font-bold">Envio do produto</p>
                <p className="mt-2 leading-relaxed">O vendedor tem 5 dias para fazer o envio após o pagamento ser confirmado. Se esse prazo não for cumprido, você poderá cancelar a compra e o dinheiro será devolvido.</p>
              </div>
            </div>

            <div className="mt-8 flex gap-1">
              <div className="h-1.5 w-24 bg-[var(--olx-purple)] rounded-full" />
              <div className="h-1.5 flex-1 bg-muted rounded-full" />
            </div>
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-4 flex justify-end border-t border-border">
            <button
              disabled={deliveryOption === "olx" && !form.rua}
              onClick={() => setShowDeliveryType(true)}
              className="bg-[var(--olx-orange)] disabled:opacity-50 text-white font-semibold rounded-full px-10 py-3.5"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {showDeliveryType && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto">
          <button onClick={() => setShowDeliveryType(false)} className="p-5 self-start">
            <X className="w-7 h-7" />
          </button>
          <div className="px-6 pb-6 flex-1">
            <h1 className="text-3xl font-bold text-foreground leading-tight">Escolha o tipo de entrega</h1>

            <div className="mt-8 rounded-2xl border border-border p-5 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-foreground shrink-0 mt-0.5" />
              <div className="text-foreground text-sm leading-relaxed">
                {form.rua ? (
                  <>
                    {form.rua},{form.numero}{form.complemento ? `,${form.complemento}` : ""},{form.bairro},{form.cidade}-{form.estado}
                  </>
                ) : (
                  "Nenhum endereço cadastrado"
                )}
                <button onClick={() => { setShowDeliveryType(false); setShowForm(true); }} className="text-[var(--olx-purple)] font-semibold ml-1 underline">
                  Mudar endereço
                </button>
              </div>
            </div>

            <button
              onClick={() => setDeliveryOption("olx")}
              className={`relative w-full mt-6 rounded-2xl border-2 text-left transition ${deliveryOption === "olx" ? "border-[var(--olx-purple)]" : "border-border"}`}
            >
              <div className="p-5 flex items-start gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-[var(--olx-purple-soft)] flex items-center justify-center text-4xl">🏠</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-lg text-foreground">Entrega no endereço</p>
                  <p className="text-muted-foreground mt-1">Receba o produto no endereço que você escolheu.</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${deliveryOption === "olx" ? "border-[var(--olx-purple)]" : "border-muted-foreground"}`}>
                  {deliveryOption === "olx" && <div className="w-3.5 h-3.5 rounded-full bg-[var(--olx-purple)]" />}
                </div>
              </div>
            </button>

            <button
              onClick={() => setDeliveryOption("seller")}
              className={`w-full mt-4 rounded-2xl border-2 text-left transition ${deliveryOption === "seller" ? "border-[var(--olx-purple)]" : "border-border"}`}
            >
              <div className="p-5 flex items-start gap-4">
                <div className="w-20 h-20 shrink-0 rounded-xl bg-[var(--olx-purple-soft)] flex items-center justify-center text-4xl">🗄️</div>
                <div className="flex-1 pt-1">
                  <p className="font-bold text-lg text-foreground">Armário CliqueRetire</p>
                  <p className="text-muted-foreground mt-1">Escolha um armário mais próximo para retirar o produto.</p>
                </div>
                <ChevronRight className="w-6 h-6 text-muted-foreground shrink-0 mt-1" />
              </div>
              <div className="h-px bg-border mx-5" />
              <div className="flex items-center gap-4 px-5 py-4">
                <button className="text-[var(--olx-purple)] font-semibold text-sm">Armários próximos</button>
                <div className="w-px h-4 bg-border" />
                <button className="text-[var(--olx-purple)] font-semibold text-sm">Como funciona?</button>
              </div>
            </button>
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-border flex gap-3">
            <button
              onClick={() => setShowDeliveryType(false)}
              className="flex-1 border border-foreground text-foreground font-semibold rounded-full py-3.5"
            >
              Voltar
            </button>
            <button
              onClick={() => setShowDeliveryDeadline(true)}
              className="flex-1 bg-[var(--olx-orange)] text-white font-semibold rounded-full py-3.5"
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      {showDeliveryDeadline && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto">
          <button onClick={() => setShowDeliveryDeadline(false)} className="p-5 self-start">
            <X className="w-7 h-7" />
          </button>
          <div className="px-6 pb-6 flex-1">
            <h1 className="text-3xl font-bold text-foreground leading-tight">Escolha o prazo de entrega</h1>

            <div className="mt-8 rounded-2xl border border-border p-5 flex items-start gap-3">
              <MapPin className="w-6 h-6 text-foreground shrink-0 mt-0.5" />
              <div className="text-foreground text-sm leading-relaxed">
                {form.rua ? (
                  <>
                    {form.rua},{form.numero}{form.complemento ? `,${form.complemento}` : ""},{form.bairro},{form.cidade}-{form.estado}
                  </>
                ) : (
                  "Nenhum endereço cadastrado"
                )}
                <button onClick={() => { setShowDeliveryDeadline(false); setShowForm(true); }} className="text-[var(--olx-purple)] font-semibold ml-1 underline">
                  Mudar endereço
                </button>
              </div>
            </div>

            <button
              onClick={() => setDeliveryDeadline("padrao")}
              className={`w-full mt-6 rounded-2xl border-2 text-left transition ${deliveryDeadline === "padrao" ? "border-[var(--olx-purple)]" : "border-border"}`}
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${deliveryDeadline === "padrao" ? "border-[var(--olx-purple)]" : "border-muted-foreground"}`}>
                    {deliveryDeadline === "padrao" && <div className="w-3.5 h-3.5 rounded-full bg-[var(--olx-purple)]" />}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">Padr��o</p>
                    <p className="text-muted-foreground">Até 10 dias úteis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground line-through">R$ 44,33</p>
                  <p className="text-[var(--olx-green-text)] font-bold text-lg">R$ 16,43</p>
                </div>
              </div>
              <div className="px-5 pb-5">
                <button className="text-foreground font-semibold underline text-sm">Saiba por que o frete não foi gratuito.</button>
              </div>
            </button>

            <button
              onClick={() => setDeliveryDeadline("expressa")}
              className={`w-full mt-4 rounded-2xl border-2 text-left transition ${deliveryDeadline === "expressa" ? "border-[var(--olx-purple)]" : "border-border"}`}
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${deliveryDeadline === "expressa" ? "border-[var(--olx-purple)]" : "border-muted-foreground"}`}>
                    {deliveryDeadline === "expressa" && <div className="w-3.5 h-3.5 rounded-full bg-[var(--olx-purple)]" />}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-foreground">Expressa</p>
                    <p className="text-muted-foreground">Até 4 dias úteis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground line-through">R$ 65,68</p>
                  <p className="text-[var(--olx-green-text)] font-bold text-lg">R$ 37,78</p>
                </div>
              </div>
            </button>

            <div className="mt-8 flex gap-1">
              <div className="h-1.5 w-24 bg-[var(--olx-purple)] rounded-full" />
              <div className="h-1.5 flex-1 bg-muted rounded-full" />
            </div>
          </div>

          <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-border flex gap-3">
            <button
              onClick={() => setShowDeliveryDeadline(false)}
              className="flex-1 border border-foreground text-foreground font-semibold rounded-full py-3.5"
            >
              Voltar
            </button>
            <button onClick={finalizePurchase} className="flex-1 bg-[var(--olx-orange)] text-white font-semibold rounded-full py-3.5">
              Continuar
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto">
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border sticky top-0 bg-white">
            <button onClick={() => setShowForm(false)}><ChevronLeft className="w-6 h-6" /></button>
            <h2 className="text-lg font-bold">Endereço de entrega</h2>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}
            className="px-6 py-6 flex-1 space-y-5"
          >
            <div>
              <p className="font-semibold text-foreground mb-3">Dados pessoais</p>
              <div className="space-y-3">
                <input value={form.nome} onChange={updateForm("nome")} maxLength={100} placeholder="Nome completo" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                <input value={form.cpf} onChange={updateForm("cpf")} maxLength={14} placeholder="CPF" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                <input value={form.telefone} onChange={updateForm("telefone")} maxLength={15} placeholder="Telefone (DDD + número)" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
              </div>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-3">Endereço</p>
              <div className="space-y-3">
                <div className="relative">
                  <input value={form.cep} onChange={handleCepChange} maxLength={9} inputMode="numeric" placeholder="CEP" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                  {cepLoading && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">Buscando...</span>}
                </div>
                {cepError && <p className="text-xs text-destructive -mt-1">{cepError}</p>}
                <input value={form.rua} onChange={updateForm("rua")} maxLength={120} placeholder="Rua / Avenida" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.numero} onChange={updateForm("numero")} maxLength={10} placeholder="Número" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                  <input value={form.complemento} onChange={updateForm("complemento")} maxLength={40} placeholder="Complemento" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                </div>
                <input value={form.bairro} onChange={updateForm("bairro")} maxLength={80} placeholder="Bairro" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                <div className="grid grid-cols-[1fr_100px] gap-3">
                  <input value={form.cidade} onChange={updateForm("cidade")} maxLength={80} placeholder="Cidade" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm" />
                  <input value={form.estado} onChange={updateForm("estado")} maxLength={2} placeholder="UF" className="w-full px-4 py-3.5 rounded-xl border border-border text-sm uppercase" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-[var(--olx-orange)] disabled:opacity-50 text-white font-semibold rounded-full py-3.5 mt-6"
            >
              Salvar endereço
            </button>
          </form>
        </div>
      )}
      {showSecurity && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-[#1e1e2e] rounded-3xl p-6 text-white flex flex-col">
            <h2 className="text-center text-3xl font-bold leading-tight">
              Compra<br />100% protegida!
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <Wallet className="w-8 h-8 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-lg">Pagamento seguro</p>
                  <p className="text-white/70 text-sm mt-1">Pague pelo App e proteja seu dinheiro.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-lg">Garantia de entrega</p>
                  <p className="text-white/70 text-sm mt-1">O vendedor só recebe após sua confirmação.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-lg">Proteção total</p>
                  <p className="text-white/70 text-sm mt-1">Cobertura para o produto e o frete.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 inline-flex self-start">
              <span className="border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                Garantia da OLX
              </span>
            </div>

            <label className="mt-6 flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-5 h-5 rounded border-white/40 bg-transparent accent-white"
              />
              <span className="text-sm text-white/90">Não mostrar essa dica novamente</span>
            </label>

            <button
              onClick={() => {
                if (dontShowAgain) localStorage.setItem("olx-security-modal-hidden", "true");
                setShowSecurity(false);
              }}
              className="mt-6 w-full bg-white text-[#1e1e2e] font-semibold rounded-full py-4 text-base"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
      {showProfile && (
        <div className="fixed inset-0 z-[65] bg-white flex flex-col overflow-y-auto">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10 border-b border-border">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowProfile(false)}><ChevronLeft className="w-6 h-6" /></button>
              <img src={olxLogo} alt="OLX" className="h-7 w-auto object-contain" />
            </div>
            <Share2 className="w-5 h-5 stroke-[1.5]" />
          </header>

          <div className="px-4 py-5">
            {/* Seller card */}
            <div className="border border-border rounded-2xl p-5">
              <div className="flex items-center gap-4">
                <img src={sellerAvatar} alt="Petala A." className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    Conta verificada <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />
                  </div>
                  <p className="text-2xl font-bold mt-1">Petala A.</p>
                  <p className="text-muted-foreground text-sm">último acesso há 10 minutos</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-center mb-2">
                  <span className="bg-[var(--olx-green-soft)] text-[var(--olx-green-text)] text-sm px-3 py-1 rounded-full">Avançado</span>
                </div>
                <div className="flex items-center gap-1">
                  {[0.7, 0.6, 1, 0.4].map((o, i) => (
                    <div key={i} className="h-2 flex-1 rounded-full" style={{ background: `color-mix(in oklab, var(--olx-purple) ${o * 100}%, white)` }} />
                  ))}
                  <div className="h-2 flex-1 rounded-full bg-muted" />
                  <Award className="w-5 h-5 ml-1 text-muted-foreground" />
                </div>
              </div>

              <div className="mt-6 space-y-3 text-foreground">
                <p className="flex items-center gap-3"><Calendar className="w-5 h-5" /> Na OLX desde 2022</p>
                <p className="flex items-center gap-3"><MapPin className="w-5 h-5" /> Coroa do Meio, Aracaju - SE</p>
              </div>
            </div>

            {/* Histórico */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                Histórico <Info className="w-5 h-5 text-muted-foreground" />
              </h2>
              <div className="mt-4 border border-border rounded-2xl p-5 flex items-center gap-4">
                <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                <div>
                  <p className="text-foreground"><span className="text-2xl font-semibold">1</span> <span className="text-sm">anúncio</span></p>
                  <p className="text-muted-foreground text-sm mt-0.5">Publicado nos últimos 180 dias</p>
                </div>
              </div>
            </div>

            {/* Anúncios */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Anúncios</h2>
              <p className="text-muted-foreground mt-1">1 de 1 anúncio publicado</p>

              <div className="mt-5 relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input placeholder="Ex: Apartamento 2 quartos" className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border text-sm placeholder:text-muted-foreground" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="border border-border rounded-xl py-3 flex items-center justify-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-4 h-4" /> Filtros
                </button>
                <button className="border border-border rounded-xl py-3 flex items-center justify-center gap-2 text-foreground">
                  <SlidersHorizontal className="w-4 h-4" /> Mais recentes <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Ad card */}
              <button
                onClick={() => setShowProfile(false)}
                className="w-full text-left mt-6 border border-border rounded-2xl overflow-hidden"
              >
                <div className="relative bg-muted">
                  <img src={iphonePhoto1.url} alt="iPhone 13 Pro" className="w-full aspect-square object-cover" />
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 w-10 h-14 rounded-lg bg-black/60 text-white flex items-center justify-center">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" /> 3
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-2xl font-bold text-foreground">R$ 1.500</p>
                  <p className="mt-4 text-foreground">iPhone 13 Pro 256gb</p>
                  <div className="h-px bg-border my-5" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="flex items-center gap-2 text-foreground"><MapPin className="w-4 h-4" /> Aracaju - SE</p>
                      <p className="text-muted-foreground text-sm mt-1">Hoje, agora</p>
                    </div>
                    <Heart className="w-6 h-6 stroke-[1.5]" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 z-[75] bg-white flex flex-col">
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border">
            <button onClick={() => setShowChat(false)} aria-label="Voltar"><ChevronLeft className="w-6 h-6" /></button>
            <img src={sellerAvatar} alt="b.rodrigues." className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate flex items-center gap-1.5">b.rodrigues. <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" /></p>
              <p className="text-xs text-muted-foreground">online agora</p>
            </div>
          </header>
          <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-muted/50">
            <img src={iphonePhoto1.url} alt="" className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">iPhone 13 Pro 256gb</p>
              <p className="text-sm font-bold text-foreground">R$ 1.500</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f7f7fb]">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "me" ? "bg-[var(--olx-purple)] text-white rounded-br-sm" : "bg-white border border-border text-foreground"}`}>
                  <p className="whitespace-pre-wrap break-words">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === "me" ? "text-white/70 text-right" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); sendChat(chatInput); }}
            className="flex items-center gap-2 px-3 py-3 border-t border-border bg-white"
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Escreva uma mensagem"
              className="flex-1 px-4 py-3 rounded-full border border-border text-sm bg-muted/40"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="w-11 h-11 rounded-full bg-[var(--olx-purple)] text-white flex items-center justify-center disabled:opacity-40"
              aria-label="Enviar"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {showOffer && (
        <div className="fixed inset-0 z-[75] bg-black/60 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Fazer oferta</h3>
              <button onClick={() => { setShowOffer(false); setOfferSent(false); }} aria-label="Fechar"><X className="w-5 h-5" /></button>
            </div>
            {offerSent ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--olx-green-soft)] text-[var(--olx-green-text)] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <p className="mt-4 font-semibold">Oferta enviada!</p>
                <p className="text-sm text-muted-foreground mt-1">O vendedor será notificado.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mt-2">Preço anunciado: R$ 1.500</p>
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-border px-4 py-3">
                  <span className="text-muted-foreground">R$</span>
                  <input
                    value={offerValue}
                    onChange={(e) => setOfferValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    inputMode="numeric"
                    placeholder="0"
                    className="flex-1 outline-none text-lg font-semibold"
                    autoFocus
                  />
                </div>
                <button
                  onClick={submitOffer}
                  disabled={!offerValue}
                  className="w-full mt-5 bg-[var(--olx-orange)] disabled:opacity-50 text-white font-semibold rounded-full py-3.5"
                >
                  Enviar oferta
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed inset-0 z-[80] bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--olx-green-soft)] text-[var(--olx-green-text)] flex items-center justify-center">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mt-6">Pedido realizado!</h2>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Seu iPhone 13 Pro será enviado para{" "}
            {form.rua ? `${form.rua}, ${form.numero} - ${form.cidade}/${form.estado}` : "seu endereço"}.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="mt-8 bg-[var(--olx-orange)] text-white font-semibold rounded-full px-10 py-3.5"
          >
            Voltar ao anúncio
          </button>
        </div>
      )}
    </div>
  );
}
