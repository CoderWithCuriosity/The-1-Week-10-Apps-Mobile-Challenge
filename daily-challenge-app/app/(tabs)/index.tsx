import { useRouter } from "expo-router";
import { Sparkles } from "lucide-react-native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChallengeCard from "../../components/ChallengeCard";
import StreakBadge from "../../components/StreakBadge";
import { useChallenges } from "../../hooks/useChallenges";
import { theme } from "../../theme/theme";

export default function TodayScreen() {
  const router = useRouter();
  const { getTodaysChallenges, completeChallenge, userStats, getCompletedToday } = useChallenges();
  
  const todaysChallenges = getTodaysChallenges();
  const hasCompletedToday = getCompletedToday();
  
  const handleComplete = (challengeId: number, title: string) => {
    Alert.alert(
      "Complete Challenge",
      `Mark "${title}" as completed? You'll earn points and maintain your streak!`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Complete", 
          onPress: async () => {
            await completeChallenge(challengeId);
            Alert.alert("🎉 Great job!", "Challenge completed! Keep up the momentum!");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {hasCompletedToday ? "Great work today! 🎉" : "Ready for today's challenges? 💪"}
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </Text>
      </View>
      
      <View style={styles.streakCard}>
        <StreakBadge streak={userStats.currentStreak} size="large" />
        <Text style={styles.streakSubtext}>
          {userStats.currentStreak === 0 
            ? "Complete a challenge today to start your streak!" 
            : `Keep going! ${userStats.currentStreak} day${userStats.currentStreak !== 1 ? "s" : ""} in a row`}
        </Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Challenges</Text>
          <Sparkles size={18} color={theme.colors.brand.primary} />
        </View>
        <Text style={styles.sectionSubtitle}>
          Complete these challenges to earn points and build your streak
        </Text>
        
        {todaysChallenges.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No challenges available</Text>
          </View>
        ) : (
          todaysChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => router.push(`/challenge/${challenge.id}`)}
              onComplete={() => handleComplete(challenge.id, challenge.title)}
              showCompleteButton={!challenge.completedToday}
            />
          ))
        )}
      </View>
      
      {hasCompletedToday && (
        <View style={styles.completionCard}>
          <Text style={styles.completionEmoji}>🎯</Text>
          <Text style={styles.completionTitle}>All caught up!</Text>
          <Text style={styles.completionText}>
            You've completed today's challenges. Check back tomorrow for more!
          </Text>
        </View>
      )}
      
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Daily Challenge Tip</Text>
        <Text style={styles.tipText}>
          Consistency beats intensity. Small daily actions lead to big results over time.
          Complete at least one challenge every day to build your streak!
        </Text>
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
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  streakCard: {
    backgroundColor: theme.colors.brand.primary + "10",
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    alignItems: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  streakSubtext: {
    fontSize: 13,
    color: theme.colors.neutrals.gray600,
    marginTop: theme.spacing.scales.sm,
    textAlign: "center",
  },
  section: {
    marginBottom: theme.spacing.scales.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.md,
  },
  emptyContainer: {
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  completionCard: {
    backgroundColor: theme.colors.feedback.success + "10",
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    alignItems: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  completionEmoji: {
    fontSize: 48,
    marginBottom: theme.spacing.scales.sm,
  },
  completionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.feedback.success,
    marginBottom: 4,
  },
  completionText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray600,
    textAlign: "center",
  },
  tipCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
    lineHeight: 18,
  },
});