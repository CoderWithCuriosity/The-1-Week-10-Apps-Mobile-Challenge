export interface Habit {
  id: number;
  name: string;
  description?: string;
  category: string;
  icon: string;
  streak: number;
  totalCompletions: number;
  completions: string[]; // ISO date strings
  isArchived?: boolean;
  createdAt: string;
}

export const categories = [
  { id: "all", name: "All", color: theme.colors.brand.primary },
  { id: "health", name: "Health", color: "#EF4444" },
  { id: "fitness", name: "Fitness", color: "#10B981" },
  { id: "mindfulness", name: "Mindfulness", color: "#8B5CF6" },
  { id: "productivity", name: "Productivity", color: "#3B82F6" },
  { id: "learning", name: "Learning", color: "#F59E0B" },
  { id: "self-care", name: "Self Care", color: "#EC4899" },
];

// Start with empty habits array - users will add their own
export const habitsData: Habit[] = [];

import { theme } from "../theme/theme";