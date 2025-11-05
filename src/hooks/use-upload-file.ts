'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useStorage } from '@/firebase/provider';
import { useToast } from './use-toast';

export function useUploadFile() {
  const storage = useStorage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
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

    setIsUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
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
