import { experimental_useObject as useObject } from 'ai/react';
import { TranslationObjectSchema } from '../app/api/schemas/translation';
import { useState } from 'react';
import { starterScript, samplePipList } from '../app/constants/constants';

export function useTranslation() {
    const { object: res, submit, isLoading, stop } = useObject({
        api: '/api/use-translate-script',
        schema: TranslationObjectSchema,
    });
    const [textContent, setTextContent] = useState(starterScript);
    const [availableLibraries, setAvailableLibraries] = useState(samplePipList);
    const [userComments, setUserComments] = useState('');

    const handleConvert = () => {
        submit({ script: textContent, availableLibraries });
    };

    const handleUpdate = () => {
        submit({
            script: textContent,
            translatedScript: res?.contents,
            userComments,
            availableLibraries,
        });
        setUserComments('');
    };

    return {
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
    };
} 