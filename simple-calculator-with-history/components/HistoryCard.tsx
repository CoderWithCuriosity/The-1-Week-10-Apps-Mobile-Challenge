import { Trash2 } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calculation } from "../data/calculations";
import { theme } from "../theme/theme";

interface HistoryCardProps {
  calculation: Calculation;
  onPress: () => void;
  onDelete: () => void;
}

export default function HistoryCard({ calculation, onPress, onDelete }: HistoryCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.cardContent}
      >
        <View style={styles.leftContent}>
          <Text style={styles.expression}>{calculation.expression}</Text>
          <Text style={styles.result}>= {calculation.result}</Text>
          <Text style={styles.timestamp}>{formatDate(calculation.timestamp)}</Text>
        </View>
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Trash2 size={18} color={theme.colors.neutrals.gray400} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    marginBottom: theme.spacing.scales.sm,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    padding: theme.spacing.scales.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flex: 1,
  },
  expression: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginBottom: 4,
  },
  result: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 11,
    color: theme.colors.neutrals.gray400,
  },
  deleteButton: {
    padding: 8,
  },
});