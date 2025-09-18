import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, commonStyles } from "@/lib/utils";
import { steps } from "./data";

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>How It Works</Text>
          <Text style={styles.subtitle}>
            Three simple steps to discover your ideal career path
          </Text>
        </View>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.stepCard, commonStyles.shadowLarge]}
              onPress={() =>
                setHoveredStep(hoveredStep === index ? null : index)
              }
              activeOpacity={0.9}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={step.iconName as any}
                  size={40}
                  color={colors.white}
                />
              </View>

              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>Step {index + 1}</Text>
              </View>

              <Text style={styles.stepTitle}>{step.title}</Text>

              <Text style={styles.stepDescription}>{step.description}</Text>

              {/* Example (shown when pressed) */}
              {hoveredStep === index && (
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleTitle}>Example:</Text>
                  <View style={styles.exampleContent}>
                    <Text style={styles.exampleText}>{step.example}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Connecting Line (Visual indicator) */}
        <View style={styles.connectionIndicator}>
          <View style={styles.connectionLine} />
          {steps.map((_, index) => (
            <View key={index} style={styles.connectionDot} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 80,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 64,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 26,
  },
  stepsContainer: {
    gap: 32,
  },
  stepCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  iconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  stepBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  stepBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 28,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
  exampleContainer: {
    marginTop: 24,
    width: "100%",
    backgroundColor: colors.backgroundGreen,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  exampleContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
  },
  exampleText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  connectionIndicator: {
    marginTop: 32,
    alignItems: "center",
    position: "relative",
  },
  connectionLine: {
    width: "60%",
    height: 2,
    backgroundColor: colors.accent,
    borderRadius: 1,
  },
  connectionDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
