// app/affirmation/[id].tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ShareButton from "../../components/ShareButton";
import { useAffirmations } from "../../hooks/useAffirmations";
import { theme } from "../../theme/theme";

export default function AffirmationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { affirmations, toggleFavorite } = useAffirmations();
  
  const affirmation = affirmations.find(a => a.id === Number(id));

  if (!affirmation) {
    return (
      <View style={styles.centered}>
        <Text>Affirmation not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categoryColors: Record<string, string> = {
    success: "#FFB800",
    love: "#FF4D4D",
    discipline: "#20D1FD",
    peace: "#87D748",
    gratitude: "#FF9A00",
    confidence: "#4A6FA5",
    healing: "#17B978",
  };

  const color = categoryColors[affirmation.category] || theme.colors.brand.primary;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderTopColor: color }]}>
        <View style={styles.quoteMarks}>
          <Text style={styles.quoteMark}>"</Text>
        </View>
        
        <Text style={styles.affirmationText}>{affirmation.text}</Text>
        
        {affirmation.author && (
          <Text style={styles.authorText}>— {affirmation.author}</Text>
        )}
        
        <View style={styles.divider} />
        
        <View style={styles.infoSection}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>
              {getCategoryIcon(affirmation.category)}
            </Text>
            <Text style={[styles.categoryText, { color }]}>
              {affirmation.category.charAt(0).toUpperCase() + affirmation.category.slice(1)}
            </Text>
          </View>
          
          <View style={styles.tagsContainer}>
            {affirmation.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(affirmation.id)}
          >
            <Heart
              size={20}
              color={affirmation.isFavorite ? theme.colors.feedback.error : theme.colors.neutrals.gray500}
              fill={affirmation.isFavorite ? theme.colors.feedback.error : "none"}
            />
            <Text style={styles.favoriteText}>
              {affirmation.isFavorite ? "Saved to Favorites" : "Save to Favorites"}
            </Text>
          </TouchableOpacity>
          
          <ShareButton affirmationText={affirmation.text} />
        </View>
      </View>
    </ScrollView>
  );
}

const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    success: "🏆",
    love: "❤️",
    discipline: "💪",
    peace: "🕊️",
    gratitude: "🙏",
    confidence: "⭐",
    healing: "🌿",
  };
  return icons[category] || "✨";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  content: {
    padding: theme.spacing.scales.lg,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    borderTopWidth: 4,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  quoteMarks: {
    marginBottom: theme.spacing.scales.md,
  },
  quoteMark: {
    fontSize: 64,
    color: theme.colors.brand.primary,
    opacity: 0.3,
    fontFamily: theme.typography.fontFamily,
  },
  affirmationText: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.lg,
  },
  authorText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
    fontStyle: "italic",
    textAlign: "right",
    marginBottom: theme.spacing.scales.lg,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutrals.gray100,
    marginVertical: theme.spacing.scales.lg,
  },
  infoSection: {
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.xl,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
  },
  tag: {
    backgroundColor: theme.colors.neutrals.gray50,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.xs,
    borderRadius: theme.borders.radius.sm,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  actionButtons: {
    gap: theme.spacing.scales.md,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
  },
});