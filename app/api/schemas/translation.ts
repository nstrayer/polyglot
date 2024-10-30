import { z } from 'zod';

export const TranslationObjectSchema = z.object({
    contents: z.string().describe('The translated python code.'),
    librariesNeeded: z.array(z.string()).describe('A list of libraries that are needed to run the script.'),
    installCommand: z.string().describe('The command to install the libraries needed to run the script.'),
    issuesEncountered: z.string().describe('A terse explanation of any issues encountered during translation.'),
});
