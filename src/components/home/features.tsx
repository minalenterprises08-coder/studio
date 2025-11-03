import { Gem, PenTool, Truck } from 'lucide-react';

const features = [
  {
    icon: <PenTool className="h-8 w-8 text-accent" />,
    title: 'Design & Proofing',
    description: 'We help refine your dielines and provide digital proofs before any ink hits the paper.',
  },
  {
    icon: <Gem className="h-8 w-8 text-accent" />,
    title: 'Premium Production',
    description: 'Our state-of-the-art facility ensures high-quality finishes, from foiling to embossing.',
  },
  {
    icon: <Truck className="h-8 w-8 text-accent" />,
    title: 'Fast Turnaround',
    description: 'We deliver exceptional quality on tight deadlines, with reliable shipping across Pakistan and beyond.',
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-left md:text-center mb-12 max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Blending Craftsmanship with Modern Finishing
          </h2>
          <p className="text-muted-foreground mt-4">
            Minal Enterprises blends traditional print craftsmanship with modern finishing — foil, embossing, spot UV and luxe materials. We deliver high-quality packaging for brands and memorable invites for weddings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center p-6 bg-background rounded-lg shadow-sm">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-headline text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
