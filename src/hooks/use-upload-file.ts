'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useStorage } from '@/firebase/provider';
import { useToast } from './use-toast';
import type { User } from 'firebase/auth';

export function useUploadFile() {
  const storage = useStorage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (file: File, path: string, user: User | null): Promise<string | null> => {
    if (!storage) {
      const err = new Error('Firebase Storage is not available.');
      setError(err);
      toast({
        variant: 'destructive',
        title: 'Upload Error',
        description: err.message,
      });
      return null;
    }

    if (!user) {
        const err = new Error('You must be logged in to upload files.');
        setError(err);
        toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: err.message,
        });
        return null;
    }

    setIsUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, path);
      // Pass the user's auth token in the metadata
      const metadata = {
        customMetadata: {
          'userId': user.uid
        }
      };

      const snapshot = await uploadBytes(storageRef, file, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      toast({
          title: "Upload Successful",
          description: "Your file has been uploaded.",
      })
      
      return downloadURL;
    } catch (e: any) {
      setError(e);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: e.message || 'An unexpected error occurred during upload.',
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, error };
}
