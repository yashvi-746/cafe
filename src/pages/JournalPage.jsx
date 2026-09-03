import { ARTICLES } from "../data/demoData";
import { SectionHeading, ProductImg } from "../components/common";

const JournalPage = () => (
  <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8">
    <SectionHeading eyebrow="Reading" title="Journal" sub="Notes on coffee, culture and what happens behind the bar." />
    <div className="grid md:grid-cols-3 gap-8 mt-10">
      {ARTICLES.map(a=>(
        <div key={a.id} className="cursor-pointer group">
          <ProductImg cls={a.img} imgUrl={a.img} h="h-56" />
          <p className="text-xs nb-text-mocha mt-4">{a.cat} · {a.date} · {a.read}</p>
          <h4 className="nb-display text-xl mt-1.5 group-hover:opacity-70">{a.title}</h4>
          <p className="text-sm nb-text-fade mt-2 leading-relaxed">{a.excerpt}</p>
          <p className="text-xs nb-text-fade mt-3">By {a.author}</p>
        </div>
      ))}
    </div>
  </div>
);


export default JournalPage;
