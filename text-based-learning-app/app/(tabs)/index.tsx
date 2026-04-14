import { useRouter } from "expo-router";
import { BookOpen, Clock, GraduationCap, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LessonCard from "../../components/LessonCard";
import ProgressBar from "../../components/ProgressBar";
import { useLearning } from "../../hooks/useLearning";
import { theme } from "../../theme/theme";

export default function DashboardScreen() {
  const router = useRouter();
  const { lessons, progress, getStats, getInProgressLessons } = useLearning();
  const stats = getStats();
  const inProgressLessons = getInProgressLessons().slice(0, 3);
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} min`;
    if (mins === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours}h ${mins}m`;
  };

  if (lessons.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>📚</Text>
        <Text style={styles.emptyStateTitle}>No lessons yet</Text>
        <Text style={styles.emptyStateText}>
          Create your first lesson to start learning
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => router.push("/lessons")}
        >
          <Text style={styles.emptyStateButtonText}>Create Lesson</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Dashboard</Text>
        <Text style={styles.subtitle}>Track your progress</Text>
      </View>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <BookOpen size={24} color={theme.colors.brand.primary} />
          <Text style={styles.statValue}>{stats.totalLessons}</Text>
          <Text style={styles.statLabel}>Total Lessons</Text>
        </View>
        
        <View style={styles.statCard}>
          <GraduationCap size={24} color={theme.colors.feedback.success} />
          <Text style={styles.statValue}>{stats.completedLessons}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        
        <View style={styles.statCard}>
          <Clock size={24} color={theme.colors.feedback.warning} />
          <Text style={styles.statValue}>{formatTime(stats.totalStudyTime)}</Text>
          <Text style={styles.statLabel}>Study Time</Text>
        </View>
        
        <View style={styles.statCard}>
          <TrendingUp size={24} color={theme.colors.feedback.info} />
          <Text style={styles.statValue}>{stats.masteryAverage}%</Text>
          <Text style={styles.statLabel}>Avg Mastery</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <View style={styles.progressCard}>
          <ProgressBar 
            progress={stats.totalLessons > 0 ? (stats.completedLessons / stats.totalLessons) * 100 : 0} 
            height={12}
            showLabel={true}
          />
        </View>
      </View>

    {inProgressLessons.map((lesson) => {
      const lessonProgress = progress.find(p => p.lessonId === lesson.id);
      // Map the progress to the expected shape for LessonCard
      const mappedProgress = lessonProgress ? {
        studyCount: lessonProgress.studyCount,
        masteryLevel: lessonProgress.masteryLevel
      } : undefined;
      
      return (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onPress={() => router.push(`/lesson/${lesson.id}`)}
          onStudy={() => router.push(`/lesson/${lesson.id}`)}
          progress={mappedProgress}
        />
      );
    })}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Study Tips</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Pomodoro Technique</Text>
          <Text style={styles.tipText}>
            Study for 25 minutes, then take a 5-minute break. Repeat 4 times, then take a longer break.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>📝 Active Recall</Text>
          <Text style={styles.tipText}>
            Test yourself regularly instead of just re-reading notes. Use the quiz feature to reinforce learning.
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.xl,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
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
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.sm,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginTop: 4,
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
  progressCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
  },
  tipCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});