import { auth } from '../lib/firebase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Helper to get auth token
async function getAuthHeaders(): Promise<Record<string, string>> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Not authenticated');
  }
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// Generic fetch wrapper
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: Record<string, any> | null;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonInput {
  title: string;
  description: string;
  content?: Record<string, any>;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  order?: number;
  isPublished?: boolean;
}

export interface UpdateLessonInput {
  title?: string;
  description?: string;
  content?: Record<string, any>;
  durationMinutes?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  order?: number;
  isPublished?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTopicInput {
  name: string;
  description: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateTopicInput {
  name?: string;
  description?: string;
  icon?: string;
  order?: number;
  isActive?: boolean;
}

export interface Exercise {
  id: string;
  type: 'speaking' | 'listening' | 'reading' | 'pronunciation' | 'vocabulary' | 'conversation';
  prompt: string;
  instructions: string | null;
  expectedDurationSeconds: number;
  lessonId: string | null;
  topicId: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExerciseInput {
  type: Exercise['type'];
  prompt: string;
  instructions?: string;
  expectedDurationSeconds: number;
  lessonId?: string;
  topicId?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateExerciseInput {
  type?: Exercise['type'];
  prompt?: string;
  instructions?: string;
  expectedDurationSeconds?: number;
  lessonId?: string;
  topicId?: string;
  order?: number;
  isActive?: boolean;
}

export interface CmsStats {
  totalLessons: number;
  publishedLessons: number;
  totalTopics: number;
  activeTopics: number;
  totalExercises: number;
  activeExercises: number;
}

// CMS API functions

export const cmsApi = {
  // Stats
  getStats: () => fetchApi<CmsStats>('/cms/stats'),

  // Lessons
  getLessons: () => fetchApi<Lesson[]>('/cms/lessons'),
  getLesson: (id: string) => fetchApi<Lesson>(`/cms/lessons/${id}`),
  createLesson: (data: CreateLessonInput) =>
    fetchApi<Lesson>('/cms/lessons', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateLesson: (id: string, data: UpdateLessonInput) =>
    fetchApi<Lesson>(`/cms/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteLesson: (id: string) =>
    fetchApi<{ success: boolean; message: string }>(`/cms/lessons/${id}`, {
      method: 'DELETE',
    }),

  // Topics
  getTopics: () => fetchApi<Topic[]>('/cms/topics'),
  getTopic: (id: string) => fetchApi<Topic>(`/cms/topics/${id}`),
  createTopic: (data: CreateTopicInput) =>
    fetchApi<Topic>('/cms/topics', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateTopic: (id: string, data: UpdateTopicInput) =>
    fetchApi<Topic>(`/cms/topics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteTopic: (id: string) =>
    fetchApi<{ success: boolean; message: string }>(`/cms/topics/${id}`, {
      method: 'DELETE',
    }),

  // Exercises
  getExercises: () => fetchApi<Exercise[]>('/cms/exercises'),
  getExercise: (id: string) => fetchApi<Exercise>(`/cms/exercises/${id}`),
  createExercise: (data: CreateExerciseInput) =>
    fetchApi<Exercise>('/cms/exercises', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateExercise: (id: string, data: UpdateExerciseInput) =>
    fetchApi<Exercise>(`/cms/exercises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  deleteExercise: (id: string) =>
    fetchApi<{ success: boolean; message: string }>(`/cms/exercises/${id}`, {
      method: 'DELETE',
    }),
};
