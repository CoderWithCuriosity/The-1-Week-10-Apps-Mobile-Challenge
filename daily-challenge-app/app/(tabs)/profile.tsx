import { Award, Calendar, Flame, Star, Trophy } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StreakBadge from "../../components/StreakBadge";
import { useChallenges } from "../../hooks/useChallenges";
import { theme } from "../../theme/theme";

export default function ProfileScreen() {
  const { userStats, getWeeklyProgress } = useChallenges();
  const weeklyProgress = getWeeklyProgress();
  
  const completionRate = weeklyProgress.filter(d => d.completed).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>Track your achievements</Text>
      </View>
      
      <View style={styles.statsCard}>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Trophy size={32} color={theme.colors.feedback.warning} />
            <Text style={styles.statValue}>{userStats.totalPoints}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statItem}>
            <Award size={32} color={theme.colors.brand.primary} />
            <Text style={styles.statValue}>{userStats.totalCompleted}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Flame size={32} color={theme.colors.feedback.error} />
            <Text style={styles.statValue}>{userStats.longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.streakSection}>
        <Text style={styles.sectionTitle}>Current Streak</Text>
        <StreakBadge streak={userStats.currentStreak} size="large" />
      </View>
      
      <View style={styles.weeklySection}>
        <Text style={styles.sectionTitle}>This Week's Progress</Text>
        <View style={styles.weeklyGrid}>
          {weeklyProgress.map((day, index) => (
            <View key={index} style={styles.weeklyDay}>
              <View style={[
                styles.weeklyCircle,
                day.completed && styles.weeklyCircleCompleted
              ]}>
                {day.completed && <Check size={16} color={theme.colors.neutrals.white} />}
              </View>
              <Text style={styles.weeklyLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.completionText}>
          {completionRate}/7 days completed this week
        </Text>
      </View>
      
      <View style={styles.milestonesSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneIcon}>
            <Star size={24} color={theme.colors.feedback.warning} />
          </View>
          <View style={styles.milestoneInfo}>
            <Text style={styles.milestoneTitle}>First Steps</Text>
            <Text style={styles.milestoneDesc}>Complete your first challenge</Text>
          </View>
          <Text style={styles.milestoneStatus}>
            {userStats.totalCompleted > 0 ? "✅" : "🔒"}
          </Text>
        </View>
        
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneIcon}>
            <Flame size={24} color={theme.colors.feedback.error} />
          </View>
          <View style={styles.milestoneInfo}>
            <Text style={styles.milestoneTitle}>On Fire</Text>
            <Text style={styles.milestoneDesc}>Reach a 7-day streak</Text>
          </View>
          <Text style={styles.milestoneStatus}>
            {userStats.currentStreak >= 7 ? "✅" : "🔒"}
          </Text>
        </View>
        
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneIcon}>
            <Trophy size={24} color={theme.colors.feedback.warning} />
          </View>
          <View style={styles.milestoneInfo}>
            <Text style={styles.milestoneTitle}>Challenge Master</Text>
            <Text style={styles.milestoneDesc}>Complete 30 challenges</Text>
          </View>
          <Text style={styles.milestoneStatus}>
            {userStats.totalCompleted >= 30 ? "✅" : "🔒"}
          </Text>
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
    paddingBottom: theme.spacing.scales.xxl,
  },
  header: {
    marginBottom: theme.spacing.scales.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  statsCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.xl,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.sm,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginTop: 4,
  },
  streakSection: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    alignItems: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  weeklySection: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.xl,
    alignItems: "center",
  },
  weeklyGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: theme.spacing.scales.md,
  },
  weeklyDay: {
    alignItems: "center",
    gap: theme.spacing.scales.xs,
  },
  weeklyCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.neutrals.gray200,
    alignItems: "center",
    justifyContent: "center",
  },
  weeklyCircleCompleted: {
    backgroundColor: theme.colors.feedback.success,
  },
  weeklyLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  completionText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
  },
  milestonesSection: {
    marginBottom: theme.spacing.scales.xl,
  },
  milestoneCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  milestoneIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.scales.md,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 2,
  },
  milestoneDesc: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  milestoneStatus: {
    fontSize: 20,
  },
});

import { Check } from "lucide-react-native";