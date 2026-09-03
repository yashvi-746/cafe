import { ProductImg } from "../components/common";

const AboutPage = () => (
  <div className="pt-28 pb-24">
    <div className="max-w-3xl mx-auto px-5 text-center">
      <p className="nb-text-mocha text-sm mb-3">Since 2019</p>
      <h1 className="nb-display text-4xl md:text-5xl leading-tight">A café built around unhurried time.</h1>
      <p className="text-[15px] nb-text-fade leading-relaxed mt-6">Noir & Bean started as a single roaster in a Vadodara garage. Today we work with four origin partners, roast twice weekly, and still taste every batch before it's served. Nothing here is built to be quick — including you, while you're in it.</p>
    </div>
    <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-4 mt-16">
      <ProductImg cls="nb-photo-2" imgUrl="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80" h="h-72 md:mt-8" />
      <ProductImg cls="nb-photo-5" imgUrl="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80" h="h-72" />
      <ProductImg cls="nb-photo-3" imgUrl="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" h="h-72 md:mt-8" />
    </div>
  </div>
);


export default AboutPage;
