import { createFileRoute } from "@tanstack/react-router";
import {
  Heart, Share2, Camera, Layers,
  Star, Box, Copy, Zap, Award, Building2,
  MapPin, Calendar, CheckCircle2, XCircle, ShieldCheck, CreditCard, Truck,
  X, Ticket, BadgePercent, Calculator, Facebook, Youtube,
} from "lucide-react";
import iphoneHero from "@/assets/iphone-hero.jpg";
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
  return (
    <div className="min-h-screen bg-background pb-8">
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

    </div>
  );
}
