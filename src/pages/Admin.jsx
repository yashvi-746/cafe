import { useState, useEffect } from "react";
import { Coffee, Calendar, Users, Settings, Package, TrendingUp, AlertTriangle, Wallet, LayoutGrid, BarChart3, Boxes, Megaphone, MessageSquare, Edit3 } from "lucide-react";
import { PRODUCTS as FALLBACK_PRODUCTS, REVIEWS, ADMIN_CUSTOMERS, INVENTORY as FALLBACK_INVENTORY, REV_DATA, FORECAST } from "../data/demoData";
import { Badge } from "../components/common";
import { money } from "../utils/format";
import MiniBarChart from "../components/MiniBarChart";
import { fetchProducts, fetchOrders, fetchInventory, fetchCustomers, fetchReservations } from "../utils/api";

const Admin = () => {
  const [tab, setTab] = useState("overview");
  const [range, setRange] = useState("7 Days");
  const [productsList, setProductsList] = useState(FALLBACK_PRODUCTS);
  const [ordersList, setOrdersList] = useState([]);
  const [inventoryList, setInventoryList] = useState(FALLBACK_INVENTORY);
  const [customersList, setCustomersList] = useState(ADMIN_CUSTOMERS);
  const [reservationsList, setReservationsList] = useState([]);

  useEffect(() => {
    fetchProducts().then(d => d && d.length && setProductsList(d));
    fetchOrders().then(d => d && d.length && setOrdersList(d));
    fetchInventory().then(d => d && d.length && setInventoryList(d));
    fetchCustomers().then(d => d && d.length && setCustomersList(d));
    fetchReservations().then(d => d && d.length && setReservationsList(d));
  }, []);

  const tabs = [
    {k:"overview",l:"Overview",i:LayoutGrid},{k:"products",l:"Products",i:Package},{k:"inventory",l:"Inventory",i:Boxes},
    {k:"analytics",l:"Analytics",i:BarChart3},{k:"marketing",l:"Marketing",i:Megaphone},{k:"reviews",l:"Reviews",i:MessageSquare},
    {k:"customers",l:"Customers",i:Users},{k:"reservations",l:"Reservations",i:Calendar},{k:"settings",l:"Settings",i:Settings},
  ];
  const lowStock = inventoryList.filter(i=>i.stock<i.min);

  return (
    <div className="pt-16 min-h-screen nb-bg-paper2 flex">
      <div className="hidden md:flex flex-col w-56 shrink-0 nb-bg-ink nb-text-cream min-h-[calc(100vh-64px)] pt-8 px-4">
        <span className="nb-display text-lg px-2 mb-8 flex items-center gap-2"><Coffee size={16}/>Admin</span>
        {tabs.map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} className={`nb-focus flex items-center gap-2.5 px-3 py-2.5 text-sm text-left rounded-none ${tab===t.k ? "bg-white/10" : "text-white/60 hover:text-white"}`}><t.i size={14}/>{t.l}</button>
        ))}
      </div>
      <div className="grow p-5 md:p-8 min-w-0">
        <div className="flex gap-2 overflow-x-auto nb-scroll pb-2 mb-4 md:hidden">
          {tabs.map(t=><button key={t.k} onClick={()=>setTab(t.k)} className={`shrink-0 px-3 py-2 text-xs border nb-border ${tab===t.k ? "nb-bg-ink nb-text-cream" : ""}`}>{t.l}</button>)}
        </div>

        {tab==="overview" && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="nb-display text-2xl">Overview</h2>
              <div className="flex gap-1.5">
                {["Today","7 Days","30 Days","3 Months","1 Year"].map(r=>(
                  <button key={r} onClick={()=>setRange(r)} className={`text-xs px-3 py-1.5 border nb-border ${range===r ? "nb-bg-ink nb-text-cream" : ""}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[{l:"Today's Revenue",v:"₹58,900",i:TrendingUp},{l:"Orders",v:"142",i:Package},{l:"Reservations",v:"14",i:Calendar},{l:"Customers",v:"1,204",i:Users},{l:"Avg Order Value",v:"₹415",i:BarChart3}].map(c=>(
                <div key={c.l} className="nb-card p-4"><c.i size={15} className="nb-text-mocha"/><p className="nb-display text-xl mt-2">{c.v}</p><p className="text-xs nb-text-fade mt-0.5">{c.l}</p></div>
              ))}
            </div>
            <div className="grid lg:grid-cols-3 gap-4 mt-6">
              <div className="nb-card p-5 lg:col-span-2">
                <p className="text-sm font-semibold mb-4">Revenue, this week</p>
                <MiniBarChart data={REV_DATA} />
              </div>
              <div className="nb-card p-5">
                <p className="text-sm font-semibold mb-3 flex items-center gap-1.5"><AlertTriangle size={14} className="nb-text-brass"/> Low stock</p>
                <div className="space-y-2">
                  {lowStock.map(i=>(<div key={i.item} className="flex justify-between text-xs"><span>{i.item}</span><span className="nb-text-brass">{i.stock}{i.unit} left</span></div>))}
                </div>
              </div>
            </div>
            <div className="nb-card p-5 mt-4">
              <p className="text-sm font-semibold mb-3">Tomorrow's demand forecast</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
                {FORECAST.map(f=>(
                  <div key={f.name} className="flex justify-between items-center p-2.5 nb-bg-paper2 text-xs">
                    <span>{f.name}</span>
                    <Badge tone={f.level==="HIGH" ? "brass" : f.level==="MEDIUM" ? "olive" : "outline"}>{f.level}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==="products" && (
          <div>
            <div className="flex justify-between items-center mb-5"><h2 className="nb-display text-2xl">Products</h2><button className="nb-btn nb-btn-primary text-xs px-4 py-2.5 nb-focus">+ New Product</button></div>
            <div className="nb-card overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead><tr className="text-left text-xs nb-text-fade border-b nb-border"><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
                <tbody>
                  {productsList.map(p=>(
                    <tr key={p.id || p.name} className="border-b nb-border">
                      <td className="p-3">{p.name}</td><td className="p-3 nb-text-fade">{p.cat}</td><td className="p-3">{money(p.price)}</td>
                      <td className="p-3"><Badge tone="olive">Active</Badge></td>
                      <td className="p-3"><button className="nb-focus"><Edit3 size={13} className="nb-text-fade"/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="inventory" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Inventory</h2>
            <div className="nb-card overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead><tr className="text-left text-xs nb-text-fade border-b nb-border"><th className="p-3">Item</th><th className="p-3">Stock</th><th className="p-3">Minimum</th><th className="p-3">Supplier</th><th className="p-3">Status</th></tr></thead>
                <tbody>
                  {inventoryList.map(i=>(
                    <tr key={i.item} className="border-b nb-border">
                      <td className="p-3">{i.item}</td><td className="p-3">{i.stock} {i.unit}</td><td className="p-3 nb-text-fade">{i.min} {i.unit}</td><td className="p-3 nb-text-fade">{i.supplier}</td>
                      <td className="p-3">{i.stock<i.min ? <Badge tone="brass">Low Stock</Badge> : <Badge tone="olive">OK</Badge>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="analytics" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Analytics</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-4">Revenue trend</p><MiniBarChart data={REV_DATA} /></div>
              <div className="nb-card p-5">
                <p className="text-sm font-semibold mb-4">Top categories</p>
                <div className="space-y-3">
                  {[["Coffee",68],["Bakery",44],["Desserts",39],["Lunch",31],["Tea",22]].map(([n,v])=>(
                    <div key={n}><div className="flex justify-between text-xs mb-1"><span>{n}</span><span>{v}%</span></div><div className="h-1.5 nb-bg-paper2"><div className="h-1.5 nb-bg-brass" style={{width:`${v}%`}}/></div></div>
                  ))}
                </div>
              </div>
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-2">Repeat customers</p><p className="nb-display text-3xl">61%</p><p className="text-xs nb-text-fade mt-1">of orders this month came from returning customers</p></div>
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-2">Peak hours</p><p className="nb-display text-3xl">8–10 AM · 4–6 PM</p><p className="text-xs nb-text-fade mt-1">Consistent across the last four weeks</p></div>
            </div>
          </div>
        )}

        {tab==="marketing" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Marketing</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-3">Active campaigns</p>
                {["Monsoon Collection Launch","Weekend Brunch Push","NOIR CLUB Referral Bonus"].map(c=>(
                  <div key={c} className="flex justify-between items-center py-2 border-b nb-border last:border-0 text-sm"><span>{c}</span><Badge tone="olive">Live</Badge></div>
                ))}
              </div>
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-3">Coupons</p>
                {["FIRSTORDER — 20% off","BIRTHDAY — Free dessert","ABANDONEDCART — 10% off"].map(c=>(
                  <div key={c} className="flex justify-between items-center py-2 border-b nb-border last:border-0 text-sm font-mono">{c}</div>
                ))}
              </div>
            </div>
            <button className="nb-btn nb-btn-primary text-xs px-4 py-2.5 mt-4 nb-focus">+ New Campaign</button>
          </div>
        )}

        {tab==="reviews" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Reviews</h2>
            <div className="space-y-3">
              {REVIEWS.map(r=>(
                <div key={r.id} className="nb-card p-4 flex justify-between items-start flex-wrap gap-2">
                  <div><p className="text-sm font-semibold">{r.name} — {r.rating}★</p><p className="text-sm nb-text-fade mt-1 max-w-md">{r.text}</p></div>
                  <div className="flex gap-2 shrink-0">
                    <button className="nb-btn nb-btn-outline text-xs px-3 py-1.5 nb-focus">{r.feat ? "Unfeature" : "Feature"}</button>
                    <button className="nb-btn nb-btn-outline text-xs px-3 py-1.5 nb-focus">Reply</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab==="customers" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Customers</h2>
            <div className="nb-card overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead><tr className="text-left text-xs nb-text-fade border-b nb-border"><th className="p-3">Name</th><th className="p-3">Orders</th><th className="p-3">Total Spend</th><th className="p-3">Tier</th></tr></thead>
                <tbody>
                  {customersList.map(c=>(
                    <tr key={c.name} className="border-b nb-border"><td className="p-3">{c.name}</td><td className="p-3">{c.orders || 12}</td><td className="p-3">{money(c.spend || c.points * 10)}</td><td className="p-3"><Badge tone={c.tier==="BLACK"?"ink":c.tier==="GOLD"?"brass":"outline"}>{c.tier}</Badge></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab==="reservations" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Reservations ({reservationsList.length})</h2>
            <div className="space-y-2">
              {reservationsList.length > 0 ? reservationsList.map((r,i)=>(
                <div key={i} className="nb-card p-4 flex justify-between items-center flex-wrap gap-2 text-sm"><span>{r.name}</span><span className="nb-text-fade">{r.date}, {r.time}</span><span>{r.guests} guests</span><span>{r.table}</span><Badge tone="olive">{r.status || 'Confirmed'}</Badge></div>
              )) : (
                <p className="text-xs nb-text-fade">No live reservations yet.</p>
              )}
            </div>
          </div>
        )}

        {tab==="settings" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Settings</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-3">Branch details</p><p className="text-xs nb-text-fade">Noir & Bean — Vadodara<br/>12 Alkapuri Road, Gujarat 390007</p></div>
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-3">Opening hours</p><p className="text-xs nb-text-fade">Daily · 7:00 AM – 11:00 PM</p></div>
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-3">Payment methods</p><p className="text-xs nb-text-fade">UPI, Card, Wallet, Net Banking, Cash</p></div>
              <div className="nb-card p-5"><p className="text-sm font-semibold mb-3">Staff roles</p><p className="text-xs nb-text-fade">4 Staff · 2 Managers · 1 Admin</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Admin;
