/**
 * Floating Chat Button Component
 * Shows a floating action button to open the chat modal
 */

import React from "react";
import { TouchableOpacity, StyleSheet, Animated, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingChatButtonProps {
  onPress: () => void;
}

export function FloatingChatButton({ onPress }: FloatingChatButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons name="chatbubbles" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#028489",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 1000,
  },
});
