/**
 * Test Context for managing aptitude test state
 * Provides centralized state management for test sessions, progress, and results
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TestState,
  TestContextType,
  Question,
  Answer,
  ITestResults,
  ApiError,
  TestProgress,
} from "../types/aptitude-test";
import { testApiService } from "../services/testApiService";

// Initial state
const initialTestState: TestState = {
  status: "idle",
  sessionId: undefined,
  currentQuestion: undefined,
  questionCount: 0,
  totalQuestions: 10,
  results: undefined,
  error: undefined,
  isSubmitting: false,
};

// Action types
type TestAction =
  | { type: "SET_LOADING" }
  | { type: "SET_NOT_STARTED" }
  | {
      type: "START_TEST_SUCCESS";
      payload: { sessionId: string; firstQuestion: Question };
    }
  | { type: "START_TEST_ERROR"; payload: string }
  | {
      type: "SET_CURRENT_QUESTION";
      payload: { question: Question; questionNumber: number };
    }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | {
      type: "SUBMIT_ANSWER_SUCCESS";
      payload: {
        nextQuestion?: Question;
        isComplete: boolean;
        results?: ITestResults;
      };
    }
  | { type: "SUBMIT_ANSWER_ERROR"; payload: string }
  | { type: "SET_COMPLETED"; payload: ITestResults }
  | { type: "SET_ERROR"; payload: string }
  | { type: "RESET_TEST" }
  | { type: "SET_IDLE" };

// Reducer
function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, status: "loading", error: undefined };

    case "SET_NOT_STARTED":
      return { ...state, status: "not_started", error: undefined };

    case "START_TEST_SUCCESS":
      return {
        ...state,
        status: "in_progress",
        sessionId: action.payload.sessionId,
        currentQuestion: action.payload.firstQuestion,
        questionCount: 1,
        error: undefined,
      };

    case "START_TEST_ERROR":
      return { ...state, status: "error", error: action.payload };

    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestion: action.payload.question,
        questionCount: action.payload.questionNumber,
      };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SUBMIT_ANSWER_SUCCESS":
      if (action.payload.isComplete) {
        return {
          ...state,
          status: "completed",
          currentQuestion: undefined,
          results: action.payload.results,
          questionCount: state.totalQuestions,
          isSubmitting: false,
        };
      } else {
        return {
          ...state,
          currentQuestion: action.payload.nextQuestion,
          questionCount: state.questionCount + 1,
          isSubmitting: false,
        };
      }

    case "SUBMIT_ANSWER_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
        isSubmitting: false,
      };

    case "SET_COMPLETED":
      return {
        ...state,
        status: "completed",
        results: action.payload,
        currentQuestion: undefined,
        questionCount: state.totalQuestions,
      };

    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };

    case "RESET_TEST":
      return initialTestState;

    case "SET_IDLE":
      return { ...state, status: "idle", error: undefined };

    default:
      return state;
  }
}

// Context
const TestContext = createContext<TestContextType | undefined>(undefined);

// Hook to use test context
export function useTest(): TestContextType {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
}

// Provider props
interface TestProviderProps {
  children: ReactNode;
}

// Provider component
export function TestProvider({ children }: TestProviderProps) {
  const [testState, dispatch] = useReducer(testReducer, initialTestState);

  // Check test status only when needed (will be called manually from components when user is authenticated)
  // Removed automatic checking on mount to prevent authentication errors

  // Auto-save progress when question changes
  useEffect(() => {
    if (testState.status === "in_progress" && testState.sessionId) {
      saveProgress();
    }
  }, [testState.currentQuestion, testState.sessionId]);

  /**
   * Check current test status
   */
  const checkTestStatus = async (): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING" });

      // First check if user has completed test
      const hasCompleted = await testApiService.hasCompletedTest();
      if (hasCompleted) {
        const cachedResults = await testApiService.getCachedResults();
        if (cachedResults) {
          dispatch({ type: "SET_COMPLETED", payload: cachedResults });
          return;
        }
      }

      // Check for existing session
      const savedProgress = await testApiService.getTestProgress();
      if (savedProgress) {
        // Try to recover session
        const recovery = await testApiService.recoverSession();
        if (recovery.recovered && recovery.currentQuestion) {
          dispatch({
            type: "SET_CURRENT_QUESTION",
            payload: {
              question: recovery.currentQuestion,
              questionNumber: (recovery.progress?.questionsAnswered || 0) + 1,
            },
          });
          return;
        }
      }

      // No existing test or session
      dispatch({ type: "SET_NOT_STARTED" });
    } catch (error: any) {
      console.warn("Failed to check test status:", error);
      dispatch({ type: "SET_NOT_STARTED" });
    }
  };

  /**
   * Start a new test
   */
  const startTest = async (forceStart: boolean = false): Promise<void> => {
    try {
      dispatch({ type: "SET_LOADING" });

      // If forceStart is true, reset test state first
      if (forceStart) {
        dispatch({ type: "RESET_TEST" });
      }

      const response = await testApiService.startTest();

      dispatch({
        type: "START_TEST_SUCCESS",
        payload: {
          sessionId: response.sessionId,
          firstQuestion: response.firstQuestion,
        },
      });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to start test";
      dispatch({ type: "START_TEST_ERROR", payload: errorMessage });
      throw error;
    }
  };

  /**
   * Submit an answer
   */
  const submitAnswer = async (answer: Answer): Promise<void> => {
    if (!testState.sessionId || !testState.currentQuestion) {
      throw new Error("No active test session");
    }

    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });

      const response = await testApiService.submitAnswer({
        sessionId: testState.sessionId,
        questionId: testState.currentQuestion.id,
        answer,
      });

      dispatch({
        type: "SUBMIT_ANSWER_SUCCESS",
        payload: {
          nextQuestion: response.nextQuestion,
          isComplete: response.isComplete,
          results: response.results,
        },
      });
    } catch (error: any) {
      const errorMessage = error.message || "Failed to submit answer";
      dispatch({ type: "SUBMIT_ANSWER_ERROR", payload: errorMessage });
      throw error;
    }
  };

  /**
   * Reset test state
   */
  const resetTest = (): void => {
    dispatch({ type: "RESET_TEST" });
  };

  /**
   * Clear error state
   */
  const clearError = (): void => {
    dispatch({ type: "SET_IDLE" });
  };

  /**
   * Save progress to local storage
   */
  const saveProgress = async (): Promise<void> => {
    if (!testState.sessionId) return;

    try {
      const progress: TestProgress = {
        sessionId: testState.sessionId,
        answers: [], // This would be maintained in a more complex implementation
        currentQuestionIndex: testState.questionCount - 1,
        timestamp: new Date(),
      };

      await AsyncStorage.setItem("test_progress", JSON.stringify(progress));
    } catch (error) {
      console.warn("Failed to save progress:", error);
    }
  };

  /**
   * Get test results
   */
  const getResults = async (): Promise<ITestResults | null> => {
    try {
      return await testApiService.getCachedResults();
    } catch (error) {
      console.warn("Failed to get results:", error);
      return null;
    }
  };

  /**
   * Check if user can start test
   */
  const canStartTest = (): boolean => {
    return testState.status === "not_started" || testState.status === "error";
  };

  /**
   * Check if test is in progress
   */
  const isTestInProgress = (): boolean => {
    return testState.status === "in_progress";
  };

  /**
   * Check if test is completed
   */
  const isTestCompleted = (): boolean => {
    return testState.status === "completed";
  };

  /**
   * Get progress percentage
   */
  const getProgressPercentage = (): number => {
    return Math.round(
      (testState.questionCount / testState.totalQuestions) * 100
    );
  };

  /**
   * Retry failed operation
   */
  const retry = async (): Promise<void> => {
    if (testState.status === "error") {
      await checkTestStatus();
    }
  };

  const contextValue: TestContextType = {
    testState,
    startTest,
    submitAnswer,
    resetTest,
    checkTestStatus,
    clearError,
    getResults,
    canStartTest,
    isTestInProgress,
    isTestCompleted,
    getProgressPercentage,
    retry,
  };

  return (
    <TestContext.Provider value={contextValue}>{children}</TestContext.Provider>
  );
}

export default TestContext;
