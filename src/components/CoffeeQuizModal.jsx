import React, { useState } from "react";
import { Coffee, CheckCircle2, ArrowRight, RefreshCw, Sparkles } from "lucide-react";

const CoffeeQuizModal = ({ open, onClose, openProduct }) => {
  const [step, setStep] = useState(1);
  const [pref, setPref] = useState({ style: "", milk: "", flavor: "" });

  if (!open) return null;

  const quizData = {
    1: {
      q: "How do you usually enjoy your coffee?",
      opts: [
        { l: "Rich & Strong Espresso", v: "strong" },
        { l: "Smooth & Creamy Milk Drink", v: "creamy" },
        { l: "Refreshing Cold Brew Drip", v: "cold" },
        { l: "Sweet & Decadent Flavors", v: "sweet" }
      ]
    },
    2: {
      q: "What is your preferred milk base?",
      opts: [
        { l: "Artisan Oat Milk (Nutty & Creamy)", v: "oat" },
        { l: "Classic Organic Whole Dairy", v: "dairy" },
        { l: "Almond / Soy Plant Milk", v: "almond" },
        { l: "No Milk (Black Coffee / Pour-over)", v: "black" }
      ]
    },
    3: {
      q: "Which flavor profile appeals to you most?",
      opts: [
        { l: "Dark Chocolate & Caramel Notes", v: "choco" },
        { l: "Fruity & Floral Ethiopian Notes", v: "fruity" },
        { l: "Spiced Cinnamon & Vanilla Blend", v: "spiced" },
        { l: "Nutty Roasted Hazelnut", v: "hazel" }
      ]
    }
  };

  const currentQ = quizData[step];

  const handleSelect = (val) => {
    if (step === 1) setPref({ ...pref, style: val });
    if (step === 2) setPref({ ...pref, milk: val });
    if (step === 3) setPref({ ...pref, flavor: val });

    if (step < 3) setStep(s => s + 1);
    else setStep(4); // Show match result
  };

  const getMatchedCoffee = () => {
    if (pref.style === "cold") return { name: "Barrel Cold Brew", price: 280, desc: "Aged 18 hours in oak barrels with subtle oak & dark chocolate notes.", cal: 15 };
    if (pref.style === "strong") return { name: "Cortado", price: 210, desc: "Equal parts ristretto espresso & warm textured milk.", cal: 75 };
    if (pref.style === "sweet") return { name: "Cardamom Rose Latte", price: 290, desc: "Infused with crushed green cardamom & organic rose preserve.", cal: 210 };
    return { name: "Oat Flat White", price: 260, desc: "Double shot espresso folded into silky textured micro-foam oat milk.", cal: 130 };
  };

  const matched = getMatchedCoffee();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md nb-fade" onClick={onClose} />
      
      <div className="relative nb-bg-cream w-full max-w-md p-6 rounded-2xl border border-white/20 shadow-2xl z-10 nb-scale-in">
        <div className="flex justify-between items-center pb-3 border-b nb-border mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A9834C] flex items-center gap-1.5">
            <Sparkles size={14} /> AI Coffee Finder
          </span>
          <button onClick={onClose} className="text-xs nb-text-fade hover:text-black">✕</button>
        </div>

        {step <= 3 ? (
          <div>
            <div className="flex gap-1.5 mb-4">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 grow rounded-full ${i <= step ? "nb-bg-brass" : "bg-black/10"}`} />
              ))}
            </div>

            <h3 className="nb-display text-xl mb-4">{currentQ.q}</h3>

            <div className="space-y-2.5">
              {currentQ.opts.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.v)}
                  className="w-full p-3 text-left border nb-border hover:bg-white text-xs font-medium rounded-xl transition-all hover:translate-x-1 flex justify-between items-center"
                >
                  <span>{opt.l}</span>
                  <ArrowRight size={13} className="nb-text-fade" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-2 nb-fade-up">
            <div className="w-14 h-14 rounded-full bg-[#A9834C]/20 text-[#A9834C] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 size={28} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#A9834C]">Your Perfect Match</p>
            <h3 className="nb-display text-2xl mt-1">{matched.name}</h3>
            <p className="text-xs nb-text-fade mt-2 leading-relaxed">{matched.desc}</p>
            <p className="text-sm font-semibold mt-3">₹{matched.price} · {matched.cal} kcal</p>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setStep(1)}
                className="nb-btn nb-btn-outline grow py-2.5 text-xs flex items-center justify-center gap-1"
              >
                <RefreshCw size={12} /> Retake
              </button>
              <button
                onClick={() => {
                  onClose();
                  openProduct(matched);
                }}
                className="nb-btn nb-btn-primary grow py-2.5 text-xs"
              >
                Order This Drink
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoffeeQuizModal;
