import { experimental_useObject as useObject } from 'ai/react';
import { TranslationObjectSchema, TranslationRequest, KnownLanguages, PartialTranslationObject, ModelOptions, modelOptions } from '../app/api/schemas/translation-object-schema';
import { useState, useEffect, useCallback } from 'react';
import { starterScript, samplePipList } from '../lib/constants';

export function useTranslation() {
    const { object: res, submit, isLoading, stop } = useObject({
        api: '/api/use-translate-script',
        schema: TranslationObjectSchema,
    });
    const [translationObject, setTranslationObject] = useState<PartialTranslationObject>(undefined);
    const [textContent, setTextContent] = useState(starterScript);
    const [availableLibraries, setAvailableLibraries] = useState(samplePipList);
    const [userComments, setUserComments] = useState('');
    const [sourceLanguage, setSourceLanguage] = useState<KnownLanguages>('R');
    const [targetLanguage, setTargetLanguage] = useState<KnownLanguages>('python');
    const [validationError, setValidationError] = useState<string | null>(null);
    const [model, setModel] = useState<ModelOptions>(modelOptions.Anthropic[0]);

    useEffect(() => {
        if (res) {
            setTranslationObject(res);
        }
    }, [res]);

    const clearTranslation = useCallback(() => {
        setTranslationObject(undefined);
        stop();
    }, [stop]);

    useEffect(() => {
        if (sourceLanguage === targetLanguage) {
            setValidationError(`Cannot translate from ${sourceLanguage} to ${targetLanguage} as they are the same language`);
        } else {
            setValidationError(null);
        }
        clearTranslation();
    }, [sourceLanguage, targetLanguage, clearTranslation]);


    const handleConvert = () => {
        if (validationError) return;
        clearTranslation();

        const request: TranslationRequest = {
            script: textContent,
            availableLibraries,
            sourceLanguage,
            targetLanguage,
            model
        };
        submit(request);
    };

    const handleUpdate = () => {
        if (!res?.contents) return;
        if (validationError) return;

        const request: TranslationRequest = {
            script: textContent,
            translatedScript: res.contents,
            userComments,
            availableLibraries,
            sourceLanguage,
            targetLanguage,
            model
        };
        submit(request);
        setUserComments('');
    };

    return {
        translationObject,
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
        validationError,
        cancelTranslation: clearTranslation,
        model,
        setModel
    };
} 