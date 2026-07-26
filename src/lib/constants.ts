import { columnColorData, priorityColorData, categoricalColorData } from "./theme-colors.js";

export type ColumnId = "todo" | "in_progress" | "in_review" | "done";
export const Columns: { id: ColumnId; label: string; hex: string }[] = columnColorData;

export type PriorityId = "low" | "normal" | "high";
export const Priorities: { id: PriorityId; label: string; hex: string }[] = priorityColorData;

export const CategoricalColors: string[] = categoricalColorData;

export function colorForGuestIndex(index: number): string {
  return CategoricalColors[index % CategoricalColors.length];
}

export function fadedColor(hex: string, alpha: string = "22"): string {
  return `${hex}${alpha}`;
}