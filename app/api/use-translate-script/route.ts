'use server';

import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { TranslationObjectSchema } from '@/app/api/schemas/translation';


// Allow streaming responses up to 30 seconds
// const maxDuration = 30;

export async function POST(req: Request) {
    const context = await req.json();

    const result = await streamObject({
        model: openai('gpt-4o-mini'),
        schema: TranslationObjectSchema,
        system: `
You are a script translator. You are given a script written in R and you need to translate it to a different language.
Here is the script, please translate it to python code. If there are any problems with the translation or non-standard libraries are needed, explain this in terse language.
`,
        prompt: context.input,
    });

    return result.toTextStreamResponse();
}