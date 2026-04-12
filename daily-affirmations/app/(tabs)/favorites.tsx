// app/(tabs)/favorites.tsx
import { useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AffirmationCard from "../../components/AffirmationCard";
import { useAffirmations } from "../../hooks/useAffirmations";
import { theme } from "../../theme/theme";

export default function FavoritesScreen() {
  const router = useRouter();
  const { getFavoriteAffirmations, toggleFavorite } = useAffirmations();
  const favorites = getFavoriteAffirmations();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Heart size={64} color={theme.colors.neutrals.gray500} />
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptyText}>
          Tap the heart icon on any affirmation to save it here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} affirmation{favorites.length !== 1 ? "s" : ""} saved
        </Text>
      </View>

      {favorites.map((affirmation) => (
        <AffirmationCard
          key={affirmation.id}
          affirmation={affirmation}
          onToggleFavorite={() => toggleFavorite(affirmation.id)}
          onPress={() => router.push(`/affirmation/${affirmation.id}`)}
        />
      ))}
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
    lineHeight: 20,
  },
  header: {
    marginBottom: theme.spacing.scales.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
});