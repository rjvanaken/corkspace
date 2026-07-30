import { columnColorData, priorityColorData, categoricalColorData } from "./theme-colors.js";

export type ColumnId = "todo" | "in_progress" | "in_review" | "done";
export const Columns = columnColorData as { id: ColumnId; label: string }[];

export type PriorityId = "low" | "normal" | "high";
export const Priorities = priorityColorData as { id: PriorityId; label: string; hex: string }[];

export const ColumnEmptyMessages: Record<ColumnId, string> = {
  todo: "Nothing on the list yet",
  in_progress: "Nothing in progress",
  in_review: "Nothing waiting for review",
  done: "Nothing completed yet",
};

export const CategoricalColors: string[] = categoricalColorData;

export function colorForIndex(index: number): string {
  return CategoricalColors[index % CategoricalColors.length];
}

export function fadedColor(hex: string, alpha: string = "22"): string {
  return `${hex}${alpha}`;
  
}

export function fadedColorSlight(hex: string, alpha: string = "30"): string {
  return `${hex}${alpha}`;
}

export function darkenColor(hex: string, amount: number = 0.15): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.round(((num >> 16) & 0xff) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 0xff) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 0xff) * (1 - amount)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}