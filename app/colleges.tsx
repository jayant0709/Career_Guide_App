/**
 * Colleges Screen - Main colleges listing page
 * Matches web app functionality with mobile-optimized UI
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { CollegeCard } from "@/components/colleges/CollegeCard";
import { CollegeApiService } from "@/utils/collegeApi";
import { College, FilterOptions } from "@/types/colleges";

export default function CollegesScreen() {
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalColleges, setTotalColleges] = useState(0);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Selection for comparison
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  // Fetch colleges function
  const fetchColleges = async () => {
    try {
      setError(null);
      const filters: Partial<FilterOptions> = {
        searchTerm: searchTerm.trim() || undefined,
        selectedType: selectedType !== "all" ? selectedType : undefined,
        selectedProgram:
          selectedProgram !== "all" ? selectedProgram : undefined,
        selectedState: selectedState !== "all" ? selectedState : undefined,
      };

      const response = await CollegeApiService.getColleges(filters);
      setColleges(response.data);
      setTotalColleges(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch colleges");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchColleges();
  }, []);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loading) {
        setLoading(true);
        fetchColleges();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedType, selectedProgram, selectedState]);

  // Refresh handler
  const handleRefresh = () => {
    setRefreshing(true);
    fetchColleges();
  };

  // Toggle college selection for comparison
  const toggleCollegeSelection = (collegeId: string) => {
    setSelectedColleges((prev) => {
      if (prev.includes(collegeId)) {
        return prev.filter((id) => id !== collegeId);
      } else if (prev.length < 3) {
        return [...prev, collegeId];
      } else {
        Alert.alert(
          "Limit Reached",
          "You can compare up to 3 colleges at a time."
        );
        return prev;
      }
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedProgram("all");
    setSelectedState("all");
  };

  // Navigate to comparison
  const navigateToComparison = () => {
    if (selectedColleges.length < 2) {
      Alert.alert(
        "Select More Colleges",
        "Please select at least 2 colleges to compare."
      );
      return;
    }
    router.push("/(colleges)/compare" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#028489" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore Colleges</Text>
          <TouchableOpacity
            style={styles.filterToggle}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons
              name={showFilters ? "funnel" : "funnel-outline"}
              size={24}
              color="#028489"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerSubtitle}>
          {totalColleges > 0
            ? `${colleges.length} of ${totalColleges} colleges`
            : "Find your perfect college"}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by College Name / City / Program..."
            placeholderTextColor="#9CA3AF"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm("")}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {/* Type Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["all", "Government", "Private", "Aided"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.filterChip,
                      selectedType === type && styles.activeFilterChip,
                    ]}
                    onPress={() => setSelectedType(type)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedType === type && styles.activeFilterChipText,
                      ]}
                    >
                      {type === "all" ? "All Types" : type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Program Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Program</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  "all",
                  "Engineering",
                  "Medical",
                  "Management",
                  "Law",
                  "Arts & Science",
                  "Design",
                  "Statistics",
                ].map((program) => (
                  <TouchableOpacity
                    key={program}
                    style={[
                      styles.filterChip,
                      selectedProgram === program && styles.activeFilterChip,
                    ]}
                    onPress={() => setSelectedProgram(program)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedProgram === program &&
                          styles.activeFilterChipText,
                      ]}
                    >
                      {program === "all" ? "All Programs" : program}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* State Filter */}
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>State</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {[
                  "all",
                  "Maharashtra",
                  "Karnataka",
                  "Delhi",
                  "Tamil Nadu",
                  "Gujarat",
                  "Rajasthan",
                  "West Bengal",
                ].map((state) => (
                  <TouchableOpacity
                    key={state}
                    style={[
                      styles.filterChip,
                      selectedState === state && styles.activeFilterChip,
                    ]}
                    onPress={() => setSelectedState(state)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedState === state && styles.activeFilterChipText,
                      ]}
                    >
                      {state === "all" ? "All States" : state}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Clear Filters */}
            <TouchableOpacity
              style={styles.clearFiltersButton}
              onPress={clearFilters}
            >
              <Ionicons name="refresh" size={16} color="#EF4444" />
              <Text style={styles.clearFiltersText}>Clear</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#028489" />
            <Text style={styles.loadingText}>Finding colleges...</Text>
          </View>
        )}

        {/* Error */}
        {error && !loading && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color="#EF4444" />
            <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchColleges}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Colleges List */}
        {!loading && !error && (
          <View style={styles.collegesContainer}>
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isSelected={selectedColleges.includes(college.id)}
                onToggleSelect={toggleCollegeSelection}
                showSelectButton={true}
              />
            ))}

            {colleges.length === 0 && (
              <View style={styles.noResultsContainer}>
                <Ionicons name="school" size={64} color="#D1D5DB" />
                <Text style={styles.noResultsTitle}>No colleges found</Text>
                <Text style={styles.noResultsText}>
                  Try adjusting your search criteria or filters
                </Text>
                <TouchableOpacity
                  style={styles.clearFiltersButton}
                  onPress={clearFilters}
                >
                  <Text style={styles.clearFiltersText}>Clear All Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Floating Compare Button */}
      {selectedColleges.length > 0 && (
        <View style={styles.floatingContainer}>
          <TouchableOpacity
            style={styles.compareButton}
            onPress={navigateToComparison}
          >
            <Ionicons name="git-compare" size={20} color="#0B2447" />
            <Text style={styles.compareButtonText}>
              Compare ({selectedColleges.length})
            </Text>
            {selectedColleges.length >= 2 && (
              <View style={styles.compareReadyDot} />
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  filterToggle: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
  filtersContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filtersScroll: {
    paddingRight: 20,
  },
  filterGroup: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeFilterChip: {
    backgroundColor: "#028489",
    borderColor: "#028489",
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeFilterChipText: {
    color: "#fff",
  },
  clearFiltersButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  clearFiltersText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#EF4444",
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#028489",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  collegesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  floatingContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  compareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2B134",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  compareButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0B2447",
    marginLeft: 8,
  },
  compareReadyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginLeft: 8,
  },
});
