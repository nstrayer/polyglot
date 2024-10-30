import { KnownLanguages } from '@/app/api/schemas/translation-object-schema';
import { CardTitle } from '@/components/ui/card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface LanguageSelectorProps {
    currentLanguage: KnownLanguages;
    setLanguage: (lang: KnownLanguages) => void;
    knownLanguages: KnownLanguages[];
}

export function LanguageSelector({
    currentLanguage,
    setLanguage,
    knownLanguages
}: LanguageSelectorProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <CardTitle className="text-center hover:cursor-pointer hover:text-blue-500">
                    {currentLanguage}
                </CardTitle>
            </PopoverTrigger>
            <PopoverContent className="w-48">
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