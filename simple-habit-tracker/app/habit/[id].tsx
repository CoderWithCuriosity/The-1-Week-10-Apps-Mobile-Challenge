import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Check, Flame } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useHabits } from "../../hooks/useHabits";
import { theme } from "../../theme/theme";

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { habits, toggleHabit } = useHabits();
  
  const habit = habits.find(h => h.id === Number(id));

  if (!habit) {
    return (
      <View style={styles.centered}>
        <Text>Habit not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Generate last 30 days
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const getCategoryColor = () => {
    const category = categories.find(c => c.id === habit.category);
    return category?.color || theme.colors.brand.primary;
  };

  const color = getCategoryColor();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.header, { borderTopColor: color }]}>
        <Text style={styles.icon}>{habit.icon}</Text>
        <Text style={styles.name}>{habit.name}</Text>
        {habit.description && (
          <Text style={styles.description}>{habit.description}</Text>
        )}
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Flame size={20} color={theme.colors.feedback.warning} />
            <Text style={styles.statValue}>{habit.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Check size={20} color={theme.colors.brand.primary} />
            <Text style={styles.statValue}>{habit.totalCompletions}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Calendar size={20} color={theme.colors.feedback.info} />
            <Text style={styles.statValue}>
              {Math.round((habit.totalCompletions / 30) * 100)}%
            </Text>
            <Text style={styles.statLabel}>30 Day Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Calendar</Text>
        <View style={styles.calendar}>
          {last30Days.map((date, index) => {
            const isCompleted = habit.completions.includes(date);
            const isToday = date === new Date().toISOString().split('T')[0];
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  isCompleted && styles.calendarDayCompleted,
                  isToday && styles.calendarDayToday,
                ]}
                onPress={() => toggleHabit(habit.id, date)}
              >
                <Text style={[
                  styles.calendarDayText,
                  isCompleted && styles.calendarDayTextCompleted,
                ]}>
                  {new Date(date).getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
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
  header: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    alignItems: "center",
    borderTopWidth: 4,
    marginBottom: theme.spacing.scales.xl,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: theme.spacing.scales.md,
  },
  statItem: {
    alignItems: "center",
    gap: theme.spacing.scales.xs,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  section: {
    marginBottom: theme.spacing.scales.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  calendar: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: theme.borders.radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutrals.gray50,
  },
  calendarDayCompleted: {
    backgroundColor: theme.colors.brand.primary,
  },
  calendarDayToday: {
    borderWidth: 2,
    borderColor: theme.colors.brand.primary,
  },
  calendarDayText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  calendarDayTextCompleted: {
    color: theme.colors.neutrals.white,
    fontWeight: "600",
  },
});

import { categories } from "../../data/habits";