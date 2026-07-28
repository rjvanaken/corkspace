import { Button } from "@/components/ui/button"
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



    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Open</Button>} />
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Select Labels</DropdownMenuLabel>
                    {userLabels.map((label) => (
                        <DropdownMenuCheckboxItem
                            key={label.id}
                            checked={selectedLabelIds.includes(label.id)}
                            onCheckedChange={() => onToggle(label.id)}
                        >
                            {label.name}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}