'use server';

import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { TranslationObjectSchema, TranslationRequest, FollowUpRequest } from '@/app/api/schemas/translation-object-schema';


function isFollowUpRequest(request: TranslationRequest): request is FollowUpRequest {
    return 'translatedScript' in request && 'userComments' in request;
}

export async function POST(req: Request) {
    const context: TranslationRequest = await req.json();

    let prompt = `The script to translate from ${context.sourceLanguage} to ${context.targetLanguage} is: ${context.script}\n\nThe available libraries are: \`\`\`${context.availableLibraries}\`\`\`\n\n`;

    if (isFollowUpRequest(context)) {
        prompt = prompt + `The translated script was: ${context.translatedScript}\n\nThe user's comments were: ${context.userComments}`;
    }

    const result = await streamObject({
        model: openai('gpt-4o'),
        schema: TranslationObjectSchema,
        system: `
You are a script translator. You are given a script written in ${context.sourceLanguage} and you need to translate it into a ${context.targetLanguage} script. 
Additionally, you are given a list of ${context.targetLanguage} libraries the user already has installed as returned by the appropriate package manager.
If there are any problems with the translation or libraries that the user does not have installed, note these.
Optionally, the user may provide a translated script and comments about the translation. Use these to improve your translation. 
If the comments field is empty, still improve the translation by checking libraries and the original script.
`,
        prompt,
    });

    return result.toTextStreamResponse();
}