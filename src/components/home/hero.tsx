'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PaperFoldIcon } from '@/components/icons/paper-fold';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SiteMedia } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

export function Hero() {
  const firestore = useFirestore();
  const heroImageRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'site_media', 'hero-background') : null),
    [firestore]
  );
  const { data: heroImage, isLoading } = useDoc<SiteMedia>(heroImageRef);

  return (
    <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden bg-secondary">
      {isLoading && <Skeleton className="absolute inset-0" />}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description || 'Luxury packaging'}
          fill
          className="object-cover"
          priority
          data-ai-hint="luxury packaging"
        />
      )}
      <div className="absolute inset-0 bg-primary/60" />
      <div className="relative z-10 container px-4">
        <div className="flex justify-center mb-4">
          <PaperFoldIcon className="h-20 w-20 text-white/80" />
        </div>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold !leading-tight tracking-tighter">
          Packaging that Tells Your Story.
        </h1>
        <p className="max-w-3xl mx-auto mt-4 text-base md:text-xl text-primary-foreground/80">
          Custom boxes, labels and wedding cards — crafted with premium finishes
          and lightning-fast turnaround.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Link href="/customizer">Request a Free Quote</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <Link href="/customizer">Customize Now</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-primary-foreground/60">
          Khoobsurat boxes, be-misaal printing — aap ke liye mukhtasir.
        </p>
      </div>
    </section>
  );
}

    