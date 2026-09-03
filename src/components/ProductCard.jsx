import { Plus, Star, Heart } from "lucide-react";
import { Badge, ProductImg } from "./common";
import { money } from "../utils/format";

const ProductCard = ({ p, onOpen, isFav, onFav }) => (
  <div className="nb-card nb-card-hover group flex flex-col">
    <div className="relative overflow-hidden">
      <ProductImg cls={p.img} imgUrl={p.img} h="h-56">
        <button onClick={(e)=>{e.stopPropagation(); onFav(p.id);}}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center nb-focus">
          <Heart size={15} color="#F8F4E9" fill={isFav ? "#F8F4E9" : "none"} />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {p.best && <Badge tone="brass">Bestseller</Badge>}
          {p.seasonal && <Badge tone="olive">Seasonal</Badge>}
        </div>
      </ProductImg>
    </div>
    <div className="p-4 flex flex-col grow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="nb-display text-lg leading-snug">{p.name}</h3>
        <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 border ${p.veg ? "border-[#5B6146]" : "border-[#8B4A3B]"}`}>
          <span className={`block w-1.5 h-1.5 m-auto mt-[3px] rounded-full ${p.veg ? "bg-[#5B6146]" : "bg-[#8B4A3B]"}`} />
        </span>
      </div>
      <p className="text-[13px] nb-text-fade mt-1.5 leading-relaxed grow">{p.desc}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="nb-display text-lg">{money(p.price)}</span>
        <div className="flex items-center gap-1 text-xs nb-text-fade"><Star size={12} fill="#A9834C" color="#A9834C" />{p.rating}</div>
      </div>
      <button onClick={()=>onOpen(p)} className="nb-btn nb-btn-outline mt-3 text-sm py-2.5 flex items-center justify-center gap-2 nb-focus">
        Customize & Add <Plus size={14} />
      </button>
    </div>
  </div>
);

export default ProductCard;
