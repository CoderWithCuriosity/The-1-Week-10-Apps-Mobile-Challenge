export interface Task {
  id: number;
  title: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt?: string;
}

export const categories = [
  { id: "all", name: "All", color: theme.colors.brand.primary },
  { id: "personal", name: "Personal", color: "#10B981" },
  { id: "work", name: "Work", color: "#3B82F6" },
  { id: "shopping", name: "Shopping", color: "#F59E0B" },
  { id: "health", name: "Health", color: "#EF4444" },
  { id: "learning", name: "Learning", color: "#8B5CF6" },
  { id: "other", name: "Other", color: "#6B7280" },
];

// Empty array - users add their own tasks
export const tasksData: Task[] = [];

import { theme } from "../theme/theme";