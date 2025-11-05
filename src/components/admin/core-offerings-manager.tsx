'use client';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CoreOfferingsForm } from './core-offerings-form';
import { CoreOfferingsTable } from './core-offerings-table';

export function CoreOfferingsManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Manage Core Offerings</CardTitle>
            <CardDescription>
              Edit the items displayed on the homepage's "Our Core Offerings" section.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" /> Add New Offering
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add a New Core Offering</DialogTitle>
              </DialogHeader>
              <CoreOfferingsForm onFormSubmit={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <CoreOfferingsTable />
      </CardContent>
    </Card>
  );
}

    