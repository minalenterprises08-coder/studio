'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OwnerProfileForm } from './owner-profile-form';

export function OwnerProfileManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Owner Profile</CardTitle>
        <CardDescription>
          Edit the content for the "Meet Our Founder" section on the About Us page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OwnerProfileForm />
      </CardContent>
    </Card>
  );
}
