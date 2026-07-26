export const Columns = [
  { id: "todo", label: "To Do", hex: "#7C8B90" },
  { id: "in_progress", label: "In Progress", hex: "#5B7FA6" },
  { id: "in_review", label: "In Review", hex: "#8A6FB0" },
  { id: "done", label: "Done", hex: "#2F6F62" },
] as const;

export type ColumnId = (typeof Columns)[number]["id"];

export const Priorities = [
  { id: "low", label: "Low", hex: "#6B9B7A" },
  { id: "normal", label: "Normal", hex: "#E8A33D" },
  { id: "high", label: "High", hex: "#C4503F" },
] as const;

export type PriorityId = (typeof Priorities)[number]["id"];

export const CategoricalColors = [
  "#B0824A",
  "#C97AA0",
  "#8FA05C",
  "#A15D42",
  "#5C9EA3",
  "#7A5C8A",
] as const;