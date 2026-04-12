// components/ShareButton.tsx
import { Share2 } from "lucide-react-native";
import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme/theme";

interface ShareButtonProps {
  affirmationText: string;
}

export default function ShareButton({ affirmationText }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${affirmationText}"\n\n— Shared from Daily Affirmations App`,
        title: "Share Affirmation",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
      <Share2 size={16} color={theme.colors.neutrals.gray500} />
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.xs,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    backgroundColor: theme.colors.neutrals.gray50,
    borderRadius: theme.borders.radius.md,
  },
  shareText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray500,
  },
});