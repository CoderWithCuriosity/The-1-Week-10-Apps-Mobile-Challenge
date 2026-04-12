// app/(tabs)/index.tsx
import { useRouter } from "expo-router";
import { RefreshCw } from "lucide-react-native";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AffirmationCard from "../../components/AffirmationCard";
import ShareButton from "../../components/ShareButton";
import { useAffirmations } from "../../hooks/useAffirmations";
import { theme } from "../../theme/theme";

export default function HomeScreen() {
  const router = useRouter();
  const {
    todayAffirmation,
    getNewRandomAffirmation,
    toggleFavorite,
    loading,
  } = useAffirmations();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getNewRandomAffirmation();
    setTimeout(() => setRefreshing(false), 500);
  }, [getNewRandomAffirmation]);

  if (loading || !todayAffirmation) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good {getTimeOfDay()}!</Text>
        <Text style={styles.title}>Your Daily Affirmation</Text>
        <Text style={styles.subtitle}>
          Start your day with positive thoughts
        </Text>
      </View>

      {/* Today's Affirmation */}
      <View style={styles.todaySection}>
        <Text style={styles.sectionTitle}>✨ Today's Affirmation</Text>
        <AffirmationCard
          affirmation={todayAffirmation}
          onToggleFavorite={() => toggleFavorite(todayAffirmation.id)}
          onPress={() => router.push(`/affirmation/${todayAffirmation.id}`)}
        />
        
        <View style={styles.actionButtons}>
          <ShareButton affirmationText={todayAffirmation.text} />
          
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={getNewRandomAffirmation}
          >
            <RefreshCw size={16} color={theme.colors.brand.onPrimary} />
            <Text style={styles.refreshText}>New Affirmation</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>💡 How to Use Affirmations</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>1</Text>
          <Text style={styles.tipText}>
            Read your affirmation aloud with conviction
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>2</Text>
          <Text style={styles.tipText}>
            Repeat it 3-5 times, feeling the words
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>3</Text>
          <Text style={styles.tipText}>
            Visualize the affirmation becoming true
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipNumber}>4</Text>
          <Text style={styles.tipText}>
            Practice daily for best results
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  content: {
    paddingBottom: theme.spacing.scales.xl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: theme.spacing.scales.lg,
    backgroundColor: theme.colors.brand.primary,
    borderBottomLeftRadius: theme.borders.radius.lg,
    borderBottomRightRadius: theme.borders.radius.lg,
  },
  greeting: {
    fontSize: 14,
    color: theme.colors.brand.onPrimary,
    opacity: 0.8,
    marginBottom: theme.spacing.scales.xs,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.brand.onPrimary,
    marginBottom: theme.spacing.scales.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.brand.onPrimary,
    opacity: 0.9,
  },
  todaySection: {
    padding: theme.spacing.scales.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  actionButtons: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
    marginTop: theme.spacing.scales.md,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    borderRadius: theme.borders.radius.md,
    flex: 1,
    justifyContent: "center",
  },
  refreshText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.brand.onPrimary,
  },
  tipsSection: {
    paddingHorizontal: theme.spacing.scales.lg,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    padding: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    marginBottom: theme.spacing.scales.sm,
    gap: theme.spacing.scales.md,
  },
  tipNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.brand.primary,
    color: theme.colors.brand.onPrimary,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 32,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.neutrals.gray900,
    lineHeight: 20,
  },
});