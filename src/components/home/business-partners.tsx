'use client';

import { cn } from '@/lib/utils';
import { Building } from 'lucide-react';

const partners = [
  { name: 'Arzoo Textile Mills (pvt) Ltd' },
  { name: 'Niagra Textile Mills (pvt) Ltd' },
  { name: 'Magna Textile Mills (pvt) Ltd' },
  { name: 'Sadaqat Ltd' },
  { name: 'Iman Home Textile Mills (pvt) Ltd' },
  { name: 'Faisal Fabrics Textile Mills (pvt) Ltd' },
  { name: 'Diamond Textile Mills (pvt) Ltd' },
  { name: 'ZIS textile pvt ltd' },
];

const PartnerLogo = ({ name }: { name: string }) => (
  <li className="flex items-center justify-center text-center p-6 bg-background rounded-lg shadow-sm w-[250px] h-[100px] flex-shrink-0">
    <div className="flex items-center gap-3">
        <Building className="h-6 w-6 text-muted-foreground" />
        <span className="font-semibold text-muted-foreground">{name}</span>
    </div>
  </li>
);

export function BusinessPartners() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Our Valued Business Partners
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We are proud to collaborate with leading companies in the textile industry.
          </p>
        </div>
        <div className="relative">
          <div
            className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
          >
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-infinite-scroll">
                {partners.map((partner) => <PartnerLogo key={partner.name} name={partner.name} />)}
            </ul>
             <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-infinite-scroll" aria-hidden="true">
                {partners.map((partner) => <PartnerLogo key={partner.name} name={partner.name} />)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
