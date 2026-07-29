import { fadedColorSlight } from "@/lib/constants";

interface CardLabelProps {
    labelText: string;
    colorLabel: string;
}

export default function CardLabel({ labelText, colorLabel }: CardLabelProps) {

  return (
    <div
      className="flex-row rounded-full py-0.5 px-2 flex items-center gap-2"
      style={{ backgroundColor: fadedColorSlight(colorLabel), borderColor: colorLabel, borderWidth: 1.5 }}
    >
      <span
        className="text-xs text-center items-center leading-none -translate-y-px"
        style={{ color: colorLabel, fontWeight: 500 }}
      >
        {labelText}
      </span>
    </div>
  );
}