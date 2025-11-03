'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) {
    return <div className="container py-12 text-center">Loading...</div>;
  }

  if (!user) {
    // This should be handled by the useAuth hook redirect, but as a fallback
    return <div className="container py-12 text-center">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">
            Welcome, {user.displayName || 'Customer'}
          </h1>
          <p className="text-muted-foreground mt-2">
            Here you can manage your orders, saved dielines, and invoices.
          </p>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Your personal information.</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.uid}</p>
              {/* More account details will be added here */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>A summary of your recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You have no recent orders.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
