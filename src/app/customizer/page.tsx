import { CustomizerForm } from '@/components/customizer/customizer-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instant Quote Customizer',
  description: 'Get an instant price estimate for your custom packaging. Build your perfect box, choose materials, upload your dieline, and get a quote in seconds.',
  alternates: {
    canonical: '/customizer',
  },
};

export default function CustomizerPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Instant Quote Customizer
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Build your perfect packaging in just a few steps. Adjust dimensions, choose materials, and upload your design to get a live price estimate.
          </p>
        </div>
        <CustomizerForm />
      </div>
    </div>
  );
}
