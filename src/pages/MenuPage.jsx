import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "../data/demoData";
import { SectionHeading } from "../components/common";
import ProductCard from "../components/ProductCard";
import { money } from "../utils/format";

const MenuPage = ({ openProduct, favorites, toggleFav, products }) => {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [bestOnly, setBestOnly] = useState(false);
  const [sort, setSort] = useState("Featured");
  const [maxPrice, setMaxPrice] = useState(450);

  const allProducts = products || PRODUCTS;

  const filtered = useMemo(()=>{
    let list = allProducts.filter(p =>
      (cat==="All" || p.cat===cat) &&
      (!vegOnly || p.veg) && (!bestOnly || p.best) &&
      p.price <= maxPrice &&
      (q==="" || p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort==="Price: Low to High") list = [...list].sort((a,b)=>a.price-b.price);
    if (sort==="Price: High to Low") list = [...list].sort((a,b)=>b.price-a.price);
    if (sort==="Rating") list = [...list].sort((a,b)=>b.rating-a.rating);
    return list;
  }, [cat,q,vegOnly,bestOnly,sort,maxPrice,allProducts]);

  return (
    <div className="pt-28 max-w-7xl mx-auto px-5 md:px-8 pb-24">
      <SectionHeading eyebrow="The full board" title="Menu" sub="Twenty-four things worth ordering, made to order, every time." />
      <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 border-b nb-border pb-2 max-w-sm">
          <Search size={15} className="nb-text-fade shrink-0" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the menu" className="bg-transparent outline-none text-sm w-full nb-focus" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs nb-text-soft"><input type="checkbox" checked={vegOnly} onChange={e=>setVegOnly(e.target.checked)} className="accent-[#5B6146]" /> Vegetarian</label>
          <label className="flex items-center gap-1.5 text-xs nb-text-soft"><input type="checkbox" checked={bestOnly} onChange={e=>setBestOnly(e.target.checked)} className="accent-[#A9834C]" /> Bestsellers</label>
          <div className="flex items-center gap-2 text-xs nb-text-soft">
            <span>Under {money(maxPrice)}</span>
            <input type="range" min="150" max="450" step="10" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} className="nb-range w-24" />
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} className="text-xs border nb-border bg-transparent px-2 py-1.5 nb-focus">
            {["Featured","Price: Low to High","Price: High to Low","Rating"].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-6 overflow-x-auto nb-scroll pb-2">
        {["All",...CATEGORIES].map(c=>(
          <button key={c} onClick={()=>setCat(c)} className={`nb-focus shrink-0 px-4 py-2 text-xs border nb-border ${cat===c ? "nb-bg-ink nb-text-cream" : "nb-text-soft"}`}>{c}</button>
        ))}
      </div>

      {/* Flavor Profile Tag Bar */}
      <div className="flex items-center gap-2 mt-3 overflow-x-auto nb-scroll pb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A9834C] shrink-0 mr-1">Flavor Notes:</span>
        {["fruity", "strong", "creamy", "spiced", "sweet", "hot", "cold"].map(tag => (
          <button
            key={tag}
            onClick={() => setQ(q === tag ? "" : tag)}
            className={`px-3 py-1 text-[11px] rounded-full border transition-all shrink-0 ${q === tag ? "bg-[#A9834C] text-white border-[#A9834C]" : "bg-white/60 text-[#3A322A] border-black/10 hover:border-[#A9834C]"}`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {filtered.length===0 ? (
        <div className="text-center py-24">
          <p className="nb-display text-2xl">Nothing matches, yet.</p>
          <p className="text-sm nb-text-fade mt-2">Try widening your filters or clearing the search.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filtered.map(p=>(
            <ProductCard key={p.id} p={p} onOpen={openProduct} isFav={favorites.includes(p.id)} onFav={toggleFav} />
          ))}
        </div>
      )}
    </div>
  );
};


export default MenuPage;
