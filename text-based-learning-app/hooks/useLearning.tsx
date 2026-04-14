import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Lesson, StudyProgress, lessonsData } from "../data/lessons";

const LESSONS_KEY = "@learning:lessons";
const PROGRESS_KEY = "@learning:progress";

interface LearningContextType {
  lessons: Lesson[];
  progress: StudyProgress[];
  loading: boolean;
  addLesson: (lesson: Omit<Lesson, "id" | "isCompleted" | "studyCount" | "createdAt">) => Promise<void>;
  updateLesson: (id: number, updates: Partial<Lesson>) => Promise<void>;
  deleteLesson: (id: number) => Promise<void>;
  markAsStudied: (id: number, studyTime: number) => Promise<void>;
  getLessonsByCategory: (category: string) => Lesson[];
  getLessonsByDifficulty: (difficulty: string) => Lesson[];
  getInProgressLessons: () => Lesson[];
  getCompletedLessons: () => Lesson[];
  getStats: () => {
    totalLessons: number;
    completedLessons: number;
    totalStudyTime: number;
    masteryAverage: number;
  };
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<StudyProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedLessons, storedProgress] = await Promise.all([
        AsyncStorage.getItem(LESSONS_KEY),
        AsyncStorage.getItem(PROGRESS_KEY),
      ]);
      
      if (storedLessons) {
        setLessons(JSON.parse(storedLessons));
      } else {
        setLessons([]);
        await AsyncStorage.setItem(LESSONS_KEY, JSON.stringify([]));
      }
      
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      } else {
        setProgress([]);
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setLessons([]);
      setProgress([]);
    } finally {
      setLoading(false);
    }
  };

  const addLesson = useCallback(async (newLesson: Omit<Lesson, "id" | "isCompleted" | "studyCount" | "createdAt">) => {
    const lesson: Lesson = {
      ...newLesson,
      id: Date.now(),
      isCompleted: false,
      studyCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    setLessons(prev => {
      const updated = [...prev, lesson];
      AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateLesson = useCallback(async (id: number, updates: Partial<Lesson>) => {
    setLessons(prev => {
      const updated = prev.map(lesson =>
        lesson.id === id ? { ...lesson, ...updates } : lesson
      );
      AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteLesson = useCallback(async (id: number) => {
    setLessons(prev => {
      const updated = prev.filter(lesson => lesson.id !== id);
      AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
      return updated;
    });
    setProgress(prev => {
      const updated = prev.filter(p => p.lessonId !== id);
      AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markAsStudied = useCallback(async (id: number, studyTime: number) => {
    const now = new Date().toISOString();
    
    setLessons(prev => {
      const updated = prev.map(lesson => {
        if (lesson.id === id) {
          const newStudyCount = lesson.studyCount + 1;
          const isCompleted = newStudyCount >= 3; // Mark complete after 3 studies
          return {
            ...lesson,
            lastStudied: now,
            studyCount: newStudyCount,
            isCompleted: isCompleted || lesson.isCompleted,
          };
        }
        return lesson;
      });
      AsyncStorage.setItem(LESSONS_KEY, JSON.stringify(updated));
      return updated;
    });
    
    setProgress(prev => {
      const existingIndex = prev.findIndex(p => p.lessonId === id);
      let updated;
      
      if (existingIndex >= 0) {
        updated = prev.map(p =>
          p.lessonId === id
            ? {
                ...p,
                lastStudied: now,
                studyTime: p.studyTime + studyTime,
                masteryLevel: Math.min(100, p.masteryLevel + 10),
              }
            : p
        );
      } else {
        updated = [
          ...prev,
          {
            lessonId: id,
            lastStudied: now,
            studyTime: studyTime,
            masteryLevel: 10,
          },
        ];
      }
      
      AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getLessonsByCategory = useCallback((category: string) => {
    if (category === "all") return lessons;
    return lessons.filter(lesson => lesson.category === category);
  }, [lessons]);

  const getLessonsByDifficulty = useCallback((difficulty: string) => {
    if (difficulty === "all") return lessons;
    return lessons.filter(lesson => lesson.difficulty === difficulty);
  }, [lessons]);

  const getInProgressLessons = useCallback(() => {
    return lessons.filter(lesson => !lesson.isCompleted && lesson.studyCount > 0);
  }, [lessons]);

  const getCompletedLessons = useCallback(() => {
    return lessons.filter(lesson => lesson.isCompleted);
  }, [lessons]);

  const getStats = useCallback(() => {
    const totalLessons = lessons.length;
    const completedLessons = lessons.filter(l => l.isCompleted).length;
    const totalStudyTime = progress.reduce((sum, p) => sum + p.studyTime, 0);
    const masteryAverage = progress.length > 0
      ? Math.round(progress.reduce((sum, p) => sum + p.masteryLevel, 0) / progress.length)
      : 0;
    
    return { totalLessons, completedLessons, totalStudyTime, masteryAverage };
  }, [lessons, progress]);

  return (
    <LearningContext.Provider value={{
      lessons,
      progress,
      loading,
      addLesson,
      updateLesson,
      deleteLesson,
      markAsStudied,
      getLessonsByCategory,
      getLessonsByDifficulty,
      getInProgressLessons,
      getCompletedLessons,
      getStats,
    }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
}