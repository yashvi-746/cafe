import { useState } from "react";
import { Coffee, Menu as MenuIcon, X, ShoppingBag, User, Calendar, LayoutGrid, QrCode, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { k:"menu", label:"Menu" }, { k:"gallery", label:"Experience" }, { k:"events", label:"Events" },
  { k:"journal", label:"Journal" }, { k:"about", label:"About" },
];

const Nav = ({ page, setPage, cartCount, openCart, user, setPage2, scrolled, openScanner, openQuiz }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
      style={{ background: scrolled ? "rgba(242,236,221,0.92)" : "transparent", borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button onClick={()=>setPage("home")} className="flex items-center gap-2 nb-focus">
          <Coffee size={20} className={scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"} />
          <span className={`nb-display text-lg tracking-tight ${scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"}`}>NOIR & BEAN</span>
        </button>
        <div className="hidden xl:flex items-center gap-2 text-xs px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={scrolled || page!=="home" ? "nb-text-ink font-medium" : "text-white/90"}>Vibe: Peaceful & Quiet</span>
        </div>
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(l=>(
            <button key={l.k} onClick={()=>setPage(l.k)} className={`nb-underline text-sm nb-focus ${scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"}`}>{l.label}</button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={openQuiz} className="flex items-center gap-1 text-xs px-3 py-1.5 bg-[#A9834C] text-white font-semibold rounded-full shadow hover:bg-[#8A6A3B] transition-all">
            <Sparkles size={12} /> Coffee Quiz
          </button>
          <button onClick={openScanner} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-full nb-focus transition-all ${scrolled || page!=="home" ? "nb-border nb-text-ink hover:bg-black/5" : "border-white/40 nb-text-cream hover:bg-white/10"}`}>
            <QrCode size={14} className="text-[#A9834C]" /> Scan Table
          </button>
          <button onClick={()=>setPage("kitchen")} className={`text-xs px-2 py-1.5 border rounded-none nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            Kitchen
          </button>
          <button onClick={()=>setPage("admin")} className={`text-xs px-2 py-1.5 border rounded-none nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            Admin
          </button>
          <button onClick={()=>setPage("account")} className={`w-9 h-9 flex items-center justify-center rounded-full border nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            <User size={15}/>
          </button>
          <button onClick={openCart} className={`relative w-9 h-9 flex items-center justify-center rounded-full border nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            <ShoppingBag size={15}/>
            {cartCount>0 && <span className="absolute -top-1.5 -right-1.5 nb-bg-brass text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center px-1">{cartCount}</span>}
          </button>
          <button onClick={()=>setPage("reserve")} className="nb-btn nb-btn-brass text-xs px-4 py-2.5 nb-focus">Reserve</button>
          <button onClick={()=>setPage("menu")} className="nb-btn nb-btn-primary text-xs px-4 py-2.5 nb-focus">Order Online</button>
        </div>
        <button className="md:hidden nb-focus" onClick={()=>setMobileOpen(true)}>
          <MenuIcon size={22} className={scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"} />
        </button>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 nb-bg-paper z-[70] p-6 nb-fade">
          <div className="flex justify-between items-center mb-10">
            <span className="nb-display text-lg">NOIR & BEAN</span>
            <button onClick={()=>setMobileOpen(false)} className="nb-focus"><X size={22}/></button>
          </div>
          <div className="flex flex-col gap-6">
            {[...NAV_LINKS, {k:"account",label:"Account"}, {k:"reserve",label:"Reservations"}].map(l=>(
              <button key={l.k} onClick={()=>{ setPage(l.k); setMobileOpen(false); }} className="nb-display text-3xl text-left nb-focus">{l.label}</button>
            ))}
          </div>
        </div>
      )}
      {/* mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 nb-bg-cream border-t nb-border flex justify-around py-2.5 z-[60]">
        {[
          {k:"home", icon:Coffee, label:"Home"}, {k:"menu", icon:LayoutGrid, label:"Menu"},
          {k:"cart", icon:ShoppingBag, label:"Order", cart:true}, {k:"reserve", icon:Calendar, label:"Reserve"},
          {k:"account", icon:User, label:"Account"},
        ].map(l=>(
          <button key={l.k} onClick={()=> l.cart ? openCart() : setPage(l.k)} className="flex flex-col items-center gap-1 nb-focus">
            <l.icon size={18} className={page===l.k ? "nb-text-brass" : "nb-text-soft"} />
            <span className="text-[10px] nb-text-soft">{l.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};


export default Nav;
