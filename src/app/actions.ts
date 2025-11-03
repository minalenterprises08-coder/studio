'use server';

import { validateDieline } from '@/ai/flows/dieline-validation';
import type { ValidateDielineOutput } from '@/ai/flows/dieline-validation';

export async function validateDielineAction(
  dielineDataUri: string
): Promise<{
  success: boolean;
  data: ValidateDielineOutput;
  error?: string;
}> {
  try {
    const result = await validateDieline({ dielineDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Dieline validation error:', error);
    // In a real app, you might want to log this error to a monitoring service.
    // Return a generic error to the user for security.
    return {
      success: false,
      data: { isValid: false, errors: [], warnings: [] },
      error:
        error instanceof Error ? error.message : 'An unknown error occurred during validation.',
    };
  }
}
