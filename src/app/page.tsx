import { Hero } from '@/components/home/hero';
import { ProductCategories } from '@/components/home/product-categories';
import { Portfolio } from '@/components/home/portfolio';
import { Features } from '@/components/home/features';
import { Testimonials } from '@/components/home/testimonials';
import { Location } from '@/components/home/location';
import { QuoteCta } from '@/components/home/quote-cta';
import { BusinessPartners } from '@/components/home/business-partners';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <Portfolio />
      <Features />
      <BusinessPartners />
      <Testimonials />
      <Location />
      <QuoteCta />
    </>
  );
}
