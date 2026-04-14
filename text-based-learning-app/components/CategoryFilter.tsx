import { Book, Braces, Briefcase, Heart, Hexagon, Palette, Sparkles, FlaskConical } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { categories } from "../data/lessons";
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
    case "programming":
      return <Braces {...iconProps} />;
    case "language":
      return <Book {...iconProps} />;
    case "science":
      return <FlaskConical {...iconProps} />;
    case "math":
      return <Hexagon {...iconProps} />;
    case "history":
      return <Book {...iconProps} />;
    case "art":
      return <Palette {...iconProps} />;
    case "business":
      return <Briefcase {...iconProps} />;
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