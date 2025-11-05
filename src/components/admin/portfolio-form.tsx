'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase/provider';
import { collection } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { PortfolioItem } from '@/lib/types';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title is required.' }),
  category: z.string().min(2, { message: 'Category is required.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  tags: z.string().optional(),
});

type PortfolioFormValues = z.infer<typeof formSchema>;

interface PortfolioFormProps {
  onFormSubmit: () => void;
}

export function PortfolioForm({ onFormSubmit }: PortfolioFormProps) {
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      imageUrl: '',
      tags: '',
    },
  });

  const onSubmit = (values: PortfolioFormValues) => {
    if (!firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firestore is not available.',
      });
      return;
    }

    setIsPending(true);

    try {
      const portfolioCol = collection(firestore, 'portfolio');
      const newPortfolioItem: Omit<PortfolioItem, 'id'> = {
        ...values,
        tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
      };

      addDocumentNonBlocking(portfolioCol, newPortfolioItem);

      toast({
        title: 'Success!',
        description: `${values.title} has been added to your portfolio.`,
      });
      form.reset();
      onFormSubmit();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          error.message || 'Could not add portfolio item. Check Firestore rules.',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Luxury Brand Packaging" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Rigid Boxes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Foil Stamping, Embossing, Matte"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Portfolio Item
          </Button>
        </div>
      </form>
    </Form>
  );
}
