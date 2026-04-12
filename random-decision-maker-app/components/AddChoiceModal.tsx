import { Sliders, X } from "lucide-react-native";
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
import { categories } from "../data/choices";
import { theme } from "../theme/theme";

interface AddChoiceModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (choice: {
    name: string;
    description?: string;
    category: string;
    emoji: string;
    weight: number;
  }) => void;
  editingChoice?: {
    id: number;
    name: string;
    description?: string;
    category: string;
    emoji: string;
    weight: number;
  } | null;
  onUpdate?: (id: number, updates: any) => void;
}

const emojis = [
  "🍕", "🍔", "🥗", "🍜", "🏃", "🧘", "📚", "🎬", "🎮", "✈️", 
  "🏖️", "🏔️", "💼", "❤️", "🎨", "🎵", "📝", "🧠", "💪", "🎯"
];

export default function AddChoiceModal({ visible, onClose, onAdd, editingChoice, onUpdate }: AddChoiceModalProps) {
  const [name, setName] = useState(editingChoice?.name || "");
  const [description, setDescription] = useState(editingChoice?.description || "");
  const [category, setCategory] = useState(editingChoice?.category || "custom");
  const [emoji, setEmoji] = useState(editingChoice?.emoji || "🎲");
  const [weight, setWeight] = useState(editingChoice?.weight || 1);

  const handleSubmit = () => {
    if (!name.trim()) return;
    
    if (editingChoice && onUpdate) {
      onUpdate(editingChoice.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        category,
        emoji,
        weight,
      });
    } else {
      onAdd({
        name: name.trim(),
        description: description.trim() || undefined,
        category,
        emoji,
        weight,
      });
    }
    
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("custom");
    setEmoji("🎲");
    setWeight(1);
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
            <Text style={styles.modalTitle}>
              {editingChoice ? "Edit Choice" : "Add New Choice"}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.colors.neutrals.gray500} />
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <TextInput
              style={styles.input}
              placeholder="Choice name (e.g., 'Pizza', 'Movie Night')"
              value={name}
              onChangeText={setName}
              placeholderTextColor={theme.colors.neutrals.gray400}
              autoFocus
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description (optional)"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor={theme.colors.neutrals.gray400}
              multiline
              numberOfLines={2}
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
                  ]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.label}>Icon</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiPicker}>
              {emojis.map((e) => (
                <TouchableOpacity
                  key={e}
                  style={[
                    styles.emojiOption,
                    emoji === e && styles.emojiOptionSelected
                  ]}
                  onPress={() => setEmoji(e)}
                >
                  <Text style={styles.emojiText}>{e}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.label}>
              Probability Weight: {weight}x
              <Text style={styles.weightSubtext}> (Higher = more likely)</Text>
            </Text>
            <View style={styles.weightContainer}>
              <TouchableOpacity 
                style={styles.weightButton} 
                onPress={() => setWeight(Math.max(0.5, weight - 0.5))}
              >
                <Text style={styles.weightButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.weightValueContainer}>
                <Sliders size={16} color={theme.colors.brand.primary} />
                <Text style={styles.weightValue}>{weight}x</Text>
              </View>
              <TouchableOpacity 
                style={styles.weightButton} 
                onPress={() => setWeight(Math.min(5, weight + 0.5))}
              >
                <Text style={styles.weightButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.createButton, !name.trim() && styles.createButtonDisabled]} 
                onPress={handleSubmit}
                disabled={!name.trim()}
              >
                <Text style={styles.createButtonText}>
                  {editingChoice ? "Save Changes" : "Add Choice"}
                </Text>
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
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.white,
  },
  textArea: {
    minHeight: 70,
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
  emojiPicker: {
    flexDirection: "row",
    marginBottom: theme.spacing.scales.md,
  },
  emojiOption: {
    width: 50,
    height: 50,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.scales.sm,
  },
  emojiOptionSelected: {
    backgroundColor: theme.colors.brand.primary,
    borderWidth: 2,
    borderColor: theme.colors.brand.primary,
  },
  emojiText: {
    fontSize: 28,
  },
  weightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
  },
  weightButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  weightButtonText: {
    fontSize: 28,
    fontWeight: "600",
    color: theme.colors.neutrals.gray700,
  },
  weightValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    paddingHorizontal: theme.spacing.scales.xl,
    paddingVertical: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
  },
  weightValue: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.brand.primary,
  },
  weightSubtext: {
    fontSize: 12,
    fontWeight: "normal",
    color: theme.colors.neutrals.gray500,
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