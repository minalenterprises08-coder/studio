'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  AlertCircle,
  CheckCircle,
  Info,
  Loader2,
  UploadCloud,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { validateDielineAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { ValidateDielineOutput } from '@/ai/flows/dieline-validation';

const formSchema = z.object({
  productType: z.string().min(1, 'Please select a product type.'),
  dielineFile: z.any().optional(),
});

type ValidationResult = ValidateDielineOutput & {
  fileName: string;
};

export function CustomizerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: '',
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setValidationResult(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const result = await validateDielineAction(base64);
        if (result.success) {
          setValidationResult({ ...result.data, fileName: file.name });
        } else {
          toast({
            variant: 'destructive',
            title: 'Validation Failed',
            description: result.error,
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'An Unexpected Error Occurred',
          description:
            'Could not validate the dieline. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'File Read Error',
        description: 'Could not read the selected file.',
      });
      setIsLoading(false);
    };
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: 'Quote Requested',
      description: 'Your configuration has been submitted.',
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          1. Choose Your Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rigid-box">
                        Custom Rigid Box
                      </SelectItem>
                      <SelectItem value="mailer-box">
                        E-commerce Mailer Box
                      </SelectItem>
                      <SelectItem value="wedding-card">Wedding Card</SelectItem>
                      <SelectItem value="label">Product Label</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <h3 className="font-headline text-2xl mb-4">
                2. Upload Your Dieline (AI Check)
              </h3>
              <div className="relative flex items-center justify-center w-full">
                <label
                  htmlFor="dieline-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold text-accent">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, AI, or EPS file (MAX. 200MB)
                    </p>
                  </div>
                  <Input
                    id="dieline-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.ai,.eps"
                    disabled={isLoading}
                  />
                </label>
                {isLoading && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                    <Loader2 className="h-12 w-12 animate-spin text-accent" />
                  </div>
                )}
              </div>
            </div>

            {validationResult && (
              <div className="space-y-4">
                {validationResult.isValid ? (
                  <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                    <CheckCircle className="h-4 w-4 !text-green-600 dark:!text-green-400" />
                    <AlertTitle className="text-green-800 dark:text-green-300">
                      Dieline is Valid!
                    </AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-400">
                      AI check passed for <strong>{validationResult.fileName}</strong>. No critical errors found.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Dieline has issues</AlertTitle>
                    <AlertDescription>
                     AI check for <strong>{validationResult.fileName}</strong> found the following potential issues:
                     {validationResult.errors.length > 0 && <div className="mt-2">
                        <h4 className="font-semibold">Errors:</h4>
                        <ul className="list-disc pl-5">
                            {validationResult.errors.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                     </div>}
                    </AlertDescription>
                  </Alert>
                )}
                {validationResult.warnings.length > 0 && (
                     <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
                        <Info className="h-4 w-4 !text-amber-600 dark:!text-amber-400" />
                        <AlertTitle className="text-amber-800 dark:text-amber-300">Warnings</AlertTitle>
                        <AlertDescription className="text-amber-700 dark:text-amber-400">
                            <ul className="list-disc pl-5">
                                {validationResult.warnings.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                        </AlertDescription>
                     </Alert>
                )}
              </div>
            )}

            <Separator />
            
            <div className="opacity-50">
                <h3 className="font-headline text-2xl mb-4">3. Dimensions, Material & Finishing</h3>
                <p className="text-muted-foreground text-sm">More steps coming soon...</p>
            </div>


            <Button type="submit" size="lg" className="w-full">
              Get My Estimate
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
