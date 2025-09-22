/**
 * Simple Test Modal - React Native version matching web app exactly
 * 5-question modal test with immediate results
 */

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  Question,
  SimpleTestModalProps,
  TestResults,
} from "../../types/aptitude-test";

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "1",
    text: "What type of activities do you enjoy most?",
    options: [
      "Solving math problems and puzzles",
      "Reading and writing stories",
      "Working with people and helping others",
      "Building and creating things",
      "Organizing events and leading teams",
    ],
    category: "interests",
  },
  {
    id: "2",
    text: "Which subject do you find most interesting?",
    options: [
      "Mathematics and Physics",
      "Literature and History",
      "Biology and Chemistry",
      "Economics and Business",
      "Art and Design",
    ],
    category: "interests",
  },
  {
    id: "3",
    text: "How do you prefer to work?",
    options: [
      "Alone, focusing deeply on tasks",
      "In small groups with close collaboration",
      "Leading large teams",
      "With hands-on practical work",
      "In creative, flexible environments",
    ],
    category: "personality",
  },
  {
    id: "4",
    text: "What motivates you most?",
    options: [
      "Solving complex problems",
      "Helping others succeed",
      "Creating something new",
      "Achieving financial success",
      "Making a positive impact on society",
    ],
    category: "values",
  },
  {
    id: "5",
    text: "Which career sounds most appealing?",
    options: [
      "Software Engineer or Data Scientist",
      "Teacher or Social Worker",
      "Doctor or Researcher",
      "Business Owner or Manager",
      "Artist or Designer",
    ],
    category: "career",
  },
];

const { width } = Dimensions.get("window");

