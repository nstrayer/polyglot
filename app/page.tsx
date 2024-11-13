'use client';

import ReactMarkdown from 'react-markdown';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-python';
import { useTranslation } from '../hooks/useTranslation';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { knownLanguages } from './api/schemas/translation-object-schema';
import { LanguageSelector, languageToPrismLanguage } from '@/components/LanguageSelector';
import { cn } from "@/lib/utils";
import { ConversionArrow } from '@/components/ConversionArrow';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/AppSidebar';

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
    validationError,
    model,
    setModel
  } = useTranslation();

  return (
    <Tooltip.Provider delayDuration={200}>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar
          currentModel={model}
          onModelChange={setModel}
          availableLibraries={availableLibraries}
          setAvailableLibraries={setAvailableLibraries}
          targetLanguage={targetLanguage}
        />
        <SidebarTrigger />
        <div className="min-h-screen w-full">
          <div className="flex flex-col w-full max-w-5xl h-screen py-24 mx-auto stretch px-4">
            <div className="text-center mb-2">
              <h1 className="text-4xl font-bold mb-2">Polyglot</h1>
              <p className="text-gray-600">Write in your preferred language, run in your required language.</p>
            </div>
            <div id='card-container' className="flex flex-col md:flex-row flex-1 md:gap-4 overflow-auto min-h-0 relative pt-12">
              <div className="absolute left-1/2 -translate-x-1/2 z-10 -translate-y-28 rotate-6 w-64 h-64 
              hidden md:block">
                <ConversionArrow isLoading={isLoading} />
              </div>
              <Card className="flex-1 min-w-[300px] md:max-w-[500px] flex flex-col h-full shrink-0">
                <CardHeader>
                  <LanguageSelector
                    sourceOrTarget='source'
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

              <div className="md:hidden flex justify-center w-full -my-4 -translate-y-1">
                <div className="w-48 h-48 rotate-90">
                  <ConversionArrow isLoading={isLoading} />
                </div>
              </div>

              <Card className="flex-1 min-w-[300px] md:max-w-[500px] flex flex-col h-full shrink-0">
                <CardHeader className="relative">
                  <LanguageSelector
                    sourceOrTarget='target'
                    currentLanguage={targetLanguage}
                    setLanguage={setTargetLanguage}
                    knownLanguages={knownLanguages}
                  />
                </CardHeader>
                <CardContent className="flex-1 min-h-0 overflow-auto relative">
                  {isLoading && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 my-4">
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
          </div>
        </div>
      </SidebarProvider>
    </Tooltip.Provider>
  );
}
