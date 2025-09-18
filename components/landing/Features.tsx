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
import { features } from "./data";

export default function Features() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Everything You Need for Your Career Journey
          </Text>
          <Text style={styles.subtitle}>
            Comprehensive tools and resources to guide students from confusion
            to clarity
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View
              key={index}
              style={[
                styles.featureCard,
                commonStyles.shadowLarge,
                index % 2 === 1 && styles.offsetCard,
              ]}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={feature.iconName as any}
                  size={32}
                  color={colors.white}
                />
              </View>

              <Text style={styles.featureTitle}>{feature.title}</Text>

              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>

              <TouchableOpacity
                style={styles.learnMoreButton}
                onPress={() =>
                  setExpandedFeature(expandedFeature === index ? null : index)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.learnMoreText}>Learn more</Text>
                <Ionicons
                  name={
                    expandedFeature === index ? "chevron-up" : "chevron-down"
                  }
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>

              {/* Expandable Content */}
              {expandedFeature === index && (
                <View style={styles.expandedContent}>
                  <View style={styles.exampleContainer}>
                    <Text style={styles.exampleTitle}>Example Use Case:</Text>
                    <Text style={styles.exampleText}>{feature.example}</Text>
                    <View style={styles.tipBadge}>
                      <Text style={styles.tipText}>💡 {feature.tip}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
    maxWidth: 600,
  },
  featuresGrid: {
    gap: 32,
  },
  featureCard: {
    backgroundColor: colors.backgroundGreen,
    borderRadius: 12,
    padding: 32,
    borderWidth: 2,
    borderColor: "transparent",
  },
  offsetCard: {
    marginLeft: 20,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 16,
    lineHeight: 28,
  },
  featureDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  learnMoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  expandedContent: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  exampleContainer: {
    backgroundColor: `${colors.primary}1A`,
    borderRadius: 8,
    padding: 16,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  tipBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  tipText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textPrimary,
  },
});
