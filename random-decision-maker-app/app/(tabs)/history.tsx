import { Trash2 } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useChoices } from "../../hooks/useChoices";
import { theme } from "../../theme/theme";

export default function HistoryScreen() {
  const { history, clearHistory, getChoicesByCategory } = useChoices();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📜</Text>
        <Text style={styles.emptyTitle}>No history yet</Text>
        <Text style={styles.emptyText}>
          Your past decisions will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Decision History</Text>
        <Text style={styles.subtitle}>
          {history.length} decision{history.length !== 1 ? "s" : ""} made
        </Text>
      </View>
      
      {history.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <Trash2 size={16} color={theme.colors.feedback.error} />
          <Text style={styles.clearText}>Clear History</Text>
        </TouchableOpacity>
      )}
      
      <ScrollView 
        style={styles.historyList}
        contentContainerStyle={styles.historyListContent}
      >
        {history.map((entry, index) => {
          const category = getChoicesByCategory(entry.category)[0];
          const categoryColor = categories.find(c => c.id === entry.category)?.color || theme.colors.brand.primary;
          
          return (
            <View key={entry.id} style={styles.historyItem}>
              <View style={styles.historyNumber}>
                <Text style={styles.historyNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyChoice}>{entry.choiceName}</Text>
                <View style={styles.historyMeta}>
                  <View style={[styles.historyCategory, { backgroundColor: categoryColor + "10" }]}>
                    <Text style={[styles.historyCategoryText, { color: categoryColor }]}>
                      {entry.category}
                    </Text>
                  </View>
                  <Text style={styles.historyTime}>{formatDate(entry.timestamp)}</Text>
                </View>
              </View>
            </View>
          );
        })}
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
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: theme.spacing.scales.xs,
    marginHorizontal: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
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
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.md,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  historyNumber: {
    width: 32,
    height: 32,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
  historyNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.gray500,
  },
  historyContent: {
    flex: 1,
    gap: 4,
  },
  historyChoice: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
  },
  historyMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
  },
  historyCategory: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 2,
    borderRadius: theme.borders.radius.sm,
  },
  historyCategoryText: {
    fontSize: 10,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  historyTime: {
    fontSize: 10,
    color: theme.colors.neutrals.gray500,
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

import { categories } from "../../data/choices";