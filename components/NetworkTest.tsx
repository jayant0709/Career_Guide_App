import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { apiClient, API_BASE_URL } from "@/utils/api";

export default function NetworkTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const testConnection = async () => {
    setIsLoading(true);
    setResult("Testing connection...");

    try {
      console.log("Testing connection to:", API_BASE_URL);

      // Try a simple GET request to test connectivity
      const response = await fetch(API_BASE_URL + "/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (response.ok || response.status === 401) {
        // 401 is expected since we're not authenticated, but it means the server is reachable
        setResult("✅ Server is reachable! Status: " + response.status);
      } else {
        setResult("❌ Server responded with status: " + response.status);
      }
    } catch (error: any) {
      console.error("Connection test error:", error);
      setResult("❌ Connection failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Connectivity Test</Text>
      <Text style={styles.url}>Testing: {API_BASE_URL}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={testConnection}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Testing..." : "Test Connection"}
        </Text>
      </TouchableOpacity>

      {result ? <Text style={styles.result}>{result}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  url: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#028489",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    fontSize: 14,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
});
