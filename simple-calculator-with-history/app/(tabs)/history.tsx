import { useRouter } from "expo-router";
import { Calculator, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HistoryCard from "../../components/HistoryCard";
import { useCalculator } from "../../hooks/useCalculator";
import { theme } from "../../theme/theme";

export default function HistoryScreen() {
  const router = useRouter();
  const { calculations, deleteCalculation, clearHistory } = useCalculator();

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to delete all calculation history?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => clearHistory()
        }
      ]
    );
  };

  const handleDeleteSingle = (id: number) => {
    Alert.alert(
      "Delete Calculation",
      "Remove this calculation from history?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deleteCalculation(id)
        }
      ]
    );
  };

  if (calculations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Calculator size={64} color={theme.colors.neutrals.gray300} />
        <Text style={styles.emptyTitle}>No History Yet</Text>
        <Text style={styles.emptyText}>
          Perform calculations and they'll appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>
          {calculations.length} calculation{calculations.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
          <Trash2 size={18} color={theme.colors.feedback.error} />
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.historyList}
        contentContainerStyle={styles.historyListContent}
      >
        {calculations.map((calculation) => (
          <HistoryCard
            key={calculation.id}
            calculation={calculation}
            onPress={() => router.push(`/calculation/${calculation.id}`)}
            onDelete={() => handleDeleteSingle(calculation.id)}
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
    paddingBottom: theme.spacing.scales.sm,
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
  headerActions: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.md,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: theme.spacing.scales.xs,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.feedback.error + "10",
    borderRadius: theme.borders.radius.md,
  },
  clearText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.feedback.error,
  },
  historyList: {
    flex: 1,
  },
  historyListContent: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
  },
});