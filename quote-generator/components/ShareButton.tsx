import { Share2 } from "lucide-react-native";
import React from "react";
import { Share, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../theme/theme";

interface ShareButtonProps {
  quoteText: string;
  author: string;
}

export default function ShareButton({ quoteText, author }: ShareButtonProps) {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `"${quoteText}"\n\n— ${author}\n\nShared from Quote Generator`,
        title: "Share Quote",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
      <Share2 size={18} color={theme.colors.neutrals.gray500} />
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
    backgroundColor: theme.colors.neutrals.gray100,
    borderRadius: theme.borders.radius.md,
  },
  shareText: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
});