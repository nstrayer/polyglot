'use client';

// This is the old version of doing things that used the plain text stream
// approach along with finding the fence tokens to extract the translated script
// and explanation.

import { useEffect, useState } from 'react';
import { translateScript } from './useTranslateScript';
import { FenceTokens } from '@/lib/constants';
import { readStreamableValue } from 'ai/rsc';

export function useTranslationStream() {
  const [textContent, setTextContent] = useState('');
  const [modelResponseText, setModelResponseText] = useState('');
  const [translatedScript, setTranslatedScript] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    setIsLoading(true);
    (async () => {
      const { output } = await translateScript(textContent);

      for await (const delta of readStreamableValue(output)) {
        setModelResponseText(currentGeneration => {
          const updatedText = `${currentGeneration}${delta}`;
          return updatedText;
        });
      }
    })()
  };

  useEffect(() => {
    if (translatedScript && explanation) {
      setIsLoading(false);
    }
  }, [translatedScript, explanation]);

  useEffect(() => {
    const hasOpeningFenceToken = modelResponseText.includes(FenceTokens.scriptStart);
    if (!hasOpeningFenceToken) {
      return;
    }

    const hasClosingFenceToken = modelResponseText.includes(FenceTokens.scriptEnd);
    if (!hasClosingFenceToken) {
      return;
    }

    const startIndex = modelResponseText.indexOf(FenceTokens.scriptStart) + FenceTokens.scriptStart.length;
    const endIndex = modelResponseText.indexOf(FenceTokens.scriptEnd);
    const translatedScript = modelResponseText.substring(startIndex, endIndex).trim();
    setTranslatedScript(translatedScript);
  }, [modelResponseText]);

  useEffect(() => {
    const hasOpeningFenceToken = modelResponseText.includes(FenceTokens.explainStart);
    if (!hasOpeningFenceToken) {
      return;
    }

    const hasClosingFenceToken = modelResponseText.includes(FenceTokens.explainEnd);
    if (!hasClosingFenceToken) {
      return;
    }

    const startIndex = modelResponseText.indexOf(FenceTokens.explainStart) + FenceTokens.explainStart.length;
    const endIndex = modelResponseText.indexOf(FenceTokens.explainEnd);
    const explanation = modelResponseText.substring(startIndex, endIndex);
    setExplanation(explanation);
  }, [modelResponseText]);

  return {
    textContent,
    setTextContent,
    translatedScript,
    explanation,
    handleSend,
    isLoading
  };
} 