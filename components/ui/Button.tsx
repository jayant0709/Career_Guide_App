import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "@/lib/utils";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "default",
  size = "default",
  disabled = false,
  loading = false,
  style,
  textStyle,
  children,
}: ButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    size === "default" ? styles.defaultSize : styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text` as keyof typeof styles],
    size === "default"
      ? styles.defaultText
      : styles[`${size}Text` as keyof typeof styles],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "default" ? colors.textPrimary : colors.primary}
        />
      ) : (
        <>{children ? children : <Text style={textStyles}>{title}</Text>}</>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  default: {
    backgroundColor: colors.accent,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.backgroundGreen,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    opacity: 0.5,
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  defaultSize: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  baseText: {
    fontWeight: "600",
    textAlign: "center",
  },
  defaultText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  outlineText: {
    color: colors.primary,
    fontSize: 16,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 16,
  },
  ghostText: {
    color: colors.primary,
    fontSize: 16,
  },
  disabledText: {
    opacity: 0.5,
  },
  smText: {
    fontSize: 14,
  },
  lgText: {
    fontSize: 18,
  },
});
