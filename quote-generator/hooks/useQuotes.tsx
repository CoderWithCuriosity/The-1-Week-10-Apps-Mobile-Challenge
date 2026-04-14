import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Quote, quotesData } from "../data/quotes";

const FAVORITES_KEY = "@quotes:favorites";

interface QuotesContextType {
  quotes: Quote[];
  favorites: number[];
  loading: boolean;
  toggleFavorite: (quoteId: number) => Promise<void>;
  getRandomQuote: (category?: string) => Quote | null;
  getQuotesByCategory: (category: string) => Quote[];
  getFavoriteQuotes: () => Quote[];
  getDailyQuote: () => Quote | null;
}

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

export function QuotesProvider({ children }: { children: React.ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoritesList = storedFavorites ? JSON.parse(storedFavorites) : [];

      // Update quotes with favorite status
      const quotesWithFavorites = quotesData.map(quote => ({
        ...quote,
        isFavorite: favoritesList.includes(quote.id),
      }));

      setFavorites(favoritesList);
      setQuotes(quotesWithFavorites);
    } catch (error) {
      console.error("Error loading favorites:", error);
      setQuotes(quotesData);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = useCallback(async (quoteId: number) => {
    let newFavorites: number[];
    if (favorites.includes(quoteId)) {
      newFavorites = favorites.filter(id => id !== quoteId);
    } else {
      newFavorites = [...favorites, quoteId];
    }
    
    setFavorites(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    
    // Update quotes state
    setQuotes(prevQuotes => 
      prevQuotes.map(quote =>
        quote.id === quoteId
          ? { ...quote, isFavorite: newFavorites.includes(quoteId) }
          : quote
      )
    );
  }, [favorites]);

  const getRandomQuote = useCallback((category?: string) => {
    if (quotes.length === 0) return null;
    
    let availableQuotes = quotes;
    if (category && category !== "all") {
      availableQuotes = quotes.filter(q => q.category === category);
    }
    
    if (availableQuotes.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    return availableQuotes[randomIndex];
  }, [quotes]);

  const getQuotesByCategory = useCallback((category: string) => {
    if (quotes.length === 0) return [];
    if (category === "all") return quotes;
    return quotes.filter(quote => quote.category === category);
  }, [quotes]);

  const getFavoriteQuotes = useCallback(() => {
    if (quotes.length === 0) return [];
    return quotes.filter(quote => favorites.includes(quote.id));
  }, [quotes, favorites]);

  const getDailyQuote = useCallback(() => {
    if (quotes.length === 0) return null;
    
    // Use date-based seed for consistent daily quote
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('-').join('');
    const index = parseInt(seed) % quotes.length;
    return quotes[index];
  }, [quotes]);

  return (
    <QuotesContext.Provider value={{
      quotes,
      favorites,
      loading,
      toggleFavorite,
      getRandomQuote,
      getQuotesByCategory,
      getFavoriteQuotes,
      getDailyQuote,
    }}>
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (context === undefined) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  return context;
}