import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme/theme";

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showLabel?: boolean;
  color?: string;
}

export default function ProgressBar({ 
  progress, 
  height = 8, 
  showLabel = false,
  color = theme.colors.brand.primary 
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>Mastery Level</Text>
          <Text style={styles.percentageText}>{clampedProgress}%</Text>
        </View>
      )}
      <View style={[styles.progressBar, { height }]}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${clampedProgress}%`, backgroundColor: color, height }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.scales.xs,
  },
  labelText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.brand.primary,
  },
  progressBar: {
    backgroundColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.full,
    overflow: "hidden",
  },
  progressFill: {
    borderRadius: theme.borders.radius.full,
  },
});