// app/(tabs)/categories.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AffirmationCard from "../../components/AffirmationCard";
import CategoryFilter from "../../components/CategoryFilter";
import { categories } from "../../data/affirmations";
import { useAffirmations } from "../../hooks/useAffirmations";
import { theme } from "../../theme/theme";

export default function CategoriesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { getAffirmationsByCategory, toggleFavorite } = useAffirmations();
  
  const affirmations = getAffirmationsByCategory(selectedCategory);
  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <View style={styles.container}>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {selectedCategory !== "all" && (
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>
              {selectedCategoryData?.icon}
            </Text>
            <Text style={styles.categoryTitle}>
              {selectedCategoryData?.name} Affirmations
            </Text>
          </View>
        )}

        {affirmations.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No affirmations in this category</Text>
          </View>
        ) : (
          affirmations.map((affirmation) => (
            <AffirmationCard
              key={affirmation.id}
              affirmation={affirmation}
              onToggleFavorite={() => toggleFavorite(affirmation.id)}
              onPress={() => router.push(`/affirmation/${affirmation.id}`)}
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
    paddingTop: 20,
  },
  content: {
    padding: theme.spacing.scales.lg,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.lg,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
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