import { useState, useEffect } from "react";
import { ChefHat } from "lucide-react";
import { ADMIN_ORDERS } from "../data/demoData";
import { fetchOrders, updateOrderStatus } from "../utils/api";

const Kitchen = () => {
  const [orders, setOrders] = useState(ADMIN_ORDERS);
  const [mobileFilter, setMobileFilter] = useState("ALL");

  const loadOrders = async () => {
    const data = await fetchOrders();
    if (data && Array.isArray(data) && data.length > 0) {
      setOrders(data);
    }
  };

  useEffect(() => {
    loadOrders();
    const timer = setInterval(loadOrders, 5000);
    return () => clearInterval(timer);
  }, []);

  const flow = { NEW:"PREPARING", PREPARING:"READY", READY:"COMPLETED" };
  const actionLabel = { NEW:"Start Preparing", PREPARING:"Mark Ready", READY:"Complete" };

  const advance = async (id, currentStatus) => {
    const nextStatus = flow[currentStatus];
    if (!nextStatus) return;
    setOrders(os => os.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    await updateOrderStatus(id, nextStatus);
  };

  const cols = ["NEW","PREPARING","READY","COMPLETED"];
  const colColor = { NEW:"nb-text-brass", PREPARING:"nb-text-mocha", READY:"nb-text-olive", COMPLETED:"nb-text-fade" };
  const displayCols = mobileFilter === "ALL" ? cols : [mobileFilter];

  return (
    <div className="pt-24 pb-28 nb-bg-paper2 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-2"><ChefHat size={20}/><h2 className="nb-display text-2xl">Kitchen Display</h2></div>
          <div className="flex md:hidden gap-1.5 overflow-x-auto pb-1 max-w-full">
            {["ALL", ...cols].map(status => (
              <button
                key={status}
                onClick={() => setMobileFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${mobileFilter === status ? "nb-bg-ink nb-text-cream" : "bg-white border-black/10 text-neutral-600"}`}
              >
                {status} ({status === "ALL" ? orders.length : orders.filter(o => o.status === status).length})
              </button>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {displayCols.map(c=>(
            <div key={c}>
              <p className={`text-xs font-bold tracking-wide mb-3 ${colColor[c]}`}>{c} ({orders.filter(o=>o.status===c).length})</p>
              <div className="space-y-3">
                {orders.filter(o=>o.status===c).map(o=>(
                  <div key={o.id} className="nb-card p-4">
                    <div className="flex justify-between items-start"><p className="text-sm font-semibold">{o.id}</p><span className="text-xs nb-text-fade">{o.time || 2}m</span></div>
                    <p className="text-xs nb-text-mocha mt-0.5">{o.table} · {o.type}</p>
                    <ul className="text-xs nb-text-[#5A4D41] mt-2 space-y-0.5">{o.items.map((it,i)=><li key={i}>· {it}</li>)}</ul>
                    {o.notes && <p className="text-xs nb-text-brass mt-1.5 font-medium">Note: {o.notes}</p>}
                    {c!=="COMPLETED" && (
                      <button onClick={()=>advance(o.id, o.status)} className="nb-btn nb-btn-outline w-full text-xs py-2 mt-3 nb-focus font-semibold">{actionLabel[c]}</button>
                    )}
                  </div>
                ))}
                {orders.filter(o=>o.status===c).length===0 && <p className="text-xs nb-text-fade">Nothing here.</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
