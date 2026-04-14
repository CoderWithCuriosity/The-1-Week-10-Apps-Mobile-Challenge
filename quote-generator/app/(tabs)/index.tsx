import { useRouter } from "expo-router";
import { RefreshCw } from "lucide-react-native";
import React, { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import QuoteCard from "../../components/QuoteCard";
import ShareButton from "../../components/ShareButton";
import { useQuotes } from "../../hooks/useQuotes";
import { theme } from "../../theme/theme";

export default function DiscoverScreen() {
  const router = useRouter();
  const { getRandomQuote, toggleFavorite, getDailyQuote, getQuotesByCategory } = useQuotes();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());
  const [refreshing, setRefreshing] = useState(false);
  
  const dailyQuote = getDailyQuote();
  const categoryQuotes = getQuotesByCategory(selectedCategory);

  const getNewRandomQuote = () => {
    setCurrentQuote(getRandomQuote(selectedCategory === "all" ? undefined : selectedCategory));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNewRandomQuote();
    setTimeout(() => setRefreshing(false), 500);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuote(getRandomQuote(category === "all" ? undefined : category));
  };

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
        
        <QuoteCard
          quote={currentQuote}
          onToggleFavorite={() => toggleFavorite(currentQuote.id)}
          onPress={() => router.push(`/quote/${currentQuote.id}`)}
        />
        
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
});