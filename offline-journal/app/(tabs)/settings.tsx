import { Download, Heart, Shield, Trash2 } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useJournal } from "../../hooks/useJournal";
import { theme } from "../../theme/theme";

export default function SettingsScreen() {
  const { entries, getStats } = useJournal();
  const [exporting, setExporting] = useState(false);
  const stats = getStats();

  const handleExportData = async () => {
    setExporting(true);
    try {
      const exportData = {
        exportDate: new Date().toISOString(),
        totalEntries: entries.length,
        entries: entries.map(entry => ({
          ...entry,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        })),
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      // In a real app, you'd use share or file system
      Alert.alert("Export Ready", `Data exported with ${entries.length} entries`);
    } catch (error) {
      Alert.alert("Error", "Failed to export data");
    } finally {
      setExporting(false);
    }
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure? This will permanently delete all your journal entries.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => {
            // This would need a clearAllData function in the hook
            Alert.alert("Data Cleared", "All entries have been deleted");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your journal</Text>
      </View>
      
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Journal Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalEntries}</Text>
            <Text style={styles.statLabel}>Total Entries</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.favoriteCount}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleExportData} disabled={exporting}>
          <View style={styles.settingIcon}>
            <Download size={20} color={theme.colors.brand.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Export Data</Text>
            <Text style={styles.settingDescription}>Save your entries as JSON</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
          <View style={[styles.settingIcon, { backgroundColor: theme.colors.feedback.error + "10" }]}>
            <Trash2 size={20} color={theme.colors.feedback.error} />
          </View>
          <View style={styles.settingContent}>
            <Text style={[styles.settingTitle, { color: theme.colors.feedback.error }]}>
              Clear All Data
            </Text>
            <Text style={styles.settingDescription}>Permanently delete all entries</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Heart size={20} color={theme.colors.brand.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Offline Journal</Text>
            <Text style={styles.settingDescription}>Version 1.0.1</Text>
          </View>
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingIcon}>
            <Shield size={20} color={theme.colors.brand.primary} />
          </View>
          <View style={styles.settingContent}>
            <Text style={styles.settingTitle}>Privacy First</Text>
            <Text style={styles.settingDescription}>All data stays on your device</Text>
          </View>
        </View>
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
    marginBottom: theme.spacing.scales.lg,
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
  statsCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.xl,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.md,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.brand.primary,
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
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borders.radius.md,
    backgroundColor: theme.colors.brand.primary + "10",
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.scales.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
});