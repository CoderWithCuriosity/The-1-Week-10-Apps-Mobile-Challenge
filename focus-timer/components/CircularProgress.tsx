import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { theme } from "../theme/theme";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 1
  timeRemaining: number;
  totalTime: number;
  isActive: boolean;
}

export default function CircularProgress({
  size,
  strokeWidth,
  progress,
  timeRemaining,
  totalTime,
  isActive,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress);
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const getColor = () => {
    if (!isActive) return theme.colors.neutrals.gray300;
    if (progress < 0.25) return theme.colors.feedback.success;
    if (progress < 0.5) return theme.colors.brand.primary;
    if (progress < 0.75) return theme.colors.feedback.warning;
    return theme.colors.feedback.error;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.neutrals.gray200}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </Text>
        <Text style={styles.labelText}>
          {isActive ? "Focusing" : "Ready"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 48,
    fontWeight: "700",
    color: theme.colors.neutrals.gray900,
    fontVariant: ['tabular-nums'],
  },
  labelText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginTop: 4,
  },
});