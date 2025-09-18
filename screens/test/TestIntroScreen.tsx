/**
 * Test Introduction Screen
 * Displays welcome message, test information, and start button
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTest } from "../../contexts/TestContext";
import NetworkDiagnostics from "../../utils/networkDiagnostics";

const TestIntroScreen = () => {
  const { testState, startTest, isTestCompleted } = useTest();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Test context will handle checking existing test status
  }, []);

  const handleStartTest = async () => {
    setIsLoading(true);
    try {
      // If test is completed, show confirmation for retake
      if (isTestCompleted()) {
        Alert.alert(
          "Retake Assessment",
          "You have already completed this test. Starting a new test will overwrite your previous results. Continue?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsLoading(false),
            },
            {
              text: "View Previous Results",
              onPress: () => {
                setIsLoading(false);
                router.push("/test/results" as any);
              },
            },
            {
              text: "Start New Test",
              style: "destructive",
              onPress: () => startNewTest(),
            },
          ]
        );
        return;
      }

      // If no previous test, start directly
      await startNewTest();
    } catch (error: any) {
      console.error("Error in handleStartTest:", error);
      Alert.alert("Error", "Something went wrong. Please try again.", [
        { text: "OK", onPress: () => setIsLoading(false) },
      ]);
    }
  };

  const startNewTest = async () => {
    try {
      // Force start a new test (this will reset previous test state)
      await startTest(true); // Pass true to force restart

      // Navigate to test question screen
      router.push("/test/question" as any);
    } catch (error: any) {
      Alert.alert(
        "Failed to Start Test",
        error.message || "Please check your internet connection and try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const runNetworkDiagnostics = async () => {
    try {
      setIsLoading(true);
      const diagnostics = await NetworkDiagnostics.runDiagnostics();
      const formatted = NetworkDiagnostics.formatDiagnostics(diagnostics);

      Alert.alert("Network Diagnostics", formatted, [{ text: "OK" }]);
    } catch (error: any) {
      Alert.alert(
        "Diagnostics Failed",
        error.message || "Failed to run network diagnostics",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testFeatures = [
    {
      icon: "bulb-outline",
      title: "Personality Analysis",
      description: "Discover your unique traits and characteristics",
    },
    {
      icon: "heart-outline",
      title: "Interest Assessment",
      description: "Identify what truly motivates and excites you",
    },
    {
      icon: "school-outline",
      title: "Stream Recommendations",
      description: "Get personalized educational path suggestions",
    },
    {
      icon: "briefcase-outline",
      title: "Career Guidance",
      description: "Explore career paths that match your profile",
    },
  ];

  const testInfo = [
    { label: "Duration", value: "10-15 minutes" },
    { label: "Questions", value: "10 adaptive questions" },
    { label: "Format", value: "Multiple choice & ratings" },
    { label: "Results", value: "Instant personalized report" },
  ];

  if (isTestCompleted()) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.title}>Test Completed!</Text>
            <Text style={styles.subtitle}>
              You've already completed your aptitude assessment
            </Text>
          </View>

          {/* Results Card */}
          <View style={styles.resultsCard}>
            <Text style={styles.resultsTitle}>Your Assessment Results</Text>
            <Text style={styles.resultsDescription}>
              View your personalized career recommendations, personality
              insights, and educational stream suggestions.
            </Text>

            <TouchableOpacity
              style={styles.viewResultsButton}
              onPress={() => router.push("/test/results" as any)}
            >
              <Text style={styles.viewResultsButtonText}>View Results</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="analytics-outline" size={60} color="#007AFF" />
          </View>
          <Text style={styles.title}>Aptitude Assessment</Text>
          <Text style={styles.subtitle}>
            Discover your ideal educational stream and career path
          </Text>
        </View>

        {/* Warning Notice */}
        <View style={styles.warningCard}>
          <View style={styles.warningHeader}>
            <Ionicons name="warning" size={24} color="#FF9500" />
            <Text style={styles.warningTitle}>Important Notice</Text>
          </View>
          <Text style={styles.warningText}>
            This assessment is mandatory and must be completed to access all
            platform features. The test is personalized and adapts to your
            responses.
          </Text>
        </View>

        {/* Test Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>What You'll Discover</Text>
          {testFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon as any}
                  size={24}
                  color="#007AFF"
                />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Test Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Test Information</Text>
          <View style={styles.infoGrid}>
            {testInfo.map((info, index) => (
              <View key={index} style={styles.infoItem}>
                <Text style={styles.infoLabel}>{info.label}</Text>
                <Text style={styles.infoValue}>{info.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Start Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.startButton,
              isLoading && styles.startButtonDisabled,
            ]}
            onPress={handleStartTest}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Text style={styles.startButtonText}>Start Assessment</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          {/* Diagnostic Button (temporary for debugging) */}
          <TouchableOpacity
            style={styles.diagnosticButton}
            onPress={runNetworkDiagnostics}
            disabled={isLoading}
          >
            <Text style={styles.diagnosticButtonText}>Test Connection</Text>
            <Ionicons name="wifi-outline" size={16} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your responses will be kept confidential and used only to provide
            personalized recommendations.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  warningCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E65100",
    marginLeft: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#BF360C",
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  infoContainer: {
    marginBottom: 32,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  buttonContainer: {
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 16,
  },
  resultsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  resultsDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  viewResultsButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  viewResultsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  diagnosticButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  diagnosticButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default TestIntroScreen;
