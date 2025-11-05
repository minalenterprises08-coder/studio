'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import type { SiteMedia } from '@/lib/types';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
    title: 'FSC Certification',
    description: 'Minal Enterprises is certified by the Forest Stewardship Council (FSC™). View our certificate and verify our commitment to responsible sourcing and sustainable practices.',
    alternates: {
        canonical: '/certifications',
    },
};


export default function CertificationsPage() {
  const firestore = useFirestore();
  const certificateImageRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'site_media', 'fsc-certificate') : null),
    [firestore]
  );
  const { data: certificateImage, isLoading } = useDoc<SiteMedia>(certificateImageRef);


  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Our Certifications
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              We are committed to quality, sustainability, and responsible
              sourcing. Our certifications reflect our dedication to these
              principles.
            </p>
          </div>

          <section className="border rounded-lg shadow-lg overflow-hidden" aria-labelledby="fsc-certification-heading">
            <div className="p-6 bg-secondary/30">
              <h2 id="fsc-certification-heading" className="text-2xl font-bold font-headline">
                FSC™ Chain-of-Custody
              </h2>
              <p className="text-muted-foreground mt-1">
                Certificate Code: SGSHK-COC-430191
              </p>
            </div>
            <div className="p-6">
              {isLoading && <Skeleton className="aspect-[1/1.414] w-full mx-auto" />}
              {certificateImage && (
                <div className="relative aspect-[1/1.414] w-full mx-auto">
                  <Image
                    src={certificateImage.imageUrl}
                    alt={certificateImage.description}
                    fill
                    className="object-contain"
                    data-ai-hint="certificate document"
                  />
                </div>
              )}
            </div>
            <div className="p-6 bg-secondary/30 flex flex-wrap gap-4 justify-center">
              <Button asChild disabled={!certificateImage}>
                <a
                  href={certificateImage?.imageUrl}
                  download="Minal-Enterprises-FSC-Certificate.jpg"
                >
                  <Download className="mr-2" />
                  Download Certificate
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://search.fsc.org/preview.search.php?lang=en&certification_code=SGSHK-COC-430191"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2" />
                  Verify on FSC.org
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

    