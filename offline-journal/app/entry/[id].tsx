import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Edit2, Heart, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MoodSelector from "../../components/MoodSelector";
import TagFilter from "../../components/TagFilter";
import { moods } from "../../data/entries";
import { useJournal } from "../../hooks/useJournal";
import { theme } from "../../theme/theme";

export default function EntryDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getEntryById, updateEntry, deleteEntry, toggleFavorite } = useJournal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedMood, setEditedMood] = useState("");
  const [editedTags, setEditedTags] = useState<string[]>([]);
  
  const entry = getEntryById(Number(id));
  
  if (!entry) {
    return (
      <View style={styles.centered}>
        <Text>Entry not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const mood = moods.find(m => m.id === entry.mood);
  
  const handleEdit = () => {
    setEditedTitle(entry.title);
    setEditedContent(entry.content);
    setEditedMood(entry.mood);
    setEditedTags([...entry.tags]);
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) return;
    
    await updateEntry(entry.id, {
      title: editedTitle.trim(),
      content: editedContent.trim(),
      mood: editedMood as any,
      tags: editedTags,
    });
    
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            await deleteEntry(entry.id);
            router.back();
          }
        }
      ]
    );
  };
  
  const handleAddTag = (tag: string) => {
    if (!editedTags.includes(tag)) {
      setEditedTags([...editedTags, tag]);
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setEditedTags(editedTags.filter(t => t !== tag));
  };
  
  if (isEditing) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.editHeader}>
          <TouchableOpacity onPress={() => setIsEditing(false)} style={styles.cancelButton}>
            <X size={24} color={theme.colors.neutrals.gray500} />
          </TouchableOpacity>
          <Text style={styles.editTitle}>Edit Entry</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
        
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          value={editedTitle}
          onChangeText={setEditedTitle}
        />
        
        <Text style={styles.label}>How are you feeling?</Text>
        <MoodSelector selectedMood={editedMood} onSelectMood={setEditedMood} />
        
        <Text style={styles.label}>Tags</Text>
        <TagFilter
          selectedTags={editedTags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
        
        <TextInput
          style={styles.contentInput}
          placeholder="Write your entry..."
          value={editedContent}
          onChangeText={setEditedContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleFavorite(entry.id)} style={styles.actionButton}>
          <Heart
            size={22}
            color={entry.isFavorite ? theme.colors.feedback.error : theme.colors.neutrals.gray500}
            fill={entry.isFavorite ? theme.colors.feedback.error : "none"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
          <Edit2 size={20} color={theme.colors.neutrals.gray500} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Trash2 size={20} color={theme.colors.feedback.error} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}>{entry.title}</Text>
      
      <View style={styles.metaContainer}>
        <View style={styles.dateContainer}>
          <Calendar size={14} color={theme.colors.neutrals.gray500} />
          <Text style={styles.date}>
            {new Date(entry.createdAt).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>
        
        {mood && (
          <View style={[styles.moodContainer, { backgroundColor: mood.color + "10" }]}>
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={[styles.moodText, { color: mood.color }]}>{mood.label}</Text>
          </View>
        )}
      </View>
      
      {entry.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {entry.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}
      
      <Text style={styles.content}>{entry.content}</Text>
      
      {entry.updatedAt !== entry.createdAt && (
        <Text style={styles.edited}>
          Last edited: {new Date(entry.updatedAt).toLocaleString()}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
    paddingHorizontal: 10,
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
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.lg,
  },
  actionButton: {
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.md,
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
  },
  date: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.full,
  },
  moodEmoji: {
    fontSize: 12,
  },
  moodText: {
    fontSize: 12,
    fontWeight: "500",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.lg,
  },
  tag: {
    backgroundColor: theme.colors.neutrals.gray100,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  tagText: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.neutrals.gray900,
  },
  edited: {
    fontSize: 11,
    color: theme.colors.neutrals.gray400,
    marginTop: theme.spacing.scales.xl,
    textAlign: "center",
  },
  editHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.lg,
  },
  cancelButton: {
    padding: 8,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  saveButton: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: 8,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.md,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
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
    marginTop: theme.spacing.scales.md,
  },
  contentInput: {
    minHeight: 300,
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.neutrals.gray900,
    padding: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    marginTop: theme.spacing.scales.md,
    textAlignVertical: "top",
  },
});