export interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
  duration: number; // minutes to complete
  tips?: string[];
  isDaily?: boolean;
  createdAt: string;
  completedToday?: boolean;
}

export interface CompletedChallenge {
  id: number;
  challengeId: number;
  completedAt: string;
  date: string; // YYYY-MM-DD
  pointsEarned: number;
  notes?: string;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  totalCompleted: number;
  lastCompletedDate: string | null;
}

export const categories = [
  { id: "all", name: "All", color: theme.colors.brand.primary },
  { id: "fitness", name: "Fitness", color: "#10B981" },
  { id: "mindfulness", name: "Mindfulness", color: "#8B5CF6" },
  { id: "productivity", name: "Productivity", color: "#3B82F6" },
  { id: "learning", name: "Learning", color: "#F59E0B" },
  { id: "kindness", name: "Kindness", color: "#EC4899" },
  { id: "creative", name: "Creative", color: "#06B6D4" },
  { id: "health", name: "Health", color: "#EF4444" },
];

export const difficulties = [
  { id: "easy", label: "Easy", points: 10, color: "#10B981" },
  { id: "medium", label: "Medium", points: 20, color: "#F59E0B" },
  { id: "hard", label: "Hard", points: 30, color: "#EF4444" },
];

// Demo daily challenges - users can also create their own
export const challengesData: Challenge[] = [
  {
    id: 1,
    title: "Morning Meditation",
    description: "Take 5 minutes to sit in silence and focus on your breath. Notice how you feel before and after.",
    category: "mindfulness",
    difficulty: "easy",
    points: 10,
    duration: 5,
    tips: ["Find a quiet spot", "Set a timer", "Don't judge your thoughts"],
    isDaily: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "10-Minute Walk",
    description: "Go for a 10-minute walk outside. Leave your phone behind and just observe your surroundings.",
    category: "fitness",
    difficulty: "easy",
    points: 10,
    duration: 10,
    tips: ["Wear comfortable shoes", "Notice 3 things you haven't seen before", "Breathe deeply"],
    isDaily: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Write 3 Gratitudes",
    description: "Write down three things you're grateful for today. Be specific and reflect on why.",
    category: "mindfulness",
    difficulty: "easy",
    points: 10,
    duration: 5,
    tips: ["Be specific", "Include small things", "Write by hand if possible"],
    isDaily: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Read for 20 Minutes",
    description: "Read a book, article, or anything educational for 20 minutes without distractions.",
    category: "learning",
    difficulty: "medium",
    points: 20,
    duration: 20,
    tips: ["Turn off notifications", "Take notes", "Share what you learned"],
    isDaily: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Drink 8 Glasses of Water",
    description: "Stay hydrated! Drink 8 glasses of water throughout the day.",
    category: "health",
    difficulty: "easy",
    points: 10,
    duration: 0,
    tips: ["Keep a water bottle nearby", "Set reminders", "Add lemon for flavor"],
    isDaily: true,
    createdAt: new Date().toISOString(),
  },
];

import { theme } from "../theme/theme";