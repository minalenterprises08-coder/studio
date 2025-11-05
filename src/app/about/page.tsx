'use client';

import { Eye, Goal } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { OwnerProfile, SiteMedia } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

function OwnerSection() {
  const firestore = useFirestore();
  const ownerProfileRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'site_content', 'owner_profile') : null),
    [firestore]
  );
  const { data: owner, isLoading } = useDoc<OwnerProfile>(ownerProfileRef);

  if (isLoading) {
    return (
      <section className="mt-24" aria-labelledby="owner-heading">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg order-last md:order-first">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="order-first md:order-last">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </section>
    );
  }

  if (!owner) {
    return null; // Don't render the section if there's no data
  }

  return (
    <section className="mt-24" aria-labelledby="owner-heading">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg order-last md:order-first">
          <Image
            src={owner.imageUrl}
            alt={`Portrait of ${owner.name}`}
            fill
            className="object-cover"
            data-ai-hint="man portrait"
          />
        </div>
        <div className="order-first md:order-last">
          <h2 id="owner-heading" className="font-headline text-3xl md:text-4xl font-bold">
            Meet Our Founder
          </h2>
          <h3 className="font-headline text-2xl font-semibold text-primary mt-2">
            {owner.name}
          </h3>
          <p className="text-lg font-medium text-muted-foreground">{owner.title}</p>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>{owner.bio1}</p>
            <p>{owner.bio2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function AboutPage() {
    const firestore = useFirestore();
    const imageRef = useMemoFirebase(
        () => (firestore ? doc(firestore, 'site_media', 'about-page-team') : null),
        [firestore]
    );
    const { data: image, isLoading } = useDoc<SiteMedia>(imageRef);

  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              About Minal Enterprises
            </h1>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Established in 2008, Minal Enterprises soon became a trusted
                destination for branded packaging, trim, and offset printing
                solutions. We serve organizations dedicated to supplying brand
                concepts, graphics, products, and solutions to all partners in
                the retail supply chain.
              </p>
              <p>
                Our experienced service and production teams work with clients
                to provide cost-effective & quality-oriented solutions from
                concepts to execution.
              </p>
              <p>
                Since our start, we have been driven to help our clients build
                brand equity and customer loyalty through quality, consistency,
                and alignment with their objectives. Our mission and vision are
                built on the premise that our client's goals serve as the
                results we aim to achieve.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
            {isLoading && <Skeleton className="h-full w-full" />}
            {image && (
                <Image
                    src={image.imageUrl}
                    alt={image.description || 'Minal Enterprises team at work'}
                    fill
                    className="object-cover"
                    data-ai-hint="printing press"
                />
            )}
          </div>
        </div>

        <section className="mt-24" aria-labelledby="mission-vision-heading">
          <div className="text-center max-w-3xl mx-auto">
            <h2 id="mission-vision-heading" className="font-headline text-3xl md:text-4xl font-bold">
              Our Vision & Mission
            </h2>
            <p className="text-muted-foreground mt-3">
              The core principles that guide our work and drive our commitment to excellence.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>
                  To be the best-in-class solution provider and trusted partner for branded trim and packaging while delivering quality and value to our clients.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center text-center">
                 <div className="p-3 bg-primary/10 rounded-full">
                  <Goal className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>
                  Our mission is to develop a win-win relationship with our clients by assisting them to achieve their goals through innovation, quality products, sustainable business practices and on-time delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <OwnerSection />

      </div>
    </div>
  );
}

    