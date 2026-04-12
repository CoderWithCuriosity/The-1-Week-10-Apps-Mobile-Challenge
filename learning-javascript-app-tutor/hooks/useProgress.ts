import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProgressData {
  completedLessons: number[];
  scores: Record<number, number>; // lessonId: score
  levelProgress: Record<number, number>; // levelId: percentage
}

const STORAGE_KEY = '@ochex_learn_javascript_progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({
    completedLessons: [],
    scores: {},
    levelProgress: {},
  });
  const [loading, setLoading] = useState(true);

  // Load progress on mount
  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newProgress: ProgressData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  const markLessonCompleted = async (lessonId: number) => {
    const updated = {
      ...progress,
      completedLessons: [...new Set([...progress.completedLessons, lessonId])],
    };
    await saveProgress(updated);
  };

  const saveQuizScore = async (lessonId: number, score: number) => {
    const updated = {
      ...progress,
      scores: {
        ...progress.scores,
        [lessonId]: score,
      },
    };
    await saveProgress(updated);
  };

  const updateLevelProgress = async (levelId: number, percentage: number) => {
    const updated = {
      ...progress,
      levelProgress: {
        ...progress.levelProgress,
        [levelId]: percentage,
      },
    };
    await saveProgress(updated);
  };

  const resetProgress = async () => {
    const emptyProgress: ProgressData = {
      completedLessons: [],
      scores: {},
      levelProgress: {},
    };
    await saveProgress(emptyProgress);
  };

  const isLessonCompleted = (lessonId: number) => {
    return progress.completedLessons.includes(lessonId);
  };

  const getLessonScore = (lessonId: number) => {
    return progress.scores[lessonId] || 0;
  };

  const getLevelProgress = (levelId: number) => {
    return progress.levelProgress[levelId] || 0;
  };

  return {
    progress,
    loading,
    markLessonCompleted,
    saveQuizScore,
    updateLevelProgress,
    resetProgress,
    isLessonCompleted,
    getLessonScore,
    getLevelProgress,
  };
}