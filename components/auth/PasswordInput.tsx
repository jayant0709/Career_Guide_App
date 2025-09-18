import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { colors } from "@/lib/utils";

interface PasswordInputProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  testID?: string;
}

export function PasswordInput({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder = "Enter your password",
  error,
  required = false,
  testID,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Label required={required}>{label}</Label>
      <View style={styles.inputContainer}>
        <Input
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={
            error ? { ...styles.input, ...styles.inputError } : styles.input
          }
          testID={testID}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: colors.red,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 12,
    bottom: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
