import { useLocalSearchParams, useRouter } from "expo-router";
import { Pause, Play, RotateCcw, SkipForward, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CircularProgress from "../components/CircularProgress";
import { useTimer } from "../hooks/useTimer";
import { theme } from "../theme/theme";

export default function TimerSessionScreen() {
  const router = useRouter();
  const { presetId } = useLocalSearchParams();
  const { presets, addSession } = useTimer();
  const preset = presets.find(p => p.id === Number(presetId)) || presets[0];
  
  const [timeRemaining, setTimeRemaining] = useState(preset.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"work" | "break" | "longBreak">("work");
  const [sessionCount, setSessionCount] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

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
    
    await addSession({
      presetId: preset.id,
      presetName: preset.name,
      duration: currentPhase === "work" ? preset.workDuration : 
                currentPhase === "break" ? preset.breakDuration : 
                (preset.longBreakDuration || 15),
      type: currentPhase,
    });
    
    if (currentPhase === "work") {
      const newSessionCount = sessionCount + 1;
      setSessionCount(newSessionCount);
      
      if (preset.longBreakDuration && 
          preset.sessionsBeforeLongBreak && 
          newSessionCount % preset.sessionsBeforeLongBreak === 0) {
        setCurrentPhase("longBreak");
        setTimeRemaining(preset.longBreakDuration * 60);
      } else {
        setCurrentPhase("break");
        setTimeRemaining(preset.breakDuration * 60);
      }
    } else {
      setCurrentPhase("work");
      setTimeRemaining(preset.workDuration * 60);
    }
  };

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleReset = () => {
    if (intervalId) clearInterval(intervalId);
    setIsActive(false);
    setTimeRemaining(preset.workDuration * 60);
    setCurrentPhase("work");
    setSessionCount(0);
  };
  const handleSkip = () => {
    if (intervalId) clearInterval(intervalId);
    setIsActive(false);
    handleComplete();
  };

  const progress = 1 - (timeRemaining / (
    currentPhase === "work" 
      ? preset.workDuration * 60
      : currentPhase === "break"
      ? preset.breakDuration * 60
      : (preset.longBreakDuration || 15) * 60
  ));

  const getPhaseText = () => {
    switch (currentPhase) {
      case "work": return "Focus Time";
      case "break": return "Break Time";
      case "longBreak": return "Long Break";
      default: return "Focus";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color={theme.colors.neutrals.gray500} />
        </TouchableOpacity>
        <Text style={styles.presetName}>{preset.name}</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <View style={styles.timerContainer}>
        <CircularProgress
          size={300}
          strokeWidth={12}
          progress={progress}
          timeRemaining={timeRemaining}
          totalTime={currentPhase === "work" ? preset.workDuration * 60 : preset.breakDuration * 60}
          isActive={isActive}
        />
        
        <Text style={styles.phaseText}>{getPhaseText()}</Text>
        {currentPhase === "work" && (
          <Text style={styles.sessionText}>
            Session {sessionCount + 1}
            {preset.sessionsBeforeLongBreak && `/${preset.sessionsBeforeLongBreak}`}
          </Text>
        )}
      </View>
      
      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.playButton} onPress={handleStart}>
            <Play size={40} color={theme.colors.neutrals.white} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.playButton} onPress={handlePause}>
            <Pause size={40} color={theme.colors.neutrals.white} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.secondaryButton} onPress={handleReset}>
          <RotateCcw size={24} color={theme.colors.neutrals.gray600} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleSkip}>
          <SkipForward size={24} color={theme.colors.neutrals.gray600} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.scales.md,
    paddingTop: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.md,
  },
  closeButton: {
    padding: 8,
  },
  presetName: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
  },
  timerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phaseText: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.brand.primary,
    marginTop: theme.spacing.scales.xl,
  },
  sessionText: {
    fontSize: 14,
    color: theme.colors.neutrals.gray500,
    marginTop: theme.spacing.scales.xs,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.brand.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.neutrals.gray100,
    alignItems: "center",
    justifyContent: "center",
  },
});