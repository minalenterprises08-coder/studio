'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons/logo';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { UserAvatarButton } from '@/components/auth/user-avatar-button';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/customizer', label: 'Customizer' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Minal Enterprises
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition-colors hover:text-accent',
                  pathname === href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-bold">Minal Enterprises</span>
            </Link>
            <div className="my-4 h-px w-full bg-border" />
            <div className="flex flex-col space-y-3">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'transition-colors hover:text-accent',
                    pathname === href ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">Minal Enterprises</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-1">
                <ThemeToggle />
                <Button variant="ghost" size="icon" asChild>
                    <Link href="tel:+923006601081">
                        <Phone className="h-5 w-5 text-foreground/60 hover:text-accent transition-colors" />
                        <span className="sr-only">Call Us</span>
                    </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://wa.me/923006601081" target="_blank">
                        <MessageCircle className="h-5 w-5 text-foreground/60 hover:text-accent transition-colors" />
                        <span className="sr-only">WhatsApp</span>
                    </Link>
                </Button>

                {isUserLoading ? (
                  <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
                ) : user ? (
                  <UserAvatarButton user={user} />
                ) : (
                  <Button asChild size="sm" variant="ghost">
                    <Link href="/login">Login</Link>
                  </Button>
                )}
                
                <Button asChild size="sm" className="hidden sm:flex transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                    <Link href="/customizer">Request a Free Quote</Link>
                </Button>
            </nav>
        </div>
      </div>
    </header>
  );
}
