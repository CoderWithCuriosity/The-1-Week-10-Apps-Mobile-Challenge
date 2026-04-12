import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import HabitCard from "../../components/HabitCard";
import { useHabits } from "../../hooks/useHabits";
import { theme } from "../../theme/theme";

export default function HabitsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { habits, toggleHabit, getHabitsByCategory } = useHabits();
  
  const today = new Date().toISOString().split('T')[0];
  const filteredHabits = getHabitsByCategory(selectedCategory);

  return (
    <View style={styles.container}>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {filteredHabits.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No habits in this category</Text>
          </View>
        ) : (
          filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              date={today}
              onToggle={() => toggleHabit(habit.id, today)}
              onPress={() => router.push(`/habit/${habit.id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
    paddingTop: 20,
  },
  content: {
    padding: theme.spacing.scales.lg,
  },
  emptyContainer: {
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
  },
});