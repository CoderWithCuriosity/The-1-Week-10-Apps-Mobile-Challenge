import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
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
import { useQuotes } from "../../hooks/useQuotes";
import { theme } from "../../theme/theme";

export default function FavoritesScreen() {
  const router = useRouter();
  const { getFavoriteQuotes, toggleFavorite, getQuotesByCategory } = useQuotes();
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  let favorites = getFavoriteQuotes();
  
  if (selectedCategory !== "all") {
    favorites = favorites.filter(quote => quote.category === selectedCategory);
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Heart size={64} color={theme.colors.neutrals.gray400} />
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>
          Tap the heart icon on any quote to save it here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} quote{favorites.length !== 1 ? "s" : ""} saved
        </Text>
      </View>
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView
        style={styles.quotesList}
        contentContainerStyle={styles.quotesListContent}
      >
        {favorites.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onToggleFavorite={() => toggleFavorite(quote.id)}
            onPress={() => router.push(`/quote/${quote.id}`)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  header: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingTop: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.md,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  subtitle: {
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
    marginTop: theme.spacing.scales.md,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
  },
});