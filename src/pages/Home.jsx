import { useState } from "react";
import { Coffee, MapPin, Clock, ChevronRight, Star, ArrowRight, Building2 } from "lucide-react";
import { PRODUCTS, EVENTS, ARTICLES, REVIEWS } from "../data/demoData";
import { SectionHeading, ProductImg } from "../components/common";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

const Home = ({ setPage, openProduct, favorites, toggleFav, addToCart, user, products }) => {
  const allProducts = products || PRODUCTS;
  const bestsellers = allProducts.filter(p=>p.best).slice(0,6);
  const seasonal = allProducts.filter(p=>p.seasonal);
  const moments = [
    { t:"Morning", d:"Slow pour-overs before the day begins.", i:"nb-photo-1" },
    { t:"Work", d:"Quiet corners, strong wifi, stronger coffee.", i:"nb-photo-2" },
    { t:"Lunch", d:"Seasonal plates for an unhurried midday.", i:"nb-photo-3" },
    { t:"Evening", d:"Natural wine and small plates after five.", i:"nb-photo-4" },
    { t:"Late Night", d:"Dessert and decaf until close.", i:"nb-photo-5" },
  ];
  return (
    <div>
      <Hero setPage={setPage} />

      {/* TODAY'S POUR */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 -mt-14 relative z-10">
        <div className="nb-bg-cream border nb-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <ProductImg cls="nb-photo-2" imgUrl="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" h="h-28 w-28 md:h-32 md:w-32 shrink-0" />
          <div className="grow">
            <p className="text-xs nb-text-mocha mb-1">Today's Pour</p>
            <h3 className="nb-display text-2xl">Ethiopian Cold Brew</h3>
            <p className="text-sm nb-text-fade mt-1">Eighteen-hour steep, notes of blackberry and cocoa.</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="nb-display text-2xl">₹280</span>
            <button onClick={()=>openProduct(PRODUCTS.find(p=>p.id==="p2"))} className="nb-btn nb-btn-primary px-5 py-3 text-sm nb-focus">Order Now</button>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="Fan favorites" title="Best sellers" />
          <button onClick={()=>setPage("menu")} className="hidden md:flex items-center gap-1 text-sm nb-underline nb-focus">View full menu <ChevronRight size={14}/></button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bestsellers.map(p=>(
            <ProductCard key={p.id} p={p} onOpen={openProduct} isFav={favorites.includes(p.id)} onFav={toggleFav} />
          ))}
        </div>
      </section>

      {/* SEASONAL */}
      <section className="mt-28 nb-bg-espresso py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Limited run" title="Monsoon Collection" dark sub="Warm spice, roasted fruit, and drinks built for grey afternoons — through the end of September." />
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            {seasonal.map(p=>(
              <div key={p.id} className="flex flex-col sm:flex-row gap-5 items-start sm:items-center bg-white/5 p-5 border border-white/10 hover:bg-white/10 transition-colors">
                <ProductImg cls={p.img} imgUrl={p.img} h="h-36 w-full sm:w-36 sm:h-36 shrink-0 rounded-sm overflow-hidden" />
                <div className="grow min-w-0">
                  <h4 className="nb-display text-xl text-white leading-snug">{p.name}</h4>
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed">{p.desc}</p>
                  <p className="text-sm font-semibold text-[var(--brass-soft)] mt-3">₹{p.price}</p>
                </div>
                <button onClick={()=>openProduct(p)} className="nb-btn text-xs px-4 py-2.5 border border-white/40 text-white hover:bg-white hover:text-[var(--espresso)] shrink-0 nb-focus w-full sm:w-auto">Customize & Add</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <p className="nb-text-mocha text-sm mb-3">Our craft</p>
          <h2 className="nb-display text-4xl md:text-5xl leading-[1.08]">More than coffee.</h2>
          <p className="text-[15px] nb-text-fade leading-relaxed mt-6 max-w-md">We work directly with four growing regions, roast in small batches twice a week, and taste every lot before it reaches the bar. Every drink is built to order — nothing sits, nothing is rushed.</p>
          <p className="text-[15px] nb-text-fade leading-relaxed mt-4 max-w-md">Mornings here move slowly on purpose. Evenings a little slower still.</p>
          <button onClick={()=>setPage("about")} className="mt-6 flex items-center gap-2 text-sm nb-underline nb-focus">Read our story <ChevronRight size={14}/></button>
        </div>
        <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
          <ProductImg cls="nb-photo-3" imgUrl="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" h="h-72 mt-8" />
          <ProductImg cls="nb-photo-6" imgUrl="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80" h="h-72" />
        </div>
      </section>

      {/* MOMENTS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28">
        <SectionHeading eyebrow="A place for every hour" title="One café, five moods" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
          {[
            { t:"Morning", d:"Slow pour-overs before the day begins.", i:"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" },
            { t:"Work", d:"Quiet corners, strong wifi, stronger coffee.", i:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" },
            { t:"Lunch", d:"Seasonal plates for an unhurried midday.", i:"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" },
            { t:"Evening", d:"Natural wine and small plates after five.", i:"https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80" },
            { t:"Late Night", d:"Dessert and decaf until close.", i:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80" },
          ].map(m=>(
            <div key={m.t} className="nb-card nb-card-hover overflow-hidden">
              <ProductImg cls="nb-photo-1" imgUrl={m.i} h="h-52" />
              <div className="p-4"><h4 className="nb-display text-lg">{m.t}</h4><p className="text-xs nb-text-fade mt-1.5 leading-relaxed">{m.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mt-28 nb-bg-paper2 py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="What people say" title="A few kind words" />
          <div className="flex gap-5 mt-10 overflow-x-auto nb-scroll pb-4">
            {REVIEWS.filter(r=>r.feat).map(r=>(
              <div key={r.id} className="nb-bg-cream p-6 min-w-[300px] max-w-[320px] shrink-0 border nb-border">
                <div className="flex gap-1 mb-3">{Array.from({length:r.rating}).map((_,i)=><Star key={i} size={13} fill="#A9834C" color="#A9834C"/>)}</div>
                <p className="text-sm leading-relaxed nb-text-soft">"{r.text}"</p>
                <p className="text-xs nb-text-fade mt-4">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="Join us" title="Upcoming events" />
          <button onClick={()=>setPage("events")} className="hidden md:flex items-center gap-1 text-sm nb-underline nb-focus">All events <ChevronRight size={14}/></button>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {EVENTS.map(e=>(
            <div key={e.id} className="nb-card nb-card-hover overflow-hidden">
              <ProductImg cls={e.img} imgUrl={e.img} h="h-40" />
              <div className="p-5">
                <p className="text-xs nb-text-mocha">{e.date} · {e.time}</p>
                <h4 className="nb-display text-lg mt-2">{e.title}</h4>
                <p className="text-xs nb-text-fade mt-2 leading-relaxed">{e.desc}</p>
                <button onClick={()=>setPage("events")} className="text-xs mt-4 nb-underline flex items-center gap-1 nb-focus">Reserve your seat <ChevronRight size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JOURNAL */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="From the journal" title="Recent writing" />
          <button onClick={()=>setPage("journal")} className="hidden md:flex items-center gap-1 text-sm nb-underline nb-focus">Read the journal <ChevronRight size={14}/></button>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {ARTICLES.map(a=>(
            <div key={a.id} className="cursor-pointer group" onClick={()=>setPage("journal")}>
              <ProductImg cls={a.img} imgUrl={a.img} h="h-52" />
              <p className="text-xs nb-text-mocha mt-4">{a.cat} · {a.read}</p>
              <h4 className="nb-display text-xl mt-1.5 group-hover:opacity-70 transition-opacity">{a.title}</h4>
              <p className="text-sm nb-text-fade mt-2 leading-relaxed">{a.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 mt-28 grid md:grid-cols-2 gap-10">
        <div>
          <SectionHeading eyebrow="Find us" title="Visit the café" />
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex gap-3"><MapPin size={16} className="nb-text-mocha mt-0.5 shrink-0"/><span>12 Alkapuri Road, Vadodara, Gujarat 390007</span></div>
            <div className="flex gap-3"><Clock size={16} className="nb-text-mocha mt-0.5 shrink-0"/><span>Open daily, 7:00 AM – 11:00 PM</span></div>
            <div className="flex gap-3"><Building2 size={16} className="nb-text-mocha mt-0.5 shrink-0"/><span>Basement parking available, valet on weekends</span></div>
          </div>
          <button onClick={()=>setPage("locations")} className="mt-6 nb-btn nb-btn-outline px-5 py-3 text-sm nb-focus">Get Directions</button>
        </div>
        <ProductImg cls="nb-photo-4" imgUrl="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" h="h-72" />
      </section>

      {/* NEWSLETTER */}
      <HomeNewsletter />
    </div>
  );
};

const HomeNewsletter = () => {
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
    <section className="max-w-3xl mx-auto px-5 text-center mt-28">
      <h3 className="nb-display text-3xl">Stay in the loop.</h3>
      <p className="text-sm nb-text-fade mt-3">New menu drops, seasonal collections, and events — no more than twice a month.</p>
      
      {subscribed ? (
        <div className="mt-6 max-w-sm mx-auto p-3 nb-bg-olive/20 text-[var(--olive)] border border-[var(--olive)] text-sm font-semibold rounded-sm nb-fade-up">
          ✓ Subscribed! You're on our VIP list.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-sm mx-auto">
          <input 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email address" 
            className="grow border-b nb-border bg-transparent px-2 py-2.5 text-sm outline-none nb-focus" 
          />
          <button type="submit" className="nb-btn nb-btn-primary px-5 py-2.5 text-sm nb-focus">Subscribe</button>
        </form>
      )}
    </section>
  );
};


export default Home;
