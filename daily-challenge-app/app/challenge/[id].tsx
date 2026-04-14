import { useLocalSearchParams, useRouter } from "expo-router";
import { Clock, Flag, Sparkles, Star, Trophy } from "lucide-react-native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { difficulties } from "../../data/challenges";
import { useChallenges } from "../../hooks/useChallenges";
import { theme } from "../../theme/theme";

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { challenges, completeChallenge, completedChallenges } = useChallenges();
  
  const challenge = challenges.find(c => c.id === Number(id));
  const difficulty = difficulties.find(d => d.id === challenge?.difficulty);
  const categoryColor = categories.find(c => c.id === challenge?.category)?.color || theme.colors.brand.primary;
  
  // Check if already completed today
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = completedChallenges.some(
    c => c.challengeId === challenge?.id && c.date === today
  );
  
  if (!challenge) {
    return (
      <View style={styles.centered}>
        <Text>Challenge not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const handleComplete = () => {
    Alert.alert(
      "Complete Challenge",
      `Mark "${challenge.title}" as completed? You'll earn ${challenge.points} points!`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Complete", 
          onPress: async () => {
            await completeChallenge(challenge.id);
            Alert.alert(
              "🎉 Amazing!",
              `You earned ${challenge.points} points! Keep up the great work!`,
              [{ text: "OK", onPress: () => router.back() }]
            );
          }
        }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.header, { borderTopColor: categoryColor }]}>
        <View style={styles.badges}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor + "10" }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {challenge.category}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: difficulty?.color + "10" }]}>
            <Flag size={12} color={difficulty?.color} />
            <Text style={[styles.difficultyText, { color: difficulty?.color }]}>
              {difficulty?.label}
            </Text>
          </View>
          {isCompletedToday && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed Today ✅</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.title}>{challenge.title}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Star size={18} color={theme.colors.feedback.warning} />
            <Text style={styles.statValue}>{challenge.points} pts</Text>
          </View>
          {challenge.duration > 0 && (
            <View style={styles.statItem}>
              <Clock size={18} color={theme.colors.neutrals.gray500} />
              <Text style={styles.statValue}>{challenge.duration} min</Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>📖 Challenge</Text>
        <Text style={styles.descriptionText}>{challenge.description}</Text>
      </View>
      
      {challenge.tips && challenge.tips.length > 0 && (
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips for Success</Text>
          {challenge.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.motivationCard}>
        <Sparkles size={24} color={theme.colors.brand.primary} />
        <Text style={styles.motivationTitle}>Why do this challenge?</Text>
        <Text style={styles.motivationText}>
          Daily challenges help build positive habits, boost your mood, and create momentum toward your goals.
          Every small step counts!
        </Text>
      </View>
      
      {!isCompletedToday && (
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Trophy size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.completeButtonText}>Mark as Completed</Text>
        </TouchableOpacity>
      )}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
    borderTopWidth: 4,
  },
  badges: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
    flexWrap: "wrap",
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
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "500",
  },
  completedBadge: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
    backgroundColor: theme.colors.feedback.success + "10",
  },
  completedText: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.colors.feedback.success,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  statsRow: {
    flexDirection: "row",
    gap: theme.spacing.scales.lg,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
  },
  descriptionCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.neutrals.gray700,
  },
  tipsCard: {
    backgroundColor: theme.colors.brand.primary + "05",
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  tipItem: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.xs,
  },
  tipBullet: {
    fontSize: 14,
    color: theme.colors.brand.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.neutrals.gray600,
    lineHeight: 20,
  },
  motivationCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    alignItems: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.xs,
  },
  motivationText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
    lineHeight: 20,
  },
  completeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});

import { categories } from "../../data/challenges";