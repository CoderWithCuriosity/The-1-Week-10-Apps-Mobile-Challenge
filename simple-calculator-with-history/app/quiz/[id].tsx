import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { findLessonById } from "../../data/questions";
import { useProgress } from "../../hooks/useProgress";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const lessonId = parseInt(Array.isArray(id) ? id[0] : id);

  const result = findLessonById(lessonId);
  const { lesson, level } = result || {};
  
  const { saveQuizScore, markLessonCompleted, getLessonScore } = useProgress();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [previousScore, setPreviousScore] = useState(0);

  useEffect(() => {
    if (lessonId) {
      setPreviousScore(getLessonScore(lessonId));
    }
  }, [lessonId, getLessonScore]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, showResults]);

  if (!lesson || !level) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>Quiz not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const questions = lesson.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswer !== null || showResults) return;

    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, optionIndex]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    const percentage = (score / questions.length) * 100;
    const roundedPercentage = Math.round(percentage);
    
    // Save the score
    if (lessonId) {
      await saveQuizScore(lessonId, roundedPercentage);
      
      // Mark lesson as completed if score is 70% or higher
      if (roundedPercentage >= 70) {
        await markLessonCompleted(lessonId);
      }
    }
    
    setShowResults(true);
    
    Alert.alert(
      "Quiz Complete!",
      `Your score: ${score}/${questions.length} (${roundedPercentage}%)\n\n${
        previousScore > 0 ? `Previous best: ${previousScore}%\n\n` : ""
      }${
        roundedPercentage >= 70
          ? "Congratulations! You passed! 🎉"
          : "Keep practicing! You can retake the quiz."
      }`,
      [
        {
          text: "Retake Quiz",
          onPress: () => {
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setScore(0);
            setAnswers([]);
            setShowResults(false);
            setTimeLeft(1800);
          },
          style: "cancel",
        },
        {
          text: "Back to Lesson",
          onPress: () => router.back(),
        },
      ]
    );
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, styles.centeredContent]}
      >
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Quiz Results</Text>

          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>
              {score}/{questions.length}
            </Text>
          </View>

          <Text style={styles.percentageText}>{Math.round(percentage)}% Score</Text>
          
          {previousScore > 0 && (
            <Text style={styles.previousScoreText}>
              Previous best: {previousScore}%
            </Text>
          )}

          <Text style={styles.resultMessage}>
            {score === questions.length
              ? "Perfect score! Amazing work! 🎯"
              : percentage >= 70
              ? "Great job! You passed the quiz! ✅"
              : "Good effort! Review the lesson and try again. 📚"}
          </Text>

          <View style={styles.resultsList}>
            {questions.map((question, index) => (
              <View
                key={question.id}
                style={[
                  styles.resultItem,
                  {
                    backgroundColor:
                      answers[index] === question.correctAnswer
                        ? "#E8F5E9"
                        : "#FFEBEE",
                  },
                ]}
              >
                <Text style={styles.resultQuestion}>
                  Q{index + 1}: {question.question}
                </Text>
                <Text
                  style={[
                    styles.resultStatus,
                    {
                      color:
                        answers[index] === question.correctAnswer
                          ? "#17B978"
                          : "#FF6B6B",
                    },
                  ]}
                >
                  {answers[index] === question.correctAnswer
                    ? "✓ Correct"
                    : `✗ Your answer: ${question.options[answers[index]]}`}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.retakeButton} onPress={() => {
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setScore(0);
          setAnswers([]);
          setShowResults(false);
          setTimeLeft(1800);
        }}>
          <Text style={styles.retakeButtonText}>Retake Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backToLessonButton} onPress={() => router.back()}>
          <Text style={styles.backToLessonButtonText}>Back to Lesson</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Quiz Header */}
      <View style={styles.quizHeader}>
        <View>
          <Text style={styles.questionCount}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={styles.quizStats}>
            Score: {score} • Time: {formatTime(timeLeft)}
            {previousScore > 0 && ` • Best: ${previousScore}%`}
          </Text>
        </View>

        <View style={[styles.levelBadge, { backgroundColor: level.color }]}>
          <Text style={styles.levelBadgeText}>Level {level.id}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                backgroundColor: level.color,
              },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            let optionStyle = styles.optionButton;
            let textStyle = styles.optionText;

            if (selectedAnswer !== null) {
              if (index === currentQuestion.correctAnswer) {
                optionStyle = { ...optionStyle, ...styles.correctOption };
                textStyle = { ...textStyle, color: "#17B978" };
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                optionStyle = { ...optionStyle, ...styles.incorrectOption };
                textStyle = { ...textStyle, color: "#FF6B6B" };
              }
            } else if (selectedAnswer === index) {
              optionStyle = { ...optionStyle, ...styles.selectedOption };
            }

            return (
              <TouchableOpacity
                key={index}
                style={[optionStyle, { marginBottom: 8 }]}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                activeOpacity={0.7}
              >
                <Text style={textStyle}>
                  {String.fromCharCode(65 + index)}. {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Explanation */}
      {selectedAnswer !== null && (
        <View style={[styles.explanationCard, { borderLeftColor: level.color }]}>
          <Text style={styles.explanationTitle}>
            {selectedAnswer === currentQuestion.correctAnswer ? "✅ Correct!" : "❌ Incorrect"}
          </Text>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {selectedAnswer !== null ? (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: level.color }]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.selectAnswerText}>Select an answer to continue</Text>
        )}

        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            Alert.alert(
              "Exit Quiz",
              "Are you sure you want to exit? Your progress will be lost.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Exit", onPress: () => router.back() },
              ]
            );
          }}
        >
          <Text style={styles.exitButtonText}>Exit Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Add new style for previous score
const styles = StyleSheet.create({
  // Keep all your existing styles, just add this one:
  previousScoreText: {
    fontSize: 16,
    color: "#4A6FA5",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  
  // Rest of your styles remain the same
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
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
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
  quizHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  questionCount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  quizStats: {
    fontSize: 14,
    color: "#666666",
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 24,
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
  questionCard: {
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
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
  },
  correctOption: {
    backgroundColor: "#E8F5E9",
    borderColor: "#17B978",
  },
  incorrectOption: {
    backgroundColor: "#FFEBEE",
    borderColor: "#FF6B6B",
  },
  selectedOption: {
    borderColor: "#4A6FA5",
    backgroundColor: "rgba(74, 111, 165, 0.1)",
  },
  explanationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
  },
  navigationContainer: {
    marginBottom: 32,
  },
  nextButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  selectAnswerText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 12,
  },
  exitButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  exitButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A6FA5",
  },
  percentageText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
    marginBottom: 8,
  },
  resultMessage: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  resultsList: {
    gap: 12,
  },
  resultItem: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  resultQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  resultStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  retakeButton: {
    backgroundColor: "#4A6FA5",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  retakeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backToLessonButton: {
    backgroundColor: "#166088",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    width: "100%",
  },
  backToLessonButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});