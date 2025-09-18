import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, commonStyles } from "@/lib/utils";

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "Works", id: "works" },
    { label: "Testimonials", id: "testimonials" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, commonStyles.shadow]}>
        <View style={styles.content}>
          {/* Logo */}
          <TouchableOpacity
            style={styles.logoContainer}
            onPress={() => onNavigate("home")}
            activeOpacity={0.8}
          >
            <View style={styles.logo}>
              <Text style={styles.logoText}>C</Text>
            </View>
            <Text style={styles.brandName}>Career Sarthi</Text>
          </TouchableOpacity>

          {/* Navigation Menu */}
          <View style={styles.nav}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.navItem}
                onPress={() => onNavigate(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.navText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => onNavigate("features")}
            activeOpacity={0.8}
          >
            <Text style={styles.ctaText}>Getting Started</Text>
          </TouchableOpacity>

          {/* Mobile Menu Button */}
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isMenuOpen ? "close" : "menu"}
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <View style={styles.mobileMenu}>
            {navItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.mobileNavItem}
                onPress={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.mobileNavText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.mobileCTA}
              onPress={() => {
                onNavigate("features");
                setIsMenuOpen(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.mobileCTAText}>Getting Started</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    zIndex: 50,
  },
  header: {
    backgroundColor: `${colors.white}F5`, // 95% opacity
    borderBottomWidth: 1,
    borderBottomColor: `${colors.gray200}80`,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 60,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    ...commonStyles.shadow,
  },
  logoText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    display: "none", // Hide on mobile, show on larger screens via media queries if needed
  },
  navItem: {
    marginHorizontal: 16,
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    display: "none", // Hide on mobile
  },
  ctaText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: colors.gray200,
    justifyContent: "center",
    alignItems: "center",
  },
  mobileMenu: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  mobileNavItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  mobileNavText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  mobileCTA: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 12,
  },
  mobileCTAText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
