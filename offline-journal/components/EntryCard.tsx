import { Heart, MoreVertical } from "lucide-react-native";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { JournalEntry, moods } from "../data/entries";
import { theme } from "../theme/theme";

interface EntryCardProps {
  entry: JournalEntry;
  onPress?: () => void;
  onFavorite?: () => void;
  compact?: boolean;
}

export default function EntryCard({ entry, onPress, onFavorite, compact = false }: EntryCardProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const mood = moods.find(m => m.id === entry.mood);

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
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
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
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {entry.title}
            </Text>
            {mood && (
              <View style={[styles.moodBadge, { backgroundColor: mood.color + "10" }]}>
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[styles.moodText, { color: mood.color }]}>{mood.label}</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity onPress={onFavorite} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Heart
              size={20}
              color={entry.isFavorite ? theme.colors.feedback.error : theme.colors.neutrals.gray500}
              fill={entry.isFavorite ? theme.colors.feedback.error : "none"}
            />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.content} numberOfLines={compact ? 2 : 3}>
          {entry.content}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.date}>{formatDate(entry.createdAt)}</Text>
          <View style={styles.tagsContainer}>
            {entry.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
            {entry.tags.length > 3 && (
              <Text style={styles.moreTags}>+{entry.tags.length - 3}</Text>
            )}
          </View>
        </View>
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.scales.sm,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    flexWrap: "wrap",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    flex: 1,
  },
  moodBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 4,
    borderRadius: theme.borders.radius.full,
  },
  moodEmoji: {
    fontSize: 12,
  },
  moodText: {
    fontSize: 10,
    fontWeight: "500",
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.neutrals.gray600,
    marginBottom: theme.spacing.scales.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: theme.spacing.scales.xs,
  },
  date: {
    fontSize: 11,
    color: theme.colors.neutrals.gray500,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.scales.xs,
  },
  tag: {
    backgroundColor: theme.colors.neutrals.gray100,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingVertical: 2,
    borderRadius: theme.borders.radius.sm,
  },
  tagText: {
    fontSize: 10,
    color: theme.colors.neutrals.gray500,
  },
  moreTags: {
    fontSize: 10,
    color: theme.colors.neutrals.gray500,
  },
});