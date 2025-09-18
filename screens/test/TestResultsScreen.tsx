/**
 * Test Results Screen - Simplified Version
 * Displays basic test results with modern mobile UI
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTest } from "../../contexts/TestContext";
import { ITestResults } from "../../types/aptitude-test";

const { width } = Dimensions.get("window");

const TestResultsScreen = () => {
  const { testState, getResults, resetTest } = useTest();
  const [results, setResults] = useState<ITestResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setIsLoading(true);

      // Try to get results from test state first
      if (testState.results) {
        setResults(testState.results);
      } else {
        // Otherwise fetch from API
        const fetchedResults = await getResults();
        if (fetchedResults) {
          setResults(fetchedResults);
        } else {
          Alert.alert(
            "No Results Found",
            "Unable to load your test results. Please try taking the test again.",
            [{ text: "OK", onPress: () => router.replace("/test") }]
          );
        }
      }
    } catch (error) {
      console.error("Error loading results:", error);
      Alert.alert(
        "Error",
        "Failed to load your test results. Please try again.",
        [{ text: "OK", onPress: () => router.replace("/test") }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading your results...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!results) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
          <Text style={styles.errorTitle}>No Results Available</Text>
          <Text style={styles.errorMessage}>
            We couldn't find your test results. Please try taking the test
            again.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => router.replace("/test")}
          >
            <Text style={styles.retryButtonText}>Take Test Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Results</Text>
        <TouchableOpacity
          onPress={() => router.replace("/profile")}
          style={styles.doneButton}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Success Message */}
        <View style={styles.successCard}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.successTitle}>Assessment Complete!</Text>
          <Text style={styles.successMessage}>
            Your personalized career recommendations are ready
          </Text>
        </View>

        {/* Stream Recommendations */}
        {results.streamRecommendations && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Recommended Stream</Text>
            {Object.entries(results.streamRecommendations)
              .sort(([, a], [, b]) => (b as any).score - (a as any).score)
              .slice(0, 1)
              .map(([stream, data]) => (
                <View key={stream} style={styles.streamCard}>
                  <Text style={styles.streamTitle}>{stream.toUpperCase()}</Text>
                  <Text style={styles.streamScore}>
                    {(data as any).score}% Match
                  </Text>
                  <Text style={styles.streamDescription}>
                    Based on your interests and aptitude
                  </Text>
                </View>
              ))}
          </View>
        )}

        {/* Top Career Paths */}
        {results.careerPaths && results.careerPaths.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Top Career Matches</Text>
            {results.careerPaths.slice(0, 3).map((career, index) => (
              <TouchableOpacity
                key={index}
                style={styles.careerCard}
                onPress={() =>
                  router.push(
                    `/test/career-details?career=${encodeURIComponent(
                      JSON.stringify(career)
                    )}`
                  )
                }
              >
                <View style={styles.careerHeader}>
                  <Text style={styles.careerTitle}>{career.title}</Text>
                  <Text style={styles.careerMatch}>{career.matchScore}%</Text>
                </View>
                <Text style={styles.careerDescription} numberOfLines={2}>
                  {career.description}
                </Text>
                <View style={styles.careerFooter}>
                  <Text style={styles.careerSalary}>
                    ₹{career.averageSalary.min}L - ₹{career.averageSalary.max}L
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#666" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Personality Insights */}
        {results.personalityTraits && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personality Insights</Text>
            {Object.entries(results.personalityTraits)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([trait, score]) => (
                <View key={trait} style={styles.traitCard}>
                  <Text style={styles.traitName}>
                    {trait.charAt(0).toUpperCase() + trait.slice(1)}
                  </Text>
                  <View style={styles.traitBar}>
                    <View style={[styles.traitFill, { width: `${score}%` }]} />
                  </View>
                  <Text style={styles.traitScore}>{score}%</Text>
                </View>
              ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/profile")}
          >
            <Text style={styles.primaryButtonText}>View in Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              // Reset test state and navigate to test intro
              resetTest();
              router.replace("/test");
            }}
          >
            <Text style={styles.secondaryButtonText}>Retake Test</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  errorMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  doneButton: {
    padding: 8,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  content: {
    flex: 1,
  },
  successCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  streamCard: {
    padding: 16,
    backgroundColor: "#F0F8FF",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  streamTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  streamScore: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 8,
  },
  streamDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  careerCard: {
    padding: 16,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginBottom: 12,
  },
  careerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  careerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  careerMatch: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  careerDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  careerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  careerSalary: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
  },
  traitCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  traitName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    width: 100,
  },
  traitBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: "hidden",
  },
  traitFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 4,
  },
  traitScore: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    width: 40,
    textAlign: "right",
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  bottomPadding: {
    height: 40,
  },
});

export default TestResultsScreen;
