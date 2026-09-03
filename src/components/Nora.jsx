import { useState, useEffect, useRef } from "react";
import { X, Plus, ChevronRight, Send, Sparkles } from "lucide-react";
import { PRODUCTS } from "../data/demoData";
import { money } from "../utils/format";

const Nora = ({ setPage, openProduct }) => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ role:"nora", text:"What are you in the mood for?" }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(()=>{ if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs, open]);

  const respond = (text) => {
    const t = text.toLowerCase();
    if (t.includes("hour") || t.includes("open") || t.includes("close")) {
      return { text:"We're open daily from 7:00 AM to 11:00 PM at 12 Alkapuri Road, Vadodara." };
    }
    if (t.includes("reserv") || t.includes("table") || t.includes("book")) {
      return { text:"I can take you to reservations — pick a date, time and party size there.", action:"reserve" };
    }
    if (t.includes("order status") || t.includes("track") || t.includes("where is my")) {
      return { text:"Let's pull up your order status.", action:"track" };
    }
    if (t.includes("event")) {
      return { text:"We've got a cupping, a jazz evening, and a latte art workshop coming up this month.", action:"events" };
    }
    // recommendation engine over real product data
    let pool = PRODUCTS;
    if (t.includes("which coffee") || t.includes("all coffee") || t.includes("list coffee") || t.includes("menu coffee")) {
      pool = pool.filter(p => p.cat === "Coffee" || p.tags.includes("hot") || p.tags.includes("cold"));
      return { text: "Here are our signature coffees:", products: pool };
    }
    if (t.includes("all item") || t.includes("all menu") || t.includes("every item") || t.includes("list all")) {
      return { text: "Here is our complete menu lineup:", products: PRODUCTS };
    }
    if (t.includes("cold") || t.includes("iced")) pool = pool.filter(p=>p.tags.includes("cold"));
    if (t.includes("hot") || t.includes("warm")) pool = pool.filter(p=>p.tags.includes("hot"));
    if (t.includes("tea")) pool = pool.filter(p=>p.cat==="Tea");
    if (t.includes("dessert") || t.includes("sweet tooth") || t.includes("cake")) pool = pool.filter(p=>p.cat==="Desserts");
    if (t.includes("breakfast")) pool = pool.filter(p=>p.cat==="Breakfast");
    if (t.includes("lunch")) pool = pool.filter(p=>p.cat==="Lunch");
    if (t.includes("not too sweet") || t.includes("bitter") || t.includes("strong")) pool = pool.filter(p=>p.tags.includes("strong") || p.tags.includes("bittersweet") || p.tags.includes("light"));
    if (t.includes("caffeine-free") || t.includes("decaf")) pool = pool.filter(p=>p.tags.includes("caffeine-free"));
    if (t.includes("vegan") || (t.includes("no dairy"))) pool = pool.filter(p=>!p.allergens.includes("dairy"));
    const priceMatch = t.match(/under\s*(?:₹|rs)?\s*(\d+)/);
    if (priceMatch) pool = pool.filter(p=>p.price <= Number(priceMatch[1]));
    pool = [...pool].sort((a,b)=>b.rating-a.rating).slice(0,6);
    if (pool.length===0) pool = [...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0,6);
    return { text:"Here's what I'd point you toward:", products: pool };
  };

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role:"user", text: input };
    const r = respond(input);
    const noraMsg = { role:"nora", text: r.text, products: r.products, action: r.action };
    setMsgs(m => [...m, userMsg, noraMsg]);
    setInput("");
  };

  return (
    <>
      <button onClick={()=>setOpen(o=>!o)} className="fixed bottom-24 md:bottom-6 right-5 z-[75] w-14 h-14 rounded-full nb-bg-ink nb-text-cream flex items-center justify-center shadow-xl nb-magnet nb-focus" style={{transform: open ? "scale(0.9)" : "scale(1)"}}>
        {open ? <X size={20}/> : <Sparkles size={20}/>}
      </button>
      {open && (
        <div className="fixed bottom-40 md:bottom-24 right-5 z-[75] w-[92vw] max-w-sm h-[65vh] max-h-[520px] nb-bg-cream border nb-border shadow-2xl flex flex-col nb-scale-in">
          <div className="nb-bg-ink nb-text-cream p-4 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Sparkles size={15}/></div>
            <div><p className="text-sm font-semibold">NORA</p><p className="text-[10px] text-white/50">Your Café Concierge</p></div>
          </div>
          <div ref={scrollRef} className="grow overflow-y-auto nb-scroll p-4 space-y-3">
            {msgs.map((m,i)=>(
              <div key={i} className={`flex ${m.role==="user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${m.role==="user" ? "nb-bg-ink nb-text-cream" : "nb-bg-paper2"} px-3.5 py-2.5 text-sm rounded-sm`}>
                  <p>{m.text}</p>
                  {m.products && (
                    <div className="mt-2.5 space-y-2">
                      {m.products.map(p => {
                        const isUrl = p.img && (p.img.startsWith('http://') || p.img.startsWith('https://'));
                        return (
                          <button key={p.id || p.name} onClick={()=>openProduct(p)} className="flex items-center gap-2.5 w-full text-left bg-white/80 hover:bg-white p-2 border nb-border rounded-sm nb-focus transition-all">
                            {isUrl ? (
                              <img src={p.img} alt={p.name} className="w-10 h-10 object-cover rounded-sm shrink-0" />
                            ) : (
                              <div className={`nb-photo ${p.img || 'nb-photo-1'} w-10 h-10 shrink-0 rounded-sm`} />
                            )}
                            <div className="grow min-w-0">
                              <p className="text-xs font-semibold truncate text-[#211C17]">{p.name}</p>
                              <p className="text-[11px] nb-text-brass font-medium">{money(p.price)}</p>
                            </div>
                            <Plus size={14} className="nb-text-mocha shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {m.action && (
                    <button onClick={()=>setPage(m.action)} className="mt-2.5 text-xs nb-underline flex items-center gap-1">Take me there <ChevronRight size={11}/></button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t nb-border flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter" && send()}
              placeholder="Something cold, not too sweet, under ₹300…" className="grow border nb-border px-3 py-2 text-xs outline-none nb-focus" />
            <button onClick={send} className="nb-btn nb-btn-primary w-9 h-9 flex items-center justify-center shrink-0 nb-focus"><Send size={13}/></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nora;
