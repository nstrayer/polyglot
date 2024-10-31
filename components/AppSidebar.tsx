'use client';

import { Settings, Bot, Sparkles } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { modelOptions, ModelOptions } from "@/app/api/schemas/translation-object-schema";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuSub,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

interface ModelSettingsDrawerProps {
    currentModel: ModelOptions;
    onModelChange: (model: ModelOptions) => void;
}

export function AppSidebar({ currentModel, onModelChange }: ModelSettingsDrawerProps) {
    // Convert modelOptions into a more structured format for the sidebar
    const modelGroups = Object.entries(modelOptions).map(([provider, models]) => ({
        provider,
        models: models.map(model => ({
            name: model,
            icon: provider === 'openai' ? Sparkles : Bot
        }))
    }));

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Use which model?
                    </SidebarGroupLabel>
                    {modelGroups.map(group => (
                        <SidebarGroup key={group.provider}>
                            <SidebarGroupLabel>
                                {group.provider.toUpperCase()} Models
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.models.map((model) => (
                                        <SidebarMenuItem key={model.name}>
                                            <SidebarMenuButton
                                                onClick={() => onModelChange(model.name as ModelOptions)}
                                                className={currentModel === model.name ? "bg-muted" : ""}
                                            >
                                                <model.icon className="h-4 w-4 mr-2" />
                                                <span>{model.name}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button";

export function SidebarTrigger() {
    const { toggleSidebar } = useSidebar()

    return <Button variant="outline" size="sm" onClick={toggleSidebar} >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Toggle settings sidebar</span>
    </Button>
}
