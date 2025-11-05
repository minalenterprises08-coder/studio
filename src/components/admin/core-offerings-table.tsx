'use client';

import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import type { CoreOffering } from '@/lib/types';

export function CoreOfferingsTable() {
  const firestore = useFirestore();

  const offeringsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'core_offerings'), orderBy('order', 'asc'));
  }, [firestore]);

  const {
    data: offerings,
    isLoading,
    error,
  } = useCollection<CoreOffering>(offeringsQuery);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Offerings</AlertTitle>
            <AlertDescription>
                Could not load core offerings. Please ensure you have the correct Firestore permissions.
            </AlertDescription>
        </Alert>
    )
  }

  if (!offerings || offerings.length === 0) {
    return <p className="text-muted-foreground text-center">No core offerings have been added yet.</p>;
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offerings.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                {item.description}
              </TableCell>
              <TableCell className="text-right">
                {item.order}
              </TableCell>
              <TableCell className="text-right">
                {/* Action buttons will go here */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

    