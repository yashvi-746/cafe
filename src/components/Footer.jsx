import { useState } from "react";
import { Coffee, Send, Check } from "lucide-react";

const Footer = ({ setPage }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  return (
    <footer className="nb-bg-ink nb-text-cream pt-16 pb-28 md:pb-10 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-4 gap-10">
        <div>
          <span className="nb-display text-xl flex items-center gap-2"><Coffee size={18}/> NOIR & BEAN</span>
          <p className="text-sm text-white/60 mt-4 leading-relaxed max-w-[220px]">Coffee, slowly. Life, beautifully.</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/50 mb-4">Visit</p>
          <p className="text-sm text-white/80 leading-relaxed">12 Alkapuri Road<br/>Vadodara, Gujarat 390007</p>
          <p className="text-sm text-white/80 mt-3">7:00 AM – 11:00 PM daily</p>
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/50 mb-4">Explore</p>
          <div className="flex flex-col gap-2.5 text-sm text-white/80">
            {["menu","events","journal","gallery","about"].map(k=>(
              <button key={k} onClick={()=>setPage(k)} className="text-left nb-underline w-fit capitalize nb-focus">{k}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-wide text-white/50 mb-4">Stay in the loop</p>
          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400 py-2 border-b border-emerald-500/40">
              <Check size={14} /> <span>Subscribed! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex border-b border-white/30 pb-2 items-center">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Email address" 
                className="bg-transparent text-sm outline-none placeholder:text-white/40 w-full text-white" 
                required 
              />
              <button type="submit" className="p-1 hover:text-white transition-colors text-white/70">
                <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
        <span>© 2026 Noir & Bean. All rights reserved.</span>
        <div className="flex gap-4">
          <button onClick={()=>setPage("staff")} className="hover:text-white/70">Staff</button>
          <button onClick={()=>setPage("kitchen")} className="hover:text-white/70">Kitchen</button>
          <button onClick={()=>setPage("admin")} className="hover:text-white/70">Admin</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
