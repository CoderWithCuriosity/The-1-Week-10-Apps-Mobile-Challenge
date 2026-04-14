import { useLocalSearchParams, useRouter } from "expo-router";
import { Calendar, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCalculator } from "../../hooks/useCalculator";
import { theme } from "../../theme/theme";

export default function CalculationDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { calculations, deleteCalculation } = useCalculator();
  
  const calculation = calculations.find(c => c.id === Number(id));

  if (!calculation) {
    return (
      <View style={styles.centered}>
        <Text>Calculation not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Calculation",
      "Remove this calculation from history?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            await deleteCalculation(calculation.id);
            router.back();
          }
        }
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.label}>Expression</Text>
            <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
              <Trash2 size={20} color={theme.colors.feedback.error} />
            </TouchableOpacity>
          </View>
          <Text style={styles.expression}>{calculation.expression}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.label}>Result</Text>
          <Text style={styles.result}>= {calculation.result}</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.dateContainer}>
            <Calendar size={16} color={theme.colors.neutrals.gray500} />
            <Text style={styles.date}>{formatDate(calculation.timestamp)}</Text>
          </View>
        </View>
      </View>
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
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.scales.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.xs,
  },
  expression: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray700,
    marginBottom: theme.spacing.scales.lg,
  },
  result: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.brand.primary,
    marginBottom: theme.spacing.scales.lg,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.neutrals.gray200,
    marginVertical: theme.spacing.scales.md,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
  },
  date: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
  },
  deleteButton: {
    padding: 4,
  },
});