'use client';

import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-r';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import { experimental_useObject as useObject } from 'ai/react';
import { TranslationObjectSchema } from './api/schemas/translation';
import { useState } from 'react';

export default function Chat() {

  const { object, submit, isLoading: isLoadingObject, stop } = useObject({
    api: '/api/use-translate-script',
    schema: TranslationObjectSchema,
  });
  const [textContent, setTextContent] = useState('');

  const translatedScript = object?.script?.contents;
  const issuesEncountered = object?.script?.issuesEncountered;
  const librariesNeeded = object?.script?.librariesNeeded;

  console.log('object', object);

  // const { textContent, setTextContent, translatedScript, explanation, handleSend, isLoading } = useTranslationStream();

  return (
    <div className="flex flex-col w-full max-w-5xl h-screen py-24 mx-auto stretch px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Polyglot</h1>
        <p className="text-gray-600">Write in your preferred language, run in your required language.</p>
      </div>
      <div className="flex mb-8 flex-1 overflow-hidden gap-4">
        <div className="flex-1 p-4 rounded-lg bg-red-200 min-w-[300px] max-w-[500px]">
          <div className="flex flex-col h-full">
            <h2 className="text-lg font-bold mb-2 text-center">R</h2>
            <Editor
              value={textContent}
              onValueChange={text => setTextContent(text)}
              highlight={code => highlight(code, languages.r, 'r')}
              padding={10}
              className="flex-1 bg-white"
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
              }}
            />
            <button
              onClick={() => {
                submit({ input: textContent });
              }}
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm"
            >
              Convert
            </button>
          </div>
        </div>
        <div className="flex-1 p-4 rounded-lg bg-blue-200 h-full overflow-auto min-w-[300px] max-w-[500px]">
          <h2 className="text-lg font-bold mb-2 text-center">Python</h2>
          {isLoadingObject && (
            <div className="flex justify-center my-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}
          {translatedScript && (
            <div className="bg-white shadow-sm">
              <Editor
                value={translatedScript}
                onValueChange={() => { }}
                highlight={code => highlight(code, languages.python, 'python')}
                padding={10}
                className="flex-1 overflow-auto bg-white rounded-lg shadow-sm"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                }}
                readOnly
              />
            </div>
          )}
          {
            librariesNeeded &&
            <>
              <h4 className="text-lg font-bold mb-2 pt-4 text-center">Libraries Needed</h4>
              <ul>
                {librariesNeeded.map(library => (
                  <li key={library} className="font-mono">{library}</li>
                ))}
              </ul>
            </>
          }
          {
            issuesEncountered &&
            <>
              <h4 className="text-lg font-bold mb-2 pt-4 text-center">Potential Issues</h4>
              <ReactMarkdown className="rounded-lg">
                {issuesEncountered}
              </ReactMarkdown>
            </>

          }
        </div>
      </div>
    </div>
  );
}
