'use server';


// This is the old version of doing things that used the plain text stream
// approach along with finding the fence tokens to extract the translated script
// and explanation.

import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { FenceTokens } from '@/lib/constants';

const SYSTEM_PROMPT = `
You are a script translator. You are given a script written in R and you need to translate it to a different language.
Here is the script, please translate it to python code. If there are any problems with the translation or non-standard libraries are needed, explain this in terse language after the translation.
Preface the script with a comment that says ${FenceTokens.scriptStart} and end it with ${FenceTokens.scriptEnd}
Preface the explanation with a comment that says ${FenceTokens.explainStart} and end it with ${FenceTokens.explainEnd}
`;

export async function translateScript(input: string) {
  const stream = createStreamableValue('');

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}