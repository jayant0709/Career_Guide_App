import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { colors } from "@/lib/utils";

interface LabelProps {
  children: React.ReactNode;
  style?: TextStyle;
  required?: boolean;
}

export function Label({ children, style, required = false }: LabelProps) {
  return (
    <Text style={[styles.base, style]}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: colors.red,
  },
});
