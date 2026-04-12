import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Flag, Trash2 } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { categories } from "../../data/tasks";
import { useTasks } from "../../hooks/useTasks";
import { theme } from "../../theme/theme";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, toggleTask, deleteTask } = useTasks();
  
  const task = tasks.find(t => t.id === Number(id));

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text>Task not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const priorityColors = {
    low: "#10B981",
    medium: "#F59E0B",
    high: "#EF4444",
  };
  
  const priorityLabels = {
    low: "Low Priority",
    medium: "Medium Priority",
    high: "High Priority",
  };

  const categoryColor = categories.find(c => c.id === task.category)?.color || theme.colors.brand.primary;

  const handleDelete = () => {
    deleteTask(task.id);
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.card, { borderTopColor: categoryColor }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={[styles.statusButton, task.isCompleted && styles.statusButtonCompleted]}
            onPress={() => toggleTask(task.id)}
          >
            <Text style={[styles.statusText, {color: task.isCompleted ? 'white' : 'black'}  ]}>
              {task.isCompleted ? "✓ Completed" : "○ Mark Complete"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Trash2 size={20} color={theme.colors.feedback.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.title}>{task.title}</Text>
        
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        
        <View style={styles.divider} />
        
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category</Text>
            <View style={[styles.categoryBadge, { backgroundColor: categoryColor + "10" }]}>
              <Text style={[styles.categoryText, { color: categoryColor }]}>
                {task.category}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Priority</Text>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColors[task.priority] + "10" }]}>
              <Flag size={12} color={priorityColors[task.priority]} />
              <Text style={[styles.priorityText, { color: priorityColors[task.priority] }]}>
                {priorityLabels[task.priority]}
              </Text>
            </View>
          </View>
          
          {task.dueDate && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Due Date</Text>
              <View style={styles.dateBadge}>
                <Calendar size={12} color={theme.colors.neutrals.gray500} />
                <Text style={styles.dateText}>
                  {new Date(task.dueDate).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </View>
            </View>
          )}
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created</Text>
            <Text style={styles.metaText}>
              {new Date(task.createdAt).toLocaleDateString()}
            </Text>
          </View>
          
          {task.completedAt && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Completed</Text>
              <Text style={styles.metaText}>
                {new Date(task.completedAt).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>
      </View>
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
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    borderTopWidth: 4,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.lg,
  },
  statusButton: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.full,
  },
  statusButtonCompleted: {
    backgroundColor: theme.colors.brand.primary,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
  },
  deleteButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.neutrals.gray600,
    marginBottom: theme.spacing.scales.lg,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutrals.gray200,
    marginVertical: theme.spacing.scales.lg,
  },
  infoSection: {
    gap: theme.spacing.scales.md,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray700,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray700,
  },
});