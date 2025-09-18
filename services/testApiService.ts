/**
 * API service for aptitude test operations in React Native
 * Handles communication with the backend test endpoints
 */

import { apiClient } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StartTestResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  TestStatusResponse,
  Question,
  Answer,
  ITestResults,
  TestProgress,
  ApiError
} from '../types/aptitude-test';

const TEST_PROGRESS_KEY = 'test_progress';
const TEST_RESULTS_KEY = 'test_results';
const TOKEN_KEY = 'authToken';

class TestApiService {
  private baseUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

  /**
   * Get auth token from AsyncStorage
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  /**
   * Check current test status
   */
  async checkTestStatus(): Promise<TestStatusResponse> {
    try {
      // Try with current authentication approach (session-based)
      const response = await apiClient.get('/api/test/status', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      // If it fails, try with token-based auth as fallback
      try {
        const token = await this.getAuthToken();
        if (token) {
          const response = await apiClient.get('/api/test/status', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          return response.data;
        }
      } catch (tokenError) {
        // Ignore token error, use the original error
      }
      
      throw this.handleApiError(error, 'Failed to check test status');
    }
  }

  /**
   * Start a new aptitude test session
   */
  async startTest(): Promise<StartTestResponse> {
    try {
      // Try with current authentication approach (may be session-based)
      const response = await apiClient.post('/api/test/start', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: StartTestResponse = response.data;

      // Save initial progress
      await this.saveTestProgress({
        sessionId: data.sessionId,
        answers: [],
        currentQuestionIndex: 0,
        timestamp: new Date()
      });

      return data;
    } catch (error: any) {
      // If it fails, try with token-based auth as fallback
      try {
        const token = await this.getAuthToken();
        if (token) {
          const response = await apiClient.post('/api/test/start', {}, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data: StartTestResponse = response.data;

          await this.saveTestProgress({
            sessionId: data.sessionId,
            answers: [],
            currentQuestionIndex: 0,
            timestamp: new Date()
          });

          return data;
        }
      } catch (tokenError) {
        // Ignore token error, use the original error
      }
      
      throw this.handleApiError(error, 'Failed to start test');
    }
  }

  /**
   * Submit an answer and get next question
   */
  async submitAnswer(request: SubmitAnswerRequest): Promise<SubmitAnswerResponse> {
    try {
      // Try with current authentication approach (session-based)
      const response = await apiClient.post('/api/test/answer', request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: SubmitAnswerResponse = response.data;

      // Update local progress
      await this.updateTestProgress(request.answer);

      // If test is complete, save results
      if (data.isComplete && data.results) {
        await this.saveTestResults(data.results);
        await this.clearTestProgress();
      }

      return data;
    } catch (error: any) {
      // If it fails, try with token-based auth as fallback
      try {
        const token = await this.getAuthToken();
        if (token) {
          const response = await apiClient.post('/api/test/answer', request, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data: SubmitAnswerResponse = response.data;

          await this.updateTestProgress(request.answer);

          if (data.isComplete && data.results) {
            await this.saveTestResults(data.results);
          }

          return data;
        }
      } catch (tokenError) {
        // Ignore token error, use the original error
      }
      
      throw this.handleApiError(error, 'Failed to submit answer');
    }
  }

  /**
   * Recover an interrupted test session
   */
  async recoverSession(): Promise<{
    recovered: boolean;
    sessionId?: string;
    currentQuestion?: Question;
    progress?: {
      questionsAnswered: number;
      totalQuestions: number;
    };
  }> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await apiClient.post('/api/test/recover', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      console.warn('Failed to recover session:', error);
      return { recovered: false };
    }
  }

  /**
   * Get test results by session ID
   */
  async getTestResults(sessionId: string): Promise<ITestResults> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await apiClient.get(`/api/test/results/${sessionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw this.handleApiError(error, 'Failed to get test results');
    }
  }

  /**
   * Get test history for the user
   */
  async getTestHistory(): Promise<ITestResults[]> {
    try {
      const token = await this.getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await apiClient.get('/api/test/history', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw this.handleApiError(error, 'Failed to get test history');
    }
  }

  /**
   * Save test progress locally for offline recovery
   */
  private async saveTestProgress(progress: TestProgress): Promise<void> {
    try {
      await AsyncStorage.setItem(TEST_PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn('Failed to save test progress:', error);
    }
  }

  /**
   * Update test progress with new answer
   */
  private async updateTestProgress(answer: Answer): Promise<void> {
    try {
      const progressStr = await AsyncStorage.getItem(TEST_PROGRESS_KEY);
      if (progressStr) {
        const progress: TestProgress = JSON.parse(progressStr);
        progress.answers.push(answer);
        progress.currentQuestionIndex += 1;
        progress.timestamp = new Date();
        
        await AsyncStorage.setItem(TEST_PROGRESS_KEY, JSON.stringify(progress));
      }
    } catch (error) {
      console.warn('Failed to update test progress:', error);
    }
  }

  /**
   * Get saved test progress
   */
  async getTestProgress(): Promise<TestProgress | null> {
    try {
      const progressStr = await AsyncStorage.getItem(TEST_PROGRESS_KEY);
      return progressStr ? JSON.parse(progressStr) : null;
    } catch (error) {
      console.warn('Failed to get test progress:', error);
      return null;
    }
  }

  /**
   * Clear test progress after completion
   */
  private async clearTestProgress(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TEST_PROGRESS_KEY);
    } catch (error) {
      console.warn('Failed to clear test progress:', error);
    }
  }

  /**
   * Save test results locally
   */
  private async saveTestResults(results: ITestResults): Promise<void> {
    try {
      const cachedResults = {
        results,
        timestamp: new Date(),
        synced: true
      };
      await AsyncStorage.setItem(TEST_RESULTS_KEY, JSON.stringify(cachedResults));
    } catch (error) {
      console.warn('Failed to save test results:', error);
    }
  }

  /**
   * Get cached test results
   */
  async getCachedResults(): Promise<ITestResults | null> {
    try {
      const resultsStr = await AsyncStorage.getItem(TEST_RESULTS_KEY);
      if (resultsStr) {
        const cached = JSON.parse(resultsStr);
        return cached.results;
      }
      return null;
    } catch (error) {
      console.warn('Failed to get cached results:', error);
      return null;
    }
  }

  /**
   * Check if user has completed the test
   */
  async hasCompletedTest(): Promise<boolean> {
    try {
      // First check local cache
      const cachedResults = await this.getCachedResults();
      if (cachedResults) {
        return true;
      }

      // Then check with server
      const status = await this.checkTestStatus();
      return status.completed;
    } catch (error) {
      console.warn('Failed to check test completion:', error);
      return false;
    }
  }

  /**
   * Handle API errors and convert to user-friendly messages
   */
  private handleApiError(error: any, defaultMessage: string): ApiError {
    const apiError: ApiError = {
      message: defaultMessage,
      status: error.response?.status,
      details: error.response?.data?.error || error.message
    };

    // Map specific error codes to user-friendly messages
    switch (error.response?.status) {
      case 401:
        apiError.message = 'Please log in to continue';
        break;
      case 403:
        apiError.message = 'You don\'t have permission to access this feature';
        break;
      case 404:
        apiError.message = 'Test session not found';
        break;
      case 400:
        if (error.response?.data?.error?.includes('Test already completed')) {
          apiError.message = 'You have already completed the aptitude test';
        } else {
          apiError.message = 'Invalid request. Please try again';
        }
        break;
      case 429:
        apiError.message = 'Too many requests. Please wait and try again';
        break;
      case 500:
        apiError.message = 'Server error. Please try again later';
        break;
      default:
        // Check for network connectivity issues (React Native compatible)
        if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error') || !error.response) {
          apiError.message = 'Cannot connect to server. Please check if the backend is running and your network connection';
          apiError.details = `Network error: ${error.message || 'Unknown network error'}`;
        }
    }

    return apiError;
  }

  /**
   * Retry mechanism for failed requests
   */
  async retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        
        // Don't retry on certain errors
        const axiosError = error as any;
        if (
          axiosError.response?.status === 401 || // Unauthorized
          axiosError.response?.status === 403 || // Forbidden
          axiosError.response?.status === 400    // Bad Request
        ) {
          throw error;
        }

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
      }
    }

    throw lastError;
  }

  /**
   * Validate answer before submission
   */
  validateAnswer(answer: Answer, question: Question): boolean {
    if (!answer.questionId || answer.questionId !== question.id) {
      return false;
    }

    switch (question.type) {
      case 'multiple_choice':
        return question.options?.includes(answer.value as string) ?? false;
      
      case 'rating':
        const rating = answer.value as number;
        return (
          typeof rating === 'number' &&
          question.scale !== undefined &&
          rating >= question.scale.min &&
          rating <= question.scale.max
        );
      
      case 'text':
        return typeof answer.value === 'string' && answer.value.trim().length > 0;
      
      case 'image_preference':
        return question.images?.includes(answer.value as string) ?? false;
      
      default:
        return false;
    }
  }
}

export const testApiService = new TestApiService();
export default testApiService;