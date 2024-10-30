'use server';

import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { TranslationObjectSchema } from '@/app/api/schemas/translation-object-schema';


// Allow streaming responses up to 30 seconds
// const maxDuration = 30;

/**
 * First request from the user. Just has a script to translate.
 */
type FirstRequest = {
    script: string;
    availableLibraries: string;
};

function isFirstRequest(request: unknown): request is FirstRequest {
    return typeof request === 'object' && request !== null && 'script' in request && !('translatedScript' in request);
}

/**
 * Follow up request from the user. Has the translated script and any comments
 * from the user about the translation.
 */
type FollowUpRequest = FirstRequest & {
    translatedScript: string;
    userComments: string;
};
function isFollowUpRequest(request: unknown): request is FollowUpRequest {
    return typeof request === 'object' && request !== null && 'script' in request && 'translatedScript' in request && 'userComments' in request;
}

export async function POST(req: Request) {
    const context = await req.json();

    let prompt = `The script to translate is: ${context.script}\n\nThe available libraries are: \`\`\`${context.availableLibraries}\`\`\`\n\n`;

    if (isFollowUpRequest(context)) {
        prompt = prompt + `The translated script was: ${context.translatedScript}\n\nThe user's comments were: ${context.userComments}`;
    }

    const result = await streamObject({
        model: openai('gpt-4o'),
        schema: TranslationObjectSchema,
        system: `
You are a script translator. You are given a script written in R and you need to translate it into a python script. 
Additionally, you are given a list of python libraries the user already has installed as returned by the call to \`pip list\`.
If there are any problems with the translation or libraries that the user does not have installed, note these.
Optionally, the user may provide a translated script and comments about the translation. Use these to improve your translation. 
If the comments field is empty, still improve the translation by checking libraries and the original script.
`,
        prompt,
    });

    return result.toTextStreamResponse();
}