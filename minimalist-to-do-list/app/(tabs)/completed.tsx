import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import TaskCard from "../../components/TaskCard";
import { useTasks } from "../../hooks/useTasks";
import { theme } from "../../theme/theme";

export default function CompletedTasksScreen() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask, getTasksByCategory } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const completedTasks = getTasksByCategory(selectedCategory).filter(task => task.isCompleted);

  if (completedTasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>✅</Text>
        <Text style={styles.emptyTitle}>No completed tasks</Text>
        <Text style={styles.emptyText}>
          Complete tasks and they'll appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Completed</Text>
        <Text style={styles.subtitle}>
          {completedTasks.length} task{completedTasks.length !== 1 ? "s" : ""} done
        </Text>
      </View>
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView 
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
      >
        {completedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onPress={() => router.push(`/task/${task.id}`)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ScrollView>
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
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
  },
});