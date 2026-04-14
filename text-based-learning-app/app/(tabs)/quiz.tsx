import { useRouter } from "expo-router";
import { ChevronRight, RefreshCw } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import QuizCard from "../../components/QuizCard";
import { useLearning } from "../../hooks/useLearning";
import { theme } from "../../theme/theme";

export default function QuizScreen() {
  const router = useRouter();
  const { lessons } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // Generate quiz questions from lessons that have quiz questions
  const getAvailableQuizzes = () => {
    let availableLessons = lessons;
    if (selectedCategory !== "all") {
      availableLessons = lessons.filter(l => l.category === selectedCategory);
    }
    
    const quizzes: { lessonId: number; lessonTitle: string; questions: any[] }[] = [];
    availableLessons.forEach(lesson => {
      if (lesson.quizQuestions && lesson.quizQuestions.length > 0) {
        quizzes.push({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          questions: lesson.quizQuestions,
        });
      }
    });
    return quizzes;
  };
  
  const allQuizzes = getAvailableQuizzes();
  const allQuestions = allQuizzes.flatMap(q => q.questions);
  const currentQuestion = allQuestions[currentIndex];
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setShowResults(false);
  };
  
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentIndex + 1 < allQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleReset = () => {
    setQuizStarted(false);
    setCurrentIndex(0);
    setScore(0);
    setShowResults(false);
  };
  
  if (lessons.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>📝</Text>
        <Text style={styles.emptyStateTitle}>No quizzes yet</Text>
        <Text style={styles.emptyStateText}>
          Create lessons with quiz questions to test your knowledge
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
  
  if (allQuestions.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>❓</Text>
        <Text style={styles.emptyStateTitle}>No quiz questions</Text>
        <Text style={styles.emptyStateText}>
          Add quiz questions to your lessons to test your knowledge
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => router.push("/lessons")}
        >
          <Text style={styles.emptyStateButtonText}>Edit a Lesson</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (!quizStarted) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Knowledge Quiz</Text>
          <Text style={styles.subtitle}>Test what you've learned</Text>
        </View>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <View style={styles.startCard}>
          <Text style={styles.startTitle}>Ready to test your knowledge?</Text>
          <Text style={styles.startText}>
            This quiz contains {allQuestions.length} question{allQuestions.length !== 1 ? "s" : ""}
          </Text>
          <View style={styles.quizPreview}>
            {allQuizzes.map((quiz, index) => (
              <View key={index} style={styles.quizPreviewItem}>
                <Text style={styles.quizPreviewIcon}>📚</Text>
                <View style={styles.quizPreviewInfo}>
                  <Text style={styles.quizPreviewTitle}>{quiz.lessonTitle}</Text>
                  <Text style={styles.quizPreviewCount}>{quiz.questions.length} questions</Text>
                </View>
                <ChevronRight size={16} color={theme.colors.neutrals.gray400} />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  
  if (showResults) {
    const percentage = Math.round((score / allQuestions.length) * 100);
    const isPassing = percentage >= 70;
    
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.resultsCard}>
          <Text style={styles.resultsEmoji}>{isPassing ? "🎉" : "📚"}</Text>
          <Text style={styles.resultsTitle}>
            {isPassing ? "Great job!" : "Keep learning!"}
          </Text>
          <Text style={styles.resultsScore}>
            {score} / {allQuestions.length}
          </Text>
          <View style={styles.resultsBar}>
            <View style={[styles.resultsFill, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.resultsPercentage}>{percentage}%</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <RefreshCw size={18} color={theme.colors.neutrals.white} />
            <Text style={styles.resetButtonText}>Take Another Quiz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.quizHeader}>
        <Text style={styles.quizProgress}>
          Question {currentIndex + 1} of {allQuestions.length}
        </Text>
        <Text style={styles.quizScore}>Score: {score}</Text>
      </View>
      
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentIndex + 1) / allQuestions.length) * 100}%` }]} />
      </View>
      
      <ScrollView contentContainerStyle={styles.quizContent}>
        <QuizCard
          question={currentQuestion}
          onAnswer={handleAnswer}
        />
      </ScrollView>
    </View>
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
  startCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    alignItems: "center",
    marginTop: theme.spacing.scales.lg,
  },
  startTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  startText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.lg,
  },
  quizPreview: {
    width: "100%",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.xl,
  },
  quizPreviewItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.md,
    padding: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
  },
  quizPreviewIcon: {
    fontSize: 24,
  },
  quizPreviewInfo: {
    flex: 1,
  },
  quizPreviewTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
  },
  quizPreviewCount: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  startButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.xl,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.scales.lg,
    paddingTop: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.sm,
  },
  quizProgress: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  quizScore: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.brand.primary,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.neutrals.gray200,
    marginHorizontal: theme.spacing.scales.lg,
    borderRadius: theme.borders.radius.full,
    overflow: "hidden",
    marginBottom: theme.spacing.scales.lg,
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.brand.primary,
  },
  quizContent: {
    padding: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  resultsCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  resultsEmoji: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  resultsScore: {
    fontSize: 36,
    fontWeight: "bold",
    color: theme.colors.brand.primary,
    marginBottom: theme.spacing.scales.md,
  },
  resultsBar: {
    width: "100%",
    height: 8,
    backgroundColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.full,
    overflow: "hidden",
    marginBottom: theme.spacing.scales.sm,
  },
  resultsFill: {
    height: "100%",
    backgroundColor: theme.colors.brand.primary,
  },
  resultsPercentage: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray700,
    marginBottom: theme.spacing.scales.xl,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.xl,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
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