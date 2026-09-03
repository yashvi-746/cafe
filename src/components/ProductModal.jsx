import { useState } from "react";
import { X, Plus, Minus, ArrowRight, Flame, Snowflake } from "lucide-react";
import { Badge, ProductImg } from "./common";
import { money } from "../utils/format";

const ProductModal = ({ product, onClose, onAdd }) => {
  const [temp, setTemp] = useState("Hot");
  const [milk, setMilk] = useState("Whole");
  const [sweet, setSweet] = useState(50);
  const [extras, setExtras] = useState([]);
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const extraOptions = [ { n:"Extra Espresso Shot", p:40 }, { n:"Caramel Drizzle", p:30 }, { n:"Whipped Cream", p:35 }, { n:"Oat Milk Swap", p:25 } ];
  const extrasTotal = extras.reduce((s,e)=> s + extraOptions.find(o=>o.n===e).p, 0);
  const unitPrice = product.price + extrasTotal;
  const total = unitPrice * qty;
  const toggleExtra = (n) => setExtras(x => x.includes(n) ? x.filter(i=>i!==n) : [...x,n]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 nb-fade" onClick={onClose} />
      <div className="relative nb-bg-cream w-full md:max-w-3xl md:mx-4 max-h-[92vh] overflow-y-auto nb-scroll nb-scale-in">
        <div className="grid md:grid-cols-2">
            <div className="relative">
              <ProductImg cls={product.img} imgUrl={product.img} h="h-64 md:h-[320px]">
                <button onClick={onClose} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/30 flex items-center justify-center nb-focus z-20">
                  <X size={16} color="#F8F4E9" />
                </button>
                {/* Interactive Virtual Liquid Glass Overlay */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md p-3 border border-white/20 rounded-lg text-white w-36 text-center z-10">
                  <p className="text-[10px] tracking-wider uppercase text-[#C9A876] font-semibold mb-1">Visual Cup Layer</p>
                  <div className="w-12 h-16 mx-auto border-2 border-white/40 rounded-b-xl relative overflow-hidden flex flex-col justify-end bg-white/5">
                    {extras.includes("Whipped Cream") && <div className="h-3 bg-white/90 w-full animate-pulse" title="Whipped Cream" />}
                    <div className="h-5 w-full transition-all" style={{ backgroundColor: milk === "Oat" ? "#EADBB6" : milk === "Almond" ? "#F5EAD4" : "#FFF8EB" }} title={`${milk} Milk`} />
                    <div className="h-6 bg-[#3A2212] w-full" title="Espresso Shot" />
                    {temp === "Iced" && <div className="absolute top-2 left-2 w-2 h-2 border border-white/80 rotate-45" title="Ice" />}
                  </div>
                  <p className="text-[10px] text-white/70 mt-1.5">{temp} · {milk} Milk</p>
                </div>
              </ProductImg>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex gap-1.5 mb-3">{product.best && <Badge tone="brass">Bestseller</Badge>}{product.seasonal && <Badge tone="olive">Seasonal</Badge>}</div>
              <h3 className="nb-display text-3xl leading-tight">{product.name}</h3>
              <p className="text-sm nb-text-fade mt-2 leading-relaxed">{product.desc}</p>
              
              {/* Dynamic Calorie & Nutritional Calculator */}
              <div className="flex items-center gap-3 text-xs bg-white/50 p-2.5 border nb-border mt-3">
                <span className="font-semibold">{product.cal + (milk === "Oat" ? 40 : milk === "Almond" ? 20 : 0) + (extras.includes("Whipped Cream") ? 80 : 0)} kcal</span>
                <span>·</span>
                <span>{product.prep} min prep</span>
                <span>·</span>
                <span className="nb-text-brass font-medium">Sweetness: {sweet}%</span>
              </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-wide nb-text-soft mb-2">Temperature</p>
                <div className="flex gap-2">
                  {["Hot","Iced"].map(t=>(
                    <button key={t} onClick={()=>setTemp(t)} className={`nb-focus px-4 py-2 text-sm border nb-border flex items-center gap-1.5 ${temp===t ? "nb-bg-ink nb-text-cream" : ""}`}>
                      {t==="Hot" ? <Flame size={13}/> : <Snowflake size={13}/>}{t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide nb-text-soft mb-2">Milk</p>
                <div className="flex gap-2 flex-wrap">
                  {["Whole","Oat","Almond","Soy"].map(m=>(
                    <button key={m} onClick={()=>setMilk(m)} className={`nb-focus px-3.5 py-2 text-sm border nb-border ${milk===m ? "nb-bg-ink nb-text-cream" : ""}`}>{m}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold tracking-wide nb-text-soft mb-2">
                  <span>Sweetness</span><span>{sweet}%</span>
                </div>
                <input type="range" min="0" max="100" step="10" value={sweet} onChange={e=>setSweet(e.target.value)} className="nb-range w-full" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide nb-text-soft mb-2">Extras</p>
                <div className="space-y-2">
                  {extraOptions.map(o=>(
                    <label key={o.n} className="flex items-center justify-between text-sm cursor-pointer">
                      <span className="flex items-center gap-2"><input type="checkbox" checked={extras.includes(o.n)} onChange={()=>toggleExtra(o.n)} className="accent-[#211C17]" />{o.n}</span>
                      <span className="nb-text-fade">+{money(o.p)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-7 pt-5 border-t nb-border">
              <div className="flex items-center border nb-border">
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-9 h-9 flex items-center justify-center nb-focus"><Minus size={14}/></button>
                <span className="w-8 text-center text-sm">{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} className="w-9 h-9 flex items-center justify-center nb-focus"><Plus size={14}/></button>
              </div>
              <button onClick={()=>{ onAdd({ product, temp, milk, sweet, extras, qty, unitPrice }); onClose(); }}
                className="nb-btn nb-btn-primary px-6 py-3 text-sm flex items-center gap-2 nb-focus">
                Add · {money(total)} <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
