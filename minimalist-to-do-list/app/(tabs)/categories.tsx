import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddTaskModal from "../../components/AddTaskModal";
import TaskCard from "../../components/TaskCard";
import { categories, Task } from "../../data/tasks";
import { useTasks } from "../../hooks/useTasks";
import { theme } from "../../theme/theme";

export default function CategoriesScreen() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask, addTask, getTasksByCategory } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  const categoryTasks = selectedCategory 
    ? getTasksByCategory(selectedCategory)
    : [];

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || theme.colors.brand.primary;
  };

  if (selectedCategory) {
    const activeTasks = categoryTasks.filter(t => !t.isCompleted);
    const completedTasks = categoryTasks.filter(t => t.isCompleted);
    const color = getCategoryColor(selectedCategory);
    
    return (
      <View style={styles.container}>
        <View style={[styles.categoryHeader, { backgroundColor: color + "10" }]}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.categoryTitle, { color }]}>
            {categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={20} color={color} />
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.content}>
          {activeTasks.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Active</Text>
              {activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onPress={() => router.push(`/task/${task.id}`)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </>
          )}
          
          {completedTasks.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Completed</Text>
              {completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onPress={() => router.push(`/task/${task.id}`)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </>
          )}
          
          {categoryTasks.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks in this category</Text>
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.emptyButtonText}>Add a task</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        
        <AddTaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={(newTask) => {
            addTask({ ...newTask, category: selectedCategory });
            setModalVisible(false);
          }}
        />
      </View>
    );
  }

  // Category list view
  const categoryStats = categories.filter(c => c.id !== "all").map(category => {
    const categoryTasks = tasks.filter(t => t.category === category.id);
    const activeCount = categoryTasks.filter(t => !t.isCompleted).length;
    const completedCount = categoryTasks.filter(t => t.isCompleted).length;
    return { ...category, activeCount, completedCount, total: categoryTasks.length };
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Organize tasks by category</Text>
      </View>
      
      <View style={styles.categoriesGrid}>
        {categoryStats.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryCard, { borderLeftColor: category.color }]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[styles.categoryCardName, { color: category.color }]}>
              {category.name}
            </Text>
            <View style={styles.categoryCardStats}>
              <Text style={styles.categoryCardStat}>
                {category.activeCount} active
              </Text>
              <Text style={styles.categoryCardStat}>
                {category.completedCount} completed
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  header: {
    marginBottom: theme.spacing.scales.xl,
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
  categoriesGrid: {
    gap: theme.spacing.scales.md,
  },
  categoryCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    borderLeftWidth: 4,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryCardName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: theme.spacing.scales.xs,
  },
  categoryCardStats: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
  },
  categoryCardStat: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 28,
    color: theme.colors.neutrals.gray900,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borders.radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
    marginTop: theme.spacing.scales.md,
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
  emptyButton: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.md,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
});