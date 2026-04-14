import { CheckCircle, Clock, Flame, Star } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Challenge, difficulties } from "../data/challenges";
import { theme } from "../theme/theme";

interface ChallengeCardProps {
  challenge: Challenge & { completedToday?: boolean };
  onPress: () => void;
  onComplete?: () => void;
  showCompleteButton?: boolean;
}

export default function ChallengeCard({ 
  challenge, 
  onPress, 
  onComplete, 
  showCompleteButton = true 
}: ChallengeCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const difficulty = difficulties.find(d => d.id === challenge.difficulty);
  const categoryColor = categories.find(c => c.id === challenge.category)?.color || theme.colors.brand.primary;

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
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor + "10" }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {challenge.category}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: difficulty?.color + "10" }]}>
            <Flame size={10} color={difficulty?.color} />
            <Text style={[styles.difficultyText, { color: difficulty?.color }]}>
              {difficulty?.label}
            </Text>
          </View>
          {challenge.completedToday && (
            <View style={styles.completedBadge}>
              <CheckCircle size={12} color={theme.colors.feedback.success} />
              <Text style={styles.completedText}>Done</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {challenge.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Star size={12} color={theme.colors.feedback.warning} />
              <Text style={styles.statText}>{challenge.points} pts</Text>
            </View>
            {challenge.duration > 0 && (
              <View style={styles.stat}>
                <Clock size={12} color={theme.colors.neutrals.gray500} />
                <Text style={styles.statText}>{challenge.duration} min</Text>
              </View>
            )}
          </View>
          
          {showCompleteButton && !challenge.completedToday && onComplete && (
            <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
              <Text style={styles.completeButtonText}>Complete</Text>
            </TouchableOpacity>
          )}
          
          {challenge.completedToday && (
            <View style={styles.completedIndicator}>
              <CheckCircle size={16} color={theme.colors.feedback.success} />
              <Text style={styles.completedIndicatorText}>Completed</Text>
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
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: theme.spacing.scales.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.sm,
    flexWrap: "wrap",
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
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "500",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.feedback.success + "10",
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  completedText: {
    fontSize: 10,
    fontWeight: "500",
    color: theme.colors.feedback.success,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
    lineHeight: 18,
    marginBottom: theme.spacing.scales.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.scales.xs,
  },
  stats: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  completeButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: 6,
    borderRadius: theme.borders.radius.md,
  },
  completeButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
  completedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  completedIndicatorText: {
    fontSize: 12,
    color: theme.colors.feedback.success,
    fontWeight: "500",
  },
});

import { categories } from "../data/challenges";