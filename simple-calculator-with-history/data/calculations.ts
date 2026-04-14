export interface Calculation {
  id: number;
  expression: string;
  result: string;
  timestamp: string;
  type: "basic" | "advanced";
}

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
}

// Empty array - calculations are saved as users use the calculator
export const calculationsData: Calculation[] = [];

import { theme } from "../theme/theme";