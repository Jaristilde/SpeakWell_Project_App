export interface User {
  id: string;
  email: string;
  fullName?: string;
  ageGroup?: string;
  learningGoals?: string[];
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent;
  category: string;
  difficulty: number;
  durationMinutes: number;
}

export interface LessonContent {
  introduction: string;
  tips: string[];
  exercise: string;
  exampleScript?: string;
}

export interface UserLesson {
  id: string;
  userId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string;
}

export interface Recording {
  id: string;
  userId: string;
  s3Url: string;
  durationSeconds: number;
  transcript?: string;
  createdAt: string;
}

export interface UserStatistics {
  userId: string;
  totalPracticeMinutes: number;
  lessonsCompleted: number;
  currentStreak: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface OnboardingData {
  ageGroup: string;
  learningGoals: string[];
}
