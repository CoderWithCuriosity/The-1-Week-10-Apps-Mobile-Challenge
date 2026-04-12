import { Calendar, Check, Flag, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "../data/tasks";
import { theme } from "../theme/theme";

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onPress?: () => void;
  onDelete?: () => void;
}

const priorityColors = {
  low: "#10B981",
  medium: "#F59E0B",
  high: "#EF4444",
};

const priorityLabels = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function TaskCard({ task, onToggle, onPress, onDelete }: TaskCardProps) {
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

  const getCategoryColor = () => {
    const category = categories.find(c => c.id === task.category);
    return category?.color || theme.colors.brand.primary;
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
        <TouchableOpacity onPress={onToggle} style={styles.checkContainer}>
          <View style={[styles.checkbox, task.isCompleted && styles.checkboxChecked]}>
            {task.isCompleted && <Check size={14} color={theme.colors.neutrals.white} />}
          </View>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <Text style={[styles.title, task.isCompleted && styles.titleCompleted]}>
            {task.title}
          </Text>
          
          {task.description && (
            <Text style={[styles.description, task.isCompleted && styles.descriptionCompleted]} numberOfLines={2}>
              {task.description}
            </Text>
          )}
          
          <View style={styles.tagsContainer}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() + "10" }]}>
              <Text style={[styles.categoryText, { color: getCategoryColor() }]}>
                {task.category}
              </Text>
            </View>
            
            <View style={[styles.priorityBadge, { backgroundColor: priorityColors[task.priority] + "10" }]}>
              <Flag size={10} color={priorityColors[task.priority]} />
              <Text style={[styles.priorityText, { color: priorityColors[task.priority] }]}>
                {priorityLabels[task.priority]}
              </Text>
            </View>
            
            {task.dueDate && (
              <View style={styles.dateBadge}>
                <Calendar size={10} color={theme.colors.neutrals.gray500} />
                <Text style={styles.dateText}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        </View>
        
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Trash2 size={18} color={theme.colors.neutrals.gray500} />
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
    alignItems: "flex-start",
    gap: theme.spacing.scales.md,
  },
  checkContainer: {
    paddingTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 2,
    borderColor: theme.colors.neutrals.gray300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutrals.white,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.brand.primary,
    borderColor: theme.colors.brand.primary,
  },
  infoContainer: {
    flex: 1,
    gap: theme.spacing.scales.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: theme.colors.neutrals.gray500,
  },
  description: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
    lineHeight: 18,
  },
  descriptionCompleted: {
    textDecorationLine: "line-through",
    color: theme.colors.neutrals.gray400,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.xs,
    marginTop: 4,
  },
  categoryBadge: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "500",
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
    backgroundColor: theme.colors.neutrals.gray100,
  },
  dateText: {
    fontSize: 10,
    color: theme.colors.neutrals.gray500,
  },
  deleteButton: {
    padding: 4,
  },
});

import { categories } from "../data/tasks";