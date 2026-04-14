import { useRouter } from "expo-router";
import { Filter, Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategoryFilter from "../../components/CategoryFilter";
import ChallengeCard from "../../components/ChallengeCard";
import CreateChallengeModal from "../../components/CreateChallengeModal";
import { difficulties } from "../../data/challenges";
import { useChallenges } from "../../hooks/useChallenges";
import { theme } from "../../theme/theme";

export default function ChallengesScreen() {
  const router = useRouter();
  const { challenges, getChallengesByCategory, completeChallenge, addChallenge, deleteChallenge } = useChallenges();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  
  let filteredChallenges = getChallengesByCategory(selectedCategory);
  
  if (selectedDifficulty !== "all") {
    filteredChallenges = filteredChallenges.filter(c => c.difficulty === selectedDifficulty);
  }
  
  const handleComplete = (challengeId: number, title: string) => {
    Alert.alert(
      "Complete Challenge",
      `Mark "${title}" as completed?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Complete", 
          onPress: () => completeChallenge(challengeId)
        }
      ]
    );
  };
  
  const handleCreate = (newChallenge: any) => {
    addChallenge(newChallenge);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Challenges</Text>
        <Text style={styles.subtitle}>
          {filteredChallenges.length} challenge{filteredChallenges.length !== 1 ? "s" : ""}
        </Text>
      </View>
      
      <View style={styles.filterHeader}>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} color={theme.colors.neutrals.gray500} />
        </TouchableOpacity>
      </View>
      
      {showFilters && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.difficultyFilter}>
          <TouchableOpacity
            style={[
              styles.difficultyChip,
              selectedDifficulty === "all" && styles.difficultyChipActive
            ]}
            onPress={() => setSelectedDifficulty("all")}
          >
            <Text style={[
              styles.difficultyChipText,
              selectedDifficulty === "all" && styles.difficultyChipTextActive
            ]}>All</Text>
          </TouchableOpacity>
          {difficulties.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={[
                styles.difficultyChip,
                selectedDifficulty === d.id && { backgroundColor: d.color, borderColor: d.color }
              ]}
              onPress={() => setSelectedDifficulty(d.id)}
            >
              <Text style={[
                styles.difficultyChipText,
                selectedDifficulty === d.id && styles.difficultyChipTextActive
              ]}>{d.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <ScrollView 
        style={styles.challengesList}
        contentContainerStyle={styles.challengesListContent}
      >
        {filteredChallenges.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No challenges found</Text>
          </View>
        ) : (
          filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => router.push(`/challenge/${challenge.id}`)}
              onComplete={() => handleComplete(challenge.id, challenge.title)}
              showCompleteButton={!challenge.completedToday}
            />
          ))
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} color={theme.colors.neutrals.white} />
      </TouchableOpacity>
      
      <CreateChallengeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={handleCreate}
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
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: theme.spacing.scales.md,
  },
  filterButton: {
    padding: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  difficultyFilter: {
    paddingHorizontal: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.md,
  },
  difficultyChip: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.white,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    marginRight: theme.spacing.scales.sm,
  },
  difficultyChipActive: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  difficultyChipText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray600,
  },
  difficultyChipTextActive: {
    color: theme.colors.neutrals.white,
  },
  challengesList: {
    flex: 1,
  },
  challengesListContent: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  emptyContainer: {
    padding: theme.spacing.scales.xl,
    alignItems: "center",
  },
  emptyText: {
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
});