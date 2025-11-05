
'use client';

import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ItemCard } from '@/components/shared/item-card';

export default function ProductsPage() {
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'products'), orderBy('name', 'asc'));
  }, [firestore]);

  const {
    data: products,
    isLoading,
    error,
  } = useCollection<Product>(productsQuery);

  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Our Products
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Discover our range of premium custom packaging and print solutions,
            crafted with care and precision.
          </p>
        </div>

        <div className="mt-16">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
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
              <AlertTitle>Error Fetching Products</AlertTitle>
              <AlertDescription>
                Could not load products. Please ensure you have the correct
                Firestore permissions and try again later.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && products && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ItemCard
                  key={product.id}
                  imageUrl={product.imageUrl}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                />
              ))}
            </div>
          )}
          
          {!isLoading && !error && products?.length === 0 && (
             <div className="text-center text-muted-foreground py-12">
               <p>Our product catalog is currently being updated.</p>
               <p>Please check back soon to see our offerings!</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
