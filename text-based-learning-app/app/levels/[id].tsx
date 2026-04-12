import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { levelsData } from "../../data/questions";

export default function LevelDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const levelId = parseInt(Array.isArray(id) ? id[0] : id);

  const level = levelsData.find((l) => l.id === levelId);
  const [lessons, setLessons] = useState(level?.lessons || []);

  if (!level) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Level not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Level Header */}
      <View style={[styles.levelHeaderCard, { backgroundColor: level.color + "20" }]}>
        <View style={styles.levelHeader}>
          <View style={[styles.levelBigIcon, { backgroundColor: level.color }]}>
            <Text style={styles.levelBigIconText}>{level.icon}</Text>
          </View>
          <View style={styles.levelHeaderInfo}>
            <Text style={[styles.levelBigTitle, { color: level.color }]}>
              Level {level.id}: {level.title}
            </Text>
            <Text style={styles.levelHeaderDescription}>{level.description}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.startButton, { backgroundColor: level.color }]}
          onPress={() => {
            if (lessons.length > 0) {
              router.push(`/lesson/${lessons[0].id}`);
            }
          }}
        >
          <Text style={styles.startButtonText}>
            {lessons.length > 0 ? "Start First Lesson" : "Coming Soon"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lessons List */}
      <Text style={styles.sectionTitle}>Lessons in this Level</Text>

      {lessons.length > 0 ? (
        lessons.map((lesson, index) => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => router.push(`/lesson/${lesson.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.lessonHeader}>
              <View style={[styles.lessonNumber, { backgroundColor: level.color }]}>
                <Text style={styles.lessonNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonQuestions}>
                  {lesson.questions.length} questions
                </Text>
              </View>
              {lesson.completed && (
                <View style={styles.completedIcon}>
                  <Text style={styles.completedIconText}>✓</Text>
                </View>
              )}
            </View>
            {lesson.score !== undefined && (
              <Text style={styles.lessonScore}>Score: {lesson.score}%</Text>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Lessons for this level are coming soon!</Text>
        </View>
      )}

      {/* Level Stats */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Level Statistics</Text>
        <View style={styles.statsList}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Lessons</Text>
            <Text style={styles.statValue}>{lessons.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Completed Lessons</Text>
            <Text style={styles.statValue}>
              {lessons.filter((l) => l.completed).length}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Questions</Text>
            <Text style={styles.statValue}>
              {lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0)}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average Score</Text>
            <Text style={styles.statValue}>
              {lessons.filter((l) => l.score).length > 0
                ? Math.round(
                    lessons
                      .filter((l) => l.score)
                      .reduce((sum, lesson) => sum + (lesson.score || 0), 0) /
                      lessons.filter((l) => l.score).length
                  ) + "%"
                : "N/A"}
            </Text>
          </View>
        </View>
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
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#4A6FA5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  levelHeaderCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  levelBigIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  levelBigIconText: {
    fontSize: 36,
  },
  levelHeaderInfo: {
    flex: 1,
  },
  levelBigTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  levelHeaderDescription: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
  },
  startButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonNumberText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  lessonQuestions: {
    fontSize: 14,
    color: "#666666",
  },
  completedIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#17B978",
    justifyContent: "center",
    alignItems: "center",
  },
  completedIconText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  lessonScore: {
    fontSize: 14,
    color: "#4A6FA5",
    fontWeight: "600",
    marginTop: 4,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  statsList: {
    gap: 12,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 16,
    color: "#666666",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
});