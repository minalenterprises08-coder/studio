'use client';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const { user, isUserLoading, isAdmin } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      setIsCheckingAdmin(false);
    }
  }, [isUserLoading]);

  if (isUserLoading || isCheckingAdmin) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome, {user?.displayName || 'Admin'}.
      </p>
      <div className="mt-8">
        <p>Admin-specific content will go here.</p>
      </div>
    </div>
  );
}
