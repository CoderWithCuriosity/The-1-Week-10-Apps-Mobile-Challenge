// components/AffirmationCard.tsx
import { Heart } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Affirmation } from "../data/affirmations";
import { theme } from "../theme/theme";

interface AffirmationCardProps {
  affirmation: Affirmation;
  onToggleFavorite?: () => void;
  onPress?: () => void;
  showFavoriteButton?: boolean;
}

export default function AffirmationCard({
  affirmation,
  onToggleFavorite,
  onPress,
  showFavoriteButton = true,
}: AffirmationCardProps) {
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
        
        <Text style={styles.affirmationText}>{affirmation.text}</Text>
        
        <View style={styles.footer}>
          {affirmation.author && (
            <Text style={styles.authorText}>— {affirmation.author}</Text>
          )}
          
          <View style={styles.tagsContainer}>
            {affirmation.tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {showFavoriteButton && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Heart
              size={24}
              color={affirmation.isFavorite ? theme.colors.feedback.error : theme.colors.neutrals.gray500}
              fill={affirmation.isFavorite ? theme.colors.feedback.error : "none"}
            />
          </TouchableOpacity>
        )}
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
    shadowOpacity: 0.08,
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
    opacity: 0.2,
  },
  quoteIconText: {
    fontSize: 48,
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.brand.primary,
  },
  affirmationText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.sm,
    paddingLeft: theme.spacing.scales.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
  },
  authorText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    fontStyle: "italic",
  },
  tagsContainer: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
  },
  tag: {
    backgroundColor: theme.colors.neutrals.gray50,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.xs,
    borderRadius: theme.borders.radius.sm,
  },
  tagText: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  favoriteButton: {
    position: "absolute",
    top: theme.spacing.scales.md,
    right: theme.spacing.scales.md,
  },
});