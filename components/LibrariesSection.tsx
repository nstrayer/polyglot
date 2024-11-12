import { Textarea } from "@/components/ui/textarea";
import { KnownLanguages, libraryListCommandByLanguage } from "@/app/api/schemas/translation-object-schema";
import ReactMarkdown from "react-markdown";

interface LibrariesSectionProps {
    availableLibraries: string;
    setAvailableLibraries: (libraries: string) => void;
    targetLanguage: KnownLanguages;
}

export function LibrariesSection({ availableLibraries, setAvailableLibraries, targetLanguage }: LibrariesSectionProps) {
    return (
        <div className="space-y-2">
            <h2 className="font-medium">
                Installed Libraries for target
            </h2>
            <div className="ml-2 mt-2">
                <div className="text-xs text-gray-500 mb-2">
                    <ReactMarkdown>{libraryListCommandByLanguage[targetLanguage]}</ReactMarkdown>
                </div>
                <Textarea
                    value={availableLibraries}
                    onChange={(e) => setAvailableLibraries(e.target.value)}
                    className="font-mono h-96"
                    placeholder="Enter available libraries..."
                />
            </div>
        </div>
    );
} 