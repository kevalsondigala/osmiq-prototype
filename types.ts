export enum View {
  HOME = 'HOME',
  CHATBOT = 'CHATBOT',
  SURPRISE_TEST = 'SURPRISE_TEST',
  GENERATE_PAPERS = 'GENERATE_PAPERS',
  MOCK_TEST = 'MOCK_TEST',
  ANALYTICS = 'ANALYTICS',
  PROJECT_HELPER = 'PROJECT_HELPER',
  KNOWLEDGE_HUB = 'KNOWLEDGE_HUB',
  SETTINGS = 'SETTINGS',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export interface Question {
  id: string;
  text: string;
  options?: string[]; // For MCQs
  correctAnswer?: string; // For auto-grading
  type: 'MCQ' | 'SUBJECTIVE';
  marks: number;
}

export interface TestPaper {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  durationMinutes: number;
  totalMarks: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface FileMetadata {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'IMG';
  size: string;
  dateUploaded: string;
  tags: string[];
}

export interface TestResult {
  id: string;
  testId: string;
  date: string;
  score: number;
  totalScore: number;
  feedback: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
  steps: string[];
  materials: string[];
}

export interface ProjectReport {
  executionSteps: string[];
  materials: string[];
  estimatedCost: string;
  processDescription: string;
}