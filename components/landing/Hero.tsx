import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, commonStyles } from "@/lib/utils";
import { TestButton } from "../aptitude-test";

export default function Hero() {
  const router = useRouter();

  const handleTestComplete = (results: any) => {
    // Optionally navigate to profile or show success message
    console.log("Test completed from Hero:", results);
  };

  return (
    <View style={styles.container}>
      {/* Background Elements */}
      <View style={styles.backgroundDecoration1} />
      <View style={styles.backgroundDecoration2} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.mainContent}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Career Sarthi —{" "}
                <Text style={styles.titleHighlight}>One-Stop Personalized</Text>{" "}
                Career & Education Advisor
              </Text>

              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleBold}>
                  Aptitude & Interest-Based Suggestions
                </Text>
                <Text style={styles.subtitle}>
                  Short quizzes and skills reports help students discover their
                  strengths and align them with the right subject stream,
                  solving the confusion after Class 10/12.
                </Text>
              </View>
            </View>

            {/* Micro Badges */}
            <View style={styles.badgesContainer}>
              <View style={styles.badge}>
                <Ionicons
                  name="trophy-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.badgeText}>Personalized guidance</Text>
              </View>
              <View style={styles.badge}>
                <Ionicons
                  name="people-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.badgeText}>Trusted by schools</Text>
              </View>
            </View>

            {/* CTAs */}
            <View style={styles.ctaContainer}>
              <TestButton
                style={[styles.primaryButton, commonStyles.shadowLarge]}
                textStyle={styles.primaryButtonText}
                onComplete={handleTestComplete}
              />

              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={colors.primary}
                  style={styles.buttonIcon}
                />
                <Text style={styles.secondaryButtonText}>Explore Colleges</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            {/* Mascot Character */}
            <View style={styles.mascot}>
              <Text style={styles.mascotEmoji}>🎓</Text>
            </View>

            {/* Main Card */}
            <View style={[styles.mainCard, commonStyles.shadowLarge]}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Your Career Path</Text>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.pathItem}>
                  <Text style={styles.pathTitle}>Engineering Stream</Text>
                  <Text style={styles.pathSubtitle}>
                    Based on your aptitude
                  </Text>
                </View>

                <View style={styles.pathItem}>
                  <Text style={styles.pathTitle}>Top 3 Colleges</Text>
                  <Text style={styles.pathSubtitle}>Government & Private</Text>
                </View>

                <View style={[styles.pathItem, styles.scholarshipItem]}>
                  <Text style={styles.scholarshipTitle}>Scholarships</Text>
                  <Text style={styles.scholarshipAmount}>
                    ₹50,000 available
                  </Text>
                </View>
              </View>
            </View>

            {/* Floating Elements */}
            <View style={styles.floatingBook}>
              <Ionicons name="book-outline" size={32} color={colors.primary} />
            </View>

            <View style={styles.floatingAward}>
              <Ionicons name="trophy" size={40} color={colors.textPrimary} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: "relative",
  },
  backgroundDecoration1: {
    position: "absolute",
    top: 80,
    right: -100,
    width: 200,
    height: 200,
    backgroundColor: `${colors.primary}20`,
    borderRadius: 100,
  },
  backgroundDecoration2: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 150,
    height: 150,
    backgroundColor: `${colors.accent}20`,
    borderRadius: 75,
  },
  content: {
    padding: 16,
    paddingTop: 80,
    paddingBottom: 40,
  },
  mainContent: {
    gap: 48,
  },
  textContainer: {
    gap: 32,
  },
  titleContainer: {
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textPrimary,
    lineHeight: 40,
    textAlign: "center",
  },
  titleHighlight: {
    color: colors.primary,
  },
  subtitleContainer: {
    gap: 8,
  },
  subtitleBold: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    textAlign: "center",
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundGreen,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  ctaContainer: {
    gap: 16,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  illustrationContainer: {
    position: "relative",
    alignItems: "center",
    height: 400,
    marginTop: 40,
  },
  mascot: {
    position: "absolute",
    top: 0,
    right: 32,
    width: 60,
    height: 60,
    backgroundColor: colors.accent,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    ...commonStyles.shadow,
  },
  mascotEmoji: {
    fontSize: 30,
  },
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 40,
    borderWidth: 1,
    borderColor: colors.backgroundGreen,
    transform: [{ rotate: "3deg" }],
  },
  cardHeader: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    textAlign: "center",
  },
  cardContent: {
    gap: 12,
  },
  pathItem: {
    backgroundColor: `${colors.white}33`,
    borderRadius: 8,
    padding: 12,
  },
  pathTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  pathSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    opacity: 0.9,
  },
  scholarshipItem: {
    backgroundColor: `${colors.accent}E6`,
  },
  scholarshipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  scholarshipAmount: {
    fontSize: 14,
    color: `${colors.textPrimary}CC`,
  },
  floatingBook: {
    position: "absolute",
    top: -16,
    left: -16,
    width: 64,
    height: 64,
    backgroundColor: colors.backgroundGreen,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    ...commonStyles.shadow,
  },
  floatingAward: {
    position: "absolute",
    bottom: -24,
    right: -24,
    width: 80,
    height: 80,
    backgroundColor: colors.accent,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    ...commonStyles.shadow,
  },
});
