import { Heart, Sparkles, Star, Sun, Trophy, Users, Wind, Zap } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { categories } from "../data/quotes";
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
    case "inspiration":
      return <Zap {...iconProps} />;
    case "wisdom":
      return <Star {...iconProps} />;
    case "love":
      return <Heart {...iconProps} />;
    case "success":
      return <Trophy {...iconProps} />;
    case "life":
      return <Sun {...iconProps} />;
    case "happiness":
      return <Wind {...iconProps} />;
    case "courage":
      return <Users {...iconProps} />;
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
            14
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
    marginBottom: theme.spacing.scales.md,
    flexGrow: 0,
    paddingTop: theme.spacing.scales.sm,
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
    borderColor: theme.colors.neutrals.gray200,
    marginRight: theme.spacing.scales.sm,
    gap: theme.spacing.scales.xs,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  categoryNameActive: {
    color: theme.colors.neutrals.white,
  },
});