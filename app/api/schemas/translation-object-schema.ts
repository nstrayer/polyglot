import { z } from 'zod';

export const TranslationObjectSchema = z.object({
    contents: z.string().describe('The translated python code.'),
    installCommand: z.string().describe('The command to install the libraries needed to run the script. This should only include libraries that the user does not already have installed.'),
    issuesEncountered: z.string().describe('A terse explanation of any issues encountered during translation.'),
});
