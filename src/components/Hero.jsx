import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "01 · Specialty Coffee",
    titleLine1: "Coffee, slowly.",
    titleLine2: "Life, beautifully.",
    sub: "Single-origin pour overs & 18-hour cold brews crafted with patience in Vadodara.",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=85",
    sideImg1: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    sideImg2: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
    primaryBtn: "Explore Menu",
    primaryPage: "menu"
  },
  {
    id: 2,
    tag: "02 · Artisanal Bakery",
    titleLine1: "Baked daily.",
    titleLine2: "Served with warmth.",
    sub: "Laminated 36-hour butter croissants & house sourdough baked fresh every morning.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
    sideImg1: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    sideImg2: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    primaryBtn: "View Bakery",
    primaryPage: "menu"
  },
  {
    id: 3,
    tag: "03 · Monsoon Run",
    titleLine1: "Monsoon Chai &",
    titleLine2: "Roasted Fig Cake.",
    sub: "Cardamom cold foam over slow-brewed chai paired with brown butter fig cake.",
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85",
    sideImg1: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
    sideImg2: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=600&q=80",
    primaryBtn: "Order Special",
    primaryPage: "menu"
  },
  {
    id: 4,
    tag: "04 · Courtyard Ambiance",
    titleLine1: "Atmosphere for",
    titleLine2: "Unrushed hours.",
    sub: "Low lighting, courtyard greenery, live jazz trios, and natural wine after sunset.",
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=85",
    sideImg1: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    sideImg2: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    primaryBtn: "Reserve Table",
    primaryPage: "reserve"
  }
];

const isOpenNow = () => {
  const h = new Date().getHours();
  return h >= 7 && h < 23;
};

const SLIDE_DURATION = 4000; // 4 seconds per slide

const Hero = ({ setPage }) => {
  const [current, setCurrent] = useState(0);
  const open = isOpenNow();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative min-h-screen pt-28 md:pt-36 pb-12 bg-[#211C17] text-[#F8F4E9] overflow-hidden flex flex-col justify-between select-none">
      {/* Background Radial Pattern & Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#A9834C_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#A9834C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slideshow Container */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10 my-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT: Dynamic Text Content (Auto Slide Transition) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${open ? "bg-[#A9834C]" : "bg-white/40"}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${open ? "bg-[#A9834C]" : "bg-white/40"}`} />
              </span>
              <p className="text-xs uppercase tracking-widest font-semibold text-[#C9A876]">
                {open ? "Open Now" : "Closed for the day"} · 7:00 AM – 11:00 PM · Vadodara
              </p>
            </div>

            <div key={`text-${slide.id}`} className="nb-fade-up">
              <span className="inline-block px-3.5 py-1 text-xs font-medium tracking-wider text-[#C9A876] bg-white/5 border border-[#A9834C]/30 rounded-full mb-5">
                {slide.tag}
              </span>

              <h1 className="nb-display text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#F8F4E9]">
                <span className="block">{slide.titleLine1}</span>
                <span className="block text-[#C9A876]">{slide.titleLine2}</span>
              </h1>

              <p className="text-[#F8F4E9]/75 mt-6 text-base md:text-lg leading-relaxed max-w-lg">
                {slide.sub}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={() => setPage(slide.primaryPage)}
                  className="nb-btn px-7 py-3.5 text-sm bg-[#A9834C] text-[#F8F4E9] hover:bg-[#8C6E52] flex items-center gap-2.5 shadow-xl transition-all hover:translate-y-[-2px] nb-focus font-semibold"
                >
                  {slide.primaryBtn} <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => setPage("menu")}
                  className="nb-btn px-6 py-3.5 text-sm border border-white/20 text-white hover:bg-white/10 transition-all nb-focus"
                >
                  Order Online
                </button>
                <button
                  onClick={() => setPage("reserve")}
                  className="nb-btn px-6 py-3.5 text-sm border border-white/20 text-white hover:bg-white/10 transition-all nb-focus"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Pure Automatic Image Collage Slideshow */}
          <div className="lg:col-span-6 relative">
            <div key={`gallery-${slide.id}`} className="grid grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Main Featured Photo (Auto Crossfades per slide) */}
              <div className="col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group nb-fade-up">
                <img
                  src={slide.img}
                  alt={slide.titleLine1}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-xs font-semibold px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-white border border-white/10">Featured Craft</span>
                  <Sparkles size={14} className="text-[#C9A876]" />
                </div>
              </div>

              {/* Side Stacked Detail Photos */}
              <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
                <div className="h-34 sm:h-44 rounded-xl overflow-hidden shadow-xl border border-white/10 group nb-fade-up" style={{ animationDelay: '0.15s' }}>
                  <img
                    src={slide.sideImg1}
                    alt="Detail 1"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="h-34 sm:h-44 rounded-xl overflow-hidden shadow-xl border border-white/10 group nb-fade-up" style={{ animationDelay: '0.3s' }}>
                  <img
                    src={slide.sideImg2}
                    alt="Detail 2"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* CONTINUOUS AUTOMATIC SLIDESHOW PROGRESS BAR */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full relative z-10 pt-8 mt-4 border-t border-white/10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 grow">
            {HERO_SLIDES.map((s, idx) => (
              <div key={s.id} className="grow flex flex-col gap-1.5">
                <div className="h-1 w-full bg-white/15 rounded-full overflow-hidden relative">
                  {idx === current && (
                    <div
                      className="h-full bg-[#A9834C] rounded-full transition-all ease-linear"
                      style={{
                        animation: `nbProgress ${SLIDE_DURATION}ms linear`
                      }}
                    />
                  )}
                  {idx < current && <div className="h-full bg-[#A9834C] rounded-full w-full" />}
                </div>
                <span className={`text-[11px] font-mono transition-colors ${idx === current ? "text-[#C9A876] font-bold" : "text-white/30"}`}>
                  0{idx + 1} {s.titleLine1.replace(',', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes for Smooth Linear Progress */}
      <style>{`
        @keyframes nbProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
