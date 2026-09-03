import React, { useState } from "react";
import { Check, ArrowRight, CreditCard, Wallet, Smartphone, Banknote } from "lucide-react";
import { money } from "../utils/format";
import { createOrder } from "../utils/api";

const Checkout = ({ cart, setPage, clearCart, appliedCoupon, setOrderNum }) => {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState("Dine In");
  const [name, setName] = useState("Aditi Shah");
  const [email, setEmail] = useState("aditi.shah@email.com");
  const [phone, setPhone] = useState("+91 98250 11223");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("UPI");
  const [placed, setPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((s,i)=> s + i.unitPrice*i.qty, 0);
  const discount = appliedCoupon ? Math.round(subtotal*0.15) : 0;
  const tax = Math.round((subtotal-discount)*0.05);
  const delivery = orderType==="Delivery" ? 40 : 0;
  const total = subtotal - discount + tax + delivery;
  const orderNumber = "NB-" + Math.floor(10000+Math.random()*89999);

  const [confirmedCart, setConfirmedCart] = useState([]);
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setConfirmedCart([...cart]);
    setConfirmedTotal(total);
    const orderData = {
      table: orderType === "Dine In" ? "Table 4" : orderType,
      type: orderType,
      items: cart.map(i => `${i.qty}x ${i.product.name}`),
      total,
      notes: address ? `Delivery to: ${address}` : `Paid via ${payment}`
    };
    const created = await createOrder(orderData);
    setIsSubmitting(false);
    setPlaced(true);
    setOrderNum(created ? created.id : orderNumber);
    clearCart();
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `===========================================
               NOIR & BEAN CAFE            
        12 Alkapuri Road, Vadodara, Gujarat 
===========================================
Order ID: ${orderNumber}
Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Customer: ${name} (${phone})
Type: ${orderType}
Payment: ${payment}
-------------------------------------------
ITEMS:
${confirmedCart.map(i => `${i.qty}x ${i.product.name} - ${money(i.unitPrice * i.qty)}`).join('\n')}
-------------------------------------------
TOTAL PAID: ${money(confirmedTotal)}
===========================================
         Thank you for visiting us!        
===========================================`;

    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${orderNumber}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (cart.length===0 && !placed) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-5">
        <p className="nb-display text-2xl">Your cart is empty.</p>
        <button onClick={()=>setPage("menu")} className="nb-btn nb-btn-primary px-5 py-3 text-sm mt-6 nb-focus">Explore Menu</button>
      </div>
    );
  }

  if (placed) {
    const maxPrep = confirmedCart.length > 0 ? Math.max(...confirmedCart.map(i => i.product.prep || 5)) : 10;
    return (
      <div className="pt-32 pb-24 max-w-lg mx-auto px-5 text-center nb-fade-up">
        <div className="w-16 h-16 rounded-full nb-bg-olive flex items-center justify-center mx-auto"><Check size={26} color="#fff"/></div>
        <h2 className="nb-display text-3xl mt-6">Order confirmed.</h2>
        <p className="text-sm nb-text-fade mt-2">Order {orderNumber} · estimated {maxPrep + 5} minutes</p>
        <div className="nb-card p-5 mt-8 text-left space-y-2">
          {confirmedCart.map((i,idx)=>(<div key={idx} className="flex justify-between text-sm"><span>{i.qty}× {i.product.name}</span><span>{money(i.unitPrice*i.qty)}</span></div>))}
          <div className="flex justify-between nb-display text-lg pt-3 border-t nb-border"><span>Total</span><span>{money(confirmedTotal)}</span></div>
          <p className="text-xs nb-text-fade pt-1">Paid via {payment}</p>
        </div>
        <div className="flex gap-3 mt-6 justify-center flex-wrap">
          <button onClick={()=>setPage("track")} className="nb-btn nb-btn-primary px-5 py-3 text-sm nb-focus">Track Order</button>
          <button onClick={handleDownloadReceipt} className="nb-btn nb-btn-outline px-5 py-3 text-sm nb-focus flex items-center gap-1.5">
            Download Receipt
          </button>
        </div>
      </div>
    );
  }

  const steps = ["Order Type","Details","Payment","Confirm"];
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-5">
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s,i)=>(
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 text-xs ${step>=i+1 ? "nb-text-ink" : "nb-text-fade"}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${step>=i+1 ? "nb-bg-ink nb-text-cream" : "border nb-border"}`}>{i+1}</span>
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i<steps.length-1 && <div className="h-px w-6 nb-bg-paper3" />}
          </React.Fragment>
        ))}
      </div>

      {step===1 && (
        <div className="nb-fade-up">
          <h3 className="nb-display text-2xl mb-6">How would you like it?</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {["Dine In","Pickup","Delivery"].map(t=>(
              <button key={t} onClick={()=>setOrderType(t)} className={`p-6 border nb-border text-left nb-focus ${orderType===t ? "nb-bg-ink nb-text-cream" : ""}`}>
                <p className="nb-display text-lg">{t}</p>
                <p className={`text-xs mt-1 ${orderType===t ? "text-white/60" : "nb-text-fade"}`}>{t==="Dine In" ? "Seat yourself, we'll find you" : t==="Pickup" ? "Ready in 10–15 min" : "30–45 min to your door"}</p>
              </button>
            ))}
          </div>
          <button onClick={()=>setStep(2)} className="nb-btn nb-btn-primary px-6 py-3 text-sm mt-8 flex items-center gap-2 nb-focus">Continue <ArrowRight size={14}/></button>
        </div>
      )}

      {step===2 && (
        <div className="nb-fade-up space-y-4 max-w-md">
          <h3 className="nb-display text-2xl mb-4">Your details</h3>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
          {orderType==="Delivery" && <textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Delivery address" className="w-full border nb-border px-3 py-2.5 text-sm outline-none h-20 nb-focus" />}
          <div className="flex gap-3 pt-2">
            <button onClick={()=>setStep(1)} className="nb-btn nb-btn-outline px-5 py-3 text-sm nb-focus">Back</button>
            <button onClick={()=>setStep(3)} className="nb-btn nb-btn-primary px-6 py-3 text-sm flex items-center gap-2 nb-focus">Continue <ArrowRight size={14}/></button>
          </div>
        </div>
      )}

      {step===3 && (
        <div className="nb-fade-up">
          <h3 className="nb-display text-2xl mb-6">Payment method</h3>
          <div className="grid sm:grid-cols-2 gap-3 max-w-md">
            {[{n:"UPI",i:Smartphone},{n:"Card",i:CreditCard},{n:"Wallet",i:Wallet},{n:"Cash",i:Banknote}].map(o=>(
              <button key={o.n} onClick={()=>setPayment(o.n)} className={`p-4 border nb-border flex items-center gap-3 nb-focus ${payment===o.n ? "nb-bg-ink nb-text-cream" : ""}`}>
                <o.i size={16}/> <span className="text-sm">{o.n}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-6">
            <button onClick={()=>setStep(2)} className="nb-btn nb-btn-outline px-5 py-3 text-sm nb-focus">Back</button>
            <button onClick={()=>setStep(4)} className="nb-btn nb-btn-primary px-6 py-3 text-sm flex items-center gap-2 nb-focus">Continue <ArrowRight size={14}/></button>
          </div>
        </div>
      )}

      {step===4 && (
        <div className="nb-fade-up grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="nb-display text-2xl mb-4">Review your order</h3>
            <div className="space-y-2 text-sm">
              {cart.map((i,idx)=>(<div key={idx} className="flex justify-between"><span>{i.qty}× {i.product.name}</span><span>{money(i.unitPrice*i.qty)}</span></div>))}
            </div>
            <div className="text-sm space-y-1.5 mt-4 pt-4 border-t nb-border">
              <div className="flex justify-between nb-text-fade"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              {discount>0 && <div className="flex justify-between nb-text-olive"><span>Discount</span><span>-{money(discount)}</span></div>}
              <div className="flex justify-between nb-text-fade"><span>Tax</span><span>{money(tax)}</span></div>
              <div className="flex justify-between nb-text-fade"><span>Delivery</span><span>{money(delivery)}</span></div>
              <div className="flex justify-between nb-display text-lg pt-2 border-t nb-border"><span>Total</span><span>{money(total)}</span></div>
            </div>
          </div>
          <div className="nb-card p-5 h-fit">
            <p className="text-xs nb-text-fade">{orderType} · {payment}</p>
            <p className="text-sm mt-1">{name} · {phone}</p>
            {address && <p className="text-sm mt-1 nb-text-fade">{address}</p>}
            <button 
              disabled={isSubmitting}
              onClick={handlePlaceOrder} 
              className="nb-btn nb-btn-primary w-full py-3.5 text-sm mt-5 nb-focus disabled:opacity-50"
            >
              {isSubmitting ? "Placing Order..." : `Place Order · ${money(total)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Checkout;
