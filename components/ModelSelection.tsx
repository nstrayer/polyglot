import { Bot, Sparkles } from "lucide-react";
import { ModelOptions, modelOptions } from "@/app/api/schemas/translation-object-schema";

interface ModelSelectionProps {
    currentModel: ModelOptions;
    onModelChange: (model: ModelOptions) => void;
}

export function ModelSelection({ currentModel, onModelChange }: ModelSelectionProps) {
    const modelGroups = Object.entries(modelOptions).map(([provider, models]) => ({
        provider,
        models: models.map(model => ({
            name: model,
            icon: provider === 'openai' ? Sparkles : Bot
        }))
    }));

    return (
        <div className="space-y-4">
            <h2 className="text-sm font-medium">
                Use which model?
            </h2>
            <div className="space-y-2 pl-2">
                {modelGroups.map(group => (
                    <div key={group.provider} className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            {group.provider}
                        </h3>
                        <div className="space-y-1">
                            {group.models.map((model) => (
                                <button
                                    key={model.name}
                                    onClick={() => onModelChange(model.name as ModelOptions)}
                                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground ${currentModel === model.name ? "bg-muted" : ""
                                        }`}
                                >
                                    <model.icon className="h-4 w-4 mr-2" />
                                    <span>{model.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 