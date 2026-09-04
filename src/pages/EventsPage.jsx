import { useState } from "react";
import { Send, Check } from "lucide-react";
import { EVENTS } from "../data/demoData";
import { SectionHeading, ProductImg } from "../components/common";

const EventsPage = ({ setPage }) => {
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const [reqs, setReqs] = useState("");
  const [enquirySent, setEnquirySent] = useState(false);

  const handleSendEnquiry = (e) => {
    e.preventDefault();
    if (!eventType || !eventDate) return;
    setEnquirySent(true);
    setTimeout(() => {
      setEnquirySent(false);
      setEventType("");
      setEventDate("");
      setGuests("");
      setBudget("");
      setReqs("");
    }, 4000);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8">
      <SectionHeading eyebrow="On the calendar" title="Events" sub="Cuppings, workshops and evenings worth planning around." />
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {EVENTS.map(e=>(
          <div key={e.id} className="nb-card nb-card-hover overflow-hidden flex flex-col justify-between">
            <div>
              <ProductImg cls={e.img} imgUrl={e.img} h="h-60" />
              <div className="p-5">
                <p className="text-xs nb-text-mocha">{e.date} · {e.time}</p>
                <h4 className="nb-display text-xl mt-2">{e.title}</h4>
                <p className="text-sm nb-text-fade mt-2 leading-relaxed">{e.desc}</p>
                <div className="flex items-center justify-between mt-4 text-xs nb-text-fade"><span>{e.loc}</span><span>{e.seats} seats left</span></div>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center justify-between mt-2">
              <span className="nb-display text-lg">{e.price}</span>
              <button onClick={() => setPage && setPage("reserve")} className="nb-btn nb-btn-primary text-xs px-4 py-2.5 nb-focus">Reserve Your Seat</button>
            </div>
          </div>
        ))}
      </div>

      <div className="nb-card p-6 md:p-8 mt-16 max-w-2xl">
        <h3 className="nb-display text-2xl mb-1">Host a private event</h3>
        <p className="text-sm nb-text-fade mb-5">Tell us the shape of your evening — we'll take it from there.</p>
        
        {enquirySent ? (
          <div className="p-4 nb-bg-olive/20 border border-[var(--olive)] text-[var(--olive)] flex items-center gap-3 rounded-sm nb-fade-up">
            <Check size={18} />
            <span className="text-sm font-semibold">Enquiry sent! Our events manager will respond within 24 hours.</span>
          </div>
        ) : (
          <form onSubmit={handleSendEnquiry}>
            <div className="grid sm:grid-cols-2 gap-3">
              <input required value={eventType} onChange={e=>setEventType(e.target.value)} placeholder="Event type (e.g. Birthday, Tasting)" className="border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
              <input required type="date" value={eventDate} onChange={e=>setEventDate(e.target.value)} className="border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
              <input value={guests} onChange={e=>setGuests(e.target.value)} placeholder="Guest count" className="border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
              <input value={budget} onChange={e=>setBudget(e.target.value)} placeholder="Budget range" className="border nb-border px-3 py-2.5 text-sm outline-none nb-focus" />
            </div>
            <textarea value={reqs} onChange={e=>setReqs(e.target.value)} placeholder="Special requirements or dietary preferences" className="border nb-border px-3 py-2.5 text-sm outline-none w-full h-24 mt-3 nb-focus" />
            <button type="submit" className="nb-btn nb-btn-primary px-6 py-3 text-sm mt-4 flex items-center gap-2 nb-focus">
              Send Enquiry <Send size={13} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


export default EventsPage;
