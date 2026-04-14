import { useRouter } from "expo-router";
import { RefreshCw } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import QuoteCard from "../../components/QuoteCard";
import { useQuotes } from "../../hooks/useQuotes";
import { theme } from "../../theme/theme";

export default function DiscoverScreen() {
  const router = useRouter();
  const { getRandomQuote, toggleFavorite, getDailyQuote, getQuotesByCategory, loading } = useQuotes();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentQuote, setCurrentQuote] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Initialize quotes after loading
  useEffect(() => {
    if (!loading) {
      const randomQuote = getRandomQuote();
      setCurrentQuote(randomQuote);
    }
  }, [loading]);
  
  const dailyQuote = getDailyQuote();
  const categoryQuotes = getQuotesByCategory(selectedCategory);

  const getNewRandomQuote = () => {
    const newQuote = getRandomQuote(selectedCategory === "all" ? undefined : selectedCategory);
    if (newQuote) {
      setCurrentQuote(newQuote);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNewRandomQuote();
    setTimeout(() => setRefreshing(false), 500);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newQuote = getRandomQuote(category === "all" ? undefined : category);
    if (newQuote) {
      setCurrentQuote(newQuote);
    }
  };

  // Show loading indicator while quotes are loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.brand.primary} />
        <Text style={styles.loadingText}>Loading quotes...</Text>
      </View>
    );
  }

  // Handle case when no quotes are available
  if (!dailyQuote || !currentQuote) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No quotes available</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Daily Quote Section */}
      <View style={styles.dailySection}>
        <Text style={styles.sectionTitle}>✨ Quote of the Day</Text>
        <QuoteCard
          quote={dailyQuote}
          onToggleFavorite={() => toggleFavorite(dailyQuote.id)}
          onPress={() => router.push(`/quote/${dailyQuote.id}`)}
        />
      </View>

      {/* Random Quote Generator */}
      <View style={styles.randomSection}>
        <Text style={styles.sectionTitle}>🎲 Random Quote</Text>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
        
        {currentQuote && (
          <QuoteCard
            quote={currentQuote}
            onToggleFavorite={() => toggleFavorite(currentQuote.id)}
            onPress={() => router.push(`/quote/${currentQuote.id}`)}
          />
        )}
        
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={getNewRandomQuote}
        >
          <RefreshCw size={18} color={theme.colors.brand.onPrimary} />
          <Text style={styles.refreshText}>New Quote</Text>
        </TouchableOpacity>
      </View>

      {/* More Quotes Preview */}
      <View style={styles.moreSection}>
        <Text style={styles.sectionTitle}>📖 More from this category</Text>
        {categoryQuotes.slice(0, 3).map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onToggleFavorite={() => toggleFavorite(quote.id)}
            onPress={() => router.push(`/quote/${quote.id}`)}
            showActions={false}
          />
        ))}
        {categoryQuotes.length > 3 && (
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push("/categories")}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  content: {
    padding: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  dailySection: {
    marginBottom: theme.spacing.scales.xl,
  },
  randomSection: {
    marginBottom: theme.spacing.scales.xl,
  },
  moreSection: {
    marginBottom: theme.spacing.scales.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    marginTop: theme.spacing.scales.sm,
  },
  refreshText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
  viewAllButton: {
    alignItems: "center",
    paddingVertical: theme.spacing.scales.md,
  },
  viewAllText: {
    fontSize: 14,
    color: theme.colors.brand.primary,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.gray50,
  },
  loadingText: {
    marginTop: theme.spacing.scales.md,
    fontSize: 16,
    color: theme.colors.neutrals.gray600,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.feedback.error,
  },
});