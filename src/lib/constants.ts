import { columnColorData, priorityColorData, categoricalColorData } from "./theme-colors.js";

export type ColumnId = "todo" | "in_progress" | "in_review" | "done";
export const Columns = columnColorData as { id: ColumnId; label: string; hex: string }[];

export type PriorityId = "low" | "normal" | "high";
export const Priorities = priorityColorData as { id: PriorityId; label: string; hex: string }[];

export const CategoricalColors: string[] = categoricalColorData;

export function colorForGuestIndex(index: number): string {
  return CategoricalColors[index % CategoricalColors.length];
}

export function fadedColor(hex: string, alpha: string = "22"): string {
  return `${hex}${alpha}`;
  
}

export function fadedColorSlight(hex: string, alpha: string = "90"): string {
  return `${hex}${alpha}`;
}