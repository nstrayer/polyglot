'use client';

import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-r';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import { useTranslation } from '../hooks/useTranslation';
import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { SettingsModal } from '../components/SettingsModal';

export default function Chat() {
  const {
    res,
    isLoading,
    textContent,
    setTextContent,
    userComments,
    setUserComments,
    handleConvert,
    handleUpdate,
    availableLibraries,
    setAvailableLibraries
  } = useTranslation();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={200}>
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
                onClick={handleConvert}
                className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm"
              >
                Convert
              </button>
            </div>
          </div>
          <div className="flex-1 p-4 rounded-lg bg-blue-200 h-full overflow-auto min-w-[300px] max-w-[500px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-center">Python</h2>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 hover:bg-blue-300 rounded-full"
                    aria-label="Configure Python libraries"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
                    sideOffset={5}
                  >
                    Configure available Python libraries
                    <Tooltip.Arrow className="fill-gray-800" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>

            {isLoading && (
              <div className="flex justify-center my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            {res?.contents && (
              <div className="bg-white shadow-sm">
                <Editor
                  value={res.contents}
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
              res?.librariesNeeded &&
              <>
                <h4 className="text-lg font-bold mb-2 pt-4 text-center">Libraries Needed</h4>
                <ul>
                  {res.librariesNeeded.map(library => (
                    <li key={library} className="font-mono">{library}</li>
                  ))}
                </ul>
                {res?.installCommand && (
                  <code className="block text-center mt-2 p-2 bg-gray-100 rounded font-mono">
                    {res.installCommand}
                  </code>
                )}
              </>
            }
            {
              res?.issuesEncountered &&
              <>
                <h4 className="text-lg font-bold mb-2 pt-4 text-center">Potential Issues</h4>
                <ReactMarkdown className="rounded-lg">
                  {res.issuesEncountered}
                </ReactMarkdown>
              </>
            }

            {res?.contents && !isLoading && (
              <div className="mt-4">
                <h4 className="text-lg font-bold mb-2 text-center">Feedback</h4>
                <textarea
                  value={userComments}
                  onChange={(e) => setUserComments(e.target.value)}
                  className="w-full p-2 rounded-lg"
                  placeholder="Any comments about the translation?"
                />
                <button
                  onClick={handleUpdate}
                  className="w-full py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm"
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          availableLibraries={availableLibraries}
          setAvailableLibraries={setAvailableLibraries}
        />
      </div>
    </Tooltip.Provider>
  );
}
