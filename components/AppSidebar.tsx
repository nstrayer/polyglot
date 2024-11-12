'use client';

import { Settings } from "lucide-react";
import { KnownLanguages, ModelOptions } from "@/app/api/schemas/translation-object-schema";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { LibrariesSection } from "@/components/LibrariesSection";
import { ModelSelection } from "@/components/ModelSelection";

interface ModelSettingsDrawerProps {
    currentModel: ModelOptions;
    onModelChange: (model: ModelOptions) => void;
    availableLibraries: string;
    setAvailableLibraries: (libraries: string) => void;
    targetLanguage: KnownLanguages;
}

export function AppSidebar({ currentModel, onModelChange, availableLibraries, setAvailableLibraries, targetLanguage }: ModelSettingsDrawerProps) {
    return (
        <Sidebar>
            <SidebarHeader>
                App Settings
                <Separator />
            </SidebarHeader>
            <SidebarContent className="p-2 gap-6">

                <ModelSelection
                    currentModel={currentModel}
                    onModelChange={onModelChange}
                />
                <Separator />
                <LibrariesSection
                    availableLibraries={availableLibraries}
                    setAvailableLibraries={setAvailableLibraries}
                    targetLanguage={targetLanguage}
                />
            </SidebarContent>
        </Sidebar>
    );
}

import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function SidebarTrigger() {
    const { toggleSidebar } = useSidebar()

    return <Button variant="outline" size="sm" onClick={toggleSidebar} >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Toggle settings sidebar</span>
    </Button>
}
