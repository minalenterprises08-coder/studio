'use client';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductManager } from '@/components/admin/product-manager';

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {user?.displayName || 'Admin'}.
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        <ProductManager />

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Manage Portfolio</CardTitle>
                <CardDescription>
                  Add, edit, or delete items from your portfolio showcase.
                </CardDescription>
              </div>
              <Button>Add New Item</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Portfolio management UI will be here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
