import { X } from "lucide-react-native";
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
import { categories, difficulties } from "../data/challenges";
import { theme } from "../theme/theme";

interface CreateChallengeModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (challenge: {
    title: string;
    description: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    points: number;
    duration: number;
    tips?: string[];
  }) => void;
}

export default function CreateChallengeModal({ visible, onClose, onCreate }: CreateChallengeModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("fitness");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [duration, setDuration] = useState("10");
  const [tips, setTips] = useState<string[]>([]);
  const [tipInput, setTipInput] = useState("");

  const handleAddTip = () => {
    if (tipInput.trim()) {
      setTips([...tips, tipInput.trim()]);
      setTipInput("");
    }
  };

  const handleRemoveTip = (index: number) => {
    setTips(tips.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;
    
    const points = difficulties.find(d => d.id === difficulty)?.points || 10;
    
    onCreate({
      title: title.trim(),
      description: description.trim(),
      category,
      difficulty,
      points,
      duration: parseInt(duration) || 0,
      tips: tips.length > 0 ? tips : undefined,
    });
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("fitness");
    setDifficulty("easy");
    setDuration("10");
    setTips([]);
    setTipInput("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Challenge</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.colors.neutrals.gray500} />
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              placeholder="Challenge title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Challenge description"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={theme.colors.neutrals.gray400}
              multiline
              numberOfLines={3}
            />
            
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryPicker}>
              {categories.filter(c => c.id !== "all").map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryOption,
                    category === cat.id && { backgroundColor: cat.color, borderColor: cat.color }
                  ]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    category === cat.id && styles.categoryOptionTextActive
                  ]}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.difficultyContainer}>
              {difficulties.map((d) => (
                <TouchableOpacity
                  key={d.id}
                  style={[
                    styles.difficultyOption,
                    difficulty === d.id && { backgroundColor: d.color, borderColor: d.color }
                  ]}
                  onPress={() => setDifficulty(d.id as any)}
                >
                  <Text style={[
                    styles.difficultyOptionText,
                    difficulty === d.id && styles.difficultyOptionTextActive
                  ]}>{d.label} ({d.points} pts)</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="10"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <Text style={styles.label}>Tips (optional)</Text>
            <View style={styles.tipInputContainer}>
              <TextInput
                style={styles.tipInput}
                placeholder="Add a tip"
                value={tipInput}
                onChangeText={setTipInput}
                placeholderTextColor={theme.colors.neutrals.gray400}
                onSubmitEditing={handleAddTip}
              />
              <TouchableOpacity style={styles.addTipButton} onPress={handleAddTip}>
                <Text style={styles.addTipButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            
            {tips.length > 0 && (
              <View style={styles.tipsContainer}>
                {tips.map((tip, index) => (
                  <View key={index} style={styles.tip}>
                    <Text style={styles.tipText}>💡 {tip}</Text>
                    <TouchableOpacity onPress={() => handleRemoveTip(index)}>
                      <X size={14} color={theme.colors.neutrals.gray500} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.createButton, (!title || !description) && styles.createButtonDisabled]} 
                onPress={handleSubmit}
                disabled={!title || !description}
              >
                <Text style={styles.createButtonText}>Create Challenge</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.colors.neutrals.white,
    borderTopLeftRadius: theme.borders.radius.lg,
    borderTopRightRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.lg,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  closeButton: {
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
    marginBottom: theme.spacing.scales.md,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
    marginBottom: theme.spacing.scales.sm,
  },
  categoryPicker: {
    flexDirection: "row",
    marginBottom: theme.spacing.scales.md,
  },
  categoryOption: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    marginRight: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.gray100,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  categoryOptionText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray700,
  },
  categoryOptionTextActive: {
    color: theme.colors.neutrals.white,
  },
  difficultyContainer: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
  },
  difficultyOption: {
    flex: 1,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.neutrals.gray100,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    alignItems: "center",
  },
  difficultyOptionText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray700,
  },
  difficultyOptionTextActive: {
    color: theme.colors.neutrals.white,
  },
  tipInputContainer: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
  },
  tipInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 14,
  },
  addTipButton: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.md,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.md,
    justifyContent: "center",
  },
  addTipButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
  tipsContainer: {
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
  },
  tip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.neutrals.gray50,
    padding: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.sm,
  },
  tipText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray700,
    flex: 1,
  },
  modalButtons: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.lg,
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
  createButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.brand.primary,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
});