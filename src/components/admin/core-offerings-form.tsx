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
import type { CoreOffering } from '@/lib/types';
import { Textarea } from '../ui/textarea';
import { useUploadFile } from '@/hooks/use-upload-file';
import { useAuth as useAppAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title is required.' }),
  description: z.string().min(2, { message: 'Description is required.' }),
  image: z.instanceof(File).refine(file => file.size > 0, 'Image is required.'),
  link: z.string().min(1, {message: 'Link is required (e.g., /products).'}),
  order: z.coerce.number().min(0, { message: 'Order must be a positive number.' }),
});

type OfferingFormValues = z.infer<typeof formSchema>;

interface CoreOfferingsFormProps {
  onFormSubmit: () => void;
}

export function CoreOfferingsForm({ onFormSubmit }: CoreOfferingsFormProps) {
  const { firestore } = useFirebase();
  const { user } = useAppAuth();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const { uploadFile, isUploading } = useUploadFile();

  const form = useForm<OfferingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: undefined,
      link: '/products',
      order: 0,
    },
  });

  const onSubmit = async (values: OfferingFormValues) => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firestore is not available or you are not logged in.',
      });
      return;
    }

    setIsPending(true);

    try {
      const imageUrl = await uploadFile(values.image, `core-offerings/${Date.now()}_${values.image.name}`, user);
      if (!imageUrl) {
        throw new Error('Image upload failed.');
      }

      const offeringsCol = collection(firestore, 'core_offerings');
      const newOffering: Omit<CoreOffering, 'id'> = {
        title: values.title,
        description: values.description,
        imageUrl: imageUrl,
        link: values.link,
        order: values.order,
      };

      addDocumentNonBlocking(offeringsCol, newOffering);

      toast({
        title: 'Success!',
        description: `${values.title} has been added to your core offerings.`,
      });
      form.reset();
      onFormSubmit();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          error.message || 'Could not add core offering. Check Firestore rules.',
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Custom Printed Boxes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Rigid, fancy, and mailer boxes."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        onChange(e.target.files[0]);
                      }
                    }}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="/products" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || isUploading}>
            {(isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Offering
          </Button>
        </div>
      </form>
    </Form>
  );
}

    