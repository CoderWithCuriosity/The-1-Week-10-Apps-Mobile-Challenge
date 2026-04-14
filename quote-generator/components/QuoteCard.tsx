import { Heart, Share2 } from "lucide-react-native";
import React from "react";
import {
  Animated,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Quote } from "../data/quotes";
import { theme } from "../theme/theme";

interface QuoteCardProps {
  quote: Quote;
  onToggleFavorite?: () => void;
  onPress?: () => void;
  showActions?: boolean;
}

export default function QuoteCard({ quote, onToggleFavorite, onPress, showActions = true }: QuoteCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.cardContent}
      >
        <View style={styles.quoteIcon}>
          <Text style={styles.quoteIconText}>"</Text>
        </View>
        
        <Text style={styles.quoteText}>{quote.text}</Text>
        
        <Text style={styles.authorText}>— {quote.author}</Text>
        
        <View style={styles.footer}>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() + "10" }]}>
            <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
              {quote.category}
            </Text>
          </View>
          
          {showActions && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
                <Share2 size={18} color={theme.colors.neutrals.gray500} />
              </TouchableOpacity>
              
              <TouchableOpacity onPress={onToggleFavorite} style={styles.actionButton}>
                <Heart
                  size={20}
                  color={quote.isFavorite ? theme.colors.feedback.error : theme.colors.neutrals.gray500}
                  fill={quote.isFavorite ? theme.colors.feedback.error : "none"}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    marginBottom: theme.spacing.scales.md,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: theme.spacing.scales.lg,
    position: "relative",
  },
  quoteIcon: {
    position: "absolute",
    top: theme.spacing.scales.md,
    left: theme.spacing.scales.md,
    opacity: 0.15,
  },
  quoteIconText: {
    fontSize: 56,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.brand.primary,
  },
  quoteText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.sm,
    paddingLeft: theme.spacing.scales.md,
  },
  authorText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    fontStyle: "italic",
    textAlign: "right",
    marginBottom: theme.spacing.scales.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
  },
  actionButton: {
    padding: 6,
  },
});

import { categories } from "../data/quotes";