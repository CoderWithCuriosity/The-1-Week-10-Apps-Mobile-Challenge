import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { JournalEntry, entriesData } from "../data/entries";

const ENTRIES_KEY = "@journal:entries";

interface JournalContextType {
  entries: JournalEntry[];
  loading: boolean;
  addEntry: (entry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt" | "isFavorite">) => Promise<void>;
  updateEntry: (id: number, updates: Partial<JournalEntry>) => Promise<void>;
  deleteEntry: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  getEntryById: (id: number) => JournalEntry | undefined;
  getEntriesByTag: (tag: string) => JournalEntry[];
  getEntriesByMood: (mood: string) => JournalEntry[];
  getFavoriteEntries: () => JournalEntry[];
  getRecentEntries: (limit: number) => JournalEntry[];
  getStats: () => { totalEntries: number; favoriteCount: number; streak: number; topMood: string };
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem(ENTRIES_KEY);
      if (storedEntries) {
        setEntries(JSON.parse(storedEntries));
      } else {
        // Start completely empty
        setEntries([]);
        await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading entries:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = useCallback(async (newEntry: Omit<JournalEntry, "id" | "createdAt" | "updatedAt" | "isFavorite">) => {
    const now = new Date().toISOString();
    const entry: JournalEntry = {
      ...newEntry,
      id: Date.now(),
      createdAt: now,
      updatedAt: now,
      isFavorite: false,
    };
    
    setEntries(prev => {
      const updated = [entry, ...prev];
      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(updated));
      return updated;
    });
    
    return entry;
  }, []);

  const updateEntry = useCallback(async (id: number, updates: Partial<JournalEntry>) => {
    setEntries(prev => {
      const updated = prev.map(entry =>
        entry.id === id
          ? { ...entry, ...updates, updatedAt: new Date().toISOString() }
          : entry
      );
      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteEntry = useCallback(async (id: number) => {
    setEntries(prev => {
      const updated = prev.filter(entry => entry.id !== id);
      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    setEntries(prev => {
      const updated = prev.map(entry =>
        entry.id === id
          ? { ...entry, isFavorite: !entry.isFavorite }
          : entry
      );
      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getEntryById = useCallback((id: number) => {
    return entries.find(entry => entry.id === id);
  }, [entries]);

  const getEntriesByTag = useCallback((tag: string) => {
    return entries.filter(entry => entry.tags.includes(tag));
  }, [entries]);

  const getEntriesByMood = useCallback((mood: string) => {
    return entries.filter(entry => entry.mood === mood);
  }, [entries]);

  const getFavoriteEntries = useCallback(() => {
    return entries.filter(entry => entry.isFavorite);
  }, [entries]);

  const getRecentEntries = useCallback((limit: number) => {
    return [...entries].slice(0, limit);
  }, [entries]);

  const getStats = useCallback(() => {
    const totalEntries = entries.length;
    const favoriteCount = entries.filter(e => e.isFavorite).length;
    
    // Calculate streak (consecutive days with entries)
    let streak = 0;
    if (entries.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let currentDate = new Date(today);
      let hasEntry = true;
      
      while (hasEntry) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const hasEntryOnDate = entries.some(entry => 
          entry.createdAt.split('T')[0] === dateStr
        );
        
        if (hasEntryOnDate) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          hasEntry = false;
        }
      }
    }
    
    // Find top mood
    const moodCounts: Record<string, number> = {};
    entries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    let topMood = "great";
    let maxCount = 0;
    Object.entries(moodCounts).forEach(([mood, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topMood = mood;
      }
    });
    
    return { totalEntries, favoriteCount, streak, topMood };
  }, [entries]);

  return (
    <JournalContext.Provider value={{
      entries,
      loading,
      addEntry,
      updateEntry,
      deleteEntry,
      toggleFavorite,
      getEntryById,
      getEntriesByTag,
      getEntriesByMood,
      getFavoriteEntries,
      getRecentEntries,
      getStats,
    }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}