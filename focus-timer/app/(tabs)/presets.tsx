import { useRouter, useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PresetCard from "../../components/PresetCard";
import { useTimer } from "../../hooks/useTimer";
import { theme } from "../../theme/theme";

export default function PresetsScreen() {
  const router = useRouter();
  const { select } = useLocalSearchParams<{ select?: string }>();
  const { presets, addPreset, deletePreset, updatePreset, setSelectedPresetId } = useTimer();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPreset, setEditingPreset] = useState<any>(null);
  const [name, setName] = useState("");
  const [workDuration, setWorkDuration] = useState("25");
  const [breakDuration, setBreakDuration] = useState("5");
  const [longBreakDuration, setLongBreakDuration] = useState("");
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState("");

  const handleSelectPreset = async (presetId: number) => {
    await setSelectedPresetId(presetId);
    if (select === "true") {
      // If we're in selection mode, go back to timer
      router.back();
    }
  };

  const handleAddPreset = () => {
    setEditingPreset(null);
    setName("");
    setWorkDuration("25");
    setBreakDuration("5");
    setLongBreakDuration("");
    setSessionsBeforeLongBreak("");
    setModalVisible(true);
  };

  const handleEditPreset = (preset: any) => {
    setEditingPreset(preset);
    setName(preset.name);
    setWorkDuration(String(preset.workDuration));
    setBreakDuration(String(preset.breakDuration));
    setLongBreakDuration(preset.longBreakDuration ? String(preset.longBreakDuration) : "");
    setSessionsBeforeLongBreak(preset.sessionsBeforeLongBreak ? String(preset.sessionsBeforeLongBreak) : "");
    setModalVisible(true);
  };

  const handleSave = () => {
    const work = parseInt(workDuration);
    const breakTime = parseInt(breakDuration);
    const longBreak = longBreakDuration ? parseInt(longBreakDuration) : undefined;
    const sessions = sessionsBeforeLongBreak ? parseInt(sessionsBeforeLongBreak) : undefined;
    
    if (isNaN(work) || work <= 0) {
      Alert.alert("Error", "Work duration must be a positive number");
      return;
    }
    if (isNaN(breakTime) || breakTime <= 0) {
      Alert.alert("Error", "Break duration must be a positive number");
      return;
    }
    
    if (editingPreset) {
      updatePreset(editingPreset.id, {
        name,
        workDuration: work,
        breakDuration: breakTime,
        longBreakDuration: longBreak,
        sessionsBeforeLongBreak: sessions,
      });
    } else {
      addPreset({
        name,
        workDuration: work,
        breakDuration: breakTime,
        longBreakDuration: longBreak,
        sessionsBeforeLongBreak: sessions,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }
    
    setModalVisible(false);
  };

  const handleDelete = (id: number, name: string) => {
    Alert.alert(
      "Delete Preset",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => deletePreset(id)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer Presets</Text>
        <Text style={styles.subtitle}>
          {presets.length} preset{presets.length !== 1 ? "s" : ""} available
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            onSelect={() => handleSelectPreset(preset.id)}
            onEdit={() => handleEditPreset(preset)}
            onDelete={() => handleDelete(preset.id, preset.name)}
          />
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.fab} onPress={handleAddPreset}>
        <Plus size={24} color={theme.colors.neutrals.white} />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingPreset ? "Edit Preset" : "Create Preset"}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Preset name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <Text style={styles.label}>Work Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="25"
              value={workDuration}
              onChangeText={setWorkDuration}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <Text style={styles.label}>Break Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="5"
              value={breakDuration}
              onChangeText={setBreakDuration}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <Text style={styles.label}>Long Break Duration (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="15"
              value={longBreakDuration}
              onChangeText={setLongBreakDuration}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <Text style={styles.label}>Sessions before long break (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="4"
              value={sessionsBeforeLongBreak}
              onChangeText={setSessionsBeforeLongBreak}
              keyboardType="numeric"
              placeholderTextColor={theme.colors.neutrals.gray400}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, (!name || !workDuration || !breakDuration) && styles.saveButtonDisabled]} 
                onPress={handleSave}
                disabled={!name || !workDuration || !breakDuration}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  header: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingTop: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.md,
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
  content: {
    paddingHorizontal: theme.spacing.scales.lg,
    paddingBottom: theme.spacing.scales.xxl,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing.scales.lg,
    right: theme.spacing.scales.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    width: "85%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    marginBottom: theme.spacing.scales.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.neutrals.gray700,
    marginBottom: theme.spacing.scales.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.neutrals.gray200,
    borderRadius: theme.borders.radius.md,
    padding: theme.spacing.scales.md,
    fontSize: 16,
    marginBottom: theme.spacing.scales.md,
  },
  modalButtons: {
    flexDirection: "row",
    gap: theme.spacing.scales.md,
    marginTop: theme.spacing.scales.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.gray100,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.gray600,
  },
  saveButton: {
    flex: 1,
    paddingVertical: theme.spacing.scales.md,
    borderRadius: theme.borders.radius.md,
    alignItems: "center",
    backgroundColor: theme.colors.brand.primary,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.neutrals.white,
  },
});