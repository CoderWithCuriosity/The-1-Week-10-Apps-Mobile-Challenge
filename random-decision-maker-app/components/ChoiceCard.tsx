import { Edit2, Star, Trash2, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Choice } from "../data/choices";
import { theme } from "../theme/theme";

interface ChoiceCardProps {
  choice: Choice;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showStats?: boolean;
}

export default function ChoiceCard({ choice, onPress, onEdit, onDelete, showStats = true }: ChoiceCardProps) {
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

  const getCategoryColor = () => {
    const category = categories.find(c => c.id === choice.category);
    return category?.color || theme.colors.brand.primary;
  };

  const color = getCategoryColor();

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.cardContent}
      >
        <View style={[styles.iconContainer, { backgroundColor: color + "10" }]}>
          <Text style={styles.emoji}>{choice.emoji}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{choice.name}</Text>
          {choice.description && (
            <Text style={styles.description} numberOfLines={1}>
              {choice.description}
            </Text>
          )}
          <View style={styles.tagsContainer}>
            <View style={[styles.categoryBadge, { backgroundColor: color + "10" }]}>
              <Text style={[styles.categoryText, { color }]}>
                {choice.category}
              </Text>
            </View>
            {showStats && choice.timesChosen > 0 && (
              <View style={styles.statsBadge}>
                <TrendingUp size={10} color={theme.colors.neutrals.gray500} />
                <Text style={styles.statsText}>
                  Chosen {choice.timesChosen}x
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Edit2 size={16} color={theme.colors.neutrals.gray500} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Trash2 size={16} color={theme.colors.feedback.error} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    marginBottom: theme.spacing.scales.sm,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    padding: theme.spacing.scales.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  description: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.xs,
    marginTop: 4,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  statsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
    backgroundColor: theme.colors.neutrals.gray100,
  },
  statsText: {
    fontSize: 10,
    color: theme.colors.neutrals.gray500,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
  },
  actionButton: {
    padding: 6,
  },
});

import { categories } from "../data/choices";