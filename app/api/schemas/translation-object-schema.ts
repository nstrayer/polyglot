import { z } from 'zod';

export const TranslationObjectSchema = z.object({
    contents: z.string().describe('The translated python code.'),
    installCommand: z.string().describe('The command to install the libraries needed to run the script.'),
    issuesEncountered: z.string().describe('A terse explanation of any issues encountered during translation.'),
});

type TranslationObject = z.infer<typeof TranslationObjectSchema>;
export type PartialTranslationObject = Partial<TranslationObject> | undefined;

export const knownLanguages = ['python', 'R', 'typescript', 'go'];
export type KnownLanguages = (typeof knownLanguages)[number];

export type FirstRequest = {
    script: string;
    availableLibraries: string;
    sourceLanguage: KnownLanguages;
    targetLanguage: KnownLanguages;
};

export type FollowUpRequest = FirstRequest & {
    translatedScript: string;
    userComments: string;
};

export type TranslationRequest = FirstRequest | FollowUpRequest;