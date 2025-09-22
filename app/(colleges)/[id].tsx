/**
 * College Detail Screen - Mobile version
 * Matches web app functionality with mobile-optimized UI
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { CollegeApiService } from "@/utils/collegeApi";
import { CollegeDetail } from "@/types/colleges";

const { width } = Dimensions.get("window");

export default function CollegeDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [cutoffFilter, setCutoffFilter] = useState("open");

  useEffect(() => {
    if (id) {
      fetchCollegeDetail();
    }
  }, [id]);

  const fetchCollegeDetail = async () => {
    try {
      setLoading(true);
      const collegeData = await CollegeApiService.getCollegeDetail(id!);
      setCollege(collegeData);
    } catch (error) {
      console.error("Error fetching college detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "business" },
    { id: "programs", label: "Programs", icon: "school" },
    { id: "cutoffs", label: "Cut-offs", icon: "bar-chart" },
    { id: "facilities", label: "Facilities", icon: "home" },
    { id: "placements", label: "Placements", icon: "trending-up" },
    { id: "reviews", label: "Reviews", icon: "star" },
  ];

  const renderStarRating = (rating: number, size = 16) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={
            i <= rating
              ? "star"
              : i <= rating + 0.5
              ? "star-half"
              : "star-outline"
          }
          size={size}
          color="#F59E0B"
        />
      );
    }
    return <View style={styles.starContainer}>{stars}</View>;
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent}>
      {/* Basic Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Established</Text>
            <Text style={styles.infoValue}>{college?.establishedYear}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Type</Text>
            <Text style={styles.infoValue}>{college?.type}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>NAAC Grade</Text>
            <Text style={styles.infoValue}>{college?.naacGrade}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Affiliation</Text>
            <Text style={styles.infoValue}>{college?.affiliation}</Text>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <Ionicons name="call" size={16} color="#028489" />
          <Text style={styles.contactText}>{college?.contact.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={16} color="#028489" />
          <Text style={styles.contactText}>{college?.contact.email}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="globe" size={16} color="#028489" />
          <Text style={styles.contactText}>{college?.contact.website}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{college?.description}</Text>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        {college?.achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <View style={styles.achievementHeader}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementYear}>{achievement.year}</Text>
            </View>
            <Text style={styles.achievementDescription}>
              {achievement.description}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderPrograms = () => (
    <ScrollView style={styles.tabContent}>
      {/* Undergraduate Programs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Undergraduate Programs</Text>
        {college?.programs.undergraduate.map((program, index) => (
          <View key={index} style={styles.programCard}>
            <View style={styles.programHeader}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDuration}>{program.duration}</Text>
            </View>
            <View style={styles.programDetails}>
              <View style={styles.programDetail}>
                <Text style={styles.programDetailLabel}>Seats:</Text>
                <Text style={styles.programDetailValue}>{program.seats}</Text>
              </View>
              <View style={styles.programDetail}>
                <Text style={styles.programDetailLabel}>Eligibility:</Text>
                <Text style={styles.programDetailValue}>
                  {program.eligibility}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Postgraduate Programs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Postgraduate Programs</Text>
        {college?.programs.postgraduate.map((program, index) => (
          <View key={index} style={styles.programCard}>
            <View style={styles.programHeader}>
              <Text style={styles.programName}>{program.name}</Text>
              <Text style={styles.programDuration}>{program.duration}</Text>
            </View>
            <View style={styles.programDetails}>
              <View style={styles.programDetail}>
                <Text style={styles.programDetailLabel}>Seats:</Text>
                <Text style={styles.programDetailValue}>{program.seats}</Text>
              </View>
              <View style={styles.programDetail}>
                <Text style={styles.programDetailLabel}>Eligibility:</Text>
                <Text style={styles.programDetailValue}>
                  {program.eligibility}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderCutoffs = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Admission Cutoffs</Text>

        {/* Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cutoffFilters}
        >
          {["open", "obc", "sc", "st"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.cutoffFilter,
                cutoffFilter === category && styles.activeCutoffFilter,
              ]}
              onPress={() => setCutoffFilter(category)}
            >
              <Text
                style={[
                  styles.cutoffFilterText,
                  cutoffFilter === category && styles.activeCutoffFilterText,
                ]}
              >
                {category.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cutoff Data */}
        {college?.cutoffs.map((cutoff, index) => (
          <View key={index} style={styles.cutoffCard}>
            <View style={styles.cutoffHeader}>
              <Text style={styles.cutoffYear}>Year {cutoff.year}</Text>
              <Text style={styles.cutoffRank}>
                Rank: {(cutoff as any)[cutoffFilter]}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderFacilities = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Campus Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {college?.facilities.map((facility, index) => (
            <View key={index} style={styles.facilityCard}>
              <View style={styles.facilityHeader}>
                <Text style={styles.facilityName}>{facility.name}</Text>
                {facility.rating && renderStarRating(facility.rating, 14)}
              </View>
              {facility.description && (
                <Text style={styles.facilityDescription}>
                  {facility.description}
                </Text>
              )}
              <View style={styles.facilityStatus}>
                <Ionicons
                  name={
                    facility.available ? "checkmark-circle" : "close-circle"
                  }
                  size={16}
                  color={facility.available ? "#10B981" : "#EF4444"}
                />
                <Text
                  style={[
                    styles.facilityStatusText,
                    { color: facility.available ? "#10B981" : "#EF4444" },
                  ]}
                >
                  {facility.available ? "Available" : "Not Available"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderPlacements = () => (
    <ScrollView style={styles.tabContent}>
      {/* Overview Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Placement Statistics</Text>
        <View style={styles.placementStats}>
          <View style={styles.placementStat}>
            <Text style={styles.placementStatValue}>
              {college?.placements.placementRate}%
            </Text>
            <Text style={styles.placementStatLabel}>Placement Rate</Text>
          </View>
          <View style={styles.placementStat}>
            <Text style={styles.placementStatValue}>
              {college?.placements.averagePackage}
            </Text>
            <Text style={styles.placementStatLabel}>Average Package</Text>
          </View>
          <View style={styles.placementStat}>
            <Text style={styles.placementStatValue}>
              {college?.placements.highestPackage}
            </Text>
            <Text style={styles.placementStatLabel}>Highest Package</Text>
          </View>
        </View>
      </View>

      {/* Top Recruiters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Recruiters</Text>
        <View style={styles.recruitersGrid}>
          {college?.placements.topRecruiters.map((recruiter, index) => (
            <View key={index} style={styles.recruiterCard}>
              <Text style={styles.recruiterName}>{recruiter}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Trends */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Placement Trends</Text>
        {college?.placements.trends.map((trend, index) => (
          <View key={index} style={styles.trendCard}>
            <Text style={styles.trendYear}>{trend.year}</Text>
            <View style={styles.trendStats}>
              <Text style={styles.trendStat}>Avg: ₹{trend.average} LPA</Text>
              <Text style={styles.trendStat}>Rate: {trend.rate}%</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderReviews = () => (
    <ScrollView style={styles.tabContent}>
      {/* Overall Rating */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Rating</Text>
        <View style={styles.ratingOverview}>
          <View style={styles.ratingMain}>
            <Text style={styles.ratingScore}>
              {college?.reviews.overallRating}
            </Text>
            {renderStarRating(college?.reviews.overallRating || 0, 20)}
          </View>
          <Text style={styles.ratingCount}>
            Based on {college?.reviews.totalReviews} reviews
          </Text>
        </View>
      </View>

      {/* Rating Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rating Breakdown</Text>
        {college?.reviews.breakdown &&
          Object.entries(college.reviews.breakdown).map(([key, value]) => (
            <View key={key} style={styles.breakdownItem}>
              <Text style={styles.breakdownLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              <View style={styles.breakdownRating}>
                {renderStarRating(value, 14)}
                <Text style={styles.breakdownValue}>{value}</Text>
              </View>
            </View>
          ))}
      </View>

      {/* Recent Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        {college?.reviews.recentReviews.map((review, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewAuthor}>
                <Text style={styles.reviewAuthorName}>{review.author}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              {renderStarRating(review.rating, 14)}
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <View style={styles.reviewFooter}>
              <TouchableOpacity style={styles.helpfulButton}>
                <Ionicons name="thumbs-up-outline" size={14} color="#6B7280" />
                <Text style={styles.helpfulText}>
                  Helpful ({review.helpful})
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#028489" />
          <Text style={styles.loadingText}>Loading college details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!college) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#EF4444" />
          <Text style={styles.errorTitle}>College Not Found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "programs":
        return renderPrograms();
      case "cutoffs":
        return renderCutoffs();
      case "facilities":
        return renderFacilities();
      case "placements":
        return renderPlacements();
      case "reviews":
        return renderReviews();
      default:
        return renderOverview();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#028489" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.collegeName} numberOfLines={2}>
            {college.name}
          </Text>
          <Text style={styles.collegeLocation}>{college.location}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon as any}
                size={16}
                color={activeTab === tab.id ? "#028489" : "#6B7280"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
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
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#028489",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
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
  backButtonHeader: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  collegeName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    lineHeight: 26,
  },
  collegeLocation: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  tabsContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tabsScroll: {
    paddingHorizontal: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#EBF8FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    marginLeft: 6,
  },
  activeTabText: {
    color: "#028489",
    fontWeight: "600",
  },
  tabContent: {
    flex: 1,
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoItem: {
    width: "50%",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  achievementItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  achievementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  achievementYear: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  achievementDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  programCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  programHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  programName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  programDuration: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  programDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  programDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  programDetailLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 4,
  },
  programDetailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  cutoffFilters: {
    marginBottom: 16,
  },
  cutoffFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginRight: 8,
  },
  activeCutoffFilter: {
    backgroundColor: "#028489",
  },
  cutoffFilterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  activeCutoffFilterText: {
    color: "#fff",
  },
  cutoffCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  cutoffHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cutoffYear: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  cutoffRank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#028489",
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  facilityCard: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  facilityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  facilityName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
  facilityDescription: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 16,
  },
  facilityStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  facilityStatusText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  starContainer: {
    flexDirection: "row",
  },
  placementStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  placementStat: {
    alignItems: "center",
  },
  placementStatValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#028489",
    marginBottom: 4,
  },
  placementStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  recruitersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  recruiterCard: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  recruiterName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1E40AF",
  },
  trendCard: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  trendYear: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  trendStats: {
    flexDirection: "row",
  },
  trendStat: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 16,
  },
  ratingOverview: {
    alignItems: "center",
    marginBottom: 16,
  },
  ratingMain: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginRight: 12,
  },
  ratingCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  breakdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  breakdownLabel: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  breakdownRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 8,
  },
  reviewCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  reviewAuthor: {
    flex: 1,
  },
  reviewAuthorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  reviewDate: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  reviewText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  helpfulButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  helpfulText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
});
