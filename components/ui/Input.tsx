import React from "react";
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
} from "react-native";
import { colors } from "@/lib/utils";

interface InputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: TextStyle;
  error?: boolean;
  testID?: string;
}

export function Input({
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoCorrect = true,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  style,
  error = false,
  testID,
}: InputProps) {
  const inputStyles = [
    styles.base,
    error && styles.error,
    !editable && styles.disabled,
    style,
  ];

  return (
    <TextInput
      style={inputStyles}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      editable={editable}
      multiline={multiline}
      numberOfLines={numberOfLines}
      testID={testID}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.white,
    minHeight: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  error: {
    borderColor: colors.red,
  },
  disabled: {
    backgroundColor: colors.gray50,
    opacity: 0.7,
  },
});
