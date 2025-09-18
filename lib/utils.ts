import { StyleSheet } from "react-native";

// Simple utility to merge styles for React Native
export function mergeStyles(...styles: any[]) {
  return StyleSheet.flatten(styles.filter(Boolean));
}

// Color constants from the Next.js project
export const colors = {
  primary: "#028489",
  primaryDark: "#0B2447",
  accent: "#F2B134",
  accentDark: "#E6A429",
  background: "#FCFBF8",
  backgroundGreen: "#E6FBF6", 
  textPrimary: "#0B2447",
  textSecondary: "#6B7280",
  white: "#FFFFFF",
  red: "#EF4444",
  redLight: "#FEE2E2",
  gray200: "#E5E7EB",
  gray50: "#F9FAFB",
};

// Common styles
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadowLarge: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
});