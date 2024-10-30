import { experimental_useObject as useObject } from 'ai/react';
import { TranslationObjectSchema, TranslationRequest, KnownLanguages, PartialTranslationObject } from '../app/api/schemas/translation-object-schema';
import { useState, useEffect, useCallback } from 'react';
import { starterScript, samplePipList } from '../app/constants/constants';

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

    useEffect(() => {
        if (res) {
            setTranslationObject(res);
        }
    }, [res]);

    const cancelTranslation = useCallback(() => {
        setTranslationObject(undefined);
        stop();
    }, [stop]);

    useEffect(() => {
        if (sourceLanguage === targetLanguage) {
            setValidationError(`Cannot translate from ${sourceLanguage} to ${targetLanguage} as they are the same language`);
        } else {
            setValidationError(null);
        }
        cancelTranslation();
    }, [sourceLanguage, targetLanguage, cancelTranslation]);

    const handleConvert = () => {
        if (validationError) return;

        const request: TranslationRequest = {
            script: textContent,
            availableLibraries,
            sourceLanguage,
            targetLanguage
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
            targetLanguage
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
        cancelTranslation,
    };
} 