export function SimpleTestModal({
  isVisible,
  onClose,
  onComplete,
}: SimpleTestModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = () => {
    if (!selectedOption) return;

    const newAnswers = {
      ...answers,
      [SAMPLE_QUESTIONS[currentQuestion].id]: selectedOption,
    };
    setAnswers(newAnswers);
    setSelectedOption("");

    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate simple results
      const results = generateResults(newAnswers);
      setShowResults(true);
      onComplete(results);
    }
  };

  const generateResults = (answers: Record<string, string>) => {
    // Simple logic to determine stream based on answers (matching web app exactly)
    const streamScores = {
      science: 0,
      commerce: 0,
      arts: 0,
      vocational: 0,
    };

    Object.values(answers).forEach((answer) => {
      if (
        answer.includes("math") ||
        answer.includes("Physics") ||
        answer.includes("Engineer") ||
        answer.includes("Data Scientist")
      ) {
        streamScores.science += 20;
      }
      if (
        answer.includes("Business") ||
        answer.includes("Economics") ||
        answer.includes("Manager") ||
        answer.includes("financial")
      ) {
        streamScores.commerce += 20;
      }
      if (
        answer.includes("Literature") ||
        answer.includes("History") ||
        answer.includes("Art") ||
        answer.includes("Teacher") ||
        answer.includes("Social")
      ) {
        streamScores.arts += 20;
      }
      if (
        answer.includes("Building") ||
        answer.includes("hands-on") ||
        answer.includes("practical")
      ) {
        streamScores.vocational += 20;
      }
    });

    const topStream = Object.entries(streamScores).reduce((a, b) =>
      streamScores[a[0] as keyof typeof streamScores] >
      streamScores[b[0] as keyof typeof streamScores]
        ? a
        : b
    );

    return {
      topStream: topStream[0],
      score: topStream[1],
      allScores: streamScores,
      recommendations: getRecommendations(topStream[0]),
    };
  };

  const getRecommendations = (stream: string) => {
    const recommendations = {
      science: {
        subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
        careers: [
          "Software Engineer",
          "Data Scientist",
          "Research Scientist",
          "Doctor",
        ],
        colleges: ["IIT", "NIT", "BITS Pilani"],
      },
      commerce: {
        subjects: [
          "Accountancy",
          "Business Studies",
          "Economics",
          "Mathematics",
        ],
        careers: [
          "Chartered Accountant",
          "Business Analyst",
          "Investment Banker",
          "Entrepreneur",
        ],
        colleges: ["SRCC", "LSR", "Hansraj College"],
      },
      arts: {
        subjects: ["History", "Geography", "Political Science", "Psychology"],
        careers: ["Civil Services", "Journalist", "Teacher", "Social Worker"],
        colleges: ["JNU", "DU", "BHU"],
      },
      vocational: {
        subjects: [
          "Computer Applications",
          "Multimedia",
          "Fashion Design",
          "Hotel Management",
        ],
        careers: [
          "Graphic Designer",
          "Chef",
          "Event Manager",
          "Fashion Designer",
        ],
        colleges: ["NIFT", "Pearl Academy", "Symbiosis"],
      },
    };

    return (
      recommendations[stream as keyof typeof recommendations] ||
      recommendations.science
    );
  };

  const progress = ((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100;

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption("");
    setShowResults(false);
  };

  const handleClose = () => {
    resetTest();
    onClose();
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
            <View>
              <Text style={styles.headerTitle}>Career Discovery Test</Text>
              <Text style={styles.headerSubtitle}>
                Find your perfect educational stream
              </Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {!showResults && (
            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
                </Text>
                <Text style={styles.progressPercent}>
                  {Math.round(progress)}% Complete
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
            </View>
          )}
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!showResults ? (
            <View style={styles.questionContainer}>
              {/* Question */}
              <View style={styles.questionHeader}>
                <Text style={styles.questionText}>
                  {SAMPLE_QUESTIONS[currentQuestion].text}
                </Text>
              </View>

              {/* Options */}
              <View style={styles.optionsContainer}>
                {SAMPLE_QUESTIONS[currentQuestion].options.map(
                  (option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedOption === option &&
                          styles.optionButtonSelected,
                      ]}
                      onPress={() => setSelectedOption(option)}
                    >
                      <View
                        style={[
                          styles.radioButton,
                          selectedOption === option &&
                            styles.radioButtonSelected,
                        ]}
                      >
                        {selectedOption === option && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                      <Text
                        style={[
                          styles.optionText,
                          selectedOption === option &&
                            styles.optionTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              {/* Next Button */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.nextButton,
                    !selectedOption && styles.nextButtonDisabled,
                  ]}
                  onPress={handleAnswer}
                  disabled={!selectedOption}
                >
                  <Text style={styles.nextButtonText}>
                    {currentQuestion === SAMPLE_QUESTIONS.length - 1
                      ? "Get Results"
                      : "Next Question"}
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={20}
                    color="#0B2447"
                    style={styles.nextButtonIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ResultsDisplay
              results={generateResults(answers)}
              onClose={handleClose}
              onRetake={resetTest}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

function ResultsDisplay({
  results,
  onClose,
  onRetake,
}: {
  results: any;
  onClose: () => void;
  onRetake: () => void;
}) {
  return (
    <View style={styles.resultsContainer}>
      {/* Success Header */}
      <View style={styles.successHeader}>
        <View style={styles.successIcon}>
          <Ionicons name="trophy" size={32} color="#028489" />
        </View>
        <Text style={styles.successTitle}>Your Results Are Ready!</Text>
        <Text style={styles.successSubtitle}>
          Based on your responses, here's your personalized recommendation
        </Text>
      </View>

      {/* Top Recommendation */}
      <View style={styles.topRecommendation}>
        <View style={styles.recommendationContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.streamTitle}>
              {results.topStream.charAt(0).toUpperCase() +
                results.topStream.slice(1)}{" "}
              Stream
            </Text>
            <Text style={styles.streamSubtitle}>
              Best match for your interests and skills
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreValue}>{results.score}%</Text>
            <Text style={styles.scoreLabel}>Match Score</Text>
          </View>
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsGrid}>
        <View style={styles.recommendationCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="book-outline" size={20} color="#028489" />
            <Text style={styles.cardTitle}>Subjects</Text>
          </View>
          <View style={styles.cardContent}>
            {results.recommendations.subjects
              .slice(0, 3)
              .map((subject: string, index: number) => (
                <Text key={index} style={styles.listItem}>
                  • {subject}
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.recommendationCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="people-outline" size={20} color="#028489" />
            <Text style={styles.cardTitle}>Careers</Text>
          </View>
          <View style={styles.cardContent}>
            {results.recommendations.careers
              .slice(0, 3)
              .map((career: string, index: number) => (
                <Text key={index} style={styles.listItem}>
                  • {career}
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.recommendationCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="trophy-outline" size={20} color="#028489" />
            <Text style={styles.cardTitle}>Top Colleges</Text>
          </View>
          <View style={styles.cardContent}>
            {results.recommendations.colleges
              .slice(0, 3)
              .map((college: string, index: number) => (
                <Text key={index} style={styles.listItem}>
                  • {college}
                </Text>
              ))}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
          <Text style={styles.primaryButtonText}>Save to Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onRetake}>
          <Text style={styles.secondaryButtonText}>Retake Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFBF8",
  },
  header: {
    backgroundColor: "#028489",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },
  closeButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  progressPercent: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#F2B134",
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  questionContainer: {
    padding: 32,
  },
  questionHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0B2447",
    textAlign: "center",
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  optionButtonSelected: {
    borderColor: "#028489",
    backgroundColor: "#E6FBF6",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#028489",
    backgroundColor: "#028489",
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  optionTextSelected: {
    color: "#028489",
  },
  buttonContainer: {
    alignItems: "center",
    paddingTop: 16,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2B134",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: "#D1D5DB",
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B2447",
  },
  nextButtonIcon: {
    marginLeft: 8,
  },
  resultsContainer: {
    padding: 32,
    gap: 32,
  },
  successHeader: {
    alignItems: "center",
  },
  successIcon: {
    width: 64,
    height: 64,
    backgroundColor: "#E6FBF6",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0B2447",
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  topRecommendation: {
    backgroundColor: "#028489",
    borderRadius: 12,
    padding: 24,
  },
  recommendationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streamTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    flex: 1,
    marginRight: 12,
  },
  streamSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
  },
  scoreContainer: {
    alignItems: "center",
    minWidth: 80,
    paddingLeft: 8,
  },
  scoreValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  scoreLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  recommendationsGrid: {
    gap: 16,
  },
  recommendationCard: {
    backgroundColor: "#E6FBF6",
    borderRadius: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B2447",
    marginLeft: 8,
  },
  cardContent: {
    gap: 4,
  },
  listItem: {
    fontSize: 14,
    color: "#028489",
    fontWeight: "500",
  },
  actionButtons: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#F2B134",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B2447",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#028489",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#028489",
  },
});
