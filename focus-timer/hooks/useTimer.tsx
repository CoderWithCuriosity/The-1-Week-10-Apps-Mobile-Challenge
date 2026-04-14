import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { TimerPreset, Session, presetsData } from "../data/presets";

const PRESETS_KEY = "@timer:presets";
const SESSIONS_KEY = "@timer:sessions";
const SELECTED_PRESET_KEY = "@timer:selectedPreset";

interface TimerContextType {
  presets: TimerPreset[];
  sessions: Session[];
  loading: boolean;
  selectedPresetId: number | null;
  setSelectedPresetId: (id: number) => Promise<void>;
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
  const [selectedPresetId, setSelectedPresetIdState] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedPresets, storedSessions, storedSelectedPreset] = await Promise.all([
        AsyncStorage.getItem(PRESETS_KEY),
        AsyncStorage.getItem(SESSIONS_KEY),
        AsyncStorage.getItem(SELECTED_PRESET_KEY),
      ]);
      
      let presetsList: TimerPreset[];
      if (storedPresets) {
        presetsList = JSON.parse(storedPresets);
      } else {
        presetsList = presetsData;
        await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presetsData));
      }
      setPresets(presetsList);
      
      // Load sessions and filter out any that belong to deleted presets
      let sessionsList: Session[] = [];
      if (storedSessions) {
        sessionsList = JSON.parse(storedSessions);
        // Filter sessions to only include those with valid preset IDs
        const validPresetIds = new Set(presetsList.map(p => p.id));
        const filteredSessions = sessionsList.filter(session => validPresetIds.has(session.presetId));
        
        // If we filtered out any sessions, save the cleaned list
        if (filteredSessions.length !== sessionsList.length) {
          await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(filteredSessions));
          sessionsList = filteredSessions;
        }
      } else {
        await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify([]));
      }
      setSessions(sessionsList);
      
      // Load selected preset
      if (storedSelectedPreset) {
        const selectedId = JSON.parse(storedSelectedPreset);
        // Check if the selected preset still exists
        if (presetsList.find(p => p.id === selectedId)) {
          setSelectedPresetIdState(selectedId);
        } else {
          setSelectedPresetIdState(presetsList[0]?.id || null);
          await AsyncStorage.setItem(SELECTED_PRESET_KEY, JSON.stringify(presetsList[0]?.id || null));
        }
      } else {
        setSelectedPresetIdState(presetsList[0]?.id || null);
        await AsyncStorage.setItem(SELECTED_PRESET_KEY, JSON.stringify(presetsList[0]?.id || null));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setPresets(presetsData);
      setSessions([]);
      setSelectedPresetIdState(presetsData[0]?.id || null);
    } finally {
      setLoading(false);
    }
  };

  const setSelectedPresetId = useCallback(async (id: number) => {
    setSelectedPresetIdState(id);
    await AsyncStorage.setItem(SELECTED_PRESET_KEY, JSON.stringify(id));
  }, []);

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
    // Delete the preset
    setPresets(prev => {
      const updated = prev.filter(preset => preset.id !== id);
      AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      
      // If the deleted preset was selected, select the first one
      if (selectedPresetId === id) {
        const newSelectedId = updated[0]?.id || null;
        setSelectedPresetIdState(newSelectedId);
        AsyncStorage.setItem(SELECTED_PRESET_KEY, JSON.stringify(newSelectedId));
      }
      
      return updated;
    });
    
    // Delete all sessions associated with this preset
    setSessions(prev => {
      const updated = prev.filter(session => session.presetId !== id);
      AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [selectedPresetId]);

  const updatePreset = useCallback(async (id: number, updates: Partial<TimerPreset>) => {
    setPresets(prev => {
      const updated = prev.map(preset =>
        preset.id === id ? { ...preset, ...updates } : preset
      );
      AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(updated));
      
      // Also update the preset name in all associated sessions
      if (updates.name) {
        setSessions(sessionPrev => {
          const updatedSessions = sessionPrev.map(session =>
            session.presetId === id ? { ...session, presetName: updates.name! } : session
          );
          AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(updatedSessions));
          return updatedSessions;
        });
      }
      
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
      selectedPresetId,
      setSelectedPresetId,
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