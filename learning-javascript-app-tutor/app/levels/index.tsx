import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { levelsData } from "../../data/questions";
import { useProgress } from "../../hooks/useProgress";

export default function LevelsScreen() {
  const router = useRouter();
  const { progress } = useProgress();


  const calculateLevelProgress = (level: any) => {
    const totalLessons = level.lessons?.length || 0;
    if (totalLessons === 0) return 0;
    
    const completedLessons = level.lessons.filter((lesson: any) => 
      progress.completedLessons.includes(lesson.id)
    ).length;
    
    return (completedLessons / totalLessons) * 100;
  };

  const getTotalQuestions = (level: any) => {
    if (!level.lessons) return 0;
    return level.lessons.reduce((sum: number, lesson: any) => 
      sum + (lesson.questions?.length || 0), 0
    );
  };

  const getLevelCompleted = (level: any) => {
    const totalLessons = level.lessons?.length || 0;
    if (totalLessons === 0) return false;
    
    const completedLessons = level.lessons.filter((lesson: any) => 
      progress.completedLessons.includes(lesson.id)
    ).length;
    
    return completedLessons === totalLessons;
  };

  // If levelsData is empty or undefined
  if (!levelsData || levelsData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>No Levels Available</Text>
        <Text style={styles.subtitle}>Check your data file</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>JavaScript Learning Path</Text>
      <Text style={styles.subtitle}>
        Complete {levelsData.length} levels to master JavaScript programming. Each level contains interactive lessons and quizzes.
      </Text>

      {levelsData.map((level) => {
        // Make sure level has required properties
        if (!level || typeof level !== 'object') {
          return null; // Skip invalid levels
        }

        const progressPercentage = calculateLevelProgress(level);
        const totalQuestions = getTotalQuestions(level);
        const isLevelCompleted = getLevelCompleted(level);

        return (
          <TouchableOpacity
            key={level.id || Math.random()}
            style={[styles.levelCard, { borderLeftColor: level.color || "#4A6FA5" }]}
            onPress={() => router.push(`/levels/${level.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.levelHeader}>
              <View style={[styles.levelIcon, { backgroundColor: level.color || "#4A6FA5" }]}>
                <Text style={styles.levelIconText}>{level.icon || "📚"}</Text>
              </View>
              <View style={styles.levelInfo}>
                <Text style={[styles.levelTitle, { color: level.color || "#4A6FA5" }]}>
                  Level {level.id || "?"}: {level.title || "Untitled Level"}
                </Text>
                <Text style={styles.levelDescription}>
                  {level.description || "No description available"}
                </Text>
              </View>
            </View>

            <View style={styles.levelFooter}>
              <View style={styles.levelStats}>
                <Text style={styles.levelStatsText}>
                  {(level.lessons || []).length} lessons • {totalQuestions} questions
                </Text>
                {isLevelCompleted && (
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedText}>COMPLETED</Text>
                  </View>
                )}
              </View>

              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { 
                        width: `${progressPercentage}%`, 
                        backgroundColor: level.color || "#4A6FA5" 
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{Math.round(progressPercentage)}% complete</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Add a simple test card to verify data */}
      <View style={styles.testCard}>
        <Text style={styles.testTitle}>Data Loaded Successfully</Text>
        <Text style={styles.testText}>
          Total Levels: {levelsData.length}
        </Text>
        <Text style={styles.testText}>
          First Level: {levelsData[0]?.title}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 24,
  },
  levelCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  levelIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  levelIconText: {
    fontSize: 28,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  levelFooter: {
    marginTop: 8,
  },
  levelStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelStatsText: {
    fontSize: 14,
    color: "#666666",
  },
  completedBadge: {
    backgroundColor: "#17B978",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  testCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#17B978",
  },
  testTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  testText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
});