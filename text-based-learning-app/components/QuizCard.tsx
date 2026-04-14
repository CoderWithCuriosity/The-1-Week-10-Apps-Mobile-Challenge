import { Check, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QuizQuestion } from "../data/lessons";
import { theme } from "../theme/theme";

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectOption = (index: number) => {
    if (showResult) return;
    
    setSelectedOption(index);
    const correct = index === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(correct);
      setSelectedOption(null);
      setShowResult(false);
    }, 1500);
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedOption === index ? styles.optionSelected : styles.option;
    }
    
    if (index === question.correctAnswer) {
      return [styles.option, styles.optionCorrect];
    }
    
    if (selectedOption === index && selectedOption !== question.correctAnswer) {
      return [styles.option, styles.optionIncorrect];
    }
    
    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    if (!showResult) {
      return selectedOption === index ? styles.optionTextSelected : styles.optionText;
    }
    
    if (index === question.correctAnswer) {
      return [styles.optionText, styles.optionTextCorrect];
    }
    
    if (selectedOption === index && selectedOption !== question.correctAnswer) {
      return [styles.optionText, styles.optionTextIncorrect];
    }
    
    return styles.optionText;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{question.question}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleSelectOption(index)}
            disabled={showResult}
          >
            <Text style={getOptionTextStyle(index)}>{option}</Text>
            {showResult && index === question.correctAnswer && (
              <Check size={18} color={theme.colors.feedback.success} />
            )}
            {showResult && selectedOption === index && selectedOption !== question.correctAnswer && (
              <X size={18} color={theme.colors.feedback.error} />
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      {showResult && question.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>
            {isCorrect ? "✓ " : "✗ "}{question.explanation}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.lg,
  },
  optionsContainer: {
    gap: theme.spacing.scales.sm,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  optionSelected: {
    backgroundColor: theme.colors.brand.primary + "10",
    borderColor: theme.colors.brand.primary,
  },
  optionCorrect: {
    backgroundColor: theme.colors.feedback.success + "10",
    borderColor: theme.colors.feedback.success,
  },
  optionIncorrect: {
    backgroundColor: theme.colors.feedback.error + "10",
    borderColor: theme.colors.feedback.error,
  },
  optionText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray700,
    flex: 1,
  },
  optionTextSelected: {
    color: theme.colors.brand.primary,
    fontWeight: "500",
  },
  optionTextCorrect: {
    color: theme.colors.feedback.success,
    fontWeight: "500",
  },
  optionTextIncorrect: {
    color: theme.colors.feedback.error,
    fontWeight: "500",
  },
  explanationContainer: {
    marginTop: theme.spacing.scales.md,
    padding: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
  },
  explanationText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray600,
    lineHeight: 18,
  },
});