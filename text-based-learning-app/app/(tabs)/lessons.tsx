import { useRouter } from "expo-router";
import { Filter, Plus, X } from "lucide-react-native";
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
import CategoryFilter from "../../components/CategoryFilter";
import LessonCard from "../../components/LessonCard";
import { categories, difficulties } from "../../data/lessons";
import { useLearning } from "../../hooks/useLearning";
import { theme } from "../../theme/theme";

export default function LessonsScreen() {
  const router = useRouter();
  const { lessons, addLesson, getLessonsByCategory, progress } = useLearning();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("programming");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  let filteredLessons = getLessonsByCategory(selectedCategory);
  
  if (selectedDifficulty !== "all") {
    filteredLessons = filteredLessons.filter(l => l.difficulty === selectedDifficulty);
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim().toLowerCase())) {
      setTags([...tags, tagInput.trim().toLowerCase()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleCreateLesson = () => {
    if (!title.trim() || !content.trim()) return;
    
    addLesson({
      title: title.trim(),
      content: content.trim(),
      summary: summary.trim() || undefined,
      category,
      difficulty,
      tags,
    });
    
    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSummary("");
    setCategory("programming");
    setDifficulty("beginner");
    setTags([]);
    setTagInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Lessons</Text>
        <Text style={styles.subtitle}>
          {filteredLessons.length} lesson{filteredLessons.length !== 1 ? "s" : ""}
        </Text>
      </View>
      
      <View style={styles.filterHeader}>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} color={theme.colors.neutrals.gray500} />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.difficultyFilter}>
          <TouchableOpacity
            style={[
              styles.difficultyChip,
              selectedDifficulty === "all" && styles.difficultyChipActive
            ]}
            onPress={() => setSelectedDifficulty("all")}
          >
            <Text style={[
              styles.difficultyChipText,
              selectedDifficulty === "all" && styles.difficultyChipTextActive
            ]}>All</Text>
          </TouchableOpacity>
          {difficulties.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={[
                styles.difficultyChip,
                selectedDifficulty === d.id && { backgroundColor: d.color, borderColor: d.color }
              ]}
              onPress={() => setSelectedDifficulty(d.id)}
            >
              <Text style={[
                styles.difficultyChipText,
                selectedDifficulty === d.id && styles.difficultyChipTextActive
              ]}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <ScrollView 
        style={styles.lessonsList}
        contentContainerStyle={styles.lessonsListContent}
      >
        {filteredLessons.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No lessons found</Text>
            <TouchableOpacity 
              style={styles.createEmptyButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.createEmptyButtonText}>Create your first lesson</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredLessons.map((lesson) => {
            const lessonProgress = progress.find(p => p.lessonId === lesson.id);
            return (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                onPress={() => router.push(`/lesson/${lesson.id}`)}
                onStudy={() => router.push(`/lesson/${lesson.id}`)}
                progress={lessonProgress}
              />
            );
          })
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color={theme.colors.neutrals.white} />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Lesson</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={theme.colors.neutrals.gray500} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.input}
                placeholder="Lesson title"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor={theme.colors.neutrals.gray400}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Lesson content"
                value={content}
                onChangeText={setContent}
                placeholderTextColor={theme.colors.neutrals.gray400}
                multiline
                numberOfLines={6}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Summary (optional)"
                value={summary}
                onChangeText={setSummary}
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
                    ]}>{d.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <Text style={styles.label}>Tags</Text>
              <View style={styles.tagInputContainer}>
                <TextInput
                  style={styles.tagInput}
                  placeholder="Add tag"
                  value={tagInput}
                  onChangeText={setTagInput}
                  placeholderTextColor={theme.colors.neutrals.gray400}
                  onSubmitEditing={handleAddTag}
                />
                <TouchableOpacity style={styles.addTagButton} onPress={handleAddTag}>
                  <Plus size={16} color={theme.colors.neutrals.white} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.tagsContainer}>
                {tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                    <TouchableOpacity onPress={() => handleRemoveTag(tag)}>
                      <X size={12} color={theme.colors.neutrals.gray500} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.createButton, (!title || !content) && styles.createButtonDisabled]} 
                  onPress={handleCreateLesson}
                  disabled={!title || !content}
                >
                  <Text style={styles.createButtonText}>Create Lesson</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  header: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingTop: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.md,
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
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.scales.md,
  },
  filterButton: {
    padding: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    marginBottom: 18,
  },
  difficultyFilter: {
    paddingHorizontal: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.md,
  },
  difficultyChip: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.white,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    marginRight: theme.spacing.scales.sm,
  },
  difficultyChipActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  difficultyChipText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray600,
  },
  difficultyChipTextActive: {
    color: theme.colors.neutrals.white,
  },
  lessonsList: {
    flex: 1,
  },
  lessonsListContent: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  emptyContainer: {
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.md,
  },
  createEmptyButton: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.md,
  },
  createEmptyButtonText: {
    fontSize: 14,
    color: theme.colors.neutrals.white,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.scales.lg,
    right: theme.spacing.scales.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
    marginBottom: theme.spacing.scales.md,
  },
  textArea: {
    minHeight: 100,
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
    fontSize: 14,
    color: theme.colors.neutrals.gray700,
  },
  difficultyOptionTextActive: {
    color: theme.colors.neutrals.white,
  },
  tagInputContainer: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
  },
  tagInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
  },
  addTagButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: theme.colors.neutrals.gray100,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray700,
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