import { useState } from "react";
import { Coffee, Menu as MenuIcon, X, ShoppingBag, User, Calendar, LayoutGrid, QrCode, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { k:"menu", label:"Menu" }, { k:"gallery", label:"Experience" }, { k:"events", label:"Events" },
  { k:"journal", label:"Journal" }, { k:"about", label:"About" },
];

const Nav = ({ page, setPage, cartCount, openCart, user, scrolled, openScanner, openQuiz, openReel }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${scrolled ? "backdrop-blur-md" : ""}`}
      style={{ background: scrolled ? "rgba(242,236,221,0.95)" : (page === "home" ? "rgba(26,24,22,0.4)" : "rgba(242,236,221,0.95)"), borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        <button onClick={()=>setPage("home")} className="flex items-center gap-2 nb-focus shrink-0">
          <Coffee size={20} className={scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"} />
          <span className={`nb-display text-lg tracking-tight ${scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"}`}>NOIR & BEAN</span>
        </button>
        
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map(l=>(
            <button key={l.k} onClick={()=>setPage(l.k)} className={`nb-underline text-sm font-medium nb-focus ${scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"}`}>{l.label}</button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <button onClick={openScanner} className={`hidden xl:flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-full nb-focus transition-all ${scrolled || page!=="home" ? "nb-border nb-text-ink hover:bg-black/5" : "border-white/40 nb-text-cream hover:bg-white/10"}`}>
            <QrCode size={14} className="text-[#A9834C]" /> Scan Table
          </button>
          <button onClick={()=>setPage("kitchen")} className={`hidden xl:block text-xs px-2.5 py-1.5 border rounded-none nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            Kitchen
          </button>
          <button onClick={()=>setPage("admin")} className={`hidden xl:block text-xs px-2.5 py-1.5 border rounded-none nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            Admin
          </button>
          <button onClick={()=>setPage("account")} className={`w-9 h-9 flex items-center justify-center rounded-full border nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            <User size={15}/>
          </button>
          <button onClick={openCart} className={`relative w-9 h-9 flex items-center justify-center rounded-full border nb-focus ${scrolled || page!=="home" ? "nb-border nb-text-ink" : "border-white/40 nb-text-cream"}`}>
            <ShoppingBag size={15}/>
            {cartCount>0 && <span className="absolute -top-1.5 -right-1.5 nb-bg-brass text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center px-1 font-bold">{cartCount}</span>}
          </button>
          <button onClick={()=>setPage("reserve")} className="nb-btn nb-btn-brass text-xs px-3.5 py-2 nb-focus">Reserve</button>
          <button onClick={()=>setPage("menu")} className="nb-btn nb-btn-primary text-xs px-3.5 py-2 nb-focus">Order Online</button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={openCart} className={`relative p-2 nb-focus ${scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"}`}>
            <ShoppingBag size={20}/>
            {cartCount>0 && <span className="absolute top-0 right-0 nb-bg-brass text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
          </button>
          <button className="p-2 nb-focus" onClick={()=>setMobileOpen(true)}>
            <MenuIcon size={22} className={scrolled || page!=="home" ? "nb-text-ink" : "nb-text-cream"} />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 nb-bg-paper z-[70] p-6 overflow-y-auto nb-fade flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8 border-b pb-4 nb-border">
              <div className="flex items-center gap-2">
                <Coffee size={20} className="nb-text-brass" />
                <span className="nb-display text-xl">NOIR & BEAN</span>
              </div>
              <button onClick={()=>setMobileOpen(false)} className="p-2 nb-focus"><X size={24}/></button>
            </div>
            <div className="grid gap-4">
              {[
                {k:"home", label:"Home"},
                {k:"menu", label:"Explore Menu"},
                {k:"account", label:"Account & Orders"},
                {k:"reserve", label:"Reserve a Table"},
                {k:"gallery", label:"Cafe Experience"},
                {k:"events", label:"Upcoming Events"},
                {k:"locations", label:"Locations"},
                {k:"journal", label:"Journal"},
                {k:"about", label:"About Us"},
              ].map(l=>(
                <button key={l.k} onClick={()=>{ setPage(l.k); setMobileOpen(false); }} className={`nb-display text-2xl text-left py-1.5 transition-colors ${page===l.k ? "nb-text-brass font-bold" : "nb-text-ink"}`}>{l.label}</button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t nb-border grid grid-cols-2 gap-3">
              <button onClick={()=>{ openQuiz?.(); setMobileOpen(false); }} className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#A9834C] text-white text-xs font-semibold rounded-lg shadow">
                <Sparkles size={14} /> Coffee Quiz
              </button>
              <button onClick={()=>{ openScanner?.(); setMobileOpen(false); }} className="flex items-center justify-center gap-1.5 py-2.5 px-3 border nb-border text-xs font-semibold rounded-lg bg-white">
                <QrCode size={14} className="text-[#A9834C]" /> Scan Table
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={()=>{ setPage("kitchen"); setMobileOpen(false); }} className="py-2 px-3 border nb-border text-xs text-neutral-600 rounded text-center">
                Kitchen Display
              </button>
              <button onClick={()=>{ setPage("admin"); setMobileOpen(false); }} className="py-2 px-3 border nb-border text-xs text-neutral-600 rounded text-center">
                Admin Portal
              </button>
            </div>
          </div>

          <div className="mt-8 pt-4 text-center border-t nb-border text-xs nb-text-fade">
            12 Alkapuri Road, Vadodara · 7:00 AM - 11:00 PM
          </div>
        </div>
      )}
      {/* mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 nb-bg-cream border-t nb-border flex justify-around items-center py-2 z-[60] shadow-lg">
        {[
          {k:"home", icon:Coffee, label:"Home"},
          {k:"menu", icon:LayoutGrid, label:"Menu"},
          {k:"cart", icon:ShoppingBag, label:"Order", cart:true},
          {k:"reserve", icon:Calendar, label:"Reserve"},
          {k:"account", icon:User, label:"Account"},
        ].map(l=>(
          <button key={l.k} onClick={()=> l.cart ? openCart() : setPage(l.k)} className="flex flex-col items-center gap-0.5 nb-focus relative py-1 px-3">
            <l.icon size={18} className={page===l.k ? "nb-text-brass" : "nb-text-soft"} />
            {l.cart && cartCount > 0 && <span className="absolute top-0 right-1 nb-bg-brass text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            <span className={`text-[10px] ${page===l.k ? "nb-text-brass font-bold" : "nb-text-soft"}`}>{l.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};


export default Nav;
