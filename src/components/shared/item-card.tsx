'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price?: number;
  tags?: string[];
  link?: string;
}

export function ItemCard({
  imageUrl,
  title,
  description,
  price,
  tags,
  link,
}: ItemCardProps) {
  const CardContentWrapper = ({ children }: { children: React.ReactNode }) =>
    link ? (
      <Link href={link} className="group">
        {children}
      </Link>
    ) : (
      <div className="group">{children}</div>
    );

  return (
    <CardContentWrapper>
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 flex flex-col">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
             {tags && (
                 <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs backdrop-blur-sm bg-white/20 border-0">
                        {tag}
                        </Badge>
                    ))}
                 </div>
             )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline group-hover:text-accent transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-sm mt-1">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
            {price !== undefined && (
                <p className="font-semibold text-lg">
                    PKR {price.toFixed(2)}
                </p>
            )}
             {link && (
                 <Button variant="ghost" size="sm" className="text-accent group-hover:text-primary">
                    <span>View More</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
             )}
        </CardFooter>
      </Card>
    </CardContentWrapper>
  );
}
