import { z } from 'zod';

export const TranslationObjectSchema = z.object({
    contents: z.string().describe('The translated python code.'),
    installCommand: z.string().describe('The command to install the libraries. Only include libraries that the user doesn\'t have installed already.'),
    issuesEncountered: z.string().describe('A terse explanation of any issues encountered during translation.'),
});

type TranslationObject = z.infer<typeof TranslationObjectSchema>;
export type PartialTranslationObject = Partial<TranslationObject> | undefined;

export const knownLanguages = ['python', 'R', 'typescript', 'go'];
export type KnownLanguages = (typeof knownLanguages)[number];

export const libraryListCommandByLanguage: Record<KnownLanguages, string> = {
    python: 'Run `pip list` in terminal',
    R: `Run \`print(as.data.frame(installed.packages()[,c('Version')]))\` from R terminal`,
    typescript: 'Run `npm list` from terminal',
    go: 'Run `go list -m all` from terminal',
}

export type ModelOptions = 'gpt-4o' | 'gpt-4o-mini' | 'claude-3-5-sonnet-latest';

export const modelOptions = {
    OpenAI: ['gpt-4o', 'gpt-4o-mini'],
    Anthropic: ['claude-3-5-sonnet-latest'],
} as const;


export type FirstRequest = {
    script: string;
    availableLibraries: string;
    model: ModelOptions;
    sourceLanguage: KnownLanguages;
    targetLanguage: KnownLanguages;
};

export type FollowUpRequest = FirstRequest & {
    translatedScript: string;
    userComments: string;
};

export type TranslationRequest = FirstRequest | FollowUpRequest;