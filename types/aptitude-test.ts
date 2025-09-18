/**
 * Shared types and interfaces for the aptitude test system in React Native
 * Adapted from the web app types for mobile-specific components
 */

// Re-export core types from backend models
export type AssessmentArea = 'personality' | 'interests' | 'aptitude' | 'values';

export interface Answer {
  questionId: string;
  value: string | number;
  timestamp: Date;
}

export interface QuestionContext {
  previousAnswers: Answer[];
  currentFocus: AssessmentArea;
  questionCount: number;
}

// Personality traits analysis
export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

// Interest areas
export interface Interests {
  stem: number;
  arts: number;
  business: number;
  social: number;
  practical: number;
}

// Stream recommendations
export interface StreamRecommendation {
  score: number;
  subjects: string[];
}

export interface StreamRecommendations {
  science: StreamRecommendation;
  commerce: StreamRecommendation;
  arts: StreamRecommendation;
  vocational: StreamRecommendation;
}

// Career path information
export interface CareerPath {
  title: string;
  stream: string;
  description: string;
  requiredSubjects: string[];
  averageSalary: { min: number; max: number };
  jobGrowth: number;
  matchScore: number;
}

// Test results interface
export interface ITestResults {
  userId: string;
  sessionId: string;
  completedAt: Date;
  personalityTraits: PersonalityTraits;
  interests: Interests;
  streamRecommendations: StreamRecommendations;
  careerPaths: CareerPath[];
  createdAt: Date;
  updatedAt: Date;
}

// Test session interface
export interface ITestSession {
  userId: string;
  sessionId: string;
  startedAt: Date;
  completedAt?: Date;
  currentQuestionIndex: number;
  responses: Answer[];
  aiContext: QuestionContext;
  status: 'active' | 'completed' | 'abandoned';
}

// Question types for the test system
export interface Question {
  id: string;
  type: 'multiple_choice' | 'rating' | 'text' | 'image_preference';
  text: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
  images?: string[];
  category: AssessmentArea;
}

// API Response types
export interface TestStatusResponse {
  completed: boolean;
  results?: ITestResults;
  currentQuestion?: Question;
}

export interface StartTestRequest {
  userId: string;
}

export interface StartTestResponse {
  sessionId: string;
  firstQuestion: Question;
}

export interface SubmitAnswerRequest {
  sessionId: string;
  questionId: string;
  answer: Answer;
}

export interface SubmitAnswerResponse {
  nextQuestion?: Question;
  isComplete: boolean;
  results?: ITestResults;
}

// React Native specific component prop types
export interface TestModalProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (results: ITestResults) => void;
}

export interface AdaptiveQuestionProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  isLoading: boolean;
}

export interface TestProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  onBack?: () => void;
}

export interface ResultsScreenProps {
  results: ITestResults;
  onDismiss: () => void;
}

export interface CareerRecommendationCardProps {
  careerPath: CareerPath;
  onPress?: () => void;
}

export interface StreamScoreProps {
  streamName: string;
  recommendation: StreamRecommendation;
}

export interface PersonalityTraitCardProps {
  traitName: string;
  score: number;
  description: string;
}

// Test state management types
export interface TestState {
  status: 'idle' | 'loading' | 'not_started' | 'in_progress' | 'completed' | 'error';
  sessionId?: string;
  currentQuestion?: Question;
  questionCount: number;
  totalQuestions: number;
  results?: ITestResults;
  error?: string;
  isSubmitting: boolean;
}

export interface TestContextType {
  testState: TestState;
  startTest: (forceStart?: boolean) => Promise<void>;
  submitAnswer: (answer: Answer) => Promise<void>;
  resetTest: () => void;
  checkTestStatus: () => Promise<void>;
  clearError: () => void;
  getResults: () => Promise<ITestResults | null>;
  canStartTest: () => boolean;
  isTestInProgress: () => boolean;
  isTestCompleted: () => boolean;
  getProgressPercentage: () => number;
  retry: () => Promise<void>;
}

// Network and error handling types
export interface ApiError {
  message: string;
  status?: number;
  details?: string;
}

export interface NetworkState {
  isConnected: boolean;
  retryCount: number;
}

// Local storage types for offline support
export interface TestProgress {
  sessionId: string;
  answers: Answer[];
  currentQuestionIndex: number;
  timestamp: Date;
}

export interface CachedResults {
  results: ITestResults;
  timestamp: Date;
  synced: boolean;
}

// Animation and UI state types
export interface QuestionTransition {
  entering: boolean;
  exiting: boolean;
}

export interface ProgressAnimation {
  progress: number;
  animated: boolean;
}

// Navigation types for React Navigation
export type TestStackParamList = {
  TestIntro: undefined;
  TestQuestion: {
    sessionId: string;
    question: Question;
    questionNumber: number;
    totalQuestions: number;
  };
  TestResults: {
    results: ITestResults;
  };
  CareerDetails: {
    careerPath: CareerPath;
  };
};

export type TestScreenNavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<TestStackParamList>;
export type TestScreenRouteProp<T extends keyof TestStackParamList> = import('@react-navigation/native').RouteProp<TestStackParamList, T>;

// Theme and styling types
export interface TestTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}