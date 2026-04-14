import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, Share2 } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuotes } from "../../hooks/useQuotes";
import { theme } from "../../theme/theme";

export default function QuoteDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { quotes, toggleFavorite } = useQuotes();
  
  const quote = quotes.find(q => q.id === Number(id));

  if (!quote) {
    return (
      <View style={styles.centered}>
        <Text>Quote not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${quote.text}"\n\n— ${quote.author}\n\nShared from Quote Generator`,
        title: "Share Quote",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const getCategoryColor = () => {
    const category = categories.find(c => c.id === quote.category);
    return category?.color || theme.colors.brand.primary;
  };

  const color = getCategoryColor();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderTopColor: color }]}>
        <View style={styles.quoteMarks}>
          <Text style={styles.quoteMark}>"</Text>
        </View>
        
        <Text style={styles.quoteText}>{quote.text}</Text>
        
        <Text style={styles.authorText}>— {quote.author}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.infoSection}>
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, { color }]}>
              {quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(quote.id)}
          >
            <Heart
              size={22}
              color={quote.isFavorite ? theme.colors.feedback.error : theme.colors.neutrals.gray500}
              fill={quote.isFavorite ? theme.colors.feedback.error : "none"}
            />
            <Text style={styles.favoriteText}>
              {quote.isFavorite ? "Saved to Favorites" : "Save to Favorites"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Share2 size={20} color={theme.colors.neutrals.gray500} />
            <Text style={styles.shareText}>Share Quote</Text>
          </TouchableOpacity>
        </View>
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
  quoteText: {
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
    marginBottom: theme.spacing.scales.xl,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.full,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
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
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.md,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.md,
  },
  shareText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
});

import { categories } from "../../data/quotes";