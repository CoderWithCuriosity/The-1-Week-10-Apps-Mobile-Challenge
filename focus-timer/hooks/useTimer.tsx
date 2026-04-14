import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { TimerPreset, Session, presetsData } from "../data/presets";

const PRESETS_KEY = "@timer:presets";
const SESSIONS_KEY = "@timer:sessions";

interface TimerContextType {
  presets: TimerPreset[];
  sessions: Session[];
  loading: boolean;
  addPreset: (preset: Omit<TimerPreset, "id">) => Promise<void>;
  deletePreset: (id: number) => Promise<void>;
  updatePreset: (id: number, updates: Partial<TimerPreset>) => Promise<void>;
  addSession: (session: Omit<Session, "id" | "completedAt">) => Promise<void>;
  getStats: () => {
    totalFocusTime: number;
    totalSessions: number;
    bestDay: string;
    weeklyData: { day: string; minutes: number }[];
  };
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [presets, setPresets] = useState<TimerPreset[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedPresets, storedSessions] = await Promise.all([
        AsyncStorage.getItem(PRESETS_KEY),
        AsyncStorage.getItem(SESSIONS_KEY),
      ]);
      
      if (storedPresets) {
        setPresets(JSON.parse(storedPresets));
      } else {
        setPresets(presetsData);
        await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presetsData));
      }
      
      if (storedSessions) {
        setSessions(JSON.parse(storedSessions));
      } else {
        setSessions([]);
        await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setPresets(presetsData);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const addPreset = useCallback(async (newPreset: Omit<TimerPreset, "id">) => {
    const preset: TimerPreset = {
      ...newPreset,
      id: Date.now(),
    };
    
    setPresets(prev => {
      const updated = [...prev, preset];
      AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deletePreset = useCallback(async (id: number) => {
    setPresets(prev => {
      const updated = prev.filter(preset => preset.id !== id);
      AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updatePreset = useCallback(async (id: number, updates: Partial<TimerPreset>) => {
    setPresets(prev => {
      const updated = prev.map(preset =>
        preset.id === id ? { ...preset, ...updates } : preset
      );
      AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addSession = useCallback(async (newSession: Omit<Session, "id" | "completedAt">) => {
    const session: Session = {
      ...newSession,
      id: Date.now(),
      completedAt: new Date().toISOString(),
    };
    
    setSessions(prev => {
      const updated = [session, ...prev];
      AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getStats = useCallback(() => {
    const totalFocusTime = sessions
      .filter(s => s.type === "work")
      .reduce((sum, s) => sum + s.duration, 0);
    
    const totalSessions = sessions.filter(s => s.type === "work").length;
    
    // Get best day
    const dayMap: Record<string, number> = {};
    sessions.forEach(session => {
      const day = new Date(session.completedAt).toLocaleDateString();
      dayMap[day] = (dayMap[day] || 0) + session.duration;
    });
    
    let bestDay = "";
    let maxMinutes = 0;
    Object.entries(dayMap).forEach(([day, minutes]) => {
      if (minutes > maxMinutes) {
        maxMinutes = minutes;
        bestDay = day;
      }
    });
    
    // Get last 7 days data
    const weeklyData = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toLocaleDateString();
      const dayMinutes = sessions
        .filter(s => new Date(s.completedAt).toLocaleDateString() === dateStr)
        .reduce((sum, s) => sum + s.duration, 0);
      
      weeklyData.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        minutes: dayMinutes,
      });
    }
    
    return { totalFocusTime, totalSessions, bestDay, weeklyData };
  }, [sessions]);

  return (
    <TimerContext.Provider value={{
      presets,
      sessions,
      loading,
      addPreset,
      deletePreset,
      updatePreset,
      addSession,
      getStats,
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}