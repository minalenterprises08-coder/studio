'use client';
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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { CoreOffering } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCategories() {
  const firestore = useFirestore();
  const offeringsQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'core_offerings'), orderBy('order', 'asc'))
        : null,
    [firestore]
  );
  const { data: categories, isLoading } =
    useCollection<CoreOffering>(offeringsQuery);

  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Our Core Offerings
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From elegant packaging to stunning stationery, we provide a wide
            range of custom printing solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading &&
            [...Array(4)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          {!isLoading &&
            categories?.map((category) => (
              <Link href={category.link} key={category.id} className="group">
                <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={category.imageUrl}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
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
            ))}
        </div>
      </div>
    </section>
  );
}

    