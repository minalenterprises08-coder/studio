'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
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

export const useAuth = () => {
  const { auth, firestore, user, isUserLoading } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && firestore) {
      const checkAdminStatus = async () => {
        const adminDocRef = doc(firestore, `roles_admin/${user.uid}`);
        try {
          const adminDoc = await getDoc(adminDocRef);
          setIsAdmin(adminDoc.exists());
        } catch (e) {
          setIsAdmin(false);
        }
      };
      checkAdminStatus();
    } else {
      setIsAdmin(false);
    }
  }, [user, firestore]);

  const handleAuthAction = async (
    authPromise: Promise<any>,
    successMessage: string,
    redirectPath: string
  ) => {
    setIsPending(true);
    setError(null);
    try {
      await authPromise;
      toast({ title: 'Success', description: successMessage });
      router.push(redirectPath);
    } catch (e: any) {
      setError(e);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsPending(false);
    }
  };

  const signUpWithEmail = async ({
    email,
    password,
    firstName,
    lastName,
  }: AuthCredentials) => {
    if (!firstName || !lastName) {
      setError(new Error('First and last name are required for sign up.'));
      return;
    }
    await handleAuthAction(
      (async () => {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
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

        return userCredential;
      })(),
      'Account created successfully!',
      '/dashboard'
    );
  };

  const signInWithEmail = async ({ email, password }: AuthCredentials) => {
    await handleAuthAction(
      signInWithEmailAndPassword(auth, email, password),
      'Signed in successfully!',
      '/dashboard'
    );
  };

  const signOut = async () => {
    await handleAuthAction(
      firebaseSignOut(auth),
      'Signed out successfully.',
      '/'
    );
  };
  
  // Protect routes by redirecting unauthenticated users
  useEffect(() => {
    const isAuthPage =
      window.location.pathname.startsWith('/login') ||
      window.location.pathname.startsWith('/signup');

    if (!isUserLoading && user && isAuthPage) {
      router.push('/dashboard');
    }

    if (
      !isUserLoading &&
      !user &&
      (window.location.pathname.startsWith('/dashboard') ||
        window.location.pathname.startsWith('/admin'))
    ) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    // Redirect non-admins away from admin page
    if (!isUserLoading && user && !isAdmin && window.location.pathname.startsWith('/admin')) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You are not authorized to view this page.',
      });
      router.push('/dashboard');
    }
  }, [user, isUserLoading, isAdmin, router, toast]);

  return {
    user,
    isUserLoading,
    isAdmin,
    error,
    isPending,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };
};
