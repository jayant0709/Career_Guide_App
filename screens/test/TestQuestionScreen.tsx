/**
 * Test Question Screen
 * Displays adaptive questions and handles user responses
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Question, Answer } from "../../types/aptitude-test";
import { useTest } from "../../contexts/TestContext";

const { width } = Dimensions.get("window");

const TestQuestionScreen = () => {
  const { testState, submitAnswer } = useTest();

  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );
  const [textValue, setTextValue] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const question = testState.currentQuestion;
  const questionNumber = testState.questionCount;
  const totalQuestions = testState.totalQuestions;
  const isSubmitting = testState.isSubmitting;

  useEffect(() => {
    // If no current question, redirect to test intro
    if (!question) {
      router.replace("/test" as any);
      return;
    }

    // Animate question entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [question]);

  const isValid = () => {
    if (!question) return false;
    if (question.type === "text") {
      return textValue.trim().length > 0;
    }
    return selectedValue !== null;
  };

  const handleSubmit = async () => {
    if (!isValid() || !question) return;

    const answer: Answer = {
      questionId: question.id,
      value: question.type === "text" ? textValue.trim() : selectedValue!,
      timestamp: new Date(),
    };

    try {
      await submitAnswer(answer);

      // Navigation is handled by the context based on test completion
      if (testState.status === "completed") {
        router.replace("/test/results" as any);
      }
      // If still in progress, the context will update currentQuestion and this screen will re-render
    } catch (error: any) {
      Alert.alert(
        "Submission Failed",
        error.message || "Failed to submit your answer. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleBack = () => {
    Alert.alert(
      "Exit Assessment",
      "Are you sure you want to exit? Your progress will be saved and you can continue later.",
      [
        { text: "Continue Test", style: "cancel" },
        { text: "Exit", style: "destructive", onPress: () => router.back() },
      ]
    );
  };

  if (!question) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text>Loading question...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const progress = questionNumber / totalQuestions;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Progress */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {questionNumber} of {totalQuestions}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressPercentage}>
            {Math.round(progress * 100)}% Complete
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.questionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Question */}
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.text}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {question.category} Assessment
              </Text>
            </View>
          </View>

          {/* Answer Options */}
          <View style={styles.answersContainer}>
            {question.type === "multiple_choice" && question.options && (
              <View style={styles.optionsContainer}>
                {question.options.map((option: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedValue === option && styles.optionButtonSelected,
                    ]}
                    onPress={() => setSelectedValue(option)}
                  >
                    <View
                      style={[
                        styles.optionRadio,
                        selectedValue === option && styles.optionRadioSelected,
                      ]}
                    >
                      {selectedValue === option && (
                        <View style={styles.optionRadioInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        selectedValue === option && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {question.type === "rating" && question.scale && (
              <View style={styles.ratingContainer}>
                <View style={styles.ratingLabels}>
                  <Text style={styles.ratingLabelStart}>
                    {question.scale.labels[0]}
                  </Text>
                  <Text style={styles.ratingLabelEnd}>
                    {question.scale.labels[question.scale.labels.length - 1]}
                  </Text>
                </View>

                <View style={styles.ratingOptions}>
                  {Array.from(
                    { length: question.scale.max - question.scale.min + 1 },
                    (_, i) => {
                      const value = question.scale!.min + i;
                      return (
                        <TouchableOpacity
                          key={value}
                          style={[
                            styles.ratingButton,
                            selectedValue === value &&
                              styles.ratingButtonSelected,
                          ]}
                          onPress={() => setSelectedValue(value)}
                        >
                          <Text
                            style={[
                              styles.ratingButtonText,
                              selectedValue === value &&
                                styles.ratingButtonTextSelected,
                            ]}
                          >
                            {value}
                          </Text>
                          {question.scale!.labels[i] && (
                            <Text style={styles.ratingButtonLabel}>
                              {question.scale!.labels[i]}
                            </Text>
                          )}
                        </TouchableOpacity>
                      );
                    }
                  )}
                </View>
              </View>
            )}

            {question.type === "text" && (
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={textValue}
                  onChangeText={setTextValue}
                  placeholder="Please share your thoughts..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  textAlignVertical="top"
                />
                <Text style={styles.characterCount}>
                  {textValue.length}/500 characters
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isValid() || isSubmitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isValid() || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>
                {questionNumber === totalQuestions
                  ? "Complete Assessment"
                  : "Next Question"}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  progressContainer: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressPercentage: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    lineHeight: 28,
    marginBottom: 16,
    textAlign: "center",
  },
  categoryBadge: {
    alignSelf: "center",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1976D2",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  answersContainer: {
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  optionButtonSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#E3F2FD",
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionRadioSelected: {
    borderColor: "#007AFF",
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#1a1a1a",
    lineHeight: 22,
  },
  optionTextSelected: {
    fontWeight: "600",
    color: "#007AFF",
  },
  ratingContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
  },
  ratingLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  ratingLabelStart: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    textAlign: "left",
  },
  ratingLabelEnd: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    textAlign: "right",
  },
  ratingOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingButton: {
    alignItems: "center",
    minWidth: 60,
  },
  ratingButtonSelected: {
    transform: [{ scale: 1.1 }],
  },
  ratingButtonText: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 40,
    marginBottom: 8,
  },
  ratingButtonTextSelected: {
    backgroundColor: "#007AFF",
    color: "#fff",
  },
  ratingButtonLabel: {
    fontSize: 10,
    color: "#999",
    textAlign: "center",
    maxWidth: 50,
  },
  textInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1a1a1a",
    minHeight: 120,
    marginBottom: 8,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  footer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});

export default TestQuestionScreen;
