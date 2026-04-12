import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Habit, habitsData } from "../data/habits";

const HABITS_KEY = "@habits:data";

interface HabitsContextType {
  habits: Habit[];
  loading: boolean;
  toggleHabit: (habitId: number, date: string) => Promise<void>;
  addHabit: (habit: Omit<Habit, "id" | "streak" | "totalCompletions" | "completions" | "createdAt">) => Promise<void>;
  getHabitsByCategory: (category: string) => Habit[];
  getTodayCompletions: () => Habit[];
  getStreakStats: () => { bestStreak: number; totalCompletions: number; activeHabits: number };
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedHabits = await AsyncStorage.getItem(HABITS_KEY);
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      } else {
        // Start with empty habits array - no sample data
        setHabits([]);
        await AsyncStorage.setItem(HABITS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading habits:", error);
      setHabits(habitsData);
    } finally {
      setLoading(false);
    }
  };


  const calculateStreak = (completions: string[]): number => {
    const today = new Date().toISOString().split('T')[0];
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (completions.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const toggleHabit = useCallback(async (habitId: number, date: string) => {
    setHabits(prevHabits => {
      const updatedHabits = prevHabits.map(habit => {
        if (habit.id === habitId) {
          const completions = habit.completions.includes(date)
            ? habit.completions.filter(d => d !== date)
            : [...habit.completions, date];
          
          const streak = calculateStreak(completions);
          
          return {
            ...habit,
            completions,
            streak,
            totalCompletions: completions.length,
          };
        }
        return habit;
      });
      
      // Save to storage
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updatedHabits));
      return updatedHabits;
    });
  }, []);

  const addHabit = useCallback(async (newHabit: Omit<Habit, "id" | "streak" | "totalCompletions" | "completions" | "createdAt">) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now(),
      streak: 0,
      totalCompletions: 0,
      completions: [],
      createdAt: new Date().toISOString(),
    };
    
    setHabits(prev => {
      const updated = [...prev, habit];
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getHabitsByCategory = useCallback((category: string) => {
    if (category === "all") return habits.filter(h => !h.isArchived);
    return habits.filter(h => h.category === category && !h.isArchived);
  }, [habits]);

  const getTodayCompletions = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return habits.filter(habit => habit.completions.includes(today));
  }, [habits]);

  const getStreakStats = useCallback(() => {
    const bestStreak = Math.max(...habits.map(h => h.streak), 0);
    const totalCompletions = habits.reduce((sum, h) => sum + h.totalCompletions, 0);
    const activeHabits = habits.filter(h => !h.isArchived).length;
    
    return { bestStreak, totalCompletions, activeHabits };
  }, [habits]);

  return (
    <HabitsContext.Provider value={{
      habits,
      loading,
      toggleHabit,
      addHabit,
      getHabitsByCategory,
      getTodayCompletions,
      getStreakStats,
    }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
}