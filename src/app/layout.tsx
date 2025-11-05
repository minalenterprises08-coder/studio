import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/components/layout/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const title = 'Minal Enterprises — Custom Printed Boxes, Labels & Wedding Cards';
const description =
  'Minal Enterprises crafts premium custom boxes, labels, wedding invites and print solutions. Get instant quotes, dieline support, fast turnaround.';
const url = 'https://minal.stedi.app'; // Replace with your actual domain

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Minal Enterprises',
  },
  description: description,
  keywords: [
    'custom boxes',
    'printed packaging',
    'labels',
    'wedding cards',
    'rigid boxes',
    'Faisalabad printing',
    'Minal Enterprises',
  ],
  authors: [{ name: 'Minal Enterprises' }],
  creator: 'Minal Enterprises',
  metadataBase: new URL(url),
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: 'Minal Enterprises',
    images: [
      {
        url: '/og-image.png', // It's good practice to have a specific Open Graph image
        width: 1200,
        height: 630,
        alt: 'Minal Enterprises custom packaging solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    creator: '@MinalCenter', // Your twitter handle
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          inter.variable,
          playfairDisplay.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
