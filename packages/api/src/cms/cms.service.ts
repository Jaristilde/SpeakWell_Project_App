import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import {
  CreateLessonDto,
  UpdateLessonDto,
  LessonResponse,
  CreateTopicDto,
  UpdateTopicDto,
  TopicResponse,
  CreateExerciseDto,
  UpdateExerciseDto,
  ExerciseResponse,
} from './dto';

@Injectable()
export class CmsService {
  constructor(private firebaseService: FirebaseService) {}

  // ==================== LESSONS ====================

  async createLesson(dto: CreateLessonDto): Promise<LessonResponse> {
    const db = this.firebaseService.getFirestore();
    const now = new Date().toISOString();

    const lessonData = {
      // Basic fields
      title: dto.title,
      description: dto.description,
      topicId: dto.topicId || null,
      difficulty: dto.difficulty,
      category: dto.category,

      // Micro-lesson structure
      introductionContent: dto.introductionContent || null,
      learningObjectives: dto.learningObjectives || [],
      coreConceptContent: dto.coreConceptContent || null,
      exerciseType: dto.exerciseType || null,
      exerciseContent: dto.exerciseContent || null,
      practicePrompt: dto.practicePrompt || null,
      practiceGuidelines: dto.practiceGuidelines || [],
      practiceRecordingDurationSeconds: dto.practiceRecordingDurationSeconds || 120,
      summaryContent: dto.summaryContent || null,
      keyTakeaways: dto.keyTakeaways || [],

      // Legacy/general fields
      content: dto.content || null,
      durationMinutes: dto.durationMinutes || 15,
      order: dto.order || 0,
      isPublished: dto.isPublished || false,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection('lessons').add(lessonData);

    return this.formatLesson(docRef.id, lessonData);
  }

  async getAllLessons(): Promise<LessonResponse[]> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('lessons')
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => this.formatLesson(doc.id, doc.data()));
  }

  async getLessonById(id: string): Promise<LessonResponse> {
    const db = this.firebaseService.getFirestore();

    const lessonDoc = await db.collection('lessons').doc(id).get();

    if (!lessonDoc.exists) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    return this.formatLesson(lessonDoc.id, lessonDoc.data());
  }

  async updateLesson(id: string, dto: UpdateLessonDto): Promise<LessonResponse> {
    const db = this.firebaseService.getFirestore();

    const lessonRef = db.collection('lessons').doc(id);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    // Basic fields
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.topicId !== undefined) updateData.topicId = dto.topicId;
    if (dto.difficulty !== undefined) updateData.difficulty = dto.difficulty;
    if (dto.category !== undefined) updateData.category = dto.category;

    // Micro-lesson structure
    if (dto.introductionContent !== undefined) updateData.introductionContent = dto.introductionContent;
    if (dto.learningObjectives !== undefined) updateData.learningObjectives = dto.learningObjectives;
    if (dto.coreConceptContent !== undefined) updateData.coreConceptContent = dto.coreConceptContent;
    if (dto.exerciseType !== undefined) updateData.exerciseType = dto.exerciseType;
    if (dto.exerciseContent !== undefined) updateData.exerciseContent = dto.exerciseContent;
    if (dto.practicePrompt !== undefined) updateData.practicePrompt = dto.practicePrompt;
    if (dto.practiceGuidelines !== undefined) updateData.practiceGuidelines = dto.practiceGuidelines;
    if (dto.practiceRecordingDurationSeconds !== undefined) updateData.practiceRecordingDurationSeconds = dto.practiceRecordingDurationSeconds;
    if (dto.summaryContent !== undefined) updateData.summaryContent = dto.summaryContent;
    if (dto.keyTakeaways !== undefined) updateData.keyTakeaways = dto.keyTakeaways;

    // Legacy/general fields
    if (dto.content !== undefined) updateData.content = dto.content;
    if (dto.durationMinutes !== undefined) updateData.durationMinutes = dto.durationMinutes;
    if (dto.order !== undefined) updateData.order = dto.order;
    if (dto.isPublished !== undefined) updateData.isPublished = dto.isPublished;

    await lessonRef.update(updateData);

    const updatedDoc = await lessonRef.get();
    return this.formatLesson(updatedDoc.id, updatedDoc.data());
  }

  async deleteLesson(id: string): Promise<{ success: boolean; message: string }> {
    const db = this.firebaseService.getFirestore();

    const lessonRef = db.collection('lessons').doc(id);
    const lessonDoc = await lessonRef.get();

    if (!lessonDoc.exists) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    await lessonRef.delete();

    return { success: true, message: `Lesson ${id} deleted successfully` };
  }

  private formatLesson(id: string, data: any): LessonResponse {
    return {
      id,
      title: data.title,
      description: data.description || '',
      topicId: data.topicId || null,
      difficulty: data.difficulty,
      category: data.category || '',

      // Micro-lesson structure
      introductionContent: data.introductionContent || null,
      learningObjectives: data.learningObjectives || [],
      coreConceptContent: data.coreConceptContent || null,
      exerciseType: data.exerciseType || null,
      exerciseContent: data.exerciseContent || null,
      practicePrompt: data.practicePrompt || null,
      practiceGuidelines: data.practiceGuidelines || [],
      practiceRecordingDurationSeconds: data.practiceRecordingDurationSeconds || 120,
      summaryContent: data.summaryContent || null,
      keyTakeaways: data.keyTakeaways || [],

      // General fields
      content: data.content || null,
      durationMinutes: data.durationMinutes || 15,
      order: data.order || 0,
      isPublished: data.isPublished || false,
      createdAt: data.createdAt || '',
      updatedAt: data.updatedAt || '',
    };
  }

  // ==================== TOPICS ====================

  async createTopic(dto: CreateTopicDto): Promise<TopicResponse> {
    const db = this.firebaseService.getFirestore();
    const now = new Date().toISOString();

    const topicData = {
      name: dto.name,
      description: dto.description,
      category: dto.category,
      subCategory: dto.subCategory || null,
      icon: dto.icon || null,
      color: dto.color || null,
      order: dto.order || 0,
      isActive: dto.isActive !== undefined ? dto.isActive : true,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection('topics').add(topicData);

    return this.formatTopic(docRef.id, topicData);
  }

  async getAllTopics(): Promise<TopicResponse[]> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('topics')
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => this.formatTopic(doc.id, doc.data()));
  }

  async getTopicById(id: string): Promise<TopicResponse> {
    const db = this.firebaseService.getFirestore();

    const topicDoc = await db.collection('topics').doc(id).get();

    if (!topicDoc.exists) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return this.formatTopic(topicDoc.id, topicDoc.data());
  }

  async getTopicsByCategory(category: string): Promise<TopicResponse[]> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('topics')
      .where('category', '==', category)
      .where('isActive', '==', true)
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => this.formatTopic(doc.id, doc.data()));
  }

  async updateTopic(id: string, dto: UpdateTopicDto): Promise<TopicResponse> {
    const db = this.firebaseService.getFirestore();

    const topicRef = db.collection('topics').doc(id);
    const topicDoc = await topicRef.get();

    if (!topicDoc.exists) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.category !== undefined) updateData.category = dto.category;
    if (dto.subCategory !== undefined) updateData.subCategory = dto.subCategory;
    if (dto.icon !== undefined) updateData.icon = dto.icon;
    if (dto.color !== undefined) updateData.color = dto.color;
    if (dto.order !== undefined) updateData.order = dto.order;
    if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

    await topicRef.update(updateData);

    const updatedDoc = await topicRef.get();
    return this.formatTopic(updatedDoc.id, updatedDoc.data());
  }

  async deleteTopic(id: string): Promise<{ success: boolean; message: string }> {
    const db = this.firebaseService.getFirestore();

    const topicRef = db.collection('topics').doc(id);
    const topicDoc = await topicRef.get();

    if (!topicDoc.exists) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    await topicRef.delete();

    return { success: true, message: `Topic ${id} deleted successfully` };
  }

  private formatTopic(id: string, data: any): TopicResponse {
    return {
      id,
      name: data.name,
      description: data.description || '',
      category: data.category,
      subCategory: data.subCategory || null,
      icon: data.icon || null,
      color: data.color || null,
      order: data.order || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: data.createdAt || '',
      updatedAt: data.updatedAt || '',
    };
  }

  // ==================== EXERCISES ====================

  async createExercise(dto: CreateExerciseDto): Promise<ExerciseResponse> {
    const db = this.firebaseService.getFirestore();
    const now = new Date().toISOString();

    const exerciseData = {
      type: dto.type,
      prompt: dto.prompt,
      instructions: dto.instructions || null,
      expectedDurationSeconds: dto.expectedDurationSeconds,
      lessonId: dto.lessonId || null,
      topicId: dto.topicId || null,
      order: dto.order || 0,
      isActive: dto.isActive !== undefined ? dto.isActive : true,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await db.collection('exercises').add(exerciseData);

    return {
      id: docRef.id,
      ...exerciseData,
    };
  }

  async getAllExercises(): Promise<ExerciseResponse[]> {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('exercises')
      .orderBy('order', 'asc')
      .get();

    return snapshot.docs.map(doc => this.formatExercise(doc.id, doc.data()));
  }

  async getExerciseById(id: string): Promise<ExerciseResponse> {
    const db = this.firebaseService.getFirestore();

    const exerciseDoc = await db.collection('exercises').doc(id).get();

    if (!exerciseDoc.exists) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    return this.formatExercise(exerciseDoc.id, exerciseDoc.data());
  }

  async updateExercise(id: string, dto: UpdateExerciseDto): Promise<ExerciseResponse> {
    const db = this.firebaseService.getFirestore();

    const exerciseRef = db.collection('exercises').doc(id);
    const exerciseDoc = await exerciseRef.get();

    if (!exerciseDoc.exists) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date().toISOString(),
    };

    if (dto.type !== undefined) updateData.type = dto.type;
    if (dto.prompt !== undefined) updateData.prompt = dto.prompt;
    if (dto.instructions !== undefined) updateData.instructions = dto.instructions;
    if (dto.expectedDurationSeconds !== undefined) updateData.expectedDurationSeconds = dto.expectedDurationSeconds;
    if (dto.lessonId !== undefined) updateData.lessonId = dto.lessonId;
    if (dto.topicId !== undefined) updateData.topicId = dto.topicId;
    if (dto.order !== undefined) updateData.order = dto.order;
    if (dto.isActive !== undefined) updateData.isActive = dto.isActive;

    await exerciseRef.update(updateData);

    const updatedDoc = await exerciseRef.get();
    return this.formatExercise(updatedDoc.id, updatedDoc.data());
  }

  async deleteExercise(id: string): Promise<{ success: boolean; message: string }> {
    const db = this.firebaseService.getFirestore();

    const exerciseRef = db.collection('exercises').doc(id);
    const exerciseDoc = await exerciseRef.get();

    if (!exerciseDoc.exists) {
      throw new NotFoundException(`Exercise with ID ${id} not found`);
    }

    await exerciseRef.delete();

    return { success: true, message: `Exercise ${id} deleted successfully` };
  }

  private formatExercise(id: string, data: any): ExerciseResponse {
    return {
      id,
      type: data.type,
      prompt: data.prompt,
      instructions: data.instructions || null,
      expectedDurationSeconds: data.expectedDurationSeconds || 0,
      lessonId: data.lessonId || null,
      topicId: data.topicId || null,
      order: data.order || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: data.createdAt || '',
      updatedAt: data.updatedAt || '',
    };
  }

  // ==================== STATS ====================

  async getCmsStats(): Promise<{
    totalLessons: number;
    publishedLessons: number;
    totalTopics: number;
    activeTopics: number;
    totalExercises: number;
    activeExercises: number;
    lessonsByCategory: Record<string, number>;
    topicsByCategory: Record<string, number>;
  }> {
    const db = this.firebaseService.getFirestore();

    const [lessonsSnap, topicsSnap, exercisesSnap] = await Promise.all([
      db.collection('lessons').get(),
      db.collection('topics').get(),
      db.collection('exercises').get(),
    ]);

    const lessons = lessonsSnap.docs.map(d => d.data());
    const topics = topicsSnap.docs.map(d => d.data());
    const exercises = exercisesSnap.docs.map(d => d.data());

    // Count lessons by category
    const lessonsByCategory: Record<string, number> = {};
    lessons.forEach(l => {
      const cat = l.category || 'uncategorized';
      lessonsByCategory[cat] = (lessonsByCategory[cat] || 0) + 1;
    });

    // Count topics by category
    const topicsByCategory: Record<string, number> = {};
    topics.forEach(t => {
      const cat = t.category || 'uncategorized';
      topicsByCategory[cat] = (topicsByCategory[cat] || 0) + 1;
    });

    return {
      totalLessons: lessons.length,
      publishedLessons: lessons.filter(l => l.isPublished).length,
      totalTopics: topics.length,
      activeTopics: topics.filter(t => t.isActive !== false).length,
      totalExercises: exercises.length,
      activeExercises: exercises.filter(e => e.isActive !== false).length,
      lessonsByCategory,
      topicsByCategory,
    };
  }
}
