import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const categories = [
  { id: 'cat-fancy-boxes', title: 'Custom Printed Boxes', description: 'Rigid, fancy, and mailer boxes.', link: '/products' },
  { id: 'cat-labels', title: 'Labels & Ribbons', description: 'High-quality labels and custom ribbons.', link: '/products' },
  { id: 'cat-wedding-cards', title: 'Wedding & Event Cards', description: 'Elegant invites and stationery.', link: '/products' },
  { id: 'cat-specialty-cards', title: 'Specialty Business Cards', description: 'Cards that make a lasting impression.', link: '/products' },
];

export function ProductCategories() {
  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Our Core Offerings
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From elegant packaging to stunning stationery, we provide a wide range of custom printing solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const image = PlaceHolderImages.find((img) => img.id === category.id);
            return (
              <Link href={category.link} key={category.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <CardHeader className="p-0">
                    {image && (
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-headline group-hover:text-accent transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {category.description}
                    </CardDescription>
                    <div className="text-sm font-semibold text-accent mt-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View More</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
