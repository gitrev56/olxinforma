import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Heart, Share2, Camera, ChevronLeft, ChevronRight, Home, User, Layers,
  ShoppingCart, MessageCircle, Star, Box, Copy, Zap, Award, Building2,
  MapPin, Calendar, CheckCircle2, XCircle, ShieldCheck, CreditCard, Truck,
  X, Ticket, BadgePercent, Calculator, Facebook, Youtube, Info, Wallet, Clock,
} from "lucide-react";
import iphonePhoto1 from "@/assets/iphone-photo-1.webp.asset.json";
import iphonePhoto2 from "@/assets/iphone-photo-2.webp.asset.json";
import iphonePhoto3 from "@/assets/iphone-photo-3.webp.asset.json";
import related1 from "@/assets/iphone-related-1.jpg";
import related2 from "@/assets/iphone-related-2.jpg";
import sellerAvatar from "@/assets/seller-avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iPhone 13 Pro 256gb - R$ 1.700 | OLX" },
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
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black text-[var(--olx-purple)] tracking-tight">o</span>
          <span className="text-2xl font-black text-[var(--olx-green-text)]">l</span>
          <span className="text-2xl font-black text-[var(--olx-orange)]">x</span>
        </div>
        <div className="flex items-center gap-4">
          <Heart className="w-5 h-5 stroke-[1.5]" />
          <Share2 className="w-5 h-5 stroke-[1.5]" />
        </div>
      </header>

      {/* Hero image */}
      <div className="relative bg-muted">
        <img src={iphoneHero} alt="iPhone 13 Pro azul" width={1024} height={1024} className="w-full aspect-square object-cover" />
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" /> 1/6
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
        <p className="text-4xl font-bold text-foreground">R$ 1.700</p>
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
        <button className="flex items-center gap-3 text-[var(--olx-purple)] font-semibold">
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
          <button className="bg-[var(--olx-purple)] text-white px-6 font-semibold">Copiar</button>
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
            { img: related1, title: "IPHONE 13 PRO MAX", price: "R$ 1.600" },
            { img: related2, title: "IPHONE 13 128GB ÚNICA DONA", price: "R$ 1.450" },
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
            <img src={sellerAvatar} alt="Petala A." width={1024} height={1024} loading="lazy" className="w-20 h-20 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                Conta verificada <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />
              </div>
              <p className="text-2xl font-bold mt-1">Petala A.</p>
              <p className="text-muted-foreground text-sm">Último acesso há 4 horas</p>
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
          <button className="w-full mt-6 border border-foreground rounded-full py-3 font-semibold">Acessar perfil do anunciante</button>

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
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.87a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24z"/></svg>
        </div>
      </footer>

      {/* Sticky bottom actions */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-border z-20">
        <div className="grid grid-cols-2 gap-3 px-4 pt-3 pb-2">
          <button onClick={() => setShowDelivery(true)} className="bg-[var(--olx-orange)] text-white font-semibold rounded-full py-3.5 flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Comprar
          </button>
          <button className="bg-[var(--olx-orange-soft)] text-[var(--olx-orange)] font-semibold rounded-full py-3.5 flex items-center justify-center gap-2">
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
                <p className="mt-2 leading-relaxed">O vendedor tem 5 dias para fazer o envio após o pagamento ser confirmado. Se esse prazo não for cumprido, você poderá cancelar a compra e o valor será estornado.</p>
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
                    <p className="font-bold text-lg text-foreground">Padrão</p>
                    <p className="text-muted-foreground">Até 15 dias úteis</p>
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
                    <p className="text-muted-foreground">Até 11 dias úteis</p>
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
            <button className="flex-1 bg-[var(--olx-orange)] text-white font-semibold rounded-full py-3.5">
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
    </div>
  );
}
