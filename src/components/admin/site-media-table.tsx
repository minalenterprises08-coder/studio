'use client';

import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, doc, setDoc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle, Upload } from 'lucide-react';
import Image from 'next/image';
import type { SiteMedia } from '@/lib/types';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUploadFile } from '@/hooks/use-upload-file';
import { useAuth } from '@/hooks/use-auth';
import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

export function SiteMediaTable() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user } = useAuth();
  const { uploadFile, isUploading } = useUploadFile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentlyUploadingId, setCurrentlyUploadingId] = useState<string | null>(null);


  const mediaQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'site_media'), orderBy('name', 'asc'));
  }, [firestore]);

  const {
    data: mediaItems,
    isLoading,
    error,
  } = useCollection<SiteMedia>(mediaQuery);
  
  const handleFileSelect = (mediaId: string) => {
    if (fileInputRef.current) {
        fileInputRef.current.dataset.mediaId = mediaId; // Store the id
        fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const mediaId = event.target.dataset.mediaId;

    if (!file || !mediaId || !firestore || !user) {
      return;
    }

    setCurrentlyUploadingId(mediaId);

    try {
        const imageUrl = await uploadFile(file, `site_media/${mediaId}_${Date.now()}`, user);
        if (!imageUrl) {
            throw new Error("Image upload returned no URL.");
        }
        
        const docRef = doc(firestore, 'site_media', mediaId);
        await setDoc(docRef, { imageUrl: imageUrl }, { merge: true });

        toast({
            title: 'Image Updated',
            description: `The image for "${mediaId}" has been successfully updated.`,
        });

    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: e.message || "Could not update the image."
        });
    } finally {
        setCurrentlyUploadingId(null);
        // Reset file input to allow re-uploading the same file
        if (event.target) {
            event.target.value = ''; 
        }
    }
  };


  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-16 w-24 rounded-md" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Fetching Media</AlertTitle>
            <AlertDescription>
                Could not load site media. Please ensure you have the correct Firestore permissions.
            </AlertDescription>
        </Alert>
    )
  }

  if (!mediaItems || mediaItems.length === 0) {
    return <p className="text-muted-foreground text-center">No site media items have been defined.</p>;
  }

  return (
    <div className="border rounded-lg">
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Preview</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mediaItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                  src={item.imageUrl || `https://picsum.photos/seed/${item.id}/100/75`}
                  alt={item.name}
                  width={100}
                  height={75}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {item.description}
              </TableCell>
              <TableCell className="text-right">
                 <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleFileSelect(item.id)}
                    disabled={isUploading && currentlyUploadingId === item.id}
                >
                    {(isUploading && currentlyUploadingId === item.id) 
                        ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        : <Upload className="mr-2 h-4 w-4" />
                    }
                    Change
                 </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

    