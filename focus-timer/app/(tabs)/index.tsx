import { useRouter } from "expo-router";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircularProgress from "../../components/CircularProgress";
import { useTimer } from "../../hooks/useTimer";
import { theme } from "../../theme/theme";

export default function TimerScreen() {
  const router = useRouter();
  const { presets, addSession } = useTimer();
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [timeRemaining, setTimeRemaining] = useState(selectedPreset?.workDuration * 60 || 0);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"work" | "break" | "longBreak">("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedPreset) {
      const totalSeconds = 
        currentPhase === "work" 
          ? selectedPreset.workDuration * 60
          : currentPhase === "break"
          ? selectedPreset.breakDuration * 60
          : (selectedPreset.longBreakDuration || 15) * 60;
      setTimeRemaining(totalSeconds);
    }
  }, [selectedPreset, currentPhase]);

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      const id = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (timeRemaining === 0 && isActive) {
      handleComplete();
    }
  }, [isActive, timeRemaining]);

  const handleComplete = async () => {
    if (intervalId) clearInterval(intervalId);
    setIsActive(false);
    
    // Record session
    await addSession({
      presetId: selectedPreset.id,
      presetName: selectedPreset.name,
      duration: currentPhase === "work" ? selectedPreset.workDuration : 
                currentPhase === "break" ? selectedPreset.breakDuration : 
                (selectedPreset.longBreakDuration || 15),
      type: currentPhase,
    });
    
    // Move to next phase
    if (currentPhase === "work") {
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      
      if (selectedPreset.longBreakDuration && 
          selectedPreset.sessionsBeforeLongBreak && 
          newSessionCount % selectedPreset.sessionsBeforeLongBreak === 0) {
        setCurrentPhase("longBreak");
      } else {
        setCurrentPhase("break");
      }
    } else {
      setCurrentPhase("work");
    }
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    if (intervalId) clearInterval(intervalId);
    setIsActive(false);
    const totalSeconds = 
      currentPhase === "work" 
        ? selectedPreset.workDuration * 60
        : currentPhase === "break"
        ? selectedPreset.breakDuration * 60
        : (selectedPreset.longBreakDuration || 15) * 60;
    setTimeRemaining(totalSeconds);
  };
  const handleSkip = () => {
    if (intervalId) clearInterval(intervalId);
    setIsActive(false);
    handleComplete();
  };

  const progress = 1 - (timeRemaining / (
    currentPhase === "work" 
      ? selectedPreset.workDuration * 60
      : currentPhase === "break"
      ? selectedPreset.breakDuration * 60
      : (selectedPreset.longBreakDuration || 15) * 60
  ));

  const getPhaseText = () => {
    switch (currentPhase) {
      case "work": return "Focus Time";
      case "break": return "Break Time";
      case "longBreak": return "Long Break";
      default: return "Focus";
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "work": return theme.colors.brand.primary;
      case "break": return theme.colors.feedback.success;
      case "longBreak": return theme.colors.info;
      default: return theme.colors.brand.primary;
    }
  };

  if (!selectedPreset) {
    return (
      <View style={styles.noPresetContainer}>
        <Text style={styles.noPresetText}>No timer presets found</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push("/presets")}
        >
          <Text style={styles.createButtonText}>Create Preset</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.presetSelector}>
        <Text style={styles.presetLabel}>Current Preset</Text>
        <TouchableOpacity 
          style={styles.presetButton}
          onPress={() => router.push("/presets")}
        >
          <Text style={styles.presetName}>{selectedPreset.name}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.timerContainer}>
        <CircularProgress
          size={280}
          strokeWidth={12}
          progress={progress}
          timeRemaining={timeRemaining}
          totalTime={currentPhase === "work" ? selectedPreset.workDuration * 60 : selectedPreset.breakDuration * 60}
          isActive={isActive}
        />
        
        <View style={styles.phaseBadge}>
          <Text style={[styles.phaseText, { color: getPhaseColor() }]}>
            {getPhaseText()}
          </Text>
          {currentPhase === "work" && sessionCount > 0 && (
            <Text style={styles.sessionCount}>
              Session {sessionCount + 1}
              {selectedPreset.sessionsBeforeLongBreak && `/${selectedPreset.sessionsBeforeLongBreak}`}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.controlButton} onPress={handleStart}>
            <Play size={32} color={theme.colors.neutrals.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.controlButton} onPress={handlePause}>
            <Pause size={32} color={theme.colors.neutrals.white} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.controlButtonSecondary} onPress={handleReset}>
          <RotateCcw size={24} color={theme.colors.neutrals.gray600} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButtonSecondary} onPress={handleSkip}>
          <SkipForward size={24} color={theme.colors.neutrals.gray600} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>💡 Pomodoro Technique</Text>
        <Text style={styles.infoText}>
          Work in focused intervals followed by short breaks to maintain productivity and prevent burnout.
        </Text>
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
    alignItems: "center",
    paddingBottom: theme.spacing.scales.xxl,
  },
  presetSelector: {
    alignSelf: "stretch",
    marginBottom: theme.spacing.scales.lg,
  },
  presetLabel: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginBottom: 4,
  },
  presetButton: {
    backgroundColor: theme.colors.neutrals.white,
    paddingHorizontal: theme.spacing.scales.md,
    paddingVertical: theme.spacing.scales.sm,
    borderRadius: theme.borders.radius.md,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  presetName: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray900,
  },
  timerContainer: {
    alignItems: "center",
    marginVertical: theme.spacing.scales.xl,
  },
  phaseBadge: {
    alignItems: "center",
    marginTop: theme.spacing.scales.lg,
  },
  phaseText: {
    fontSize: 18,
    fontWeight: "600",
  },
  sessionCount: {
    fontSize: 12,
    color: theme.colors.neutrals.gray500,
    marginTop: 4,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.xl,
  },
  controlButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  controlButtonSecondary: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.neutrals.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
  },
  infoCard: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.xl,
    alignSelf: "stretch",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: theme.colors.neutrals.gray500,
    lineHeight: 18,
  },
  noPresetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.scales.xl,
  },
  noPresetText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.md,
  },
  createButton: {
    backgroundColor: theme.colors.brand.primary,
    paddingHorizontal: theme.spacing.scales.lg,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.neutrals.white,
  },
});