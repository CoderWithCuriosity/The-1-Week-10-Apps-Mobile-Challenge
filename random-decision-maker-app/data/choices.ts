export interface Choice {
  id: number;
  name: string;
  description?: string;
  category: string;
  emoji: string;
  weight: number; // Probability weight (higher = more likely)
  timesChosen: number;
  lastChosen?: string;
  createdAt: string;
}

export interface DecisionHistory {
  id: number;
  choiceId: number;
  choiceName: string;
  category: string;
  timestamp: string;
}

export const categories = [
  { id: "all", name: "All", color: theme.colors.brand.primary },
  { id: "food", name: "Food", color: "#EF4444" },
  { id: "activity", name: "Activity", color: "#10B981" },
  { id: "entertainment", name: "Entertainment", color: "#8B5CF6" },
  { id: "travel", name: "Travel", color: "#3B82F6" },
  { id: "life", name: "Life", color: "#F59E0B" },
  { id: "custom", name: "Custom", color: "#6B7280" },
];

// Empty arrays - users add their own choices
export const choicesData: Choice[] = [];
export const historyData: DecisionHistory[] = [];

import { theme } from "../theme/theme";