import { ShieldCheck } from "lucide-react";

const Staff = () => (
  <div className="pt-24 pb-16 max-w-7xl mx-auto px-5 md:px-8">
    <div className="flex items-center gap-2 mb-8"><ShieldCheck size={20}/><h2 className="nb-display text-2xl">Staff Dashboard</h2></div>
    <div className="grid md:grid-cols-3 gap-4">
      <div className="nb-card p-5"><p className="text-xs nb-text-fade">Today's orders</p><p className="nb-display text-3xl mt-2">86</p></div>
      <div className="nb-card p-5"><p className="text-xs nb-text-fade">Reservations today</p><p className="nb-display text-3xl mt-2">14</p></div>
      <div className="nb-card p-5"><p className="text-xs nb-text-fade">Tables occupied</p><p className="nb-display text-3xl mt-2">9 / 16</p></div>
    </div>
    <h3 className="nb-display text-xl mt-10 mb-4">Table status</h3>
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {Array.from({length:16}).map((_,i)=>{
        const state = i%3===0 ? "occupied" : i%5===0 ? "reserved" : "open";
        const color = state==="occupied" ? "nb-bg-espresso nb-text-cream" : state==="reserved" ? "nb-bg-brass nb-text-cream" : "nb-card";
        return <div key={i} className={`${color} h-16 flex items-center justify-center text-xs`}>T{i+1}</div>;
      })}
    </div>
    <h3 className="nb-display text-xl mt-10 mb-4">Customer requests</h3>
    <div className="space-y-2">
      {["Table 4 requests water refill","Table 11 asks for the check","Table 2 needs high chair"].map((r,i)=>(
        <div key={i} className="nb-card p-3.5 flex justify-between items-center text-sm"><span>{r}</span><button className="nb-btn nb-btn-outline text-xs px-3 py-1.5 nb-focus">Resolve</button></div>
      ))}
    </div>
    <p className="text-xs nb-text-fade mt-8">Staff accounts cannot access billing, payroll, or system settings — those require Admin access.</p>
  </div>
);


export default Staff;
