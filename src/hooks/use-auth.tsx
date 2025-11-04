'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { useToast } from './use-toast';

type AuthCredentials = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

// Extend the return type of useAuth
export interface UseAuthReturn {
  user: User | null;
  isUserLoading: boolean;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>; // Expose setIsAdmin
  error: Error | null;
  isPending: boolean;
  signUpWithEmail: (credentials: AuthCredentials) => Promise<void>;
  signInWithEmail: (credentials: AuthCredentials) => void;
  signOut: () => void;
}


export const useAuth = (): UseAuthReturn => {
  const { auth, firestore, user, isUserLoading: isUserAuthLoading } = useFirebase();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  const isUserLoading = isUserAuthLoading || isAdminLoading;


  useEffect(() => {
    setIsAdminLoading(true);
    if (user && firestore) {
      const checkAdminStatus = async () => {
        const adminDocRef = doc(firestore, `roles_admin/${user.uid}`);
        try {
          const adminDoc = await getDoc(adminDocRef);
          setIsAdmin(adminDoc.exists());
        } catch (e) {
          console.error("Error checking admin status:", e)
          setIsAdmin(false);
        } finally {
          setIsAdminLoading(false);
        }
      };
      checkAdminStatus();
    } else {
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [user, firestore]);

  const handleAuthError = (e: any) => {
    setError(e);
    toast({
      variant: 'destructive',
      title: 'Error',
      description: e.message || 'An unexpected error occurred.',
    });
    setIsPending(false);
  };
  
  const signUpWithEmail = async ({
    email,
    password,
    firstName,
    lastName,
  }: AuthCredentials) => {
    if (!firstName || !lastName) {
      const err = new Error('First and last name are required for sign up.');
      setError(err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message,
      });
      return;
    }
    
    setIsPending(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(user, { displayName });

      // Create user profile in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        firstName,
        lastName,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      // The onAuthStateChanged listener will handle the redirect
      toast({ title: 'Success', description: 'Account created successfully!' });
    } catch(e: any) {
      handleAuthError(e);
    } finally {
      setIsPending(false);
    }
  };

  const signInWithEmail = ({ email, password }: AuthCredentials) => {
    setIsPending(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // The onAuthStateChanged listener will handle the redirect.
        toast({ title: 'Success', description: 'Signed in successfully!' });
      })
      .catch(handleAuthError)
      .finally(() => {
        setIsPending(false);
      });
  };

  const signOut = () => {
    setIsPending(true);
    firebaseSignOut(auth)
      .then(() => {
        toast({ title: 'Success', description: 'Signed out successfully.' });
        router.push('/');
      })
      .catch(handleAuthError)
      .finally(() => setIsPending(false));
  };
  
  // Protect routes by redirecting unauthenticated users
  useEffect(() => {
    if (isUserLoading) return; // Wait until loading is complete

    const isAuthPage =
      pathname.startsWith('/login') ||
      pathname.startsWith('/signup');

    if (user && isAuthPage) {
      router.push('/dashboard');
    }

    const isProtectedPage = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');

    if (!user && isProtectedPage) {
      router.push('/login');
    }
    
    // Redirect non-admins away from admin page
    if (user && !isAdmin && pathname.startsWith('/admin')) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You are not authorized to view this page.',
      });
      router.push('/dashboard');
    }
  }, [user, isUserLoading, isAdmin, router, toast, pathname]);


  return {
    user,
    isUserLoading,
    isAdmin,
    setIsAdmin,
    error,
    isPending,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
};
