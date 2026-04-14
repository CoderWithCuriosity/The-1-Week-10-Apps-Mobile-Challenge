import { Calendar, Flame, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SessionHistory from "../../components/SessionHistory";
import { useTimer } from "../../hooks/useTimer";
import { theme } from "../../theme/theme";

export default function StatsScreen() {
  const { sessions, getStats } = useTimer();
  const stats = getStats();
  
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} minutes`;
    if (mins === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours}h ${mins}m`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.subtitle}>Track your focus journey</Text>
      </View>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Flame size={28} color={theme.colors.feedback.warning} />
          <Text style={styles.statValue}>{formatTime(stats.totalFocusTime)}</Text>
          <Text style={styles.statLabel}>Total Focus Time</Text>
        </View>
        
        <View style={styles.statCard}>
          <TrendingUp size={28} color={theme.colors.brand.primary} />
          <Text style={styles.statValue}>{stats.totalSessions}</Text>
          <Text style={styles.statLabel}>Completed Sessions</Text>
        </View>
        
        {stats.bestDay && (
          <View style={styles.statCard}>
            <Calendar size={28} color={theme.colors.info} />
            <Text style={styles.statValue}>{stats.bestDay}</Text>
            <Text style={styles.statLabel}>Best Day</Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        <View style={styles.weeklyChart}>
          {stats.weeklyData.map((day, index) => (
            <View key={index} style={styles.chartBar}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar,
                    { 
                      height: Math.min((day.minutes / 60) * 120, 120),
                      backgroundColor: day.minutes > 0 ? theme.colors.brand.primary : theme.colors.neutrals.gray200
                    }
                  ]} 
                />
              </View>
              <Text style={styles.chartLabel}>{day.day}</Text>
              {day.minutes > 0 && (
                <Text style={styles.chartValue}>{day.minutes}m</Text>
              )}
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        <SessionHistory sessions={sessions} />
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
    paddingBottom: theme.spacing.scales.xxl,
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
  statsGrid: {
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.xl,
  },
  statCard: {
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
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginTop: theme.spacing.scales.sm,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginTop: 4,
  },
  section: {
    marginBottom: theme.spacing.scales.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  weeklyChart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.md,
    height: 200,
  },
  chartBar: {
    alignItems: "center",
    gap: theme.spacing.scales.xs,
  },
  barContainer: {
    width: 32,
    height: 120,
    backgroundColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.sm,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: theme.borders.radius.sm,
  },
  chartLabel: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  chartValue: {
    fontSize: 10,
    fontWeight: "500",
    color: theme.colors.brand.primary,
  },
});