'use client';
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SiteMedia } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

const capabilities = [
    { text: "A well-maintained, technology & automation-centric Production Plant managed by an experienced & skilled workforce." },
    { text: "Capable of delivering 50K inlay cards, and 500K labels & stickers per day with superior quality & results." },
    { text: "We work in accordance with the 'Right First Time Principle' to deliver the level of quality we commit to our customers." },
    { text: "Our plant is scheduled to be maintained preventively to deliver an uninterrupted supply of products & services to our valued business partners." },
    { text: "A well-structured & developed Quality Assurance Criteria is applied from the start of the product design phase to assure a quality experience for our customers." }
];

export function ProductionCapability() {
    const firestore = useFirestore();
    const imageRef = useMemoFirebase(
        () => (firestore ? doc(firestore, 'site_media', 'production-capability') : null),
        [firestore]
    );
    const { data: image, isLoading } = useDoc<SiteMedia>(imageRef);


  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg order-last md:order-first">
            {isLoading && <Skeleton className="h-full w-full" />}
            {image && (
                <Image
                src={image.imageUrl}
                alt={image.description || "Industrial machinery for offset printing"}
                fill
                className="object-cover"
                data-ai-hint="industrial machinery"
                />
            )}
          </div>
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Production Capability
            </h2>
            <ul className="mt-6 space-y-4">
                {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{cap.text}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

    