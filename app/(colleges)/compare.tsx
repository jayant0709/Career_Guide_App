/**
 * College Comparison Screen - Mobile version
 * Allows side-by-side comparison of up to 3 colleges
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CollegeApiService } from "@/utils/collegeApi";
import { CollegeDetail, staticColleges } from "@/types/colleges";

const { width } = Dimensions.get("window");

export default function CollegeComparisonScreen() {
  const router = useRouter();
  const [selectedColleges, setSelectedColleges] = useState<CollegeDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo, we'll use the first 2 static colleges
    // In production, you'd get the IDs from route params or AsyncStorage
    setSelectedColleges(staticColleges.slice(0, 2));
    setLoading(false);
  }, []);

  const formatCurrency = (value: number): string => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    return `₹${value.toLocaleString("en-IN")}`;
  };

  const formatLPA = (value: number): string => {
    return `₹${(value / 100000).toFixed(1)} LPA`;
  };

  const comparisonParameters = [
    {
      key: "ranking",
      label: "NIRF Ranking",
      getValue: (college: CollegeDetail) => college.reviews?.overallRating || 0,
      format: (value: number) => (value > 0 ? `#${value}` : "Not Ranked"),
    },
    {
      key: "fees",
      label: "Annual Fees",
      getValue: (college: CollegeDetail) => 283000, // Mock data
      format: (value: number) => formatCurrency(value),
    },
    {
      key: "placement_rate",
      label: "Placement Rate",
      getValue: (college: CollegeDetail) => college.placements.placementRate,
      format: (value: number) => `${value}%`,
    },
    {
      key: "average_package",
      label: "Average Package",
      getValue: (college: CollegeDetail) =>
        college.placements.trends[0]?.average * 100000 || 0,
      format: (value: number) => formatLPA(value),
    },
    {
      key: "naac_grade",
      label: "NAAC Grade",
      getValue: (college: CollegeDetail) => college.naacGrade,
      format: (value: string) => value,
    },
    {
      key: "established",
      label: "Established",
      getValue: (college: CollegeDetail) => college.establishedYear,
      format: (value: number) => value.toString(),
    },
  ] as const;

  const facilityParameters = [
    { key: "hostel", label: "Hostel", icon: "home" },
    { key: "library", label: "Library", icon: "library" },
    { key: "labs", label: "Labs", icon: "flask" },
    { key: "internet", label: "WiFi", icon: "wifi" },
    { key: "sports", label: "Sports", icon: "fitness" },
    { key: "medical", label: "Medical", icon: "medical" },
  ];

  const getBestValueIndices = (parameter: any): number[] => {
    const values = selectedColleges.map((college) =>
      parameter.getValue(college)
    );

    if (parameter.key === "fees") {
      const min = Math.min(...values);
      return values.map((v, i) => (v === min ? i : -1)).filter((i) => i >= 0);
    } else {
      const max = Math.max(...values);
      return values.map((v, i) => (v === max ? i : -1)).filter((i) => i >= 0);
    }
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
          color="#F59E0B"
        />
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#028489" />
          <Text style={styles.loadingText}>Loading comparison...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#028489" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compare Colleges</Text>
        <View style={styles.headerRight}>
          <Text style={styles.collegeCount}>{selectedColleges.length}/3</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* College Names Header */}
        <View style={styles.collegeNamesSection}>
          <View style={styles.parameterColumn}>
            <Text style={styles.parameterLabel}>College</Text>
          </View>
          {selectedColleges.map((college, index) => (
            <View key={college.id} style={styles.collegeColumn}>
              <Text style={styles.collegeName} numberOfLines={3}>
                {college.name}
              </Text>
              <Text style={styles.collegeLocation} numberOfLines={1}>
                {college.city}, {college.state}
              </Text>
              <View style={styles.collegeType}>
                <Text style={styles.collegeTypeText}>{college.type}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Comparison Parameters */}
        {comparisonParameters.map((parameter, paramIndex) => {
          const bestIndices = getBestValueIndices(parameter);

          return (
            <View key={parameter.key} style={styles.comparisonRow}>
              <View style={styles.parameterColumn}>
                <Text style={styles.parameterLabel}>{parameter.label}</Text>
              </View>
              {selectedColleges.map((college, collegeIndex) => {
                const value = parameter.getValue(college);
                const isBest = bestIndices.includes(collegeIndex);
                let displayValue = "";

                // Handle formatting based on parameter key
                switch (parameter.key) {
                  case "ranking":
                    displayValue =
                      typeof value === "number" && value > 0
                        ? `#${value}`
                        : "Not Ranked";
                    break;
                  case "fees":
                    displayValue = formatCurrency(Number(value));
                    break;
                  case "placement_rate":
                    displayValue = `${value}%`;
                    break;
                  case "average_package":
                    displayValue = formatLPA(Number(value));
                    break;
                  default:
                    displayValue = String(value);
                }

                return (
                  <View
                    key={`${parameter.key}-${college.id}`}
                    style={[
                      styles.valueColumn,
                      isBest && styles.bestValueColumn,
                    ]}
                  >
                    <Text
                      style={[styles.valueText, isBest && styles.bestValueText]}
                    >
                      {displayValue}
                    </Text>
                    {isBest && (
                      <Ionicons name="trophy" size={12} color="#F59E0B" />
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* Facilities Comparison */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities Comparison</Text>
          {facilityParameters.map((facility, index) => (
            <View key={facility.key} style={styles.facilityRow}>
              <View style={styles.parameterColumn}>
                <View style={styles.facilityLabel}>
                  <Ionicons
                    name={facility.icon as any}
                    size={16}
                    color="#028489"
                  />
                  <Text style={styles.facilityLabelText}>{facility.label}</Text>
                </View>
              </View>
              {selectedColleges.map((college, collegeIndex) => {
                const facilityData = college.facilities.find((f) =>
                  f.name.toLowerCase().includes(facility.key)
                );
                const isAvailable = facilityData?.available || false;

                return (
                  <View
                    key={`${facility.key}-${college.id}`}
                    style={styles.valueColumn}
                  >
                    <View style={styles.facilityStatus}>
                      <Ionicons
                        name={isAvailable ? "checkmark-circle" : "close-circle"}
                        size={16}
                        color={isAvailable ? "#10B981" : "#EF4444"}
                      />
                      {facilityData?.rating && (
                        <View style={styles.facilityRating}>
                          {renderStarRating(facilityData.rating)}
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Notable Alumni */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notable Alumni</Text>
          <View style={styles.comparisonRow}>
            <View style={styles.parameterColumn}>
              <Text style={styles.parameterLabel}>Alumni</Text>
            </View>
            {selectedColleges.map((college, index) => (
              <View key={`alumni-${college.id}`} style={styles.valueColumn}>
                <View style={styles.alumniList}>
                  {college.notableAlumni
                    .slice(0, 2)
                    .map((alumni, alumniIndex) => (
                      <Text
                        key={alumniIndex}
                        style={styles.alumniName}
                        numberOfLines={1}
                      >
                        • {alumni}
                      </Text>
                    ))}
                  {college.notableAlumni.length > 2 && (
                    <Text style={styles.alumniMore}>
                      +{college.notableAlumni.length - 2} more
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.floatingContainer}>
        <TouchableOpacity
          style={styles.addCollegeButton}
          onPress={() => router.back()}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addCollegeText}>Add More Colleges</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
  },
  headerRight: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  collegeCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#028489",
  },
  content: {
    flex: 1,
  },
  collegeNamesSection: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  parameterColumn: {
    width: width * 0.3,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  collegeColumn: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  collegeName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  collegeLocation: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
  collegeType: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  collegeTypeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#028489",
  },
  comparisonRow: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  parameterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  valueColumn: {
    flex: 1,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bestValueColumn: {
    backgroundColor: "#FEF3C7",
    borderRadius: 8,
    margin: 2,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    textAlign: "center",
  },
  bestValueText: {
    fontWeight: "bold",
    color: "#92400E",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 8,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  facilityRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  facilityLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  facilityLabelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 8,
  },
  facilityStatus: {
    alignItems: "center",
  },
  facilityRating: {
    marginTop: 4,
  },
  starContainer: {
    flexDirection: "row",
  },
  alumniList: {
    alignItems: "center",
  },
  alumniName: {
    fontSize: 12,
    color: "#374151",
    textAlign: "center",
    marginBottom: 2,
  },
  alumniMore: {
    fontSize: 11,
    color: "#6B7280",
    fontStyle: "italic",
  },
  floatingContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  addCollegeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#028489",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  addCollegeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
});
