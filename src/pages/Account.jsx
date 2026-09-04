import { useState } from "react";
import { Coffee, User, Heart, Calendar, Bell, LogOut, Package, Wallet, Award, Ticket, LayoutGrid } from "lucide-react";
import { PRODUCTS } from "../data/demoData";
import { money } from "../utils/format";
import { Badge, ProductImg } from "../components/common";
import LoginPage from "./LoginPage";

const Account = ({ user, onLogout, setPage, favorites, showToast, setUser }) => {
  const [tab, setTab] = useState("overview");
  const [profName, setProfName] = useState(user?.name || "Aditi Shah");
  const [profEmail, setProfEmail] = useState(user?.email || "aditi.shah@email.com");
  const [profPhone, setProfPhone] = useState(user?.phone || "+91 98250 11223");

  if (!user) return <LoginPage onLogin={()=>setPage("account")} setPage={setPage} />;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setUser) {
      setUser(u => ({ ...u, name: profName, email: profEmail, phone: profPhone }));
    }
    if (showToast) {
      showToast("Profile details saved successfully!");
    }
  };
  const tabs = [
    {k:"overview",l:"Overview",i:LayoutGrid},{k:"orders",l:"Orders",i:Package},{k:"reservations",l:"Reservations",i:Calendar},
    {k:"rewards",l:"Rewards",i:Award},{k:"favorites",l:"Favorites",i:Heart},{k:"coupons",l:"Coupons",i:Ticket},
    {k:"wallet",l:"Wallet",i:Wallet},{k:"notifications",l:"Notifications",i:Bell},{k:"profile",l:"Profile",i:User},
  ];
  const favProducts = PRODUCTS.filter(p=>favorites.includes(p.id));

  return (
    <div className="pt-24 md:pt-28 pb-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <p className="text-xs nb-text-mocha">Welcome back</p>
          <h2 className="nb-display text-2xl md:text-3xl mt-1">{user.name}</h2>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-xs md:text-sm nb-text-fade nb-focus hover:nb-text-ink"><LogOut size={14}/> Sign out</button>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="hidden md:flex flex-col gap-1 w-52 shrink-0">
          {tabs.map(t=>(
            <button key={t.k} onClick={()=>setTab(t.k)} className={`nb-focus flex items-center gap-2.5 px-3 py-2.5 text-sm text-left ${tab===t.k ? "nb-bg-ink nb-text-cream font-medium" : "nb-text-soft hover:nb-bg-paper2"}`}><t.i size={14}/>{t.l}</button>
          ))}
        </div>
        <div className="flex gap-2 md:hidden overflow-x-auto nb-scroll pb-2 mb-2 w-full shrink-0">
          {tabs.map(t=><button key={t.k} onClick={()=>setTab(t.k)} className={`shrink-0 px-3.5 py-2 text-xs border nb-border transition-all ${tab===t.k ? "nb-bg-ink nb-text-cream font-medium" : "bg-white/50 text-neutral-700"}`}>{t.l}</button>)}
        </div>
        <div className="grow min-w-0">
          {tab==="overview" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="nb-card p-5"><p className="text-xs nb-text-fade">Recent order</p><p className="nb-display text-lg mt-2">{user.orders[0]?.items?.join(", ") || "No recent orders"}</p><p className="text-xs nb-text-fade mt-1">{user.orders[0]?.date} · {money(user.orders[0]?.total || 0)}</p><button onClick={()=>setPage("menu")} className="text-xs nb-underline mt-3 nb-focus">Order Again</button></div>
              <div className="nb-card p-5"><p className="text-xs nb-text-fade">Upcoming reservation</p><p className="nb-display text-lg mt-2">{user.reservations[0]?.date || "None scheduled"}</p><p className="text-xs nb-text-fade mt-1">{user.reservations[0] ? `${user.reservations[0].time} · ${user.reservations[0].guests} guests · ${user.reservations[0].table}` : "Book a table anytime"}</p></div>
              <div className="nb-card p-5"><p className="text-xs nb-text-fade">Loyalty points</p><p className="nb-display text-2xl mt-2">{user.points}<span className="text-sm nb-text-fade"> pts</span></p><p className="text-xs nb-text-fade mt-1">{user.pointsToNext} to {user.nextTier}</p></div>
              <div className="nb-card p-5"><p className="text-xs nb-text-fade">A recommendation for you</p><p className="nb-display text-lg mt-2">Oat Flat White</p><p className="text-xs nb-text-fade mt-1">Based on your love of milk-forward drinks</p></div>
            </div>
          )}
          {tab==="orders" && (
            <div className="space-y-3">
              {!user.orders || user.orders.length === 0 ? (
                <div className="nb-card p-8 text-center"><p className="text-sm nb-text-fade">No orders placed yet.</p><button onClick={()=>setPage("menu")} className="nb-btn nb-btn-primary text-xs px-4 py-2 mt-4">Browse Menu</button></div>
              ) : (
                user.orders.map(o=>(
                  <div key={o.id} className="nb-card p-4 flex items-center justify-between flex-wrap gap-2">
                    <div><p className="text-sm font-semibold">{o.id}</p><p className="text-xs nb-text-fade mt-0.5">{o.items.join(", ")} · {o.date}</p></div>
                    <div className="flex items-center gap-4"><Badge tone="olive">{o.status}</Badge><span className="text-sm font-semibold">{money(o.total)}</span></div>
                  </div>
                ))
              )}
            </div>
          )}
          {tab==="reservations" && (
            <div className="space-y-3">
              {!user.reservations || user.reservations.length === 0 ? (
                <div className="nb-card p-8 text-center"><p className="text-sm nb-text-fade">No reservations found.</p><button onClick={()=>setPage("reserve")} className="nb-btn nb-btn-primary text-xs px-4 py-2 mt-4">Reserve a Table</button></div>
              ) : (
                user.reservations.map(r=>(
                  <div key={r.id} className="nb-card p-4 flex items-center justify-between flex-wrap gap-2">
                    <div><p className="text-sm font-semibold">{r.date} · {r.time}</p><p className="text-xs nb-text-fade mt-0.5">{r.guests} guests · {r.table}</p></div>
                    <Badge tone="olive">{r.status}</Badge>
                  </div>
                ))
              )}
            </div>
          )}
          {tab==="rewards" && (
            <div>
              <div className="nb-card p-6">
                <div className="flex justify-between items-baseline"><p className="nb-display text-2xl">{user.tier} Member</p><p className="text-sm nb-text-fade">{user.points} pts</p></div>
                <div className="h-1.5 nb-bg-paper2 mt-4"><div className="h-1.5 nb-bg-brass" style={{width:"64%"}} /></div>
                <p className="text-xs nb-text-fade mt-2">{user.pointsToNext} points to {user.nextTier}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-5">
                {[{n:"Free Coffee",p:500},{n:"Free Dessert",p:400},{n:"₹100 Off",p:300},{n:"Exclusive Seasonal Item",p:600}].map(r=>(
                  <div key={r.n} className="nb-card p-4 flex justify-between items-center"><span className="text-sm">{r.n}</span><span className="text-xs nb-text-fade font-mono">{r.p} pts</span></div>
                ))}
              </div>
            </div>
          )}
          {tab==="favorites" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favProducts.length===0 ? <p className="text-sm nb-text-fade">No favorites saved yet — tap the heart on any item.</p> :
                favProducts.map(p=>(
                  <div key={p.id} className="nb-card flex gap-3 p-3 items-center">
                    <ProductImg cls={p.img} imgUrl={p.img} h="h-16" className="w-16 h-16 rounded shrink-0" />
                    <div><p className="text-sm font-semibold">{p.name}</p><p className="text-xs nb-text-fade mt-1">{money(p.price)}</p></div>
                  </div>
              ))}
            </div>
          )}
          {tab==="coupons" && (
            <div className="space-y-3">
              {user.coupons.map(c=>(
                <div key={c.code} className="nb-card p-4 flex justify-between items-center flex-wrap gap-2">
                  <div><p className="text-sm font-mono font-semibold">{c.code}</p><p className="text-xs nb-text-fade mt-0.5">{c.desc}</p></div>
                  <span className="text-xs nb-text-fade">Exp {c.exp}</span>
                </div>
              ))}
            </div>
          )}
          {tab==="wallet" && (
            <div className="nb-card p-6"><p className="text-xs nb-text-fade">Wallet balance</p><p className="nb-display text-3xl mt-2">₹250.00</p><button className="nb-btn nb-btn-outline text-xs px-4 py-2 mt-4 nb-focus">Add Money</button></div>
          )}
          {tab==="notifications" && (
            <div className="space-y-2">
              {[
                {t:"Your order NB-10422 is ready for pickup", time:"2h ago"},
                {t:"Reservation reminder — tomorrow, 7:30 PM", time:"1d ago"},
                {t:"You've earned 40 loyalty points", time:"3d ago"},
                {t:"New seasonal menu is live", time:"5d ago"},
              ].map((n,i)=>(
                <div key={i} className="nb-card p-4 flex justify-between items-center gap-3"><span className="text-sm">{n.t}</span><span className="text-xs nb-text-fade shrink-0">{n.time}</span></div>
              ))}
            </div>
          )}
          {tab==="profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-3 max-w-sm">
              <div><label className="text-xs text-neutral-500 mb-1 block font-medium">Full Name</label><input value={profName} onChange={e=>setProfName(e.target.value)} className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus bg-white" required /></div>
              <div><label className="text-xs text-neutral-500 mb-1 block font-medium">Email</label><input type="email" value={profEmail} onChange={e=>setProfEmail(e.target.value)} className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus bg-white" required /></div>
              <div><label className="text-xs text-neutral-500 mb-1 block font-medium">Phone</label><input value={profPhone} onChange={e=>setProfPhone(e.target.value)} className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus bg-white" required /></div>
              <button type="submit" className="nb-btn nb-btn-primary px-5 py-2.5 text-sm nb-focus mt-2">Save Changes</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
