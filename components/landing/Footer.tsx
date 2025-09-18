import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/lib/utils";

export default function Footer() {
  const socialLinks = [
    { name: "facebook", icon: "logo-facebook" },
    { name: "twitter", icon: "logo-twitter" },
    { name: "instagram", icon: "logo-instagram" },
    { name: "linkedin", icon: "logo-linkedin" },
  ];

  const handleLinkPress = (link: string) => {
    // Handle navigation or linking here
    console.log(`Pressed ${link}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Brand */}
        <View style={styles.brandContainer}>
          <View style={styles.brandRow}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>S</Text>
            </View>
            <Text style={styles.brandName}>Career Sarthi</Text>
          </View>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          {["Privacy", "Terms", "Contact"].map((link) => (
            <TouchableOpacity
              key={link}
              onPress={() => handleLinkPress(link)}
              activeOpacity={0.7}
            >
              <Text style={styles.linkText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Links */}
        <View style={styles.socialContainer}>
          {socialLinks.map((social, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              onPress={() => handleLinkPress(social.name)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={social.icon as any}
                size={16}
                color={`${colors.white}CC`}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryDark,
    paddingVertical: 32,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 16,
  },
  brandContainer: {
    alignItems: "center",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "bold",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  linksContainer: {
    flexDirection: "row",
    gap: 24,
  },
  linkText: {
    fontSize: 14,
    color: `${colors.white}CC`,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    backgroundColor: `${colors.white}1A`,
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
