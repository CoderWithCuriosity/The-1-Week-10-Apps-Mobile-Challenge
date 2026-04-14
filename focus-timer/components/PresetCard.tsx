import { Clock, Edit2, Play, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TimerPreset } from "../data/presets";
import { theme } from "../theme/theme";

interface PresetCardProps {
  preset: TimerPreset;
  onSelect: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PresetCard({ preset, onSelect, onEdit, onDelete }: PresetCardProps) {
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

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.cardContent}
      >
        <View style={[styles.iconContainer, { backgroundColor: (preset.color || theme.colors.brand.primary) + "10" }]}>
          <Clock size={24} color={preset.color || theme.colors.brand.primary} />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{preset.name}</Text>
          <View style={styles.details}>
            <Text style={styles.detailText}>
              Work: {formatTime(preset.workDuration)}
            </Text>
            <Text style={styles.detailText}>
              Break: {formatTime(preset.breakDuration)}
            </Text>
            {preset.longBreakDuration && (
              <Text style={styles.detailText}>
                Long: {formatTime(preset.longBreakDuration)}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={onSelect} style={styles.actionButton}>
            <Play size={18} color={theme.colors.brand.primary} />
          </TouchableOpacity>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Edit2 size={16} color={theme.colors.neutrals.gray500} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <Trash2 size={16} color={theme.colors.feedback.error} />
            </TouchableOpacity>
          )}
        </View>
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
    alignItems: "center",
    gap: theme.spacing.scales.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  details: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.sm,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.scales.sm,
  },
  actionButton: {
    padding: 8,
  },
});