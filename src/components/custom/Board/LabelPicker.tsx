import { useState } from "react"
import { X } from "lucide-react"
import { fadedColorSlight, darkenColor } from "@/lib/constants"

interface LabelPickerProps {
    userLabels: any[];
    selectedLabelIds: string[];
    onToggle: (labelId: string) => void;
    onCreateLabel: (name: string) => Promise<any>;
}

export default function LabelPicker({
    userLabels,
    selectedLabelIds,
    onToggle,
    onCreateLabel,
}: LabelPickerProps) {

    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const selectedLabels = userLabels.filter((label) => selectedLabelIds.includes(label.id));

    const query = inputValue.trim().toLowerCase();
    const matchingLabels = userLabels.filter(
        (label) => !selectedLabelIds.includes(label.id) && (!query || label.name.toLowerCase().includes(query))
    );
    const exactMatch = userLabels.find((label) => label.name.toLowerCase() === query);

    async function handleCreate() {
        if (!inputValue.trim() || isCreating) return;
        setIsCreating(true);
        const newLabel = await onCreateLabel(inputValue.trim());
        setIsCreating(false);
        setInputValue("");
        if (newLabel) {
            onToggle(newLabel.id);
        }
    }

    function handleSelectExisting(labelId: string) {
        onToggle(labelId);
        setInputValue("");
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter") return;
        e.preventDefault();
        if (!inputValue.trim()) return;

        if (exactMatch) {
            handleSelectExisting(exactMatch.id);
        } else {
            handleCreate();
        }
    }

    return (
        <div className="relative flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1.5 rounded-md border bg-card px-2.5 py-1.5 min-h-10">
                {selectedLabels.map((label) => (
                    <span
                        key={label.id}
                        className="flex items-center gap-1 rounded-full py-0.5 px-2 text-xs font-medium"
                        style={{
                            backgroundColor: fadedColorSlight(label.color),
                            borderColor: label.color,
                            borderWidth: 1.5,
                            color: darkenColor(label.color, 0.15),
                        }}
                    >
                        <span className="leading-none -translate-y-px">{label.name}</span>
                        <button
                            type="button"
                            onClick={() => onToggle(label.id)}
                            className="hover:opacity-70"
                        >
                            <X size={11} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 120)}
                    placeholder={selectedLabels.length === 0 ? "Type a label and press Enter" : ""}
                    className="flex-1 min-w-[100px] bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground"
                />
            </div>

            {isOpen && (matchingLabels.length > 0 || query) && (
                <div className="absolute top-full left-0 z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-neutral-400 bg-card shadow-md">
                    {matchingLabels.map((label) => (
                        <button
                            type="button"
                            key={label.id}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSelectExisting(label.id)}
                            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-neutral-500/30 cursor-pointer"
                        >
                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: label.color }} />
                            {label.name}
                        </button>
                    ))}
                    {query && !exactMatch && (
                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleCreate()}
                            disabled={isCreating}
                            className="w-full px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-neutral-500/30 cursor-pointer"
                        >
                            Create "{inputValue.trim()}"
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
