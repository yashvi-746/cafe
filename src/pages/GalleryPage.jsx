import { useState } from "react";
import { Coffee, X } from "lucide-react";
import { GALLERY } from "../data/demoData";
import { SectionHeading } from "../components/common";

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Coffee","Food","Interior","People","Events"];
  const [lightbox, setLightbox] = useState(null);
  const shown = GALLERY.filter(g=> filter==="All" || g.cat===filter);
  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8">
      <SectionHeading eyebrow="Moments" title="Gallery" />
      <div className="flex gap-2 mt-8 flex-wrap">
        {cats.map(c=><button key={c} onClick={()=>setFilter(c)} className={`nb-focus px-4 py-2 text-xs border nb-border ${filter===c ? "nb-bg-ink nb-text-cream" : ""}`}>{c}</button>)}
      </div>
      <div className="columns-2 md:columns-3 gap-4 mt-8 space-y-4">
        {shown.map((g,i)=>{
          const isUrl = g.img && (g.img.startsWith("http://") || g.img.startsWith("https://"));
          return (
            <div 
              key={g.id} 
              onClick={()=>setLightbox(g)} 
              className={`nb-photo ${!isUrl ? g.img : ""} cursor-pointer break-inside-avoid nb-card-hover rounded-sm overflow-hidden`} 
              style={{
                height: i%3===0 ? "280px":"200px",
                ...(isUrl ? { backgroundImage: `url(${g.img})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {})
              }} 
            />
          );
        })}
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[90] bg-black/85 flex items-center justify-center nb-fade" onClick={()=>setLightbox(null)}>
          {lightbox.img && (lightbox.img.startsWith("http://") || lightbox.img.startsWith("https://")) ? (
            <img src={lightbox.img} alt="Gallery" className="max-w-[90vw] max-h-[80vh] object-contain rounded-sm" />
          ) : (
            <div className={`nb-photo ${lightbox.img} w-[90vw] max-w-2xl h-[70vh]`} />
          )}
          <button className="absolute top-6 right-6 nb-focus" onClick={()=>setLightbox(null)}><X size={24} color="#fff"/></button>
        </div>
      )}
    </div>
  );
};


export default GalleryPage;
