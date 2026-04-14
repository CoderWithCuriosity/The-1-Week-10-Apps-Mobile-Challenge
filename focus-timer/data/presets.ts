export interface TimerPreset {
  id: number;
  name: string;
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  longBreakDuration?: number; // in minutes
  sessionsBeforeLongBreak?: number;
  color?: string;
  isCustom?: boolean;
}

export interface Session {
  id: number;
  presetId: number;
  presetName: string;
  duration: number; // in minutes
  completedAt: string;
  type: "work" | "break" | "longBreak";
}

// One demo preset - users can add their own
export const presetsData: TimerPreset[] = [
  {
    id: 1,
    name: "Pomodoro",
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    color: "#EF4444",
  },
];

export const defaultPreset: TimerPreset = {
  id: 0,
  name: "Custom",
  workDuration: 25,
  breakDuration: 5,
  isCustom: true,
};

import { theme } from "../theme/theme";