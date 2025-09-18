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
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { colors } from "@/lib/utils";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/(auth)/signin");
    }
  }, [isAuthenticated, isLoading]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          setIsLoggingOut(true);
          try {
            await logout();
            router.replace("/");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  const handleBackToHome = () => {
    router.replace("/");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect to signin
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background decoration */}
      <View style={styles.backgroundDecoration1} />
      <View style={styles.backgroundDecoration2} />

      {/* Back Button */}
      <TouchableOpacity
        onPress={handleBackToHome}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={32} color="white" />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.welcomeText}>
                  Welcome back, {user.username}!
                </Text>
              </View>
            </View>
          </View>

          {/* Profile Information */}
          <View style={styles.section}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Account Information</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Username</Text>
                    <Text style={styles.infoValue}>{user.username}</Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={colors.primary}
                  />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Member Since</Text>
                    <Text style={styles.infoValue}>Recently joined</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Button
                title="Go to Dashboard"
                onPress={handleBackToHome}
                style={styles.dashboardButton}
              />

              <TouchableOpacity
                onPress={handleLogout}
                disabled={isLoggingOut}
                style={[
                  styles.logoutButton,
                  isLoggingOut && styles.logoutButtonDisabled,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.logoutButtonContent}>
                  {isLoggingOut ? (
                    <>
                      <ActivityIndicator size="small" color="#DC2626" />
                      <Text style={styles.logoutButtonText}>
                        Logging out...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Ionicons
                        name="log-out-outline"
                        size={20}
                        color="#DC2626"
                      />
                      <Text style={styles.logoutButtonText}>Logout</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFBF8",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FCFBF8",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
  backgroundDecoration1: {
    position: "absolute",
    top: 80,
    right: -100,
    width: 200,
    height: 200,
    backgroundColor: `${colors.primary}15`,
    borderRadius: 100,
  },
  backgroundDecoration2: {
    position: "absolute",
    bottom: -50,
    left: -80,
    width: 160,
    height: 160,
    backgroundColor: `${colors.accent}15`,
    borderRadius: 80,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 120,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#E6FBF6",
  },
  header: {
    padding: 32,
    paddingBottom: 24,
  },
  avatarContainer: {
    alignItems: "center",
    gap: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  section: {
    gap: 20,
  },
  sectionCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 24,
    margin: 24,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  infoContainer: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  actions: {
    padding: 24,
    paddingTop: 0,
    gap: 16,
  },
  dashboardButton: {
    backgroundColor: colors.primary,
    height: 48,
  },
  logoutButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoutButtonText: {
    color: "#DC2626",
    fontSize: 16,
    fontWeight: "600",
  },
});
