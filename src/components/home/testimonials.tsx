'use client';

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
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export function Testimonials() {
  const firestore = useFirestore();

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'testimonials'),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
  }, [firestore]);

  const {
    data: testimonials,
    isLoading,
    error,
  } = useCollection(testimonialsQuery);

  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Trusted by wedding planners, e-commerce brands, and businesses
            across the country.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: testimonials && testimonials.length > 1,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {isLoading && (
              <CarouselItem>
                <div className="p-4">
                  <Card>
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="flex justify-center">
                        <Skeleton className="h-5 w-28" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4 mx-auto" />
                      <div className="flex items-center justify-center gap-4 pt-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )}
            {!isLoading && (!testimonials || testimonials.length === 0) && (
              <CarouselItem>
                <div className="p-4 text-center text-muted-foreground">
                  No testimonials yet. Be the first to leave a review!
                </div>
              </CarouselItem>
            )}
            {testimonials?.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="p-4">
                  <Card>
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-accent fill-accent"
                            />
                          )
                        )}
                      </div>
                      <p className="italic text-muted-foreground">
                        "{testimonial.text}"
                      </p>
                      <div className="mt-6 flex items-center justify-center gap-4">
                        <Image
                          src={
                            testimonial.photoUrl ||
                            `https://picsum.photos/seed/${testimonial.userId}/48/48`
                          }
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-bold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {testimonials && testimonials.length > 1 && (
             <>
                <CarouselPrevious className="-left-4 sm:-left-12" />
                <CarouselNext className="-right-4 sm:-right-12" />
             </>
          )}
        </Carousel>
      </div>
    </section>
  );
}
