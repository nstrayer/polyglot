'use client';

import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import { useTranslation } from '../hooks/useTranslation';
import { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { SettingsModal } from '../components/SettingsModal';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { knownLanguages, KnownLanguages } from './api/schemas/translation-object-schema';
import { LanguageSelector, languageToPrismLanguage } from '@/components/LanguageSelector';
import { cn } from "@/lib/utils";

export default function Chat() {
  const {
    translationObject: res,
    isLoading,
    textContent,
    setTextContent,
    userComments,
    setUserComments,
    handleConvert,
    handleUpdate,
    availableLibraries,
    setAvailableLibraries,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    cancelTranslation,
    validationError
  } = useTranslation();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="min-h-screen w-full relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#447099]/50 to-[#EE6331]/50" />
        <div className="flex flex-col w-full max-w-5xl h-screen py-24 mx-auto stretch px-4 relative">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Polyglot</h1>
            <p className="text-gray-600">Write in your preferred language, run in your required language.</p>
          </div>
          <div id='card-container' className="flex flex-1 gap-4 overflow-auto min-h-0">
            <Card className="flex-1 min-w-[300px] max-w-[500px] flex flex-col h-full shrink-0">
              <CardHeader>
                <LanguageSelector
                  currentLanguage={sourceLanguage}
                  setLanguage={setSourceLanguage}
                  knownLanguages={knownLanguages}
                />
              </CardHeader>
              <CardContent className="flex-1 min-h-0 overflow-auto ">
                <Editor
                  value={textContent}
                  onValueChange={text => setTextContent(text)}
                  highlight={code => highlight(code, languages[languageToPrismLanguage[sourceLanguage]], languageToPrismLanguage[sourceLanguage])}
                  padding={10}
                  className="bg-white border rounded-md min-h-full"
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14
                  }}
                />
              </CardContent>
              <CardFooter>
                <Button
                  onClick={isLoading ? cancelTranslation : handleConvert}
                  className={cn(
                    "w-full",
                    isLoading && "animate-[colorPulse_2s_ease-in-out_infinite] transition-colors"
                  )}
                  disabled={Boolean(validationError)}
                >
                  {validationError ? validationError : isLoading ? 'Translating... (Click to Cancel)' : 'Convert'}
                </Button>

              </CardFooter>
            </Card>

            <Card className="flex-1 min-w-[300px] max-w-[500px] flex flex-col h-full shrink-0">
              <CardHeader className="relative">
                <LanguageSelector
                  currentLanguage={targetLanguage}
                  setLanguage={setTargetLanguage}
                  knownLanguages={knownLanguages}
                />
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="p-2 hover:bg-blue-300 rounded-full absolute top-2 right-2"
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
              </CardHeader>
              <CardContent className="flex-1 min-h-0 overflow-auto">
                {isLoading && (
                  <div className="flex justify-center my-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}
                {!isLoading && !res?.contents && (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center px-4">
                    <div className="flex items-center gap-2">
                      <div>

                        Add your code to the left and press
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={handleConvert}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleConvert();
                            }
                          }}
                          aria-disabled={Boolean(validationError)}
                          className={cn(
                            "inline-block px-2 py-1 ml-2 mr-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
                            "cursor-pointer select-none",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            validationError && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          Convert
                        </span>
                        to achieve true enlightenment
                      </div>
                    </div>
                  </div>
                )}
                {res?.contents && (
                  <Editor
                    value={res.contents}
                    onValueChange={() => { }}
                    highlight={code => highlight(code, languages[languageToPrismLanguage[targetLanguage]], languageToPrismLanguage[targetLanguage])}
                    padding={10}
                    className=" bg-white border rounded-md"
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                    }}
                    readOnly
                  />
                )}
                {res?.installCommand && (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2 text-center">Install Command</h4>
                    <p className="text-gray-600 mb-2">Copy and paste this command into your terminal to install the necessary libraries.</p>
                    <code className="block mt-2 p-2 bg-gray-100 rounded font-mono">
                      {res.installCommand}
                    </code>
                  </div>
                )}
                {res?.issuesEncountered && (
                  <div className="mt-4">
                    <h4 className="text-lg font-bold mb-2 text-center">Potential Issues</h4>
                    <ReactMarkdown className="rounded-lg">
                      {res.issuesEncountered}
                    </ReactMarkdown>
                  </div>
                )}
              </CardContent>
              {res?.contents && !isLoading && (
                <CardFooter className="flex flex-col gap-2">
                  <h4 className="text-lg font-bold text-center">Feedback</h4>
                  <Textarea
                    value={userComments}
                    onChange={(e) => setUserComments(e.target.value)}
                    className="w-full"
                    placeholder="Any comments about the translation?"
                  />
                  <Button onClick={handleUpdate} className="w-full">Update</Button>
                </CardFooter>
              )}
            </Card>
          </div>

          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            availableLibraries={availableLibraries}
            setAvailableLibraries={setAvailableLibraries}
          />
        </div>
      </div>
    </Tooltip.Provider>
  );
}
