import { useRouter } from "expo-router";
import { Search, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EntryCard from "../../components/EntryCard";
import { moods } from "../../data/entries";
import { useJournal } from "../../hooks/useJournal";
import { theme } from "../../theme/theme";

export default function EntriesScreen() {
  const router = useRouter();
  const { entries, toggleFavorite, getEntriesByMood, getFavoriteEntries, getStats } = useJournal();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "favorites" | "mood">("all");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const stats = getStats();
  
  let filteredEntries = [...entries];
  
  if (filterType === "favorites") {
    filteredEntries = getFavoriteEntries();
  } else if (filterType === "mood" && selectedMood) {
    filteredEntries = getEntriesByMood(selectedMood);
  }
  
  if (searchQuery) {
    filteredEntries = filteredEntries.filter(entry =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>📔</Text>
        <Text style={styles.emptyStateTitle}>No entries yet</Text>
        <Text style={styles.emptyStateText}>
          Write your first journal entry to get started
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => router.push("/(tabs)")}
        >
          <Sparkles size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.emptyStateButtonText}>Write Entry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Entries</Text>
        <Text style={styles.subtitle}>
          {stats.totalEntries} entries • {stats.favoriteCount} favorites
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={18} color={theme.colors.neutrals.gray400} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search entries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={theme.colors.neutrals.gray400}
        />
      </View>
      
      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, filterType === "all" && styles.filterTabActive]}
          onPress={() => { setFilterType("all"); setSelectedMood(null); }}
        >
          <Text style={[styles.filterTabText, filterType === "all" && styles.filterTabTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === "favorites" && styles.filterTabActive]}
          onPress={() => { setFilterType("favorites"); setSelectedMood(null); }}
        >
          <Text style={[styles.filterTabText, filterType === "favorites" && styles.filterTabTextActive]}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, filterType === "mood" && styles.filterTabActive]}
          onPress={() => { setFilterType("mood"); }}
        >
          <Text style={[styles.filterTabText, filterType === "mood" && styles.filterTabTextActive]}>
            By Mood
          </Text>
        </TouchableOpacity>
      </View>
      
      {filterType === "mood" && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodFilter} contentContainerStyle={{paddingRight: 50}}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodChip,
                selectedMood === mood.id && { backgroundColor: mood.color, borderColor: mood.color }
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.moodChipEmoji}>{mood.emoji}</Text>
              <Text style={[
                styles.moodChipText,
                selectedMood === mood.id && styles.moodChipTextActive
              ]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <ScrollView 
        style={styles.entriesList}
        contentContainerStyle={styles.entriesListContent}
      >
        {filteredEntries.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No entries found</Text>
          </View>
        ) : (
          filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onPress={() => router.push(`/entry/${entry.id}`)}
              onFavorite={() => toggleFavorite(entry.id)}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.white,
    marginHorizontal: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
    paddingHorizontal: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    gap: theme.spacing.scales.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    fontSize: 16,
    color: theme.colors.neutrals.gray900,
  },
  filterTabs: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.scales.lg,
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.md,
  },
  filterTab: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.white,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  filterTabActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  filterTabTextActive: {
    color: theme.colors.neutrals.white,
  },
  moodFilter: {
    paddingHorizontal: theme.spacing.scales.lg,
    marginBottom: theme.spacing.scales.md,
    flexGrow: 0,
  },
  moodChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.white,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    marginRight: theme.spacing.scales.sm,
  },
  moodChipEmoji: {
    fontSize: 14,
  },
  moodChipText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray700,
  },
  moodChipTextActive: {
    color: theme.colors.neutrals.white,
  },
  entriesList: {
    flex: 1,
  },
  entriesListContent: {
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