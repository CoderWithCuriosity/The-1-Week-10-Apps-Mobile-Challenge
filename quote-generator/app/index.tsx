import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Hero Section */}
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Welcome to OCHEX Learn JavaScript</Text>
        <Text style={styles.heroSubtitle}>
          Master JavaScript programming through interactive lessons and quizzes.
          Start from basics and advance to expert level.
        </Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#4A6FA5" }]}>50+</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#17B978" }]}>200+</Text>
            <Text style={styles.statLabel}>Questions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: "#FF9A00" }]}>3</Text>
            <Text style={styles.statLabel}>Levels</Text>
          </View>
        </View>
      </View>

      {/* Quick Start Buttons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push("/levels")}
        >
          <Text style={styles.buttonText}>Start Learning</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push("/lesson/1")}
        >
          <Text style={styles.buttonText}>Try First Lesson Free</Text>
        </TouchableOpacity>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Learn With OCHEX?</Text>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>🎯 Interactive Learning</Text>
          <Text style={styles.featureDescription}>
            Learn by doing with hands-on examples and exercises
          </Text>
        </View>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>📱 Offline Access</Text>
          <Text style={styles.featureDescription}>
            All content available offline - learn anytime, anywhere
          </Text>
        </View>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureTitle}>🏆 Progress Tracking</Text>
          <Text style={styles.featureDescription}>
            Track your progress and earn achievements
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 OCHEX Learn JavaScript</Text>
        <Text style={styles.footerSubtext}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 16,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#4A6FA5",
  },
  secondaryButton: {
    backgroundColor: "#166088",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4A6FA5",
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#999999",
  },
});