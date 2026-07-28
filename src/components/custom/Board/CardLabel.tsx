interface CardLabelProps {
    labelText: string;
    colorLabel: string;
}

export default function CardLabel({ labelText, colorLabel }: CardLabelProps) {

  return (
    <div
      className="bg-card flex-row rounded-full py-1 px-2 flex items-center gap-2 shadow-sm border"
      style={{ borderColor: colorLabel }}
    >
      <span
        className="text-xs text-center items-center text-muted-foreground"
        style={{ color: colorLabel, fontWeight: 500 }}
      >
        {labelText}
      </span>
    </div>
  );
}