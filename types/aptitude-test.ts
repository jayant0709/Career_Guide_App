/**
 * Simple types for the aptitude test modal system
 * Matching the web app's simple approach
 */

// Basic question structure for the 5-question test
export interface Question {
  id: string;
  text: string;
  options: string[];
  category: string;
}

// Simple test results structure
export interface TestResults {
  topStream: string;
  score: number;
  allScores: {
    science: number;
    commerce: number;
    arts: number;
    vocational: number;
  };
  recommendations: {
    subjects: string[];
    careers: string[];
    colleges: string[];
  };
}

// Component props
export interface SimpleTestModalProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (results: TestResults) => void;
}

export interface TestButtonProps {
  style?: any;
  textStyle?: any;
  onComplete?: (results: TestResults) => void;
}