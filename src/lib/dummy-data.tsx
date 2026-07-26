interface Task {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "in_review" | "done";
  priority: "low" | "normal" | "high";
  description: string;
  user_id: string;
  created_at: string;
  border_color: string;
}

export const tasks: Task[] = [
  { id: "1", title: "Design login screen", status: "todo", priority: "high", description: "Create mockups for the new flow", user_id: "u1", created_at: "2026-07-01", border_color: "#7C8B90" },
  { id: "2", title: "Fix pagination bug", status: "in_progress", priority: "normal", description: "Reports page skips page 3", user_id: "u1", created_at: "2026-07-10", border_color: "#5B7FA6" },
  { id: "3", title: "API rate limiting proposal", status: "in_review", priority: "low", description: "Draft for backend team", user_id: "u1", created_at: "2026-07-15", border_color: "#8A6FB0" },
  { id: "4", title: "Ship dark mode", status: "done", priority: "normal", description: "Released to production", user_id: "u1", created_at: "2026-07-20", border_color: "#2F6F62" },
  { id: "1", title: "Design login screen", status: "todo", priority: "high", description: "Create mockups for the new flow", user_id: "u1", created_at: "2026-07-01", border_color: "#7C8B90" },
  { id: "2", title: "Fix pagination bug", status: "in_progress", priority: "normal", description: "Reports page skips page 3", user_id: "u1", created_at: "2026-07-10", border_color: "#5B7FA6" },
  { id: "3", title: "API rate limiting proposal", status: "in_review", priority: "low", description: "Draft for backend team", user_id: "u1", created_at: "2026-07-15", border_color: "#8A6FB0" },
  { id: "4", title: "Ship dark mode", status: "done", priority: "normal", description: "Released to production", user_id: "u1", created_at: "2026-07-20", border_color: "#2F6F62" },
  { id: "1", title: "Design login screen", status: "todo", priority: "high", description: "Create mockups for the new flow", user_id: "u1", created_at: "2026-07-01", border_color: "#7C8B90" },
  { id: "2", title: "Fix pagination bug", status: "in_progress", priority: "normal", description: "Reports page skips page 3", user_id: "u1", created_at: "2026-07-10", border_color: "#5B7FA6" },
  { id: "3", title: "API rate limiting proposal", status: "in_review", priority: "low", description: "Draft for backend team", user_id: "u1", created_at: "2026-07-15", border_color: "#8A6FB0" },
  { id: "4", title: "Ship dark mode", status: "done", priority: "normal", description: "Released to production", user_id: "u1", created_at: "2026-07-20", border_color: "#2F6F62" },
  { id: "1", title: "Design login screen", status: "todo", priority: "high", description: "Create mockups for the new flow", user_id: "u1", created_at: "2026-07-01", border_color: "#7C8B90" },
  { id: "2", title: "Fix pagination bug", status: "in_progress", priority: "normal", description: "Reports page skips page 3", user_id: "u1", created_at: "2026-07-10", border_color: "#5B7FA6" },
  { id: "3", title: "API rate limiting proposal", status: "in_review", priority: "low", description: "Draft for backend team", user_id: "u1", created_at: "2026-07-15", border_color: "#8A6FB0" },
  { id: "4", title: "Ship dark mode", status: "done", priority: "normal", description: "Released to production", user_id: "u1", created_at: "2026-07-20", border_color: "#2F6F62" },
  { id: "1", title: "Design login screen", status: "todo", priority: "high", description: "Create mockups for the new flow", user_id: "u1", created_at: "2026-07-01", border_color: "#7C8B90" },
  { id: "2", title: "Fix pagination bug", status: "in_progress", priority: "normal", description: "Reports page skips page 3", user_id: "u1", created_at: "2026-07-10", border_color: "#5B7FA6" },
  { id: "3", title: "API rate limiting proposal", status: "in_review", priority: "low", description: "Draft for backend team", user_id: "u1", created_at: "2026-07-15", border_color: "#8A6FB0" },
  { id: "4", title: "Ship dark mode", status: "done", priority: "normal", description: "Released to production", user_id: "u1", created_at: "2026-07-20", border_color: "#2F6F62" },
  { id: "1", title: "Design login screen", status: "todo", priority: "high", description: "Create mockups for the new flow", user_id: "u1", created_at: "2026-07-01", border_color: "#7C8B90" },
  { id: "2", title: "Fix pagination bug", status: "in_progress", priority: "normal", description: "Reports page skips page 3", user_id: "u1", created_at: "2026-07-10", border_color: "#5B7FA6" },
  { id: "3", title: "API rate limiting proposal", status: "in_review", priority: "low", description: "Draft for backend team", user_id: "u1", created_at: "2026-07-15", border_color: "#8A6FB0" },
  { id: "4", title: "Ship dark mode", status: "done", priority: "normal", description: "Released to production", user_id: "u1", created_at: "2026-07-20", border_color: "#2F6F62" },
];