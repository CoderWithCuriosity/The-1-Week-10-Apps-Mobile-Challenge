import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Calculation, CalculatorState, calculationsData } from "../data/calculations";

const CALCULATIONS_KEY = "@calculator:history";

interface CalculatorContextType {
  calculations: Calculation[];
  currentValue: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
  loading: boolean;
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  clear: () => void;
  clearAll: () => void;
  deleteLastDigit: () => void;
  performOperation: (op: string) => void;
  calculate: () => void;
  getPercentage: () => void;
  toggleSign: () => void;
  deleteCalculation: (id: number) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedCalculations = await AsyncStorage.getItem(CALCULATIONS_KEY);
      if (storedCalculations) {
        setCalculations(JSON.parse(storedCalculations));
      } else {
        setCalculations([]);
        await AsyncStorage.setItem(CALCULATIONS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading calculations:", error);
      setCalculations([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCalculation = async (expression: string, result: string) => {
    const newCalculation: Calculation = {
      id: Date.now(),
      expression,
      result,
      timestamp: new Date().toISOString(),
      type: "basic",
    };
    
    setCalculations(prev => {
      const updated = [newCalculation, ...prev].slice(0, 100); // Keep last 100
      AsyncStorage.setItem(CALCULATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setCurrentValue(digit);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(prev => (prev === "0" ? digit : prev + digit));
    }
  }, [waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setCurrentValue("0.");
      setWaitingForOperand(false);
    } else if (!currentValue.includes(".")) {
      setCurrentValue(prev => prev + ".");
    }
  }, [waitingForOperand, currentValue]);

  const clear = useCallback(() => {
    setCurrentValue("0");
    setWaitingForOperand(false);
  }, []);

  const clearAll = useCallback(() => {
    setCurrentValue("0");
    setPreviousValue("");
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const deleteLastDigit = useCallback(() => {
    if (waitingForOperand) return;
    
    if (currentValue.length === 1) {
      setCurrentValue("0");
    } else {
      setCurrentValue(prev => prev.slice(0, -1));
    }
  }, [waitingForOperand, currentValue]);

  const performOperation = useCallback((op: string) => {
    if (previousValue && operation && !waitingForOperand) {
      calculate();
    }
    
    setOperation(op);
    setPreviousValue(currentValue);
    setWaitingForOperand(true);
  }, [previousValue, operation, waitingForOperand, currentValue]);

  const calculate = useCallback(async () => {
    if (!operation || !previousValue) return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let result = 0;
    let expression = `${previousValue} ${getOperationSymbol(operation)} ${currentValue}`;
    
    switch (operation) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          setCurrentValue("Error");
          setPreviousValue("");
          setOperation(null);
          setWaitingForOperand(false);
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }
    
    const resultStr = formatResult(result);
    setCurrentValue(resultStr);
    setPreviousValue("");
    setOperation(null);
    setWaitingForOperand(true);
    
    // Save to history
    await saveCalculation(expression, resultStr);
  }, [operation, previousValue, currentValue]);

  const getPercentage = useCallback(() => {
    const value = parseFloat(currentValue);
    if (isNaN(value)) return;
    
    const result = (value / 100).toString();
    setCurrentValue(result);
    setWaitingForOperand(true);
  }, [currentValue]);

  const toggleSign = useCallback(() => {
    const value = parseFloat(currentValue);
    if (isNaN(value)) return;
    
    const result = (value * -1).toString();
    setCurrentValue(result);
  }, [currentValue]);

  const getOperationSymbol = (op: string): string => {
    switch (op) {
      case "+": return "+";
      case "-": return "-";
      case "×": return "×";
      case "÷": return "÷";
      default: return op;
    }
  };

  const formatResult = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return "Error";
    
    // Handle floating point precision
    const rounded = Math.round(num * 1000000) / 1000000;
    
    if (Number.isInteger(rounded)) {
      return rounded.toString();
    }
    
    // Remove trailing zeros
    return rounded.toString().replace(/\.?0+$/, "");
  };

  const deleteCalculation = useCallback(async (id: number) => {
    setCalculations(prev => {
      const updated = prev.filter(calc => calc.id !== id);
      AsyncStorage.setItem(CALCULATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(async () => {
    setCalculations([]);
    await AsyncStorage.setItem(CALCULATIONS_KEY, JSON.stringify([]));
  }, []);

  return (
    <CalculatorContext.Provider value={{
      calculations,
      currentValue,
      previousValue,
      operation,
      waitingForOperand,
      loading,
      inputDigit,
      inputDecimal,
      clear,
      clearAll,
      deleteLastDigit,
      performOperation,
      calculate,
      getPercentage,
      toggleSign,
      deleteCalculation,
      clearHistory,
    }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}