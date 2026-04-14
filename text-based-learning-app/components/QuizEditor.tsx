import { Plus, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { QuizQuestion } from "../data/lessons";
import { theme } from "../theme/theme";

interface QuizEditorProps {
  visible: boolean;
  onClose: () => void;
  onSave: (questions: QuizQuestion[]) => void;
  initialQuestions?: QuizQuestion[];
  lessonTitle: string;
}

export default function QuizEditor({
  visible,
  onClose,
  onSave,
  initialQuestions = [],
  lessonTitle,
}: QuizEditorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [editingQuestion, setEditingQuestion] = useState<Partial<QuizQuestion> | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddQuestion = () => {
    setEditingQuestion({
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    });
    setEditingIndex(null);
  };

  const handleEditQuestion = (index: number) => {
    setEditingQuestion({ ...questions[index] });
    setEditingIndex(index);
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion?.question || !editingQuestion.options?.every(opt => opt.trim())) {
      return;
    }

    const newQuestion: QuizQuestion = {
      id: editingQuestion.id || Date.now(),
      question: editingQuestion.question,
      options: editingQuestion.options as string[],
      correctAnswer: editingQuestion.correctAnswer || 0,
      explanation: editingQuestion.explanation || "",
    };

    if (editingIndex !== null) {
      const updated = [...questions];
      updated[editingIndex] = newQuestion;
      setQuestions(updated);
    } else {
      setQuestions([...questions, newQuestion]);
    }

    setEditingQuestion(null);
    setEditingIndex(null);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleUpdateOption = (index: number, value: string) => {
    if (editingQuestion) {
      const newOptions = [...(editingQuestion.options as string[])];
      newOptions[index] = value;
      setEditingQuestion({ ...editingQuestion, options: newOptions });
    }
  };

  const handleSaveAll = () => {
    onSave(questions);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Quiz Questions</Text>
          <Text style={styles.subtitle}>{lessonTitle}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={theme.colors.neutrals.gray500} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {questions.length === 0 && !editingQuestion && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📝</Text>
              <Text style={styles.emptyStateTitle}>No quiz questions yet</Text>
              <Text style={styles.emptyStateText}>
                Add questions to test knowledge of this lesson
              </Text>
            </View>
          )}

          {!editingQuestion && questions.map((q, index) => (
            <View key={q.id || index} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>Question {index + 1}</Text>
                <View style={styles.questionActions}>
                  <TouchableOpacity onPress={() => handleEditQuestion(index)}>
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteQuestion(index)}>
                    <Trash2 size={16} color={theme.colors.feedback.error} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.questionText}>{q.question}</Text>
              <View style={styles.optionsPreview}>
                {q.options.map((opt, optIndex) => (
                  <View key={optIndex} style={styles.optionPreview}>
                    <Text style={[
                      styles.optionPreviewText,
                      optIndex === q.correctAnswer && styles.correctOptionPreview
                    ]}>
                      {String.fromCharCode(65 + optIndex)}. {opt}
                    </Text>
                    {optIndex === q.correctAnswer && (
                      <Text style={styles.correctBadge}>✓ Correct</Text>
                    )}
                  </View>
                ))}
              </View>
              {q.explanation && (
                <Text style={styles.explanationPreview}>💡 {q.explanation}</Text>
              )}
            </View>
          ))}

          {editingQuestion && (
            <View style={styles.editorCard}>
              <Text style={styles.editorTitle}>
                {editingIndex !== null ? "Edit Question" : "Add Question"}
              </Text>
              
              <Text style={styles.inputLabel}>Question</Text>
              <TextInput
                style={styles.questionInput}
                placeholder="Enter your question"
                value={editingQuestion.question}
                onChangeText={(text) => setEditingQuestion({ ...editingQuestion, question: text })}
                multiline
                placeholderTextColor={theme.colors.neutrals.gray400}
              />
              
              <Text style={styles.inputLabel}>Options</Text>
              {[0, 1, 2, 3].map((idx) => (
                <View key={idx} style={styles.optionRow}>
                  <Text style={styles.optionLetter}>{String.fromCharCode(65 + idx)}.</Text>
                  <TextInput
                    style={styles.optionInput}
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    value={editingQuestion.options?.[idx] || ""}
                    onChangeText={(value) => handleUpdateOption(idx, value)}
                    placeholderTextColor={theme.colors.neutrals.gray400}
                  />
                  <TouchableOpacity
                    style={[
                      styles.correctButton,
                      editingQuestion.correctAnswer === idx && styles.correctButtonActive
                    ]}
                    onPress={() => setEditingQuestion({ ...editingQuestion, correctAnswer: idx })}
                  >
                    <Text style={[
                      styles.correctButtonText,
                      editingQuestion.correctAnswer === idx && styles.correctButtonTextActive
                    ]}>
                      Correct
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
              
              <Text style={styles.inputLabel}>Explanation (optional)</Text>
              <TextInput
                style={styles.explanationInput}
                placeholder="Explain why this answer is correct"
                value={editingQuestion.explanation}
                onChangeText={(text) => setEditingQuestion({ ...editingQuestion, explanation: text })}
                multiline
                placeholderTextColor={theme.colors.neutrals.gray400}
              />
              
              <View style={styles.editorButtons}>
                <TouchableOpacity
                  style={styles.cancelEditorButton}
                  onPress={() => setEditingQuestion(null)}
                >
                  <Text style={styles.cancelEditorText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveEditorButton}
                  onPress={handleSaveQuestion}
                >
                  <Text style={styles.saveEditorText}>Save Question</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!editingQuestion && (
            <TouchableOpacity style={styles.addButton} onPress={handleAddQuestion}>
              <Plus size={20} color={theme.colors.neutrals.white} />
              <Text style={styles.addButtonText}>Add Question</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, questions.length === 0 && styles.saveButtonDisabled]}
            onPress={handleSaveAll}
            disabled={questions.length === 0}
          >
            <Text style={styles.saveButtonText}>Save {questions.length} Question{questions.length !== 1 ? "s" : ""}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  header: {
    backgroundColor: theme.colors.neutrals.white,
    padding: theme.spacing.scales.lg,
    paddingTop: theme.spacing.scales.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutrals.gray200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginTop: 4,
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing.scales.xl,
    right: theme.spacing.scales.lg,
    padding: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  emptyState: {
    alignItems: "center",
    padding: theme.spacing.scales.xl,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.scales.md,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  emptyStateText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
  },
  questionCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.md,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.sm,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.brand.primary,
  },
  questionActions: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    alignItems: "center",
  },
  editButton: {
    fontSize: 12,
    color: theme.colors.brand.primary,
    fontWeight: "500",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  optionsPreview: {
    gap: 4,
    marginBottom: theme.spacing.scales.sm,
  },
  optionPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  optionPreviewText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray700,
    flex: 1,
  },
  correctOptionPreview: {
    color: theme.colors.feedback.success,
    fontWeight: "500",
  },
  correctBadge: {
    fontSize: 11,
    color: theme.colors.feedback.success,
    fontWeight: "500",
  },
  explanationPreview: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    fontStyle: "italic",
    marginTop: theme.spacing.scales.xs,
    paddingTop: theme.spacing.scales.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutrals.gray100,
  },
  editorCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  editorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
    marginBottom: theme.spacing.scales.xs,
    marginTop: theme.spacing.scales.md,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.sm,
  },
  optionLetter: {
    width: 30,
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  optionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.sm,
    fontSize: 14,
  },
  correctButton: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 6,
    borderRadius: theme.borders.radius.sm,
    backgroundColor: theme.colors.neutrals.gray100,
  },
  correctButtonActive: {
    backgroundColor: theme.colors.feedback.success,
  },
  correctButtonText: {
    fontSize: 11,
    color: theme.colors.neutrals.gray600,
  },
  correctButtonTextActive: {
    color: theme.colors.neutrals.white,
  },
  explanationInput: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
  editorButtons: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.xl,
  },
  cancelEditorButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.gray100,
  },
  cancelEditorText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  saveEditorButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.brand.primary,
  },
  saveEditorText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    marginTop: theme.spacing.scales.md,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
  footer: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    padding: theme.spacing.scales.lg,
    backgroundColor: theme.colors.neutrals.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutrals.gray200,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.gray100,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  saveButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.brand.primary,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
});