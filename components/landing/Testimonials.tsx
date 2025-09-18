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
import { testimonials } from "./data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>What Students Say</Text>
          <Text style={styles.subtitle}>
            Real stories from students who found their path
          </Text>
        </View>

        <View style={styles.testimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <View
              key={index}
              style={[
                styles.testimonialCard,
                commonStyles.shadowLarge,
                index === currentIndex && styles.activeCard,
                index !== currentIndex && styles.inactiveCard,
              ]}
            >
              {/* Speech Bubble */}
              <View style={styles.speechBubble}>
                {/* Quote Icon */}
                <Ionicons
                  name="chatbubble-outline"
                  size={32}
                  color={colors.accent}
                  style={styles.quoteIcon}
                />

                {/* Quote Text */}
                <Text style={styles.quote}>"{testimonial.quote}"</Text>
              </View>

              {/* Student Info */}
              <View style={styles.studentInfo}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {testimonial.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.studentDetails}>
                  <Text style={styles.studentName}>{testimonial.name}</Text>
                  <Text style={styles.studentClass}>{testimonial.details}</Text>
                  <View style={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <Text key={i} style={styles.star}>
                        ★
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={prevTestimonial}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color={colors.primary} />
          </TouchableOpacity>

          <View style={styles.indicators}>
            {testimonials.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
                onPress={() => setCurrentIndex(index)}
                activeOpacity={0.7}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={nextTestimonial}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-forward" size={20} color={colors.primary} />
          </TouchableOpacity>
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
  },
  testimonialsContainer: {
    gap: 24,
    marginBottom: 48,
  },
  testimonialCard: {
    backgroundColor: colors.backgroundGreen,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: `${colors.primary}1A`,
  },
  activeCard: {
    transform: [{ scale: 1.02 }],
    opacity: 1,
  },
  inactiveCard: {
    opacity: 0.8,
  },
  speechBubble: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    position: "relative",
  },
  quoteIcon: {
    marginBottom: 16,
  },
  quote: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    fontStyle: "italic",
  },
  studentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginLeft: 16,
  },
  avatar: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  studentDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  studentClass: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  rating: {
    flexDirection: "row",
  },
  star: {
    color: colors.accent,
    fontSize: 14,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  navButton: {
    backgroundColor: colors.backgroundGreen,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: `${colors.primary}33`,
  },
  indicators: {
    flexDirection: "row",
    gap: 8,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: `${colors.primary}40`,
  },
  activeIndicator: {
    backgroundColor: colors.accent,
    transform: [{ scale: 1.25 }],
  },
});
