'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableLibraries: string;
    setAvailableLibraries: (libraries: string) => void;
}

export function SettingsModal({
    isOpen,
    onClose,
    availableLibraries,
    setAvailableLibraries
}: SettingsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Available Libraries. Paste the result of <code>pip list</code> here.
                    </label>
                    <Textarea
                        value={availableLibraries}
                        onChange={(e) => setAvailableLibraries(e.target.value)}
                        className="font-mono h-32"
                        placeholder="Enter available libraries..."
                    />
                </div>
                <Button onClick={onClose} className="w-full">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    );
} 