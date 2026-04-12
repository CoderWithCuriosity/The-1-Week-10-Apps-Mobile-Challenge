import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { findLessonById } from "../../data/questions";
import { useProgress } from "../../hooks/useProgress";

export default function LessonScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const lessonId = parseInt(Array.isArray(id) ? id[0] : id);

  const result = findLessonById(lessonId);
  const { lesson, level } = result || {};
  
  const { markLessonCompleted, isLessonCompleted, getLessonScore } = useProgress();
  
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (lessonId) {
      setCompleted(isLessonCompleted(lessonId));
      setScore(getLessonScore(lessonId));
    }
  }, [lessonId, isLessonCompleted, getLessonScore]);

  const handleCompleteLesson = async () => {
    if (lessonId) {
      await markLessonCompleted(lessonId);
      setCompleted(true);
    }
  };

  const handleStartQuiz = () => {
    if (lesson) {
      router.push(`/quiz/${lesson.id}`);
    }
  };

  if (!lesson || !level) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Lesson not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Simple markdown parser for content (keep your existing renderContent function)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <Text key={index} style={styles.contentH1}>
            {line.substring(2)}
          </Text>
        );
      } else if (line.startsWith("## ")) {
        return (
          <Text key={index} style={styles.contentH2}>
            {line.substring(3)}
          </Text>
        );
      } else if (line.startsWith("### ")) {
        return (
          <Text key={index} style={styles.contentH3}>
            {line.substring(4)}
          </Text>
        );
      } else if (line.startsWith("- **")) {
        const text = line.substring(4, line.length - 2);
        return (
          <Text key={index} style={styles.contentBullet}>
            • <Text style={styles.contentBold}>{text}</Text>
          </Text>
        );
      } else if (line.includes("```javascript")) {
        const codeStart = content.indexOf("```javascript");
        const codeEnd = content.indexOf("```", codeStart + 13);
        if (codeStart !== -1 && codeEnd !== -1) {
          const code = content.substring(codeStart + 13, codeEnd);
          return (
            <View key={index} style={styles.codeBlock}>
              <Text style={styles.codeText}>{code.trim()}</Text>
            </View>
          );
        }
      } else if (line.trim() === "") {
        return <View key={index} style={styles.emptyLine} />;
      } else if (line.includes("**")) {
        const parts = line.split("**");
        return (
          <Text key={index} style={styles.contentText}>
            {parts.map((part, i) =>
              i % 2 === 0 ? part : <Text key={i} style={styles.contentBold}>{part}</Text>
            )}
          </Text>
        );
      } else {
        return (
          <Text key={index} style={styles.contentText}>
            {line}
          </Text>
        );
      }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Lesson Header */}
      <View style={[styles.headerCard, { backgroundColor: level.color + "20" }]}>
        <Text style={[styles.lessonTitle, { color: level.color }]}>{lesson.title}</Text>
        <Text style={styles.lessonSubtitle}>
          Level {level.id} • {lesson.questions.length} questions
          {score > 0 && ` • Your Score: ${Math.round(score)}%`}
        </Text>
      </View>

      {/* Lesson Content */}
      <View style={styles.contentCard}>
        {renderContent(lesson.content)}
      </View>

      {/* Key Points */}
      <View style={styles.keyPointsCard}>
        <Text style={styles.keyPointsTitle}>📝 Key Takeaways:</Text>
        <Text style={styles.keyPointsText}>
          • Complete this lesson to unlock the quiz{"\n"}
          • Score 70% or higher to pass{"\n"}
          • Review the material before starting quiz{"\n"}
          • You can retake quizzes multiple times
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        {!completed ? (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: level.color }]}
            onPress={handleCompleteLesson}
          >
            <Text style={styles.actionButtonText}>Mark as Completed</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.completedBadge, { backgroundColor: level.color }]}>
            <Text style={styles.completedBadgeText}>✓ Lesson Completed</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: "#166088", marginTop: 16 },
          ]}
          onPress={handleStartQuiz}
        >
          <Text style={styles.actionButtonText}>
            Start Quiz ({lesson.questions.length} questions)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backButton, { marginTop: 12 }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Back to Levels</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Keep your existing styles unchanged
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
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4A6FA5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#4A6FA5",
    fontSize: 16,
    fontWeight: "600",
  },
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lessonSubtitle: {
    fontSize: 16,
    color: "#333333",
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentH1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 16,
    marginTop: 8,
  },
  contentH2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
    marginTop: 16,
  },
  contentH3: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
    marginTop: 12,
  },
  contentText: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 8,
  },
  contentBold: {
    fontWeight: "bold",
  },
  contentBullet: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 16,
  },
  codeBlock: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4A6FA5",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#333333",
  },
  emptyLine: {
    height: 16,
  },
  keyPointsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9A00",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  keyPointsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  keyPointsText: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
  },
  actionsContainer: {
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  completedBadge: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  completedBadgeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});