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

const ProductImg = ({ cls, imgUrl, children, h="h-48" }) => {
  const isUrl = imgUrl && (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("/"));
  return (
    <div 
      className={`nb-photo ${!isUrl ? (cls || "nb-photo-1") : ""} ${h} w-full relative`}
      style={isUrl ? { backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      <div className="absolute inset-0 bg-black/10" />
      {children}
    </div>
  );
};

export { Badge, Toast, SectionHeading, ProductImg };
