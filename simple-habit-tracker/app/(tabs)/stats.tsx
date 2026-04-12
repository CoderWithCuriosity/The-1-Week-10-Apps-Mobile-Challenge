import { Calendar, Flame, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useHabits } from "../../hooks/useHabits";
import { theme } from "../../theme/theme";

export default function StatsScreen() {
  const { habits, getStreakStats } = useHabits();
  const stats = getStreakStats();
  
  // Calculate weekly completion rate
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  });
  
  const weeklyCompletions = last7Days.map(date => {
    return habits.filter(habit => habit.completions.includes(date)).length;
  });
  
  const totalPossible = habits.length * 7;
  const totalCompleted = weeklyCompletions.reduce((a, b) => a + b, 0);
  const completionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  // Find most consistent habit
  const bestHabit = habits.reduce((best, current) => 
    current.streak > best.streak ? current : best, habits[0]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Stats</Text>
        <Text style={styles.subtitle}>Track your progress over time</Text>
      </View>

      {/* Overall Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Flame size={32} color={theme.colors.feedback.warning} />
          <Text style={styles.statNumber}>{stats.bestStreak}</Text>
          <Text style={styles.statLabel}>Best Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <TrendingUp size={32} color={theme.colors.brand.primary} />
          <Text style={styles.statNumber}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Completion Rate</Text>
        </View>
        
        <View style={styles.statCard}>
          <Calendar size={32} color={theme.colors.feedback.info} />
          <Text style={styles.statNumber}>{stats.totalCompletions}</Text>
          <Text style={styles.statLabel}>Total Check-ins</Text>
        </View>
      </View>

      {/* Best Habit */}
      {bestHabit && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Most Consistent</Text>
          <View style={styles.bestHabitCard}>
            <Text style={styles.bestHabitIcon}>{bestHabit.icon}</Text>
            <View style={styles.bestHabitInfo}>
              <Text style={styles.bestHabitName}>{bestHabit.name}</Text>
              <Text style={styles.bestHabitStreak}>
                {bestHabit.streak} day streak
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Weekly Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Weekly Activity</Text>
        <View style={styles.weeklyChart}>
          {weeklyCompletions.map((count, index) => (
            <View key={index} style={styles.chartBar}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar,
                    { height: `${(count / habits.length) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.chartLabel}>
                {new Date(last7Days[index]).toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* All Habits Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Habit Summary</Text>
        {habits.map((habit) => (
          <View key={habit.id} style={styles.habitSummary}>
            <View style={styles.habitSummaryHeader}>
              <Text style={styles.habitSummaryIcon}>{habit.icon}</Text>
              <Text style={styles.habitSummaryName}>{habit.name}</Text>
            </View>
            <View style={styles.habitSummaryStats}>
              <Text style={styles.habitSummaryStat}>
                🔥 {habit.streak} days
              </Text>
              <Text style={styles.habitSummaryStat}>
                ✅ {habit.totalCompletions} total
              </Text>
            </View>
          </View>
        ))}
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
    paddingBottom: theme.spacing.scales.xxl,
  },
  header: {
    marginBottom: theme.spacing.scales.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  statsGrid: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
    alignItems: "center",
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.sm,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginTop: theme.spacing.scales.xs,
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
  bestHabitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
    gap: theme.spacing.scales.md,
  },
  bestHabitIcon: {
    fontSize: 40,
  },
  bestHabitInfo: {
    flex: 1,
  },
  bestHabitName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  bestHabitStreak: {
    fontSize: 14,
    color: theme.colors.feedback.warning,
    fontWeight: "500",
  },
  weeklyChart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
    height: 200,
  },
  chartBar: {
    alignItems: "center",
    gap: theme.spacing.scales.sm,
  },
  barContainer: {
    width: 40,
    height: 120,
    backgroundColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.sm,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.sm,
  },
  chartLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  habitSummary: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  habitSummaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.sm,
  },
  habitSummaryIcon: {
    fontSize: 24,
  },
  habitSummaryName: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    flex: 1,
  },
  habitSummaryStats: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
  },
  habitSummaryStat: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
});