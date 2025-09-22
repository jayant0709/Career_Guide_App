/**
 * Test Button Component - React Native version matching web app
 * Simple button that opens the aptitude test modal
 */

import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SimpleTestModal } from "./SimpleTestModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TestButtonProps, TestResults } from "../../types/aptitude-test";

export function TestButton({ style, textStyle, onComplete }: TestButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleTestComplete = async (results: TestResults) => {
    console.log("Test completed:", results);
    // Save results to AsyncStorage (matching web app's localStorage)
    try {
      await AsyncStorage.setItem(
        "aptitudeTestResults",
        JSON.stringify(results)
      );
      await AsyncStorage.setItem("testCompleted", "true");

      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete(results);
      }
    } catch (error) {
      console.error("Failed to save test results:", error);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="trophy" size={20} color="#0B2447" style={styles.icon} />
        <Text style={[styles.text, textStyle]}>Take Aptitude Test</Text>
        <Ionicons
          name="arrow-forward"
          size={20}
          color="#0B2447"
          style={styles.arrow}
        />
      </TouchableOpacity>

      <SimpleTestModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        onComplete={handleTestComplete}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2B134",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B2447",
  },
  arrow: {
    marginLeft: 8,
  },
});
