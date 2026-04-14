import { useLocalSearchParams, useRouter } from "expo-router";
import { BookOpen, CheckCircle, Clock, Edit2, Flag, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { difficulties, categories, QuizQuestion } from "../../data/lessons";
import { useLearning } from "../../hooks/useLearning";
import { theme } from "../../theme/theme";
import QuizEditor from "../../components/QuizEditor";

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { lessons, updateLesson, deleteLesson, markAsStudied, progress } = useLearning();
  const [showQuizEditor, setShowQuizEditor] = useState(false);
  
  const lesson = lessons.find(l => l.id === Number(id));
  const lessonProgress = progress.find(p => p.lessonId === Number(id));
  
  if (!lesson) {
    return (
      <View style={styles.centered}>
        <Text>Lesson not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const difficulty = difficulties.find(d => d.id === lesson.difficulty);
  const categoryColor = categories.find(c => c.id === lesson.category)?.color || theme.colors.brand.primary;
  
  const handleStudy = () => {
    markAsStudied(lesson.id, 10); // 10 minutes study session
    Alert.alert("Great job!", "You've completed a study session!");
  };
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Lesson",
      `Are you sure you want to delete "${lesson.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            await deleteLesson(lesson.id);
            router.back();
          }
        }
      ]
    );
  };
  
  const handleAddQuizQuestions = () => {
    setShowQuizEditor(true);
  };

  const handleSaveQuizQuestions = async (questions: QuizQuestion[]) => {
    const updatedLesson = {
      ...lesson,
      quizQuestions: questions,
    };
    await updateLesson(lesson.id, updatedLesson);
  };  
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={[styles.header, { borderLeftColor: categoryColor }]}>
          <View style={styles.headerTop}>
            <View style={styles.badges}>
              <View style={[styles.categoryBadge, { backgroundColor: categoryColor + "10" }]}>
                <Text style={[styles.categoryText, { color: categoryColor }]}>
                  {lesson.category}
                </Text>
              </View>
              <View style={[styles.difficultyBadge, { backgroundColor: difficulty?.color + "10" }]}>
                <Text style={[styles.difficultyText, { color: difficulty?.color }]}>
                  {difficulty?.label}
                </Text>
              </View>
              {lesson.isCompleted && (
                <View style={styles.completedBadge}>
                  <CheckCircle size={14} color={theme.colors.feedback.success} />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleAddQuizQuestions} style={styles.actionButton}>
                <Flag size={18} color={theme.colors.neutrals.gray500} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
                <Trash2 size={18} color={theme.colors.feedback.error} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.title}>{lesson.title}</Text>
          
          <View style={styles.stats}>
            <View style={styles.stat}>
              <BookOpen size={14} color={theme.colors.neutrals.gray500} />
              <Text style={styles.statText}>Studied {lesson.studyCount}x</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={14} color={theme.colors.neutrals.gray500} />
              <Text style={styles.statText}>Last studied: {formatDate(lesson.lastStudied)}</Text>
            </View>
          </View>
          
          {lessonProgress && (
            <View style={styles.masteryContainer}>
              <Text style={styles.masteryLabel}>Mastery Level</Text>
              <View style={styles.masteryBar}>
                <View style={[styles.masteryFill, { width: `${lessonProgress.masteryLevel}%` }]} />
              </View>
              <Text style={styles.masteryValue}>{lessonProgress.masteryLevel}%</Text>
            </View>
          )}
        </View>
        
        <View style={styles.contentCard}>
          <Text style={styles.contentTitle}>Lesson Content</Text>
          <Text style={styles.contentText}>{lesson.content}</Text>
        </View>
        
        {lesson.summary && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>📝 Summary</Text>
            <Text style={styles.summaryText}>{lesson.summary}</Text>
          </View>
        )}
        
        {lesson.tags.length > 0 && (
          <View style={styles.tagsCard}>
            <Text style={styles.tagsTitle}>🏷️ Tags</Text>
            <View style={styles.tagsContainer}>
              {lesson.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        
        <TouchableOpacity style={[styles.studyButton, {backgroundColor: theme.colors.feedback.success}]} onPress={handleAddQuizQuestions}>
          <Text style={styles.studyButtonText}>Add Quiz Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studyButton} onPress={handleStudy}>
          <Text style={styles.studyButtonText}>Mark as Studied</Text>
        </TouchableOpacity>
      </ScrollView>

      <QuizEditor
        visible={showQuizEditor}
        onClose={() => setShowQuizEditor(false)}
        onSave={handleSaveQuizQuestions}
        initialQuestions={lesson.quizQuestions || []}
        lessonTitle={lesson.title}
      />
    </>
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
    borderLeftWidth: 4,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.scales.md,
  },
  badges: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    flex: 1,
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
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "500",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.feedback.success + "10",
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  completedText: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.colors.feedback.success,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
  },
  actionButton: {
    padding: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  stats: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.md,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  masteryContainer: {
    marginTop: theme.spacing.scales.sm,
  },
  masteryLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginBottom: 4,
  },
  masteryBar: {
    height: 6,
    backgroundColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.full,
    overflow: "hidden",
  },
  masteryFill: {
    height: "100%",
    backgroundColor: theme.colors.brand.primary,
  },
  masteryValue: {
    fontSize: 11,
    color: theme.colors.brand.primary,
    marginTop: 4,
  },
  contentCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 24,
    color: theme.colors.neutrals.gray700,
  },
  summaryCard: {
    backgroundColor: theme.colors.brand.primary + "05",
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.brand.primary,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.neutrals.gray600,
  },
  tagsCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
  },
  tag: {
    backgroundColor: theme.colors.neutrals.gray100,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray600,
  },
  studyButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    marginTop: theme.spacing.scales.sm,
  },
  studyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});