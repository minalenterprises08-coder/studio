'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SiteMediaTable } from './site-media-table';

export function SiteMediaManager() {

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Manage Site Media</CardTitle>
            <CardDescription>
              Update the primary images used across your website.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <SiteMediaTable />
      </CardContent>
    </Card>
  );
}

    