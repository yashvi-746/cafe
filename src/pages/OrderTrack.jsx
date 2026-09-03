import { useState, useEffect } from "react";
import { Search, CheckCircle2, Clock } from "lucide-react";
import { fetchOrders } from "../utils/api";

const OrderTrack = ({ setPage }) => {
  const [searchId, setSearchId] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const stages = ["Order Confirmed", "Payment Received", "Preparing", "Ready", "Completed"];

  useEffect(() => {
    fetchOrders().then(orders => {
      if (orders && orders.length > 0) {
        setAllOrders(orders);
        setCurrentOrder(orders[0]); // default to latest order
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setLoading(true);
    const found = allOrders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase());
    setCurrentOrder(found || null);
    setLoading(false);
  };

  const getActiveStageIndex = (status) => {
    if (status === "NEW") return 1;
    if (status === "PREPARING") return 2;
    if (status === "READY") return 3;
    if (status === "COMPLETED") return 4;
    return 1;
  };

  const activeIndex = currentOrder ? getActiveStageIndex(currentOrder.status) : 1;

  return (
    <div className="pt-28 pb-24 max-w-xl mx-auto px-5">
      <div className="mb-8">
        <h2 className="nb-display text-3xl">Track Your Order</h2>
        <p className="text-sm nb-text-fade mt-1">Enter your Order ID (e.g. NB-10501) to view live status.</p>
        <form onSubmit={handleSearch} className="flex gap-2 mt-4">
          <input 
            value={searchId} 
            onChange={e=>setSearchId(e.target.value)} 
            placeholder="Search Order ID..." 
            className="grow border nb-border px-3 py-2.5 text-sm outline-none nb-focus" 
          />
          <button type="submit" className="nb-btn nb-btn-primary px-5 py-2.5 text-sm flex items-center gap-1.5 nb-focus">
            <Search size={14} /> Search
          </button>
        </form>
      </div>

      {currentOrder ? (
        <div className="nb-card p-6 nb-fade-up">
          <div className="flex justify-between items-start border-b nb-border pb-4 mb-6">
            <div>
              <p className="text-xs font-bold tracking-wider nb-text-mocha">{currentOrder.id}</p>
              <h3 className="nb-display text-2xl mt-1">Status: {currentOrder.status}</h3>
              <p className="text-xs nb-text-fade mt-1">{currentOrder.type} · {currentOrder.table}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 nb-bg-brass nb-text-cream rounded-full">
              ₹{currentOrder.total}
            </span>
          </div>

          <div className="space-y-0">
            {stages.map((s, i) => (
              <div key={s} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center ${i <= activeIndex ? "nb-bg-olive text-white" : "nb-bg-paper3"}`}>
                    {i <= activeIndex && <CheckCircle2 size={12} />}
                  </span>
                  {i < stages.length - 1 && <span className={`w-0.5 h-10 ${i < activeIndex ? "nb-bg-olive" : "nb-bg-paper3"}`} />}
                </div>
                <p className={`text-sm pb-8 font-medium ${i <= activeIndex ? "nb-text-ink" : "nb-text-fade"}`}>{s}</p>
              </div>
            ))}
          </div>

          {currentOrder.items && currentOrder.items.length > 0 && (
            <div className="border-t nb-border pt-4 mt-2">
              <p className="text-xs font-semibold nb-text-soft mb-2">Order Items:</p>
              <ul className="text-xs nb-text-fade space-y-1">
                {currentOrder.items.map((item, idx) => (
                  <li key={idx}>· {item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <button onClick={() => setPage("menu")} className="nb-btn nb-btn-outline px-5 py-2.5 text-xs nb-focus">
              Order Something Else
            </button>
            <button onClick={() => setPage("kitchen")} className="text-xs nb-underline nb-text-mocha">
              Open Kitchen View →
            </button>
          </div>
        </div>
      ) : (
        <div className="nb-card p-6 text-center py-12">
          <Clock size={28} className="mx-auto nb-text-fade mb-2" />
          <p className="nb-display text-lg">No active order found</p>
          <p className="text-xs nb-text-fade mt-1">Check your Order ID or place a new order from our menu.</p>
          <button onClick={() => setPage("menu")} className="nb-btn nb-btn-primary px-5 py-2.5 text-xs mt-4 nb-focus">
            Browse Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTrack;
