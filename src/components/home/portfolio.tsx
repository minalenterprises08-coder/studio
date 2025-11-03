import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

const portfolioItems = [
  {
    id: 'portfolio-1',
    title: 'Luxury Brand Packaging',
    category: 'Rigid Boxes',
    tags: ['Foil Stamping', 'Embossing'],
  },
  {
    id: 'portfolio-2',
    title: 'Boutique Wedding Invites',
    category: 'Wedding Cards',
    tags: ['Letterpress', 'Custom Inserts'],
  },
  {
    id: 'portfolio-3',
    title: 'E-commerce Mailer Boxes',
    category: 'Printed Boxes',
    tags: ['Matte Lamination', 'CMYK Print'],
  },
    {
    id: 'portfolio-4',
    title: 'Gourmet Product Labels',
    category: 'Labels',
    tags: ['Die-cut', 'Gold Foil'],
  },
];

export function Portfolio() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Our Portfolio
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            A glimpse into the quality and craftsmanship we bring to every project.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {portfolioItems.map((item) => {
              const image = PlaceHolderImages.find((img) => img.id === item.id);
              return (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden group">
                      <CardContent className="relative aspect-[4/3] p-0">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="font-headline text-xl font-bold">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs backdrop-blur-sm bg-white/20 border-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href="/portfolio">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
