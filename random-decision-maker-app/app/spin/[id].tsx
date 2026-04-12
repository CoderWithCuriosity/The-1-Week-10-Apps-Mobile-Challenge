import { useLocalSearchParams, useRouter } from "expo-router";
import { Shuffle, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useChoices } from "../../hooks/useChoices";
import { theme } from "../../theme/theme";

export default function SpinScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { choices, makeDecision, getStats } = useChoices();
  const [result, setResult] = useState<{ choice: any; isSpinning: boolean }>({ choice: null, isSpinning: false });
  
  const spinAnim = React.useRef(new Animated.Value(0)).current;
  const choice = choices.find(c => c.id === Number(id));
  const stats = getStats();

  if (!choice) {
    return (
      <View style={styles.centered}>
        <Text>Choice not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getCategoryColor = () => {
    const category = categories.find(c => c.id === choice.category);
    return category?.color || theme.colors.brand.primary;
  };

  const handleSpin = () => {
    const { choice: selectedChoice } = makeDecision(choice.category);
    
    if (selectedChoice) {
      setResult({ choice: selectedChoice, isSpinning: true });
      
      Animated.sequence([
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(300),
        Animated.timing(spinAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setResult({ choice: selectedChoice, isSpinning: false });
      });
    }
  };

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ['0deg', '120deg', '240deg', '360deg', '480deg', '720deg'],
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.categoryHeader, { borderTopColor: getCategoryColor() }]}>
        <Text style={styles.emoji}>{choice.emoji}</Text>
        <Text style={styles.name}>{choice.name}</Text>
        {choice.description && (
          <Text style={styles.description}>{choice.description}</Text>
        )}
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{choice.timesChosen}</Text>
            <Text style={styles.statLabel}>Times Chosen</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{choice.weight}x</Text>
            <Text style={styles.statLabel}>Probability</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.spinCard}>
        <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
          <Shuffle size={48} color={getCategoryColor()} />
        </Animated.View>
        
        {result.isSpinning ? (
          <View style={styles.spinningContainer}>
            <Text style={styles.spinningText}>Spinning...</Text>
          </View>
        ) : result.choice ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultEmoji}>{result.choice.emoji}</Text>
            <Text style={styles.resultText}>{result.choice.name}</Text>
            {result.choice.description && (
              <Text style={styles.resultDescription}>{result.choice.description}</Text>
            )}
          </View>
        ) : (
          <View style={styles.readyContainer}>
            <Text style={styles.readyText}>Spin to decide!</Text>
            <Text style={styles.readySubtext}>
              Let fate choose from this category
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.spinButton, { backgroundColor: getCategoryColor() }]}
          onPress={handleSpin}
          disabled={result.isSpinning}
        >
          <Sparkles size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.spinButtonText}>Spin the Wheel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  content: {
    padding: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryHeader: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    alignItems: "center",
    borderTopWidth: 4,
    marginBottom: theme.spacing.scales.lg,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emoji: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
    marginBottom: theme.spacing.scales.lg,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.scales.xl,
    marginTop: theme.spacing.scales.md,
  },
  statItem: {
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
  },
  spinCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    alignItems: "center",
    gap: theme.spacing.scales.lg,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  spinningContainer: {
    paddingVertical: theme.spacing.scales.xl,
  },
  spinningText: {
    fontSize: 18,
    color: theme.colors.neutrals.gray500,
  },
  resultContainer: {
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.xl,
  },
  resultEmoji: {
    fontSize: 64,
  },
  resultText: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    textAlign: "center",
  },
  resultDescription: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
  },
  readyContainer: {
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    paddingVertical: theme.spacing.scales.xl,
  },
  readyText: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  readySubtext: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  spinButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    paddingHorizontal: theme.spacing.scales.xl,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.full,
    marginTop: theme.spacing.scales.md,
  },
  spinButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});

import { categories } from "../../data/choices";