import { useRouter } from "expo-router";
import { Plus, Search } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddTaskModal from "../../components/AddTaskModal";
import CategoryFilter from "../../components/CategoryFilter";
import TaskCard from "../../components/TaskCard";
import { useTasks } from "../../hooks/useTasks";
import { theme } from "../../theme/theme";

export default function ActiveTasksScreen() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask, addTask, getStats, getTasksByCategory } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const stats = getStats();
  let filteredTasks = getTasksByCategory(selectedCategory).filter(task => !task.isCompleted);
  
  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>📝</Text>
        <Text style={styles.emptyStateTitle}>No tasks yet</Text>
        <Text style={styles.emptyStateText}>
          Add your first task to start organizing your day
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.emptyStateButtonText}>Create Task</Text>
        </TouchableOpacity>
        
        <AddTaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={addTask}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>My Tasks</Text>
        <Text style={styles.subtitle}>
          {stats.active} active • {stats.completed} completed
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={18} color={theme.colors.neutrals.gray400} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.neutrals.gray400}
        />
      </View>
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView 
        style={styles.taskList}
        contentContainerStyle={styles.taskListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              {searchQuery ? "No matching tasks" : "No active tasks in this category"}
            </Text>
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onPress={() => router.push(`/task/${task.id}`)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color={theme.colors.neutrals.white} />
      </TouchableOpacity>
      
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addTask}
      />
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
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    marginHorizontal: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
    paddingHorizontal: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    gap: theme.spacing.scales.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    fontSize: 16,
    color: theme.colors.neutrals.gray900,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  noResults: {
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  emptyStateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});