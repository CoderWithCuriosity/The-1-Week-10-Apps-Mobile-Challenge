import { useRouter } from "expo-router";
import { Flame, Plus } from "lucide-react-native";
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
import HabitCard from "../../components/HabitCard";
import { categories } from "../../data/habits";
import { useHabits } from "../../hooks/useHabits";
import { theme } from "../../theme/theme";

export default function TodayScreen() {
  const router = useRouter();
  const { habits, toggleHabit, addHabit, getTodayCompletions, getStreakStats } = useHabits();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitDescription, setNewHabitDescription] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState("health");
  const [newHabitIcon, setNewHabitIcon] = useState("💪");

  const today = new Date().toISOString().split('T')[0];
  const stats = getStreakStats();
  const todayCompletions = getTodayCompletions();
  
  const filteredHabits = habits.filter(habit => {
    if (selectedCategory === "all") return true;
    return habit.category === selectedCategory;
  });

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return;
    
    await addHabit({
      name: newHabitName,
      description: newHabitDescription,
      category: newHabitCategory,
      icon: newHabitIcon,
    });
    
    setModalVisible(false);
    setNewHabitName("");
    setNewHabitDescription("");
    setNewHabitCategory("health");
    setNewHabitIcon("💪");
  };

  const icons = ["💪", "🧘", "📚", "🏃", "💧", "📝", "💼", "🎯", "🌅", "🎨"];

  // Show empty state when no habits exist
  if (habits.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>🌱</Text>
        <Text style={styles.emptyStateTitle}>No habits yet</Text>
        <Text style={styles.emptyStateText}>
          Create your first habit to start tracking your progress
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.emptyStateButtonText}>Create Habit</Text>
        </TouchableOpacity>
        
        {/* Add Habit Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create New Habit</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Habit name"
                value={newHabitName}
                onChangeText={setNewHabitName}
                placeholderTextColor={theme.colors.neutrals.gray500}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Description (optional)"
                value={newHabitDescription}
                onChangeText={setNewHabitDescription}
                placeholderTextColor={theme.colors.neutrals.gray500}
              />
              
              <Text style={styles.label}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconPicker}>
                {categories.filter(c => c.id !== "all").map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryOption,
                      newHabitCategory === category.id && { backgroundColor: category.color }
                    ]}
                    onPress={() => setNewHabitCategory(category.id)}
                  >
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <Text style={styles.label}>Choose Icon</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconPicker}>
                {icons.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      styles.iconOption,
                      newHabitIcon === icon && styles.iconOptionSelected
                    ]}
                    onPress={() => setNewHabitIcon(icon)}
                  >
                    <Text style={styles.iconText}>{icon}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.createButton]}
                  onPress={handleAddHabit}
                >
                  <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Stats */}
        <View style={styles.statsHeader}>
          <View style={styles.statCard}>
            <Flame size={24} color={theme.colors.feedback.warning} />
            <Text style={styles.statValue}>{stats.bestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalCompletions}</Text>
            <Text style={styles.statLabel}>Total Completions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.activeHabits}</Text>
            <Text style={styles.statLabel}>Active Habits</Text>
          </View>
        </View>

        {/* Today's Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressText}>
              {todayCompletions.length} / {habits.length} habits completed
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: habits.length > 0 ? `${(todayCompletions.length / habits.length) * 100}%` : "0%" }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Habits List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Habits</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Plus size={20} color={theme.colors.brand.primary} />
            </TouchableOpacity>
          </View>
          
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              date={today}
              onToggle={() => toggleHabit(habit.id, today)}
              onPress={() => router.push(`/habit/${habit.id}`)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Add Habit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Habit</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Habit name"
              value={newHabitName}
              onChangeText={setNewHabitName}
              placeholderTextColor={theme.colors.neutrals.gray500}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              value={newHabitDescription}
              onChangeText={setNewHabitDescription}
              placeholderTextColor={theme.colors.neutrals.gray500}
            />
            
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconPicker}>
              {categories.filter(c => c.id !== "all").map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    newHabitCategory === category.id && { backgroundColor: category.color }
                  ]}
                  onPress={() => setNewHabitCategory(category.id)}
                >
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.label}>Choose Icon</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconPicker}>
              {icons.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    newHabitIcon === icon && styles.iconOptionSelected
                  ]}
                  onPress={() => setNewHabitIcon(icon)}
                >
                  <Text style={styles.iconText}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.createButton]}
                onPress={handleAddHabit}
              >
                <Text style={styles.createButtonText}>Create</Text>
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
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  content: {
    padding: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
    alignItems: "center",
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.xs,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginTop: theme.spacing.scales.xs,
    textAlign: "center"
  },
  section: {
    marginBottom: theme.spacing.scales.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.brand.primary + "10",
    alignItems: "center",
    justifyContent: "center",
  },
  progressCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.full,
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
    minHeight: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.sm,
  },
  iconPicker: {
    flexDirection: "row",
    marginBottom: theme.spacing.scales.md,
  },
  categoryOption: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    marginRight: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.gray100,
  },
  categoryName: {
    fontSize: 14,
    color: theme.colors.neutrals.gray900,
  },
  iconOption: {
    width: 50,
    height: 50,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.scales.sm,
  },
  iconOptionSelected: {
    backgroundColor: theme.colors.brand.primary,
    borderWidth: 2,
    borderColor: theme.colors.brand.primary,
  },
  iconText: {
    fontSize: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.xl,
  },
  modalButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: theme.colors.neutrals.gray100,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
  },
  createButton: {
    backgroundColor: theme.colors.brand.primary,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
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