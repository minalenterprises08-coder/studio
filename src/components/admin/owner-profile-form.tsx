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
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUploadFile } from '@/hooks/use-upload-file';
import { useAuth as useAppAuth } from '@/hooks/use-auth';
import type { OwnerProfile } from '@/lib/types';
import { Textarea } from '../ui/textarea';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  title: z.string().min(2, { message: 'Title is required.' }),
  bio1: z.string().min(10, { message: 'First bio paragraph is required.' }),
  bio2: z.string().min(10, { message: 'Second bio paragraph is required.' }),
  image: z.union([z.instanceof(File), z.string()]).optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function OwnerProfileForm() {
  const { firestore } = useFirebase();
  const { user } = useAppAuth();
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const { uploadFile, isUploading } = useUploadFile();

  const ownerProfileRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'site_content/owner_profile') : null),
    [firestore]
  );
  const { data: ownerProfile, isLoading: isLoadingData } = useDoc<OwnerProfile>(ownerProfileRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      title: '',
      bio1: '',
      bio2: '',
      image: undefined,
    },
  });

  useEffect(() => {
    if (ownerProfile) {
      form.reset({
        name: ownerProfile.name,
        title: ownerProfile.title,
        bio1: ownerProfile.bio1,
        bio2: ownerProfile.bio2,
        image: ownerProfile.imageUrl,
      });
    }
  }, [ownerProfile, form]);
  

  const onSubmit = async (values: ProfileFormValues) => {
    if (!firestore || !user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You are not authorized to perform this action.',
      });
      return;
    }

    setIsPending(true);

    try {
      let imageUrl = ownerProfile?.imageUrl || '';
      
      // Check if a new image file was uploaded
      if (values.image && values.image instanceof File) {
        const newImageUrl = await uploadFile(values.image, `site_content/owner_portrait.jpg`, user);
        if (newImageUrl) {
          imageUrl = newImageUrl;
        } else {
          throw new Error('Image upload failed.');
        }
      }

      const profileData: Omit<OwnerProfile, 'id'> = {
        name: values.name,
        title: values.title,
        bio1: values.bio1,
        bio2: values.bio2,
        imageUrl: imageUrl,
      };

      // Using setDoc with merge: true to create or update the document
      await setDoc(doc(firestore, 'site_content', 'owner_profile'), profileData, { merge: true });

      toast({
        title: 'Success!',
        description: 'Owner profile has been updated.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not update the profile.',
      });
    } finally {
      setIsPending(false);
    }
  };
  
  if (isLoadingData) {
      return (
          <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
              <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
              </div>
          </div>
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Shabbir Ahmad Bhatti" {...field} />
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
                <FormLabel>Owner Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Owner & Founder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="bio1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography Paragraph 1</FormLabel>
              <FormControl>
                <Textarea className="resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography Paragraph 2</FormLabel>
              <FormControl>
                <Textarea className="resize-y" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Owner Portrait</FormLabel>
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
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || isUploading}>
            {(isPending || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
