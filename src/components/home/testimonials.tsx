import Image from 'next/image';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Ayesha Khan',
    title: 'Wedding Planner',
    text: "Minal Enterprises is my go-to for all wedding stationery. Their attention to detail and quality is unmatched. The foil work on the last batch of invites was simply breathtaking.",
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Bilal Ahmed',
    title: 'Founder, Artisan Soaps Co.',
    text: "The rigid boxes we ordered have elevated our brand's unboxing experience. Customers love the premium feel. The team was incredibly helpful throughout the process.",
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Sana Tariq',
    title: 'E-commerce Store Owner',
    text: "Fast, reliable, and exceptional quality. Their custom mailer boxes are sturdy and the printing is always crisp and vibrant. Highly recommended for any online business.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Trusted by wedding planners, e-commerce brands, and businesses across the country.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const image = PlaceHolderImages.find((img) => img.id === testimonial.id);
              return (
                <CarouselItem key={testimonial.id}>
                  <div className="p-4">
                    <Card>
                      <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                          ))}
                        </div>
                        <p className="italic text-muted-foreground">"{testimonial.text}"</p>
                        <div className="mt-6 flex items-center justify-center gap-4">
                          {image && (
                             <Image
                              src={image.imageUrl}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                              data-ai-hint={image.imageHint}
                            />
                          )}
                          <div>
                            <p className="font-bold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-4 sm:-left-12" />
          <CarouselNext className="-right-4 sm:-right-12" />
        </Carousel>
      </div>
    </section>
  );
}
