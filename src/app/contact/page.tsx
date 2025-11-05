import { Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Minal Enterprises. Find our phone numbers, email addresses, and office location in Faisalabad, Pakistan. We\'re ready to help with your printing and packaging needs.',
  alternates: {
    canonical: '/contact',
  },
};


export default function ContactPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">
            Get in Touch
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            We're here to help with any questions you may have about our products or your order. Reach out to us through any of the methods below.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Phone Numbers</h3>
            <p className="mt-2 text-muted-foreground">
              <a href="tel:+923006601081" className="hover:text-primary">0300-6601081</a>
              <br />
              <a href="tel:+923037978278" className="hover:text-primary">0303-7978278</a>
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Email Addresses</h3>
            <p className="mt-2 text-muted-foreground">
              <a href="mailto:minalenterprises08@gmail.com" className="hover:text-primary">minalenterprises08@gmail.com</a>
              <br />
              <a href="mailto:Printvision08@gmail.com" className="hover:text-primary">Printvision08@gmail.com</a>
            </p>
          </div>

          <div className="flex flex-col items-center md:col-span-2 lg:col-span-1 lg:row-start-1 lg:col-start-2">
            <div className="p-4 bg-primary/10 rounded-full">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Office Address</h3>
            <p className="mt-2 text-muted-foreground">
              Shop No. 182-190,
              <br />
              Jalvi Market Dudiwala, Faisalabad, Pakistan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
