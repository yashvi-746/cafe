import { useState, useEffect } from "react";
import { Coffee, Calendar, Users, Settings, Package, TrendingUp, AlertTriangle, Wallet, LayoutGrid, BarChart3, Boxes, Megaphone, MessageSquare, Edit3 } from "lucide-react";
import { PRODUCTS as FALLBACK_PRODUCTS, REVIEWS, ADMIN_CUSTOMERS, INVENTORY as FALLBACK_INVENTORY, REV_DATA, FORECAST } from "../data/demoData";
import { Badge } from "../components/common";
import { money } from "../utils/format";
import MiniBarChart from "../components/MiniBarChart";
import { fetchProducts, fetchOrders, fetchInventory, fetchCustomers, fetchReservations } from "../utils/api";

const Admin = ({ products, setProducts, showToast }) => {
  const [tab, setTab] = useState("overview");
  const [range, setRange] = useState("7 Days");
  const [productsList, setProductsList] = useState(products || FALLBACK_PRODUCTS);

  useEffect(() => {
    if (products && products.length > 0) {
      setProductsList(products);
    }
  }, [products]);

  const updateProducts = (newList) => {
    setProductsList(newList);
    if (setProducts) {
      setProducts(newList);
    }
  };
  const [ordersList, setOrdersList] = useState([]);
  const [inventoryList, setInventoryList] = useState(FALLBACK_INVENTORY);
  const [customersList, setCustomersList] = useState(ADMIN_CUSTOMERS);
  const [reservationsList, setReservationsList] = useState([]);
  
  // Interactive tab states
  const [reviewsList, setReviewsList] = useState(REVIEWS.map(r => ({ ...r, reply: "" })));
  const [replyInput, setReplyInput] = useState({});
  const [campaignsList, setCampaignsList] = useState([
    { name: "Monsoon Collection Launch", status: "Live" },
    { name: "Weekend Brunch Push", status: "Live" },
    { name: "NOIR CLUB Referral Bonus", status: "Scheduled" }
  ]);
  const [couponsList, setCouponsList] = useState([
    "FIRSTORDER — 20% off",
    "BIRTHDAY — Free dessert",
    "ABANDONEDCART — 10% off"
  ]);

  // Admin settings state
  const [settings, setSettings] = useState({
    branchName: "Noir & Bean — Vadodara",
    branchAddress: "12 Alkapuri Road, Gujarat 390007",
    openingHours: "Daily · 7:00 AM – 11:00 PM",
    paymentMethods: "UPI, Card, Wallet, Net Banking, Cash",
    staffRoles: "4 Staff · 2 Managers · 1 Admin"
  });
  const [editingSettings, setEditingSettings] = useState(false);

  // New product state & Edit product state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: "",
    cat: "Coffee",
    price: "",
    desc: "",
    img: ""
  });

  useEffect(() => {
    fetchProducts().then(d => {
      if (d && d.length) {
        updateProducts(d);
      }
    });
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

  const toggleFeatureReview = (id) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, feat: !r.feat } : r));
    if (showToast) showToast("Review feature status updated!");
  };

  const handlePostReply = (id) => {
    const text = replyInput[id];
    if (!text || !text.trim()) return;
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, reply: text.trim() } : r));
    setReplyInput(prev => ({ ...prev, [id]: "" }));
    if (showToast) showToast("Official reply posted!");
  };

  const handleAddCampaign = () => {
    const name = prompt("Enter new campaign title:", "Festival Special Discount");
    if (!name || !name.trim()) return;
    setCampaignsList(prev => [...prev, { name: name.trim(), status: "Live" }]);
    if (showToast) showToast(`Campaign "${name}" created!`);
  };

  const handleAddCoupon = () => {
    const code = prompt("Enter new coupon code (e.g., FESTIVE25):", "FESTIVE25");
    if (!code || !code.trim()) return;
    setCouponsList(prev => [...prev, `${code.trim().toUpperCase()} — 25% off`]);
    if (showToast) showToast(`Coupon ${code.toUpperCase()} created!`);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setEditingSettings(false);
    if (showToast) showToast("Store settings updated successfully!");
  };

  const openNewProductForm = () => {
    setEditingProduct(null);
    setProdForm({
      name: "",
      cat: "Coffee",
      price: "",
      desc: "Newly added specialty menu item.",
      img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    });
    setShowAddProduct(true);
  };

  const openEditProductForm = (p) => {
    setEditingProduct(p);
    setProdForm({
      name: p.name || "",
      cat: p.cat || "Coffee",
      price: p.price !== undefined ? p.price : "",
      desc: p.desc || "",
      img: p.img || ""
    });
    setShowAddProduct(true);
  };

  const handleAddOrUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!prodForm.name.trim() || !prodForm.price) return;

    if (editingProduct) {
      const updated = productsList.map(item => {
        if (item.id === editingProduct.id || (item.name === editingProduct.name && !item.id)) {
          return {
            ...item,
            name: prodForm.name.trim(),
            cat: prodForm.cat,
            price: Number(prodForm.price),
            desc: prodForm.desc.trim() || item.desc,
            img: prodForm.img.trim() || item.img
          };
        }
        return item;
      });
      updateProducts(updated);
      if (showToast) showToast(`Product "${prodForm.name}" updated!`);
    } else {
      const item = {
        id: "p" + Date.now(),
        name: prodForm.name.trim(),
        cat: prodForm.cat,
        price: Number(prodForm.price),
        veg: true,
        best: false,
        desc: prodForm.desc.trim() || "Newly added specialty menu item.",
        img: prodForm.img.trim() || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
        rating: 5.0
      };
      updateProducts([item, ...productsList]);
      if (showToast) showToast(`Product "${item.name}" added to menu!`);
    }
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  return (
    <div className="pt-16 min-h-screen nb-bg-paper2 flex">
      <div className="hidden md:flex flex-col w-56 shrink-0 nb-bg-ink nb-text-cream min-h-[calc(100vh-64px)] pt-8 px-4">
        <span className="nb-display text-lg px-2 mb-8 flex items-center gap-2"><Coffee size={16}/>Admin</span>
        {tabs.map(t=>(
          <button key={t.k} onClick={()=>setTab(t.k)} className={`nb-focus flex items-center gap-2.5 px-3 py-2.5 text-sm text-left rounded-none ${tab===t.k ? "bg-white/10 font-bold" : "text-white/60 hover:text-white"}`}><t.i size={14}/>{t.l}</button>
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
              <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
                {["Today","7 Days","30 Days","3 Months","1 Year"].map(r=>(
                  <button key={r} onClick={()=>setRange(r)} className={`text-xs px-3 py-1.5 border nb-border ${range===r ? "nb-bg-ink nb-text-cream" : ""}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[{l:"Today's Revenue",v:"₹58,900",i:TrendingUp},{l:"Orders",v:ordersList.length || "142",i:Package},{l:"Reservations",v:reservationsList.length || "14",i:Calendar},{l:"Customers",v:customersList.length || "1,204",i:Users},{l:"Avg Order Value",v:"₹415",i:BarChart3}].map(c=>(
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
            <div className="flex justify-between items-center mb-5">
              <h2 className="nb-display text-2xl">Products ({productsList.length})</h2>
              <button 
                onClick={() => {
                  if (showAddProduct) {
                    setShowAddProduct(false);
                    setEditingProduct(null);
                  } else {
                    openNewProductForm();
                  }
                }} 
                className="nb-btn nb-btn-primary text-xs px-4 py-2.5 nb-focus flex items-center gap-1.5"
              >
                {showAddProduct ? "Cancel" : "+ New Product"}
              </button>
            </div>

            {showAddProduct && (
              <form onSubmit={handleAddOrUpdateProductSubmit} className="nb-card p-5 mb-5 space-y-3 max-w-lg nb-fade-up border-2 border-[#A9834C]/40">
                <div className="flex justify-between items-center border-b nb-border pb-2">
                  <p className="text-sm font-bold text-[#A9834C]">
                    {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Menu Item"}
                  </p>
                  <button type="button" onClick={()=>{setShowAddProduct(false); setEditingProduct(null);}} className="text-xs text-stone-500 hover:text-black">✕</button>
                </div>
                
                <div>
                  <label className="text-[11px] font-semibold block text-stone-600 mb-1">Product Title</label>
                  <input 
                    value={prodForm.name} 
                    onChange={e => setProdForm({ ...prodForm, name: e.target.value })} 
                    placeholder="e.g. Honey Sea Salt Cold Brew" 
                    className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white font-medium" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold block text-stone-600 mb-1">Category</label>
                    <select 
                      value={prodForm.cat} 
                      onChange={e => setProdForm({ ...prodForm, cat: e.target.value })} 
                      className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white font-medium"
                    >
                      {["Coffee","Tea","Cold Drinks","Breakfast","Bakery","Lunch","Desserts","Signature","Seasonal"].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold block text-stone-600 mb-1">Price (₹)</label>
                    <input 
                      type="number" 
                      value={prodForm.price} 
                      onChange={e => setProdForm({ ...prodForm, price: e.target.value })} 
                      placeholder="e.g. 290" 
                      className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white font-medium" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold block text-stone-600 mb-1">Description</label>
                  <input 
                    value={prodForm.desc} 
                    onChange={e => setProdForm({ ...prodForm, desc: e.target.value })} 
                    placeholder="Short flavorful description of the dish or drink" 
                    className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white" 
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold block text-stone-600 mb-1">Image URL</label>
                  <input 
                    value={prodForm.img} 
                    onChange={e => setProdForm({ ...prodForm, img: e.target.value })} 
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white font-mono text-[11px]" 
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="nb-btn nb-btn-brass text-xs px-5 py-2 font-semibold">
                    {editingProduct ? "Save Changes" : "+ Add Product"}
                  </button>
                  <button type="button" onClick={()=>{setShowAddProduct(false); setEditingProduct(null);}} className="nb-btn nb-btn-outline text-xs px-4 py-2">
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="nb-card overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead><tr className="text-left text-xs nb-text-fade border-b nb-border"><th className="p-3">Item</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Status</th><th className="p-3 text-right">Actions</th></tr></thead>
                <tbody>
                  {productsList.map(p=>(
                    <tr key={p.id || p.name} className="border-b nb-border hover:bg-stone-50/50">
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.img} alt={p.name} className="w-8 h-8 rounded object-cover border border-stone-200" />
                        <div>
                          <p className="font-medium text-xs md:text-sm">{p.name}</p>
                          <p className="text-[10px] text-stone-400 line-clamp-1 max-w-[200px]">{p.desc}</p>
                        </div>
                      </td>
                      <td className="p-3 nb-text-fade text-xs">{p.cat}</td>
                      <td className="p-3 font-semibold text-xs md:text-sm">{money(p.price)}</td>
                      <td className="p-3"><Badge tone="olive">Active</Badge></td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => openEditProductForm(p)} 
                          className="nb-btn nb-btn-outline text-xs px-2.5 py-1 inline-flex items-center gap-1 hover:border-black"
                          title="Edit product"
                        >
                          <Edit3 size={13} className="nb-text-brass"/> Edit
                        </button>
                      </td>
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
                <thead><tr className="text-left text-xs nb-text-fade border-b nb-border"><th className="p-3">Item</th><th className="p-3">Stock</th><th className="p-3">Minimum</th><th className="p-3">Supplier</th><th className="p-3">Status</th><th className="p-3">Restock</th></tr></thead>
                <tbody>
                  {inventoryList.map((i, idx)=>(
                    <tr key={i.item} className="border-b nb-border">
                      <td className="p-3 font-medium">{i.item}</td><td className="p-3 font-semibold">{i.stock} {i.unit}</td><td className="p-3 nb-text-fade">{i.min} {i.unit}</td><td className="p-3 nb-text-fade">{i.supplier}</td>
                      <td className="p-3">{i.stock<i.min ? <Badge tone="brass">Low Stock</Badge> : <Badge tone="olive">OK</Badge>}</td>
                      <td className="p-3">
                        <button onClick={()=>{
                          setInventoryList(prev => prev.map((item, index) => index === idx ? { ...item, stock: item.stock + 10 } : item));
                          if (showToast) showToast(`Restocked +10 ${i.unit} of ${i.item}`);
                        }} className="nb-btn nb-btn-outline text-[11px] px-2.5 py-1">
                          +10 {i.unit}
                        </button>
                      </td>
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
            <h2 className="nb-display text-2xl mb-5">Marketing & Campaigns</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="nb-card p-5">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-semibold">Active Campaigns</p>
                  <button onClick={handleAddCampaign} className="text-xs nb-text-brass font-bold hover:underline">+ Add</button>
                </div>
                <div className="space-y-2">
                  {campaignsList.map((c, i)=>(
                    <div key={i} className="flex justify-between items-center py-2 border-b nb-border last:border-0 text-sm">
                      <span>{c.name}</span>
                      <Badge tone={c.status === "Live" ? "olive" : "brass"}>{c.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nb-card p-5">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm font-semibold">Coupons & Promo Codes</p>
                  <button onClick={handleAddCoupon} className="text-xs nb-text-brass font-bold hover:underline">+ Add</button>
                </div>
                <div className="space-y-2">
                  {couponsList.map((c, i)=>(
                    <div key={i} className="flex justify-between items-center py-2 border-b nb-border last:border-0 text-sm font-mono">{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab==="reviews" && (
          <div>
            <h2 className="nb-display text-2xl mb-5">Customer Reviews ({reviewsList.length})</h2>
            <div className="space-y-3">
              {reviewsList.map(r=>(
                <div key={r.id} className="nb-card p-4 space-y-3">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <p className="text-sm font-semibold">{r.name} — <span className="nb-text-brass">{r.rating}★</span></p>
                      <p className="text-sm nb-text-fade mt-1 max-w-md">{r.text}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={()=>toggleFeatureReview(r.id)} className={`nb-btn text-xs px-3 py-1.5 nb-focus ${r.feat ? "nb-btn-brass" : "nb-btn-outline"}`}>
                        {r.feat ? "Featured ★" : "Feature"}
                      </button>
                    </div>
                  </div>

                  {r.reply && (
                    <div className="p-3 bg-white/70 border-l-2 border-[#A9834C] text-xs">
                      <p className="font-bold text-[#A9834C]">Response from Café Manager:</p>
                      <p className="mt-0.5 text-neutral-700">{r.reply}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <input 
                      value={replyInput[r.id] || ""} 
                      onChange={e => setReplyInput({ ...replyInput, [r.id]: e.target.value })} 
                      placeholder="Write an official response..." 
                      className="grow border nb-border px-3 py-1.5 text-xs outline-none bg-white" 
                    />
                    <button onClick={()=>handlePostReply(r.id)} className="nb-btn nb-btn-primary text-xs px-3 py-1.5">Reply</button>
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
                    <tr key={c.name} className="border-b nb-border"><td className="p-3 font-medium">{c.name}</td><td className="p-3">{c.orders || 12}</td><td className="p-3 font-semibold">{money(c.spend || c.points * 10)}</td><td className="p-3"><Badge tone={c.tier==="BLACK"?"ink":c.tier==="GOLD"?"brass":"outline"}>{c.tier}</Badge></td></tr>
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
                <div key={i} className="nb-card p-4 flex justify-between items-center flex-wrap gap-2 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="nb-text-fade">{r.date}, {r.time}</span>
                  <span>{r.guests} guests</span>
                  <span>{r.table}</span>
                  <Badge tone="olive">{r.status || 'Confirmed'}</Badge>
                </div>
              )) : (
                <p className="text-xs nb-text-fade">No live reservations yet.</p>
              )}
            </div>
          </div>
        )}

        {tab==="settings" && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="nb-display text-2xl">Store Settings</h2>
              <button onClick={()=>setEditingSettings(e=>!e)} className="nb-btn nb-btn-outline text-xs px-4 py-2">
                {editingSettings ? "Cancel" : "Edit Settings"}
              </button>
            </div>

            {editingSettings ? (
              <form onSubmit={handleSaveSettings} className="nb-card p-6 space-y-4 max-w-xl nb-fade-up">
                <div>
                  <label className="text-xs font-semibold block mb-1">Branch Name</label>
                  <input value={settings.branchName} onChange={e=>setSettings({ ...settings, branchName: e.target.value })} className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Branch Address</label>
                  <input value={settings.branchAddress} onChange={e=>setSettings({ ...settings, branchAddress: e.target.value })} className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Opening Hours</label>
                  <input value={settings.openingHours} onChange={e=>setSettings({ ...settings, openingHours: e.target.value })} className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Payment Methods</label>
                  <input value={settings.paymentMethods} onChange={e=>setSettings({ ...settings, paymentMethods: e.target.value })} className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white" />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-1">Staff Roles</label>
                  <input value={settings.staffRoles} onChange={e=>setSettings({ ...settings, staffRoles: e.target.value })} className="w-full border nb-border px-3 py-2 text-xs outline-none bg-white" />
                </div>
                <button type="submit" className="nb-btn nb-btn-primary text-xs px-5 py-2.5">Save Store Settings</button>
              </form>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                <div className="nb-card p-5"><p className="text-sm font-semibold mb-2">Branch details</p><p className="text-xs nb-text-fade whitespace-pre-line">{settings.branchName}<br/>{settings.branchAddress}</p></div>
                <div className="nb-card p-5"><p className="text-sm font-semibold mb-2">Opening hours</p><p className="text-xs nb-text-fade">{settings.openingHours}</p></div>
                <div className="nb-card p-5"><p className="text-sm font-semibold mb-2">Payment methods</p><p className="text-xs nb-text-fade">{settings.paymentMethods}</p></div>
                <div className="nb-card p-5"><p className="text-sm font-semibold mb-2">Staff roles</p><p className="text-xs nb-text-fade">{settings.staffRoles}</p></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
