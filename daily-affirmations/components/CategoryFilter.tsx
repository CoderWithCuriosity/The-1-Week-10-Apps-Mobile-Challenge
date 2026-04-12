// components/CategoryFilter.tsx
import { Activity, Dumbbell, Feather, Heart, Leaf, Sparkles, Star, Trophy } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { categories } from "../data/affirmations";
import { theme } from "../theme/theme";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (categoryId: string, color: string, size: number = 20) => {
  const iconProps = { size, color };
  switch (categoryId) {
    case "all":
      return <Sparkles {...iconProps} />;
    case "success":
      return <Trophy {...iconProps} />;
    case "love":
      return <Heart {...iconProps} />;
    case "discipline":
      return <Dumbbell {...iconProps} />;
    case "peace":
      return <Feather {...iconProps} />;
    case "gratitude":
      return <Star {...iconProps} />;
    case "confidence":
      return <Activity {...iconProps} />;
    case "healing":
      return <Leaf {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryChip,
            selectedCategory === category.id && styles.categoryChipActive,
            selectedCategory === category.id && {
              backgroundColor: category.color,
              borderColor: category.color,
            },
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          {getCategoryIcon(
            category.id, 
            selectedCategory === category.id ? theme.colors.neutrals.white : category.color,
            16
          )}
          <Text
            style={[
              styles.categoryName,
              selectedCategory === category.id && styles.categoryNameActive,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.scales.lg,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.scales.md,
    gap: theme.spacing.scales.sm,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.white,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray100,
    marginRight: theme.spacing.scales.sm,
    gap: theme.spacing.scales.xs,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
  },
  categoryNameActive: {
    color: theme.colors.neutrals.white,
  },
});