import { Check, Flame } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Habit, categories } from "../data/habits";
import { theme } from "../theme/theme";

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onPress?: () => void;
  showDate?: boolean;
  date?: string;
}

export default function HabitCard({ habit, onToggle, onPress, showDate, date }: HabitCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const isCompleted = date ? habit.completions.includes(date) : false;

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
    const category = categories.find(c => c.id === habit.category);
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
        <View style={[styles.iconContainer, { backgroundColor: getCategoryColor() + "10" }]}>
          <Text style={styles.icon}>{habit.icon}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.habitName}>{habit.name}</Text>
          {habit.description && (
            <Text style={styles.description} numberOfLines={1}>
              {habit.description}
            </Text>
          )}
          <View style={styles.statsContainer}>
            <View style={styles.streakBadge}>
              <Flame size={12} color={theme.colors.feedback.warning} />
              <Text style={styles.streakText}>{habit.streak} day streak</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={[styles.checkButton, isCompleted && styles.checkButtonActive]}
          onPress={onToggle}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Check
            size={20}
            color={isCompleted ? theme.colors.neutrals.white : theme.colors.neutrals.gray500}
          />
        </TouchableOpacity>
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
  icon: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
    gap: theme.spacing.scales.xs,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  description: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  statsContainer: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.neutrals.gray50,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 2,
    borderRadius: theme.borders.radius.sm,
  },
  streakText: {
    fontSize: 10,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borders.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutrals.white,
  },
  checkButtonActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
});