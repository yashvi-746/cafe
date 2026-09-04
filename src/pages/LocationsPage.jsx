import { MapPin } from "lucide-react";
import { Badge, SectionHeading } from "../components/common";

const LocationsPage = () => (
  <div className="pt-28 pb-24 max-w-4xl mx-auto px-5">
    <SectionHeading eyebrow="Where we are" title="Locations" />
    <div className="mt-8 space-y-4">
      {["Vadodara","Ahmedabad","Surat","Mumbai"].map((c,i)=>(
        <div key={c} className="nb-card p-5 flex items-center justify-between">
          <div>
            <h4 className="nb-display text-lg flex items-center gap-2">{c} {i===0 && <Badge tone="brass">Open</Badge>}{i>0 && <Badge tone="outline">Opening 2027</Badge>}</h4>
            <p className="text-xs nb-text-fade mt-1">{i===0 ? "12 Alkapuri Road · 7:00 AM – 11:00 PM" : "Location details coming soon"}</p>
          </div>
          <MapPin size={18} className="nb-text-mocha" />
        </div>
      ))}
    </div>
  </div>
);


export default LocationsPage;
