// hooks/useAffirmations.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Affirmation, affirmationsData } from "../data/affirmations";

const FAVORITES_KEY = "@affirmations:favorites";
const HISTORY_KEY = "@affirmations:history";

interface AffirmationsContextType {
  affirmations: Affirmation[];
  favorites: number[];
  todayAffirmation: Affirmation | null;
  loading: boolean;
  getNewRandomAffirmation: () => Affirmation | null;
  toggleFavorite: (affirmationId: number) => Promise<void>;
  getAffirmationsByCategory: (category: string) => Affirmation[];
  getFavoriteAffirmations: () => Affirmation[];
}

const AffirmationsContext = createContext<AffirmationsContextType | undefined>(undefined);

export function AffirmationsProvider({ children }: { children: React.ReactNode }) {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [todayAffirmation, setTodayAffirmation] = useState<Affirmation | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedFavorites, storedHistory] = await Promise.all([
        AsyncStorage.getItem(FAVORITES_KEY),
        AsyncStorage.getItem(HISTORY_KEY),
      ]);

      const favoritesList = storedFavorites ? JSON.parse(storedFavorites) : [];
      const historyList = storedHistory ? JSON.parse(storedHistory) : [];

      // Update affirmations with favorite status
      const affirmationsWithFavorites = affirmationsData.map(aff => ({
        ...aff,
        isFavorite: favoritesList.includes(aff.id),
      }));

      setFavorites(favoritesList);
      setHistory(historyList);
      setAffirmations(affirmationsWithFavorites);
      
      // Set today's affirmation
      setTodayAffirmation(getRandomAffirmation(affirmationsWithFavorites, historyList));
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomAffirmation = (affList: Affirmation[], historyList: number[]) => {
    // Try to get an affirmation not recently seen
    const recentHistory = historyList.slice(-5);
    const availableAffirmations = affList.filter(aff => !recentHistory.includes(aff.id));
    
    let randomAffirmation;
    if (availableAffirmations.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableAffirmations.length);
      randomAffirmation = availableAffirmations[randomIndex];
    } else {
      // If all have been seen recently, pick randomly from all
      const randomIndex = Math.floor(Math.random() * affList.length);
      randomAffirmation = affList[randomIndex];
    }
    
    return randomAffirmation;
  };

  const getNewRandomAffirmation = useCallback(() => {
    if (affirmations.length === 0) return null;
    
    const newAffirmation = getRandomAffirmation(affirmations, history);
    setTodayAffirmation(newAffirmation);
    
    // Update history
    const newHistory = [...history, newAffirmation.id].slice(-20);
    setHistory(newHistory);
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    
    return newAffirmation;
  }, [affirmations, history]);

  const toggleFavorite = useCallback(async (affirmationId: number) => {
    let newFavorites: number[];
    if (favorites.includes(affirmationId)) {
      newFavorites = favorites.filter(id => id !== affirmationId);
    } else {
      newFavorites = [...favorites, affirmationId];
    }
    
    setFavorites(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    
    // Update affirmations state
    setAffirmations(prevAffirmations => 
      prevAffirmations.map(aff =>
        aff.id === affirmationId
          ? { ...aff, isFavorite: newFavorites.includes(affirmationId) }
          : aff
      )
    );
    
    // Also update todayAffirmation if it's the same one
    if (todayAffirmation && todayAffirmation.id === affirmationId) {
      setTodayAffirmation(prev => prev ? {
        ...prev,
        isFavorite: newFavorites.includes(affirmationId)
      } : null);
    }
  }, [favorites, todayAffirmation]);

  const getAffirmationsByCategory = useCallback((category: string) => {
    if (category === "all") return affirmations;
    return affirmations.filter(aff => aff.category === category);
  }, [affirmations]);

  const getFavoriteAffirmations = useCallback(() => {
    return affirmations.filter(aff => favorites.includes(aff.id));
  }, [affirmations, favorites]);

  return (
    <AffirmationsContext.Provider value={{
      affirmations,
      favorites,
      todayAffirmation,
      loading,
      getNewRandomAffirmation,
      toggleFavorite,
      getAffirmationsByCategory,
      getFavoriteAffirmations,
    }}>
      {children}
    </AffirmationsContext.Provider>
  );
}

export function useAffirmations() {
  const context = useContext(AffirmationsContext);
  if (context === undefined) {
    throw new Error('useAffirmations must be used within an AffirmationsProvider');
  }
  return context;
}