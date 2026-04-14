import { useRouter } from "expo-router";
import { Delete, RotateCcw } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import CalculatorButton from "../../components/CalculatorButton";
import { useCalculator } from "../../hooks/useCalculator";
import { theme } from "../../theme/theme";

export default function CalculatorScreen() {
  const router = useRouter();
  const {
    currentValue,
    previousValue,
    operation,
    inputDigit,
    inputDecimal,
    clear,
    clearAll,
    deleteLastDigit,
    performOperation,
    calculate,
    getPercentage,
    toggleSign,
  } = useCalculator();

  const getDisplayValue = () => {
    if (currentValue === "Error") return "Error";
    
    // Format large numbers
    const num = parseFloat(currentValue);
    if (!isNaN(num) && Math.abs(num) > 999999999) {
      return num.toExponential(8);
    }
    
    return currentValue;
  };

  const getExpressionDisplay = () => {
    if (previousValue && operation) {
      return `${previousValue} ${operation}`;
    }
    return "";
  };

  return (
    <View style={styles.container}>
      {/* Display */}
      <View style={styles.displayContainer}>
        <View style={styles.display}>
          <Text style={styles.expressionText}>{getExpressionDisplay()}</Text>
          <Text style={styles.currentText} numberOfLines={1} adjustsFontSizeToFit>
            {getDisplayValue()}
          </Text>
        </View>
      </View>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        {/* Row 1 */}
        <View style={styles.row}>
          <CalculatorButton label="C" type="function" onPress={clear} />
          <CalculatorButton label="⌫" type="function" onPress={deleteLastDigit}>
            <Delete size={20} color={theme.colors.neutrals.gray700} />
          </CalculatorButton>
          <CalculatorButton label="%" type="function" onPress={getPercentage} />
          <CalculatorButton label="÷" type="operator" onPress={() => performOperation("÷")} />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <CalculatorButton label="7" onPress={() => inputDigit("7")} />
          <CalculatorButton label="8" onPress={() => inputDigit("8")} />
          <CalculatorButton label="9" onPress={() => inputDigit("9")} />
          <CalculatorButton label="×" type="operator" onPress={() => performOperation("×")} />
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <CalculatorButton label="4" onPress={() => inputDigit("4")} />
          <CalculatorButton label="5" onPress={() => inputDigit("5")} />
          <CalculatorButton label="6" onPress={() => inputDigit("6")} />
          <CalculatorButton label="-" type="operator" onPress={() => performOperation("-")} />
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <CalculatorButton label="1" onPress={() => inputDigit("1")} />
          <CalculatorButton label="2" onPress={() => inputDigit("2")} />
          <CalculatorButton label="3" onPress={() => inputDigit("3")} />
          <CalculatorButton label="+" type="operator" onPress={() => performOperation("+")} />
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <CalculatorButton label="+/-" type="function" onPress={toggleSign} />
          <CalculatorButton label="0" onPress={() => inputDigit("0")} />
          <CalculatorButton label="." onPress={inputDecimal} />
          <CalculatorButton label="=" type="equals" onPress={calculate} />
        </View>

        {/* Extra row for AC */}
        <View style={styles.row}>
          <CalculatorButton label="AC" type="function" onPress={clearAll} size="double" />
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.gray50,
  },
  displayContainer: {
    padding: theme.spacing.scales.lg,
    paddingTop: theme.spacing.scales.sm,
    paddingBottom: theme.spacing.scales.md,
  },
  display: {
    backgroundColor: theme.colors.neutrals.white,
    borderRadius: theme.borders.radius.lg,
    padding: theme.spacing.scales.lg,
    minHeight: 140,
    justifyContent: "center",
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expressionText: {
    fontSize: 16,
    color: theme.colors.neutrals.gray500,
    marginBottom: theme.spacing.scales.sm,
    textAlign: "right",
  },
  currentText: {
    fontSize: 48,
    fontWeight: "600",
    color: theme.colors.neutrals.gray900,
    textAlign: "right",
  },
  buttonGrid: {
    flex: 1,
    paddingHorizontal: theme.spacing.scales.sm,
    paddingBottom: theme.spacing.scales.lg,
    gap: 20
  },
  row: {
    flexDirection: "row",
    flex: 1,  
  },
});