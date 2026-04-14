import { Flame } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Session } from "../data/presets";
import { theme } from "../theme/theme";

interface SessionHistoryProps {
  sessions: Session[];
}

export default function SessionHistory({ sessions }: SessionHistoryProps) {
  const recentSessions = sessions.slice(0, 10);

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work":
        return "🎯";
      case "break":
        return "☕";
      case "longBreak":
        return "🌿";
      default:
        return "⏱️";
    }
  };

  if (sessions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Flame size={32} color={theme.colors.neutrals.gray300} />
        <Text style={styles.emptyText}>No sessions yet</Text>
        <Text style={styles.emptySubtext}>Complete a focus session to see it here</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {recentSessions.map((session) => (
        <View key={session.id} style={styles.sessionItem}>
          <Text style={styles.sessionIcon}>{getTypeIcon(session.type)}</Text>
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionName}>{session.presetName}</Text>
            <Text style={styles.sessionTime}>{formatDate(session.completedAt)}</Text>
          </View>
          <Text style={styles.sessionDuration}>{session.duration} min</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.scales.sm,
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    gap: theme.spacing.scales.md,
  },
  sessionIcon: {
    fontSize: 24,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionName: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
  },
  sessionTime: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
    marginTop: 2,
  },
  sessionDuration: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.brand.primary,
  },
  emptyContainer: {
    alignItems: "center",
    padding: theme.spacing.scales.xl,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
    marginTop: theme.spacing.scales.md,
  },
  emptySubtext: {
    fontSize: 13,
    color: theme.colors.neutrals.gray400,
    marginTop: theme.spacing.scales.xs,
  },
});