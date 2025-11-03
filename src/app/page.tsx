import { Hero } from '@/components/home/hero';
import { ProductCategories } from '@/components/home/product-categories';
import { Portfolio } from '@/components/home/portfolio';
import { Features } from '@/components/home/features';
import { Testimonials } from '@/components/home/testimonials';
import { QuoteCta } from '@/components/home/quote-cta';

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <Portfolio />
      <Features />
      <Testimonials />
      <QuoteCta />
    </>
  );
}
