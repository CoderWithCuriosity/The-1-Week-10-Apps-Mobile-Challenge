import { useRouter } from "expo-router";
import { Save, Sparkles, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MoodSelector from "../../components/MoodSelector";
import TagFilter from "../../components/TagFilter";
import { useJournal } from "../../hooks/useJournal";
import { theme } from "../../theme/theme";

export default function JournalScreen() {
  const router = useRouter();
  const { addEntry, getRecentEntries, getStats } = useJournal();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("great");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const recentEntries = getRecentEntries(5);
  const stats = getStats();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    
    await addEntry({
      title: title.trim(),
      content: content.trim(),
      mood: selectedMood as any,
      tags: selectedTags,
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setSelectedMood("great");
    setSelectedTags([]);
    
    // Show success feedback (could add a toast)
    router.push("/(tabs)/entries");
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Write</Text>
        <Text style={styles.subtitle}>Capture your thoughts and feelings</Text>
      </View>
      
      <View style={styles.formCard}>
        <TextInput
          style={styles.titleInput}
          placeholder="Entry title..."
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={theme.colors.neutrals.gray400}
        />
        
        <Text style={styles.label}>How are you feeling?</Text>
        <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
        
        <Text style={styles.label}>Tags (optional)</Text>
        <TagFilter
          selectedTags={selectedTags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        
        <TextInput
          style={styles.contentInput}
          placeholder="Write your entry here..."
          value={content}
          onChangeText={setContent}
          placeholderTextColor={theme.colors.neutrals.gray400}
          multiline
          textAlignVertical="top"
        />
        
        <TouchableOpacity 
          style={[styles.saveButton, (!title.trim() || !content.trim()) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!title.trim() || !content.trim()}
        >
          <Save size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </View>
      
      {recentEntries.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Recent Entries</Text>
          {recentEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.recentItem}
              onPress={() => router.push(`/entry/${entry.id}`)}
            >
              <Text style={styles.recentItemTitle}>{entry.title}</Text>
              <Text style={styles.recentItemDate}>
                {new Date(entry.createdAt).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
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
  formCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.xl,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    paddingVertical: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutrals.gray200,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
    marginBottom: theme.spacing.scales.sm,
  },
  contentInput: {
    minHeight: 200,
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.neutrals.gray900,
    padding: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
    marginBottom: theme.spacing.scales.lg,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
  recentSection: {
    marginTop: theme.spacing.scales.sm,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  recentItem: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recentItemTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    flex: 1,
  },
  recentItemDate: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
});