import { KnownLanguages } from '@/app/api/schemas/translation-object-schema';
import { CardTitle } from '@/components/ui/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import * as Tooltip from '@radix-ui/react-tooltip';
import { useState, useCallback, useRef } from 'react';

interface LanguageSelectorProps {
    sourceOrTarget: 'source' | 'target';
    currentLanguage: KnownLanguages;
    setLanguage: (lang: KnownLanguages) => void;
    knownLanguages: KnownLanguages[];
}

export function LanguageSelector({
    sourceOrTarget,
    currentLanguage,
    setLanguage,
    knownLanguages
}: LanguageSelectorProps) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const debouncedSetOpen = useCallback((shouldOpen: boolean) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setOpen(shouldOpen);
        }, 100); // 100ms delay
    }, []);

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <CardTitle
                            className="text-center hover:cursor-pointer hover:text-blue-500"
                            onMouseEnter={() => debouncedSetOpen(true)}
                            onMouseLeave={() => debouncedSetOpen(false)}
                        >
                            {currentLanguage}
                        </CardTitle>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-64"
                        onMouseEnter={() => debouncedSetOpen(true)}
                        onMouseLeave={() => debouncedSetOpen(false)}
                    >
                        <h4 className="text-center mb-2">
                            Choose {sourceOrTarget === 'source' ? 'Source' : 'Target'} Language
                        </h4>

                        <div className="h-[1px] bg-gray-200 my-2" />

                        <div className="flex flex-col gap-1">
                            {knownLanguages.map((lang) => (
                                <button
                                    key={lang}
                                    className={`px-4 py-2 text-left rounded-md hover:bg-blue-100 ${currentLanguage === lang ? 'bg-blue-50 text-blue-600' : ''
                                        }`}
                                    onClick={() => setLanguage(lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm"
                    sideOffset={5}
                >
                    Click to change language
                    <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    );
}

/**
 * Map of languages to the language used by Prism.js
 */
export const languageToPrismLanguage: Record<KnownLanguages, string> = {
    python: 'python',
    R: 'r',
    typescript: 'ts',
    go: 'go',
};