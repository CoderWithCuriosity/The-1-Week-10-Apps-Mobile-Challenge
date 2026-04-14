import { BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Lesson, difficulties } from "../data/lessons";
import { theme } from "../theme/theme";

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  onStudy?: () => void;
  progress?: { studyCount: number; masteryLevel: number };
}

export default function LessonCard({ lesson, onPress, onStudy, progress }: LessonCardProps) {
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

  const difficulty = difficulties.find(d => d.id === lesson.difficulty);
  const categoryColor = categories.find(c => c.id === lesson.category)?.color || theme.colors.brand.primary;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={styles.cardContent}
      >
        <View style={styles.header}>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor + "10" }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {lesson.category}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: difficulty?.color + "10" }]}>
            <Text style={[styles.difficultyText, { color: difficulty?.color }]}>
              {difficulty?.label}
            </Text>
          </View>
          {lesson.isCompleted && (
            <CheckCircle size={16} color={theme.colors.feedback.success} />
          )}
        </View>
        
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {lesson.summary || lesson.content.substring(0, 100)}...
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.stats}>
            <BookOpen size={14} color={theme.colors.neutrals.gray500} />
            <Text style={styles.statText}>Studied {lesson.studyCount}x</Text>
          </View>
          {progress && (
            <View style={styles.stats}>
              <TrendingUp size={14} color={theme.colors.brand.primary} />
              <Text style={[styles.statText, { color: theme.colors.brand.primary }]}>
                {progress.masteryLevel}% mastered
              </Text>
            </View>
          )}
        </View>
        
        {onStudy && !lesson.isCompleted && (
          <TouchableOpacity style={styles.studyButton} onPress={onStudy}>
            <Text style={styles.studyButtonText}>Study Now</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    marginBottom: theme.spacing.scales.md,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    padding: theme.spacing.scales.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    marginBottom: theme.spacing.scales.sm,
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
  difficultyBadge: {
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.sm,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  summary: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
    lineHeight: 18,
    marginBottom: theme.spacing.scales.sm,
  },
  footer: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginBottom: theme.spacing.scales.sm,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  studyButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    marginTop: theme.spacing.scales.xs,
  },
  studyButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});

import { categories } from "../data/lessons";