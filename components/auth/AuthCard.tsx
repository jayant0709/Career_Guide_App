import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, commonStyles } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Background decoration - using colors instead of gradients for now */}
        <View style={styles.backgroundDecoration1} />
        <View style={styles.backgroundDecoration2} />

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToHome}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          <View style={[styles.card, commonStyles.shadowLarge]}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <View style={styles.logo}>
                  <Text style={styles.logoText}>C</Text>
                </View>
                <Text style={styles.brandName}>Career Sarthi</Text>
              </View>

              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>

            {children}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    minHeight: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
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
  backButton: {
    position: "absolute",
    top: 60,
    left: 16,
    zIndex: 50,
    backgroundColor: colors.white,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray200,
    ...commonStyles.shadow,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: colors.backgroundGreen,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    ...commonStyles.shadow,
  },
  logoText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  brandName: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
  },
});
