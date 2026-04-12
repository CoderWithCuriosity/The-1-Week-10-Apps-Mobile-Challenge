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
import AddChoiceModal from "../../components/AddChoiceModal";
import CategoryFilter from "../../components/CategoryFilter";
import ChoiceCard from "../../components/ChoiceCard";
import { useChoices } from "../../hooks/useChoices";
import { theme } from "../../theme/theme";

export default function ChoicesScreen() {
  const router = useRouter();
  const { choices, deleteChoice, updateChoice, addChoice, getChoicesByCategory } = useChoices();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingChoice, setEditingChoice] = useState<any>(null);
  
  const filteredChoices = getChoicesByCategory(selectedCategory);

  const handleEdit = (choice: any) => {
    setEditingChoice(choice);
    setModalVisible(true);
  };

  const handleUpdate = (id: number, updates: any) => {
    updateChoice(id, updates);
    setEditingChoice(null);
  };

  if (choices.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>📝</Text>
        <Text style={styles.emptyStateTitle}>No choices yet</Text>
        <Text style={styles.emptyStateText}>
          Add your first option to get started
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.emptyStateButtonText}>Add Choice</Text>
        </TouchableOpacity>
        
        <AddChoiceModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setEditingChoice(null);
          }}
          onAdd={addChoice}
          editingChoice={editingChoice}
          onUpdate={handleUpdate}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Choices</Text>
        <Text style={styles.subtitle}>
          {choices.length} total options
        </Text>
      </View>
      
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <ScrollView 
        style={styles.choicesList}
        contentContainerStyle={styles.choicesListContent}
      >
        {filteredChoices.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No choices in this category</Text>
          </View>
        ) : (
          filteredChoices.map((choice) => (
            <ChoiceCard
              key={choice.id}
              choice={choice}
              onPress={() => router.push(`/spin/${choice.id}`)}
              onEdit={() => handleEdit(choice)}
              onDelete={() => deleteChoice(choice.id)}
              showStats={true}
            />
          ))
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => {
          setEditingChoice(null);
          setModalVisible(true);
        }}
      >
        <Plus size={24} color={theme.colors.neutrals.white} />
      </TouchableOpacity>
      
      <AddChoiceModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingChoice(null);
        }}
        onAdd={addChoice}
        editingChoice={editingChoice}
        onUpdate={handleUpdate}
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
  choicesList: {
    flex: 1,
  },
  choicesListContent: {
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