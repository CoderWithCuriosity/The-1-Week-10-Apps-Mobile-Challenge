import { useRouter } from "expo-router";
import { Plus, Shuffle, Sparkles } from "lucide-react-native";
import React, { useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddChoiceModal from "../../components/AddChoiceModal";
import CategoryFilter from "../../components/CategoryFilter";
import { useChoices } from "../../hooks/useChoices";
import { theme } from "../../theme/theme";

export default function DecisionScreen() {
  const router = useRouter();
  const { choices, makeDecision, addChoice, getStats } = useChoices();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<{ choice: any; isSpinning: boolean }>({ choice: null, isSpinning: false });
  
  const spinAnim = React.useRef(new Animated.Value(0)).current;
  const stats = getStats();

  const handleDecide = () => {
    const category = selectedCategory === "all" ? undefined : selectedCategory;
    const { choice } = makeDecision(category);
    
    if (choice) {
      setResult({ choice, isSpinning: true });
      
      // Animation sequence
      Animated.sequence([
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.delay(300),
        Animated.timing(spinAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setResult({ choice, isSpinning: false });
      });
    }
  };

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
  });

  if (choices.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateIcon}>🎲</Text>
        <Text style={styles.emptyStateTitle}>No choices yet</Text>
        <Text style={styles.emptyStateText}>
          Add some options and let fate decide for you
        </Text>
        <TouchableOpacity 
          style={styles.emptyStateButton}
          onPress={() => setModalVisible(true)}
        >
          <Plus size={20} color={theme.colors.neutrals.white} />
          <Text style={styles.emptyStateButtonText}>Add First Choice</Text>
        </TouchableOpacity>
        
        <AddChoiceModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={addChoice}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Decision Maker</Text>
          <Text style={styles.subtitle}>
            {stats.totalChoices} choices • {stats.totalDecisions} decisions made
          </Text>
        </View>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <View style={styles.decisionCard}>
          <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
            <Shuffle size={48} color={theme.colors.brand.primary} />
          </Animated.View>
          
          {result.isSpinning ? (
            <View style={styles.spinningContainer}>
              <Text style={styles.spinningText}>Deciding...</Text>
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
              <Text style={styles.readyText}>Ready to decide?</Text>
              <Text style={styles.readySubtext}>
                {choices.filter(c => selectedCategory === "all" || c.category === selectedCategory).length} options available
              </Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.decideButton}
            onPress={handleDecide}
            disabled={result.isSpinning}
          >
            <Sparkles size={20} color={theme.colors.neutrals.white} />
            <Text style={styles.decideButtonText}>Make a Decision</Text>
          </TouchableOpacity>
        </View>
        
        {stats.mostChosen && stats.mostChosen.timesChosen > 0 && (
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🎯 Most Popular Choice</Text>
            <Text style={styles.tipText}>
              {stats.mostChosen.emoji} {stats.mostChosen.name} has been chosen {stats.mostChosen.timesChosen} times
            </Text>
          </View>
        )}
      </ScrollView>
      
      <AddChoiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addChoice}
      />
    </View>
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
  header: {
    marginBottom: theme.spacing.scales.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
  },
  decisionCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.xl,
    alignItems: "center",
    gap: theme.spacing.scales.lg,
    marginTop: theme.spacing.scales.lg,
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
  decideButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.xl,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.full,
    marginTop: theme.spacing.scales.md,
  },
  decideButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
  tipCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.lg,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.scales.md,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.sm,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
    textAlign: "center",
    marginBottom: theme.spacing.scales.xl,
  },
  emptyStateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.sm,
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});