
'use client';

import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { PortfolioItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ItemCard } from '@/components/shared/item-card';
import type { Metadata } from 'next';

export default function PortfolioPage() {
  const firestore = useFirestore();

  const portfolioQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'portfolio'),
      orderBy('title', 'asc')
    );
  }, [firestore]);

  const {
    data: portfolioItems,
    isLoading,
    error,
  } = useCollection<PortfolioItem>(portfolioQuery);

  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Our Portfolio
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Explore our case studies and see the quality and craftsmanship we
            bring to every project.
          </p>
        </div>

        <div className="mt-16">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[250px] w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Fetching Portfolio</AlertTitle>
              <AlertDescription>
                Could not load portfolio items. Please ensure you have the correct
                Firestore permissions and try again later.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && portfolioItems && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <ItemCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.category}
                  tags={item.tags}
                />
              ))}
            </div>
          )}

           {!isLoading && !error && portfolioItems?.length === 0 && (
             <div className="text-center text-muted-foreground py-12">
               <p>Our portfolio is currently being updated.</p>
               <p>Please check back soon to see our latest work!</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
