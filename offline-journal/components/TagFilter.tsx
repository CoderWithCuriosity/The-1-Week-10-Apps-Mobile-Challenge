import { Hash, Plus, X } from "lucide-react-native";
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
import { commonTags } from "../data/entries";
import { theme } from "../theme/theme";

interface TagFilterProps {
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagFilter({ selectedTags, onAddTag, onRemoveTag }: TagFilterProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddCustomTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim().toLowerCase())) {
      onAddTag(newTag.trim().toLowerCase());
      setNewTag("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagsContainer}
      >
        {selectedTags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Hash size={10} color={theme.colors.brand.primary} />
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => onRemoveTag(tag)}>
              <X size={12} color={theme.colors.neutrals.gray500} />
            </TouchableOpacity>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addTagButton} onPress={() => setModalVisible(true)}>
          <Plus size={14} color={theme.colors.neutrals.gray500} />
          <Text style={styles.addTagText}>Add tag</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Tag</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Tag name"
              value={newTag}
              onChangeText={setNewTag}
              placeholderTextColor={theme.colors.neutrals.gray400}
              autoFocus
            />
            
            <Text style={styles.suggestionsTitle}>Common tags</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestions}>
              {commonTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.suggestionTag}
                  onPress={() => {
                    onAddTag(tag);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.suggestionTagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.addButton, !newTag.trim() && styles.addButtonDisabled]} 
                onPress={handleAddCustomTag}
                disabled={!newTag.trim()}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.scales.md,
  },
  tagsContainer: {
    paddingHorizontal: theme.spacing.scales.md,
    gap: theme.spacing.scales.sm,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.neutrals.gray100,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 6,
    borderRadius: theme.borders.radius.full,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray700,
  },
  addTagButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.neutrals.white,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 6,
    borderRadius: theme.borders.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  addTagText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
    marginBottom: theme.spacing.scales.md,
  },
  suggestionsTitle: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.sm,
  },
  suggestions: {
    marginBottom: theme.spacing.scales.md,
  },
  suggestionTag: {
    backgroundColor: theme.colors.neutrals.gray100,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    marginRight: theme.spacing.scales.sm,
  },
  suggestionTagText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray700,
  },
  modalButtons: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.gray100,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  addButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.brand.primary,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
});