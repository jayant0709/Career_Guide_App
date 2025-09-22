/**
 * College Card Component - Mobile version
 * Matches web app styling with mobile optimizations
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { College } from "@/types/colleges";

interface CollegeCardProps {
  college: College;
  isSelected?: boolean;
  onToggleSelect?: (collegeId: string) => void;
  showSelectButton?: boolean;
}

export function CollegeCard({
  college,
  isSelected = false,
  onToggleSelect,
  showSelectButton = false,
}: CollegeCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(colleges)/${college.id}` as any);
  };

  const handleSelectToggle = (e: any) => {
    e.stopPropagation();
    onToggleSelect?.(college.id);
  };

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case "hostel":
        return "home";
      case "library":
        return "library";
      case "labs":
        return "flask";
      case "internet":
        return "wifi";
      case "sports":
        return "fitness";
      case "transport":
        return "car";
      case "medical":
        return "medical";
      case "canteen":
        return "restaurant";
      default:
        return "checkmark-circle";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Government":
        return "#10B981"; // green
      case "Private":
        return "#3B82F6"; // blue
      case "Aided":
        return "#F59E0B"; // amber
      default:
        return "#6B7280"; // gray
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.collegeName} numberOfLines={2}>
            {college.name}
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color="#6B7280" />
            <Text style={styles.location} numberOfLines={1}>
              {college.location}
            </Text>
          </View>
        </View>

        {showSelectButton && (
          <TouchableOpacity
            style={[styles.selectButton, isSelected && styles.selectedButton]}
            onPress={handleSelectToggle}
          >
            <Ionicons
              name={isSelected ? "checkmark" : "add"}
              size={16}
              color={isSelected ? "#fff" : "#028489"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Type and Grade */}
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.typeBadge,
            { backgroundColor: getTypeColor(college.type) },
          ]}
        >
          <Text style={styles.typeBadgeText}>{college.type}</Text>
        </View>
        {college.naacGrade && (
          <View style={styles.gradeBadge}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.gradeBadgeText}>NAAC {college.naacGrade}</Text>
          </View>
        )}
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        {college.rating && (
          <View style={styles.stat}>
            <Ionicons name="trophy" size={14} color="#EF4444" />
            <Text style={styles.statText}>#{college.rating}</Text>
          </View>
        )}
        {college.placement && (
          <View style={styles.stat}>
            <Ionicons name="trending-up" size={14} color="#10B981" />
            <Text style={styles.statText}>{college.placement}</Text>
          </View>
        )}
        {college.fees && (
          <View style={styles.stat}>
            <Ionicons name="cash" size={14} color="#3B82F6" />
            <Text style={styles.statText}>{college.fees}</Text>
          </View>
        )}
      </View>

      {/* Programs */}
      <View style={styles.programsSection}>
        <Text style={styles.sectionTitle}>Programs:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.programsScroll}
        >
          {college.programs.slice(0, 3).map((program, index) => (
            <View key={index} style={styles.programChip}>
              <Text style={styles.programText} numberOfLines={1}>
                {program}
              </Text>
            </View>
          ))}
          {college.programs.length > 3 && (
            <View style={styles.programChip}>
              <Text style={styles.programText}>
                +{college.programs.length - 3} more
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Facilities */}
      <View style={styles.facilitiesSection}>
        <Text style={styles.sectionTitle}>Facilities:</Text>
        <View style={styles.facilitiesGrid}>
          {college.facilities.slice(0, 6).map((facility, index) => (
            <View key={index} style={styles.facilityItem}>
              <Ionicons
                name={getFacilityIcon(facility) as any}
                size={12}
                color="#028489"
              />
              <Text style={styles.facilityText} numberOfLines={1}>
                {facility}
              </Text>
            </View>
          ))}
          {college.facilities.length > 6 && (
            <View style={styles.facilityItem}>
              <Text style={styles.facilityText}>
                +{college.facilities.length - 6} more
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.description} numberOfLines={2}>
          {college.description}
        </Text>
        <View style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={14} color="#028489" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  selectedCard: {
    borderColor: "#028489",
    borderWidth: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    lineHeight: 24,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
    flex: 1,
  },
  selectButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#028489",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  selectedButton: {
    backgroundColor: "#028489",
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  gradeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
  },
  gradeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  statText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 4,
  },
  programsSection: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  programsScroll: {
    paddingRight: 16,
  },
  programChip: {
    backgroundColor: "#EBF8FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  programText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1E40AF",
  },
  facilitiesSection: {
    marginBottom: 12,
  },
  facilitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  facilityText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  footer: {
    marginTop: 4,
  },
  description: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginBottom: 8,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#028489",
    marginRight: 4,
  },
});
