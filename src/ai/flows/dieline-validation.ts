'use server';

/**
 * @fileOverview Dieline validation AI agent.
 *
 * - validateDieline - A function that handles the dieline validation process.
 * - ValidateDielineInput - The input type for the validateDieline function.
 * - ValidateDielineOutput - The return type for the validateDieline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateDielineInputSchema = z.object({
  dielineDataUri: z
    .string()
    .describe(
      "A dieline file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ValidateDielineInput = z.infer<typeof ValidateDielineInputSchema>;

const ValidateDielineOutputSchema = z.object({
  isValid: z.boolean().describe('Whether or not the dieline is valid.'),
  errors: z.array(z.string()).describe('A list of errors found in the dieline.'),
  warnings: z.array(z.string()).describe('A list of warnings for the dieline.'),
});
export type ValidateDielineOutput = z.infer<typeof ValidateDielineOutputSchema>;

export async function validateDieline(input: ValidateDielineInput): Promise<ValidateDielineOutput> {
  return validateDielineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateDielinePrompt',
  input: {schema: ValidateDielineInputSchema},
  output: {schema: ValidateDielineOutputSchema},
  prompt: `You are an expert in dieline design and validation.

You will receive a dieline file as input, and you will validate it for common design problems, such as:
- Incorrect dimensions
- Missing bleed
- Text too close to the cut line
- Elements that will be cut off

You will output a JSON object with the following format:
{
  "isValid": true|false,
  "errors": ["error 1", "error 2", ...],
  "warnings": ["warning 1", "warning 2", ...]
}

If the dieline is valid, the isValid field should be true, and the errors and warnings arrays should be empty.

Use the following as the primary source of information about the dieline.

Dieline: {{media url=dielineDataUri}}
`,
});

const validateDielineFlow = ai.defineFlow(
  {
    name: 'validateDielineFlow',
    inputSchema: ValidateDielineInputSchema,
    outputSchema: ValidateDielineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
