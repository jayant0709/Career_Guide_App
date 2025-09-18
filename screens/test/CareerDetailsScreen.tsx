/**
 * Career Details Screen
 * Displays detailed information about a specific career path
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  TestScreenNavigationProp,
  TestScreenRouteProp,
} from "../../types/aptitude-test";

const CareerDetailsScreen = () => {
  const navigation = useNavigation<TestScreenNavigationProp>();
  const route = useRoute<TestScreenRouteProp<"CareerDetails">>();
  const { careerPath } = route.params;

  const handleSearchCourses = async () => {
    const searchQuery = `${careerPath.title} courses India`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open browser");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open search");
    }
  };

  const handleSearchColleges = async () => {
    const searchQuery = `${careerPath.title} colleges ${careerPath.stream} India`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(
      searchQuery
    )}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open browser");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open search");
    }
  };

  const getMatchColor = (score: number): string => {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#FF9500";
    return "#F44336";
  };

  const getGrowthColor = (growth: number): string => {
    if (growth >= 15) return "#4CAF50";
    if (growth >= 8) return "#FF9500";
    return "#666";
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Career Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Career Header */}
        <View style={styles.careerHeader}>
          <Text style={styles.careerTitle}>{careerPath.title}</Text>
          <View style={styles.streamBadge}>
            <Ionicons name="school-outline" size={16} color="#007AFF" />
            <Text style={styles.streamText}>{careerPath.stream}</Text>
          </View>
          <View style={styles.matchContainer}>
            <View
              style={[
                styles.matchBadge,
                {
                  backgroundColor: getMatchColor(careerPath.matchScore) + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.matchText,
                  { color: getMatchColor(careerPath.matchScore) },
                ]}
              >
                {careerPath.matchScore}% Match
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Career</Text>
          <Text style={styles.description}>{careerPath.description}</Text>
        </View>

        {/* Key Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="cash-outline" size={24} color="#007AFF" />
              </View>
              <Text style={styles.statLabel}>Average Salary</Text>
              <Text style={styles.statValue}>
                ₹{(careerPath.averageSalary.min / 100000).toFixed(1)}-
                {(careerPath.averageSalary.max / 100000).toFixed(1)}L
              </Text>
              <Text style={styles.statSubtext}>per year</Text>
            </View>

            <View style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  {
                    backgroundColor:
                      getGrowthColor(careerPath.jobGrowth) + "20",
                  },
                ]}
              >
                <Ionicons
                  name="trending-up"
                  size={24}
                  color={getGrowthColor(careerPath.jobGrowth)}
                />
              </View>
              <Text style={styles.statLabel}>Job Growth</Text>
              <Text
                style={[
                  styles.statValue,
                  { color: getGrowthColor(careerPath.jobGrowth) },
                ]}
              >
                {careerPath.jobGrowth}%
              </Text>
              <Text style={styles.statSubtext}>expected growth</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="people-outline" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.statLabel}>Match Score</Text>
              <Text
                style={[
                  styles.statValue,
                  { color: getMatchColor(careerPath.matchScore) },
                ]}
              >
                {careerPath.matchScore}%
              </Text>
              <Text style={styles.statSubtext}>compatibility</Text>
            </View>
          </View>
        </View>

        {/* Required Subjects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Subjects</Text>
          <Text style={styles.sectionSubtitle}>
            These subjects are typically required for this career path:
          </Text>
          <View style={styles.subjectsList}>
            {careerPath.requiredSubjects.map(
              (subject: string, index: number) => (
                <View key={index} style={styles.subjectCard}>
                  <Ionicons name="book-outline" size={16} color="#007AFF" />
                  <Text style={styles.subjectText}>{subject}</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Career Path Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Get Started</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Complete Your Education</Text>
                <Text style={styles.stepDescription}>
                  Focus on the required subjects and maintain good grades in{" "}
                  {careerPath.stream}.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Pursue Higher Education</Text>
                <Text style={styles.stepDescription}>
                  Look for undergraduate programs that align with this career in
                  relevant fields.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Gain Experience</Text>
                <Text style={styles.stepDescription}>
                  Seek internships, projects, or entry-level positions to build
                  practical experience.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Continuous Learning</Text>
                <Text style={styles.stepDescription}>
                  Stay updated with industry trends and consider additional
                  certifications.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Steps</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSearchCourses}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="search-outline" size={20} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Find Courses</Text>
              <Ionicons name="chevron-forward" size={20} color="#007AFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSearchColleges}
            >
              <View style={styles.actionIcon}>
                <Ionicons name="school-outline" size={20} color="#007AFF" />
              </View>
              <Text style={styles.actionText}>Find Colleges</Text>
              <Ionicons name="chevron-forward" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Important Note */}
        <View style={styles.noteContainer}>
          <View style={styles.noteIcon}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#FF9500"
            />
          </View>
          <Text style={styles.noteText}>
            Career recommendations are based on your assessment responses.
            Consider exploring multiple paths and seek guidance from career
            counselors and professionals in the field.
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  headerRight: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  careerHeader: {
    backgroundColor: "#fff",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  careerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
    lineHeight: 32,
  },
  streamBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  streamText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#007AFF",
    marginLeft: 4,
  },
  matchContainer: {
    alignItems: "flex-start",
  },
  matchBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  matchText: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  statSubtext: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
  },
  subjectsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  subjectCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  subjectText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
    marginLeft: 4,
  },
  stepsContainer: {
    gap: 16,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
  },
  noteContainer: {
    backgroundColor: "#FFF8E1",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  noteIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: "#BF360C",
    lineHeight: 20,
  },
});

export default CareerDetailsScreen;
