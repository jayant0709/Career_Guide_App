/**
 * Chat Modal Component - React Native version
 * Communicates with web backend's /api/chat endpoint
 */

import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import apiClient from "@/utils/api";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function ChatModal({ isVisible, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Welcome message
  useEffect(() => {
    if (isVisible && messages.length === 0) {
      setMessages([
        {
          text: "Hi! I'm your Career Assistant. Ask me anything about careers, education, colleges, courses, scholarships, and more! 🎓",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isVisible]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    const newUserMessage: Message = {
      text: userMessage,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      // Send to web backend's /api/chat endpoint using existing apiClient
      const response = await apiClient.post("/api/chat", {
        query: userMessage,
      });

      // Add bot response
      const botMessage: Message = {
        text:
          response.data.message || "Sorry, I could not process your request.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);

      let errorText = "Sorry, something went wrong. Please try again.";

      if (error.code === "ECONNABORTED") {
        errorText =
          "Request timed out. The server might be busy processing your request.";
      } else if (error.code === "NETWORK_ERROR" || !error.response) {
        errorText =
          "Cannot connect to server. Please make sure the web app is running on your computer.";
      } else if (error.response?.status === 500) {
        errorText =
          "Server error. This might be an issue with the Gemini API key or the backend.";
      } else if (error.response?.status === 404) {
        errorText =
          "Chat endpoint not found. Please check if the web app is running correctly.";
      }

      const errorMessage: Message = {
        text: errorText,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    // Reset chat when closing
    setMessages([]);
    setInput("");
    setIsLoading(false);
    onClose();
  };

  const formatBotMessage = (text: string) => {
    // Better formatting for readability on mobile
    return (
      text
        // Replace headers with bold text and line breaks
        .replace(/###\s*(.*?)$/gm, "\n• $1\n")
        .replace(/##\s*(.*?)$/gm, "\n$1\n")
        .replace(/#\s*(.*?)$/gm, "\n$1\n")

        // Replace bullet points with proper bullet symbols
        .replace(/^\*\s+/gm, "• ")
        .replace(/^-\s+/gm, "• ")

        // Keep bold text markers for now (we'll handle them in rendering)
        .replace(/\*\*(.*?)\*\*/g, "**$1**")

        // Clean up multiple line breaks
        .replace(/\n{3,}/g, "\n\n")

        // Clean up spaces
        .trim()
    );
  };

  // Function to render formatted text with bold support
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        // Bold text
        const boldText = part.slice(2, -2);
        return (
          <Text key={index} style={styles.boldText}>
            {boldText}
          </Text>
        );
      } else {
        // Regular text
        return part;
      }
    });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerInfo}>
              <Ionicons name="chatbubbles" size={24} color="#fff" />
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Career Assistant</Text>
                <Text style={styles.headerSubtitle}>
                  Ask about careers & education
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg, idx) => (
              <View
                key={idx}
                style={[
                  styles.messageWrapper,
                  msg.isBot
                    ? styles.botMessageWrapper
                    : styles.userMessageWrapper,
                ]}
              >
                <View
                  style={[
                    styles.message,
                    msg.isBot ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      msg.isBot
                        ? styles.botMessageText
                        : styles.userMessageText,
                    ]}
                    selectable={true}
                  >
                    {msg.isBot
                      ? renderFormattedText(formatBotMessage(msg.text))
                      : msg.text}
                  </Text>
                </View>
              </View>
            ))}

            {isLoading && (
              <View style={styles.botMessageWrapper}>
                <View
                  style={[
                    styles.message,
                    styles.botMessage,
                    styles.loadingMessage,
                  ]}
                >
                  <ActivityIndicator size="small" color="#028489" />
                  <Text
                    style={[
                      styles.messageText,
                      styles.botMessageText,
                      styles.loadingText,
                    ]}
                    selectable={true}
                  >
                    Thinking...
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={input}
                onChangeText={setInput}
                placeholder="Ask about careers, colleges, courses..."
                placeholderTextColor="#999"
                multiline
                maxLength={500}
                onSubmitEditing={handleSubmit}
                returnKeyType="send"
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!input.trim() || isLoading) && styles.sendButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!input.trim() || isLoading}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={!input.trim() || isLoading ? "#ccc" : "#fff"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#028489",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerText: {
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  messageWrapper: {
    marginBottom: 12,
  },
  botMessageWrapper: {
    alignItems: "flex-start",
  },
  userMessageWrapper: {
    alignItems: "flex-end",
  },
  message: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  botMessage: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 4,
  },
  loadingMessage: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,
  },
  botMessageText: {
    color: "#333",
  },
  userMessageText: {
    color: "#fff",
  },
  loadingText: {
    marginLeft: 8,
    fontStyle: "italic",
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
    color: "#333",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#E5E5E5",
  },
});
