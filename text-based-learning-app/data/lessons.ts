export interface Lesson {
  id: number;
  title: string;
  content: string;
  summary?: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isCompleted: boolean;
  lastStudied?: string;
  studyCount: number;
  quizQuestions?: QuizQuestion[];
  createdAt: string;
}

export interface QuizQuestion {
  id?: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface StudyProgress {
  lessonId: number;
  lastStudied: string;
  studyTime: number; // minutes
  masteryLevel: number; // 0-100
  studyCount?: number;
}

export const categories = [
  { id: "all", name: "All", color: theme.colors.brand.primary },
  { id: "programming", name: "Programming", color: "#3B82F6" },
  { id: "language", name: "Language", color: "#10B981" },
  { id: "science", name: "Science", color: "#8B5CF6" },
  { id: "math", name: "Mathematics", color: "#F59E0B" },
  { id: "history", name: "History", color: "#EF4444" },
  { id: "art", name: "Art", color: "#EC4899" },
  { id: "business", name: "Business", color: "#06B6D4" },
];

export const difficulties = [
  { id: "beginner", label: "Beginner", color: "#10B981" },
  { id: "intermediate", label: "Intermediate", color: "#F59E0B" },
  { id: "advanced", label: "Advanced", color: "#EF4444" },
];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
  explanation?: string;
}


// Empty array - users add their own lessons
export const lessonsData: Lesson[] = [];

import { theme } from "../theme/theme";