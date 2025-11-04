'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase/provider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Loader2, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  text: z.string().min(10, { message: 'Review must be at least 10 characters.' }),
  rating: z.number().min(1).max(5),
});

export function TestimonialForm() {
  const { user } = useAuth();
  const { firestore } = useFirebase();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      text: '',
      rating: 0,
    },
  });

  const currentRating = form.watch('rating');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to submit a review.',
      });
      return;
    }

    setIsPending(true);

    try {
      const testimonialData = {
        ...values,
        userId: user.uid,
        name: user.displayName,
        photoUrl: user.photoURL,
        createdAt: serverTimestamp(),
      };
      
      const testimonialsCol = collection(firestore, 'testimonials');
      addDocumentNonBlocking(testimonialsCol, testimonialData);

      toast({
        title: 'Success!',
        description: 'Your review has been submitted.',
      });
      form.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not submit your review.',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div 
                  className="flex items-center gap-1"
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        'h-6 w-6 cursor-pointer transition-colors',
                        (hoveredRating >= star || currentRating >= star)
                          ? 'text-accent fill-accent'
                          : 'text-muted-foreground'
                      )}
                      onMouseEnter={() => setHoveredRating(star)}
                      onClick={() => field.onChange(star)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Title (e.g. "CEO, MyCompany")</FormLabel>
              <FormControl>
                <Input placeholder="Wedding Planner" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Minal Enterprises provided exceptional service..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Review
        </Button>
      </form>
    </Form>
  );
}
