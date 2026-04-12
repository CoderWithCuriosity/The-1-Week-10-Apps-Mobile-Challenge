import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moods } from "../data/entries";
import { theme } from "../theme/theme";

interface MoodSelectorProps {
  selectedMood: string;
  onSelectMood: (moodId: string) => void;
}

export default function MoodSelector({ selectedMood, onSelectMood }: MoodSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {moods.map((mood) => (
        <TouchableOpacity
          key={mood.id}
          style={[
            styles.moodOption,
            selectedMood === mood.id && { backgroundColor: mood.color, borderColor: mood.color }
          ]}
          onPress={() => onSelectMood(mood.id)}
        >
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text style={[
            styles.moodLabel,
            selectedMood === mood.id && styles.moodLabelActive
          ]}>
            {mood.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.scales.md,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.scales.md,
    gap: theme.spacing.scales.sm,
  },
  moodOption: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.full,
    backgroundColor: theme.colors.neutrals.white,
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    flexDirection: "row",
    gap: theme.spacing.scales.xs,
  },
  moodEmoji: {
    fontSize: 16,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
  },
  moodLabelActive: {
    color: theme.colors.neutrals.white,
  },
});