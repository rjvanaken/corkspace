import { ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LabelPickerProps {
    userLabels: any[];
    selectedLabelIds: string[];
    onToggle: (labelId: string) => void;
}

export default function LabelPicker({
    userLabels,
    selectedLabelIds,
    onToggle,
}: LabelPickerProps) {

    const selectedLabels = userLabels.filter((label) => selectedLabelIds.includes(label.id));
    const displayText = selectedLabels.length > 0
        ? selectedLabels.map((label) => label.name).join(", ")
        : "Select labels";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render=
            {
                <button
                    type="button"
                    className="h-10 w-full min-w-0 rounded-md border bg-card px-2.5 py-1 text-base shadow-xs outline-none flex items-center justify-between gap-2 md:text-sm"
                >
                    <span className={selectedLabels.length > 0 ? "text-foreground truncate max-w-[300px] block" : "text-muted-foreground"}>
                        {displayText}
                    </span>
                    <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                </button>
            } />
            <DropdownMenuContent className="w-55 ring-0 border border-neutral-400">
                <DropdownMenuGroup className={"ring-0 border-1 border-neutral-400"}>
                    <DropdownMenuLabel className="font-semibold text-sm text-neutral-700">Labels</DropdownMenuLabel>
                    {userLabels.map((label) => (
                        <DropdownMenuCheckboxItem
                            key={label.id}
                            checked={selectedLabelIds.includes(label.id)}
                            onCheckedChange={() => onToggle(label.id)}
                            className="hover:bg-neutral-500/30 cursor-pointer"
                        >
                            {label.name}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}