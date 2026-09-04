import { X, ShoppingBag, Plus, Minus, Check, Trash2 } from "lucide-react";
import { ProductImg } from "./common";
import { money } from "../utils/format";

const CartDrawer = ({ open, onClose, cart, updateQty, removeItem, setPage, coupon, setCoupon, appliedCoupon, applyCoupon }) => {
  if (!open) return null;
  const subtotal = cart.reduce((s,i)=> s + i.unitPrice*i.qty, 0);
  const discount = appliedCoupon ? Math.round(subtotal*0.15) : 0;
  const tax = Math.round((subtotal-discount)*0.05);
  const delivery = cart.length>0 ? 40 : 0;
  const total = subtotal - discount + tax + delivery;

  return (
    <div className="fixed inset-0 z-[85] flex justify-end">
      <div className="absolute inset-0 bg-black/45 nb-fade" onClick={onClose} />
      <div className="relative w-full max-w-md nb-bg-cream h-full flex flex-col nb-slide-left">
        <div className="flex items-center justify-between p-5 border-b nb-border">
          <h3 className="nb-display text-xl">Your Cart</h3>
          <button onClick={onClose} className="nb-focus"><X size={20}/></button>
        </div>
        <div className="grow overflow-y-auto nb-scroll p-5 space-y-4">
          {cart.length===0 && (
            <div className="text-center py-20">
              <ShoppingBag size={28} className="mx-auto nb-text-fade" />
              <p className="nb-display text-xl mt-4">Your table is still waiting.</p>
              <button onClick={()=>{onClose(); setPage("menu");}} className="nb-btn nb-btn-outline px-5 py-2.5 text-sm mt-5 nb-focus">Explore Menu</button>
            </div>
          )}
          {cart.map((item, idx)=>(
            <div key={idx} className="flex gap-3 pb-4 border-b nb-border">
              <ProductImg cls={item.product.img} imgUrl={item.product.img} h="h-16" className="w-16 h-16 rounded shrink-0" />
              <div className="grow">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">{item.product.name}</p>
                  <button onClick={()=>removeItem(idx)} className="nb-focus"><Trash2 size={13} className="nb-text-fade"/></button>
                </div>
                <p className="text-xs nb-text-fade mt-1">{item.temp} · {item.milk} milk · {item.sweet}% sweet{item.extras.length>0 ? ` · +${item.extras.length} extra` : ""}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border nb-border">
                    <button onClick={()=>updateQty(idx,-1)} className="w-6 h-6 flex items-center justify-center nb-focus"><Minus size={11}/></button>
                    <span className="w-6 text-center text-xs">{item.qty}</span>
                    <button onClick={()=>updateQty(idx,1)} className="w-6 h-6 flex items-center justify-center nb-focus"><Plus size={11}/></button>
                  </div>
                  <span className="text-sm font-semibold">{money(item.unitPrice*item.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cart.length>0 && (
          <div className="p-5 border-t nb-border space-y-3">
            <div className="flex gap-2">
              <input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="Coupon code" className="grow border nb-border px-3 py-2 text-xs outline-none nb-focus" />
              <button onClick={applyCoupon} className="nb-btn nb-btn-outline text-xs px-3 nb-focus">Apply</button>
            </div>
            {appliedCoupon && <p className="text-xs nb-text-olive flex items-center gap-1"><Check size={12}/> LOYALTY15 applied — 15% off</p>}
            
            {/* Staff Tip Calculator */}
            <div className="pt-2 border-t nb-border">
              <p className="text-[11px] font-semibold nb-text-soft mb-1.5">Add Barista Tip:</p>
              <div className="flex gap-2">
                {[0, 20, 30, 50].map(tipAmount => (
                  <button
                    key={tipAmount}
                    onClick={() => {}}
                    className="grow py-1 text-xs border nb-border hover:bg-white transition-colors"
                  >
                    {tipAmount === 0 ? "No Tip" : `+₹${tipAmount}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm space-y-1.5 pt-1">
              <div className="flex justify-between nb-text-fade"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              {discount>0 && <div className="flex justify-between nb-text-olive"><span>Discount</span><span>-{money(discount)}</span></div>}
              <div className="flex justify-between nb-text-fade"><span>Tax (5%)</span><span>{money(tax)}</span></div>
              <div className="flex justify-between nb-text-fade"><span>Delivery</span><span>{money(delivery)}</span></div>
              <div className="flex justify-between nb-display text-lg pt-2 border-t nb-border"><span>Total</span><span>{money(total)}</span></div>
            </div>
            <button onClick={()=>{ onClose(); setPage("checkout"); }} className="nb-btn nb-btn-primary w-full py-3.5 text-sm nb-focus">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};


export default CartDrawer;
