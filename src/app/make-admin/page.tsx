'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useFirebase } from '@/firebase/provider';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MakeAdminPage() {
  const { user, isUserLoading, isAdmin, setIsAdmin } = useAuth(); // Assuming useAuth can expose setIsAdmin
  const { firestore } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleMakeAdmin = async () => {
    if (!user || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to perform this action.',
      });
      return;
    }

    if (isAdmin) {
      toast({
        title: 'Already an Admin',
        description: 'Your account already has administrator privileges.',
      });
      return;
    }

    setIsLoading(true);

    const adminDocRef = doc(firestore, `roles_admin/${user.uid}`);

    try {
      // Create the admin role document.
      // The content of the document doesn't matter, only its existence.
      await setDoc(adminDocRef, { admin: true, assignedAt: new Date().toISOString() });
      
      // Manually update the local admin state after successful operation
      if (typeof setIsAdmin === 'function') {
        setIsAdmin(true);
      } else {
        // If setIsAdmin is not available, force a reload to re-check auth state
         window.location.reload();
      }

      toast({
        title: 'Success!',
        description: 'You have been granted administrator privileges.',
      });

      // Redirect to the admin dashboard after a short delay
      setTimeout(() => {
        router.push('/admin');
      }, 1000);

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Operation Failed',
        description: error.message || 'Could not grant admin privileges. Please check Firestore rules.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading) {
    return <div className="container py-12 text-center">Loading user information...</div>;
  }

  if (!user) {
    return <div className="container py-12 text-center">Please log in first.</div>;
  }


  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Become an Administrator</CardTitle>
            <CardDescription>
              Click the button below to grant administrator privileges to your account ({user.email}). This is a one-time setup action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleMakeAdmin}
              disabled={isLoading || isAdmin}
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isAdmin ? 'You are already an Admin' : 'Make Me Admin'}
            </Button>
            {isAdmin && (
                <p className="text-sm text-green-600 mt-4 text-center">
                    Redirecting you to the admin dashboard...
                </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
