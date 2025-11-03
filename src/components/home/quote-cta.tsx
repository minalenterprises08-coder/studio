import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function QuoteCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container py-20 text-center">
        <h2 className="font-headline text-3xl md:text-4xl font-bold">
          Ready to Bring Your Vision to Life?
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-primary-foreground/80">
          Let's create something beautiful together. Get a free, no-obligation quote for your next project today.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Link href="/customizer">Get Your Free Quote Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
