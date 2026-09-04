import { Check } from "lucide-react";

const Badge = ({ children, tone="ink" }) => {
  const map = { ink:"nb-bg-ink nb-text-cream", brass:"nb-bg-brass nb-text-cream", olive:"nb-bg-olive nb-text-cream", outline:"border nb-border nb-text-soft" };
  return <span className={`text-[10px] font-semibold px-2 py-1 tracking-wide ${map[tone]}`}>{children}</span>;
};

const Toast = ({ toast }) => !toast ? null : (
  <div className="fixed top-20 right-6 z-[90] nb-toast">
    <div className="nb-bg-ink nb-text-cream px-5 py-3 flex items-center gap-3 shadow-xl max-w-xs">
      <Check size={16} className="shrink-0" />
      <span className="text-sm">{toast}</span>
    </div>
  </div>
);

const SectionHeading = ({ eyebrow, title, sub, dark }) => (
  <div className="max-w-2xl">
    {eyebrow && <p className={`text-sm mb-3 ${dark ? "nb-text-brass" : "nb-text-mocha"}`}>{eyebrow}</p>}
    <h2 className={`nb-display text-4xl md:text-5xl leading-[1.08] ${dark ? "nb-text-cream" : "nb-text-ink"}`}>{title}</h2>
    {sub && <p className={`mt-4 text-[15px] leading-relaxed ${dark ? "text-white/70" : "nb-text-fade"}`}>{sub}</p>}
  </div>
);

const ProductImg = ({ cls, imgUrl, children, h="h-48", className="" }) => {
  const src = (imgUrl && (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("/")))
    ? imgUrl 
    : (cls && (cls.startsWith("http://") || cls.startsWith("https://") || cls.startsWith("/"))) ? cls : null;
  const hasWidth = (h && h.includes("w-")) || (className && className.includes("w-"));
  return (
    <div 
      className={`nb-photo ${!src ? (cls || "nb-photo-1") : ""} ${h} ${!hasWidth ? "w-full" : ""} ${className} relative overflow-hidden shrink-0 bg-[#E8E1CF] flex items-center justify-center`}
    >
      {src ? (
        <img 
          src={src} 
          alt="" 
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" 
        />
      ) : null}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      {children}
    </div>
  );
};

export { Badge, Toast, SectionHeading, ProductImg };
