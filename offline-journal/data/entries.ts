export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  mood: "great" | "good" | "okay" | "sad" | "stressed" | "grateful";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export const moods = [
  { id: "great", label: "Great", emoji: "😊", color: "#10B981" },
  { id: "good", label: "Good", emoji: "🙂", color: "#3B82F6" },
  { id: "okay", label: "Okay", emoji: "😐", color: "#F59E0B" },
  { id: "sad", label: "Sad", emoji: "😔", color: "#8B5CF6" },
  { id: "stressed", label: "Stressed", emoji: "😰", color: "#EF4444" },
  { id: "grateful", label: "Grateful", emoji: "🙏", color: "#F97316" },
];

export const commonTags = [
  "gratitude", "reflection", "goals", "learning", 
  "work", "relationships", "health", "growth"
];

// Empty array - users add their own entries
export const entriesData: JournalEntry[] = [];

import { theme } from "../theme/theme";