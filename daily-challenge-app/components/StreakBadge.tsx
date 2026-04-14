import { Flame } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/theme";

interface StreakBadgeProps {
  streak: number;
  size?: "small" | "large";
}

export default function StreakBadge({ streak, size = "small" }: StreakBadgeProps) {
  const isLarge = size === "large";
  
  return (
    <View style={[styles.container, isLarge && styles.containerLarge]}>
      <Flame
        size={isLarge ? 28 : 16}
        color={theme.colors.feedback.warning}
        fill={theme.colors.feedback.warning}
      />
      <Text style={[styles.text, isLarge && styles.textLarge]}>
        {streak} day{streak !== 1 ? "s" : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
    backgroundColor: theme.colors.feedback.warning + "10",
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.xs,
    borderRadius: theme.borders.radius.full,
  },
  containerLarge: {
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    gap: theme.spacing.scales.sm,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.feedback.warning,
  },
  textLarge: {
    fontSize: 18,
  },
});