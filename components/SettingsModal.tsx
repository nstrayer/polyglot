'use client';

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
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Settings</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Libraries. Paste the result of <code>pip list</code> here.
                    </label>
                    <textarea
                        value={availableLibraries}
                        onChange={(e) => setAvailableLibraries(e.target.value)}
                        className="w-full p-2 border rounded-lg h-32 font-mono"
                        placeholder="Enter available libraries..."
                    />
                </div>
                <button
                    onClick={onClose}
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Close
                </button>
            </div>
        </div>
    );
} 