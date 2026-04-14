import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Challenge, CompletedChallenge, UserStats, challengesData } from "../data/challenges";

const CHALLENGES_KEY = "@challenges:all";
const COMPLETED_KEY = "@challenges:completed";
const STATS_KEY = "@challenges:stats";

interface ChallengesContextType {
  challenges: Challenge[];
  completedChallenges: CompletedChallenge[];
  userStats: UserStats;
  loading: boolean;
  addChallenge: (challenge: Omit<Challenge, "id" | "createdAt">) => Promise<void>;
  deleteChallenge: (id: number) => Promise<void>;
  completeChallenge: (challengeId: number, notes?: string) => Promise<void>;
  getTodaysChallenges: () => Challenge[];
  getChallengesByCategory: (category: string) => Challenge[];
  getCompletedToday: () => boolean;
  getWeeklyProgress: () => { day: string; completed: boolean }[];
}

const ChallengesContext = createContext<ChallengesContextType | undefined>(undefined);

export function ChallengesProvider({ children }: { children: React.ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<CompletedChallenge[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalCompleted: 0,
    lastCompletedDate: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedChallenges, storedCompleted, storedStats] = await Promise.all([
        AsyncStorage.getItem(CHALLENGES_KEY),
        AsyncStorage.getItem(COMPLETED_KEY),
        AsyncStorage.getItem(STATS_KEY),
      ]);
      
      if (storedChallenges) {
        setChallenges(JSON.parse(storedChallenges));
      } else {
        setChallenges(challengesData);
        await AsyncStorage.setItem(CHALLENGES_KEY, JSON.stringify(challengesData));
      }
      
      if (storedCompleted) {
        setCompletedChallenges(JSON.parse(storedCompleted));
      } else {
        setCompletedChallenges([]);
        await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify([]));
      }
      
      if (storedStats) {
        setUserStats(JSON.parse(storedStats));
      } else {
        await AsyncStorage.setItem(STATS_KEY, JSON.stringify(userStats));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addChallenge = useCallback(async (newChallenge: Omit<Challenge, "id" | "createdAt">) => {
    const challenge: Challenge = {
      ...newChallenge,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    setChallenges(prev => {
      const updated = [...prev, challenge];
      AsyncStorage.setItem(CHALLENGES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteChallenge = useCallback(async (id: number) => {
    setChallenges(prev => {
      const updated = prev.filter(challenge => challenge.id !== id);
      AsyncStorage.setItem(CHALLENGES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeChallenge = useCallback(async (challengeId: number, notes?: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    // Check if already completed today
    const alreadyCompleted = completedChallenges.some(
      c => c.challengeId === challengeId && c.date === today
    );
    
    if (alreadyCompleted) return;
    
    const newCompleted: CompletedChallenge = {
      id: Date.now(),
      challengeId,
      completedAt: new Date().toISOString(),
      date: today,
      pointsEarned: challenge.points,
      notes,
    };
    
    // Update stats
    const todayCompleted = completedChallenges.some(c => c.date === today);
    let newStreak = userStats.currentStreak;
    
    if (todayCompleted) {
      // Already completed something today, just add points
      newStreak = userStats.currentStreak;
    } else {
      // First completion today
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const completedYesterday = completedChallenges.some(c => c.date === yesterdayStr);
      
      if (completedYesterday) {
        newStreak = userStats.currentStreak + 1;
      } else {
        newStreak = 1;
      }
    }
    
    const newStats: UserStats = {
      totalPoints: userStats.totalPoints + challenge.points,
      currentStreak: newStreak,
      longestStreak: Math.max(userStats.longestStreak, newStreak),
      totalCompleted: userStats.totalCompleted + 1,
      lastCompletedDate: today,
    };
    
    setUserStats(newStats);
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(newStats));
    
    setCompletedChallenges(prev => {
      const updated = [...prev, newCompleted];
      AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [challenges, completedChallenges, userStats]);

  const getTodaysChallenges = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const completedTodayIds = completedChallenges
      .filter(c => c.date === today)
      .map(c => c.challengeId);
    
    return challenges.map(challenge => ({
      ...challenge,
      completedToday: completedTodayIds.includes(challenge.id),
    }));
  }, [challenges, completedChallenges]);

  const getChallengesByCategory = useCallback((category: string) => {
    if (category === "all") return challenges;
    return challenges.filter(challenge => challenge.category === category);
  }, [challenges]);

  const getCompletedToday = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return completedChallenges.some(c => c.date === today);
  }, [completedChallenges]);

  const getWeeklyProgress = useCallback(() => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const hasCompleted = completedChallenges.some(c => c.date === dateStr);
      
      weeklyData.push({
        day: weekDays[i],
        completed: hasCompleted,
        date: dateStr,
      });
    }
    
    return weeklyData;
  }, [completedChallenges]);

  return (
    <ChallengesContext.Provider value={{
      challenges,
      completedChallenges,
      userStats,
      loading,
      addChallenge,
      deleteChallenge,
      completeChallenge,
      getTodaysChallenges,
      getChallengesByCategory,
      getCompletedToday,
      getWeeklyProgress,
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}

export function useChallenges() {
  const context = useContext(ChallengesContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }
  return context;
}