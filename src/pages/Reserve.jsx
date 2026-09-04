import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { SectionHeading } from "../components/common";
import { createReservation } from "../utils/api";

const Reserve = ({ setPage }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState("Window");
  const [occasion, setOccasion] = useState("Casual");
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const times = ["9:00 AM","10:30 AM","12:00 PM","1:30 PM","3:00 PM","4:30 PM","6:00 PM","7:30 PM","9:00 PM"];
  const unavailable = ["1:30 PM","6:00 PM"];

  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    await createReservation({
      name: "Aditi Shah",
      date,
      time,
      guests,
      table: `${seating} Table`,
      status: "Confirmed"
    });
    setIsSubmitting(false);
    setDone(true);
  };

  if (done) return (
    <div className="pt-32 pb-24 max-w-lg mx-auto px-5 text-center nb-fade-up">
      <div className="w-16 h-16 rounded-full nb-bg-olive flex items-center justify-center mx-auto"><Check size={26} color="#fff"/></div>
      <h2 className="nb-display text-3xl mt-6">Table reserved.</h2>
      <p className="text-sm nb-text-fade mt-2">{date || "Sep 10, 2026"} · {time || "7:30 PM"} · {guests} guests · {seating}</p>
      <button onClick={()=>setPage("home")} className="nb-btn nb-btn-primary px-5 py-3 text-sm mt-6 nb-focus">Done</button>
    </div>
  );

  return (
    <div className="pt-28 pb-24 max-w-2xl mx-auto px-5">
      <SectionHeading eyebrow="Book ahead" title="Reserve a table" sub="Tables are held for fifteen minutes past the reservation time." />
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        <div>
          <p className="text-xs font-semibold nb-text-soft mb-2">Date</p>
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
        </div>
        <div>
          <p className="text-xs font-semibold nb-text-soft mb-2">Guests</p>
          <div className="flex items-center border nb-border w-fit">
            <button onClick={()=>setGuests(g=>Math.max(1,g-1))} className="w-9 h-9 flex items-center justify-center nb-focus"><Minus size={14}/></button>
            <span className="w-10 text-center text-sm">{guests}</span>
            <button onClick={()=>setGuests(g=>g+1)} className="w-9 h-9 flex items-center justify-center nb-focus"><Plus size={14}/></button>
          </div>
        </div>
      </div>
      <p className="text-xs font-semibold nb-text-soft mb-2 mt-6">Time</p>
      <div className="flex flex-wrap gap-2">
        {times.map(t=>(
          <button key={t} disabled={unavailable.includes(t)} onClick={()=>setTime(t)}
            className={`nb-focus px-4 py-2 text-xs border nb-border ${time===t ? "nb-bg-ink nb-text-cream" : unavailable.includes(t) ? "opacity-30 cursor-not-allowed line-through" : ""}`}>{t}</button>
        ))}
      </div>
      <p className="text-xs font-semibold nb-text-soft mb-2 mt-6">Seating Preference & Visual Floor Map</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
        {[
          { id: "Window", name: "Window Booth 4", desc: "Street view, high natural light", status: "Available" },
          { id: "Courtyard", name: "Courtyard Garden", desc: "Open air, foliage, evening heaters", status: "Available" },
          { id: "Indoor", name: "Roastery Bar Side", desc: "Cozy leather seating, espresso aroma", status: "Popular" },
          { id: "Private", name: "Mezzanine Nook", desc: "Quiet booth, USB power, work-friendly", status: "Available" },
          { id: "Group", name: "Main Communal Table", desc: "Seats 6 to 10 guests", status: "Available" },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSeating(t.id)}
            className={`p-3 border text-left text-xs transition-all nb-focus ${seating === t.id ? "nb-bg-ink nb-text-cream border-[#211C17]" : "nb-card hover:bg-white"}`}
          >
            <p className="font-bold">{t.name}</p>
            <p className={`text-[11px] mt-1 ${seating === t.id ? "text-white/70" : "nb-text-fade"}`}>{t.desc}</p>
          </button>
        ))}
      </div>
      <p className="text-xs font-semibold nb-text-soft mb-2 mt-6">Occasion</p>
      <div className="flex flex-wrap gap-2">
        {["Birthday","Anniversary","Business","Date","Casual"].map(s=>(
          <button key={s} onClick={()=>setOccasion(s)} className={`nb-focus px-4 py-2 text-xs border nb-border ${occasion===s ? "nb-bg-ink nb-text-cream" : ""}`}>{s}</button>
        ))}
      </div>
      <button 
        onClick={handleConfirmReservation} 
        disabled={!date || !time || isSubmitting} 
        className="nb-btn nb-btn-primary px-6 py-3.5 text-sm mt-8 disabled:opacity-40 nb-focus"
      >
        {isSubmitting ? "Reserving..." : "Confirm Reservation"}
      </button>
    </div>
  );
};

export default Reserve;
