import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import QuoteCard from "../../components/QuoteCard";
import { categories } from "../../data/quotes";
import { useQuotes } from "../../hooks/useQuotes";
import { theme } from "../../theme/theme";

export default function CategoriesScreen() {
  const router = useRouter();
  const { getQuotesByCategory, toggleFavorite } = useQuotes();
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const quotes = getQuotesByCategory(selectedCategory);
  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <View style={styles.container}>
      {selectedCategory !== "all" && (
        <View style={[styles.categoryHeader, { backgroundColor: selectedCategoryData?.color + "10" }]}>
          <Text style={[styles.categoryTitle, { color: selectedCategoryData?.color }]}>
            {selectedCategoryData?.name} Quotes
          </Text>
          <Text style={styles.categoryCount}>{quotes.length} quotes</Text>
        </View>
      )}
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView
        style={styles.quotesList}
        contentContainerStyle={styles.quotesListContent}
      >
        {quotes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No quotes in this category</Text>
          </View>
        ) : (
          quotes.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onToggleFavorite={() => toggleFavorite(quote.id)}
              onPress={() => router.push(`/quote/${quote.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  categoryHeader: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  quotesList: {
    flex: 1,
  },
  quotesListContent: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  emptyContainer: {
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
  },
});