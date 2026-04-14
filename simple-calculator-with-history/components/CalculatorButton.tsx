import { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../theme/theme";

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  type?: "number" | "operator" | "function" | "equals";
  size?: "normal" | "double";
  children?: ReactNode;
}

export default function CalculatorButton({
  label,
  onPress,
  type = "number",
  size = "normal",
  children
}: CalculatorButtonProps) {
  const getButtonStyle = () => {
    switch (type) {
      case "operator":
        return styles.operatorButton;
      case "function":
        return styles.functionButton;
      case "equals":
        return styles.equalsButton;
      default:
        return styles.numberButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case "operator":
        return styles.operatorText;
      case "function":
        return styles.functionText;
      case "equals":
        return styles.equalsText;
      default:
        return styles.numberText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        size === "double" && styles.doubleButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children ? (
        children
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 4,
    height: 60,
    borderRadius: theme.borders.radius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.neutrals.white,
    shadowColor: theme.colors.neutrals.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  doubleButton: {
    flex: 2,
  },
  numberButton: {
    backgroundColor: theme.colors.neutrals.white,
  },
  operatorButton: {
    backgroundColor: theme.colors.brand.primary,
  },
  functionButton: {
    backgroundColor: theme.colors.neutrals.gray100,
  },
  equalsButton: {
    backgroundColor: theme.colors.feedback.success,
  },
  text: {
    fontSize: 28,
    fontWeight: "500",
  },
  numberText: {
    color: theme.colors.neutrals.gray900,
  },
  operatorText: {
    color: theme.colors.neutrals.white,
  },
  functionText: {
    color: theme.colors.neutrals.gray700,
    fontSize: 20,
  },
  equalsText: {
    color: theme.colors.neutrals.white,
  },
});