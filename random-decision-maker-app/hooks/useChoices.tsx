import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Choice, DecisionHistory, choicesData, historyData } from "../data/choices";

const CHOICES_KEY = "@decisions:choices";
const HISTORY_KEY = "@decisions:history";

interface ChoicesContextType {
  choices: Choice[];
  history: DecisionHistory[];
  loading: boolean;
  addChoice: (choice: Omit<Choice, "id" | "timesChosen" | "lastChosen" | "createdAt">) => Promise<void>;
  deleteChoice: (choiceId: number) => Promise<void>;
  updateChoice: (choiceId: number, updates: Partial<Choice>) => Promise<void>;
  makeDecision: (category?: string) => { choice: Choice | null; historyEntry: DecisionHistory | null };
  getChoicesByCategory: (category: string) => Choice[];
  getStats: () => { totalChoices: number; totalDecisions: number; mostChosen?: Choice };
  clearHistory: () => Promise<void>;
}

const ChoicesContext = createContext<ChoicesContextType | undefined>(undefined);

export function ChoicesProvider({ children }: { children: React.ReactNode }) {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [history, setHistory] = useState<DecisionHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedChoices, storedHistory] = await Promise.all([
        AsyncStorage.getItem(CHOICES_KEY),
        AsyncStorage.getItem(HISTORY_KEY),
      ]);
      
      if (storedChoices) {
        setChoices(JSON.parse(storedChoices));
      } else {
        setChoices([]);
        await AsyncStorage.setItem(CHOICES_KEY, JSON.stringify([]));
      }
      
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      } else {
        setHistory([]);
        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setChoices([]);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const addChoice = useCallback(async (newChoice: Omit<Choice, "id" | "timesChosen" | "lastChosen" | "createdAt">) => {
    const choice: Choice = {
      ...newChoice,
      id: Date.now(),
      timesChosen: 0,
      createdAt: new Date().toISOString(),
    };
    
    setChoices(prev => {
      const updated = [...prev, choice];
      AsyncStorage.setItem(CHOICES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteChoice = useCallback(async (choiceId: number) => {
    setChoices(prev => {
      const updated = prev.filter(choice => choice.id !== choiceId);
      AsyncStorage.setItem(CHOICES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateChoice = useCallback(async (choiceId: number, updates: Partial<Choice>) => {
    setChoices(prev => {
      const updated = prev.map(choice =>
        choice.id === choiceId ? { ...choice, ...updates } : choice
      );
      AsyncStorage.setItem(CHOICES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const makeDecision = useCallback((category?: string) => {
    let availableChoices = choices;
    if (category && category !== "all") {
      availableChoices = choices.filter(c => c.category === category);
    }
    
    if (availableChoices.length === 0) {
      return { choice: null, historyEntry: null };
    }
    
    // Weighted random selection based on 'weight' property
    const totalWeight = availableChoices.reduce((sum, choice) => sum + choice.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedChoice: Choice | null = null;
    
    for (const choice of availableChoices) {
      if (random < choice.weight) {
        selectedChoice = choice;
        break;
      }
      random -= choice.weight;
    }
    
    if (!selectedChoice) {
      selectedChoice = availableChoices[0];
    }
    
    // Update the choice's stats
    const updatedChoice = {
      ...selectedChoice,
      timesChosen: selectedChoice.timesChosen + 1,
      lastChosen: new Date().toISOString(),
    };
    
    setChoices(prev => {
      const updated = prev.map(c =>
        c.id === selectedChoice!.id ? updatedChoice : c
      );
      AsyncStorage.setItem(CHOICES_KEY, JSON.stringify(updated));
      return updated;
    });
    
    // Create history entry
    const historyEntry: DecisionHistory = {
      id: Date.now(),
      choiceId: selectedChoice.id,
      choiceName: selectedChoice.name,
      category: selectedChoice.category,
      timestamp: new Date().toISOString(),
    };
    
    setHistory(prev => {
      const updated = [historyEntry, ...prev].slice(0, 100); // Keep last 100
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
    
    return { choice: updatedChoice, historyEntry };
  }, [choices]);

  const getChoicesByCategory = useCallback((category: string) => {
    if (category === "all") return choices;
    return choices.filter(choice => choice.category === category);
  }, [choices]);

  const getStats = useCallback(() => {
    const totalChoices = choices.length;
    const totalDecisions = history.length;
    const mostChosen = [...choices].sort((a, b) => b.timesChosen - a.timesChosen)[0];
    
    return { totalChoices, totalDecisions, mostChosen };
  }, [choices, history]);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  }, []);

  return (
    <ChoicesContext.Provider value={{
      choices,
      history,
      loading,
      addChoice,
      deleteChoice,
      updateChoice,
      makeDecision,
      getChoicesByCategory,
      getStats,
      clearHistory,
    }}>
      {children}
    </ChoicesContext.Provider>
  );
}

export function useChoices() {
  const context = useContext(ChoicesContext);
  if (context === undefined) {
    throw new Error('useChoices must be used within a ChoicesProvider');
  }
  return context;
}