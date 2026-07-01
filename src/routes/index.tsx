import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ChevronRight } from "lucide-react";
import iphoneHero from "@/assets/iphone-hero.jpg";
import related1 from "@/assets/iphone-related-1.jpg";
import related2 from "@/assets/iphone-related-2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OLX — Compre e venda de tudo pela internet" },
      { name: "description", content: "Anúncios de celulares, eletrônicos e mais. Encontre ofertas imperdíveis." },
    ],
  }),
  component: Home,
});

const items = [
  { slug: "iphone-13-pro-256gb", img: iphoneHero, title: "iPhone 13 Pro 256gb", price: "R$ 1.700", location: "Coroa do Meio, Aracaju - SE" },
  { slug: "iphone-13-pro-max", img: related1, title: "iPhone 13 Pro Max", price: "R$ 1.600", location: "Aracaju - SE" },
  { slug: "iphone-13-128gb", img: related2, title: "iPhone 13 128gb única dona", price: "R$ 1.450", location: "Aracaju - SE" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background pb-8">
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10 border-b border-border">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black text-[var(--olx-purple)]">o</span>
          <span className="text-2xl font-black text-[var(--olx-green-text)]">l</span>
          <span className="text-2xl font-black text-[var(--olx-orange)]">x</span>
        </div>
      </header>

      <section className="px-4 pt-5">
        <h1 className="text-2xl font-semibold">Ofertas em destaque</h1>
        <p className="text-muted-foreground text-sm mt-1">Toque em um anúncio para ver mais detalhes.</p>
      </section>

      <ul className="px-4 pt-5 space-y-4">
        {items.map((p) => {
          const card = (
            <div className="flex gap-3 border border-border rounded-2xl p-3 hover:bg-muted/50 transition">
              <img src={p.img} alt={p.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm line-clamp-2">{p.title}</p>
                <p className="font-bold mt-1">{p.price}</p>
                <p className="text-xs text-muted-foreground mt-1 truncate">{p.location}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Heart className="w-5 h-5" />
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          );
          return (
            <li key={p.slug}>
              {p.slug === "iphone-13-pro-256gb" ? (
                <Link to="/anuncio/iphone-13-pro-256gb">{card}</Link>
              ) : (
                <div className="opacity-70">{card}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
