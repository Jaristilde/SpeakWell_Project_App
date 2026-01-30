import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { FirebaseService } from '../database/firebase.service';
import { AiService, FeedbackAnalysis, PracticeContext } from '../ai/ai.service';

export interface FeedbackRecord {
  id: string;
  userId: string;
  recordingId: string;
  lessonId?: string;
  transcript: string;
  analysis: FeedbackAnalysis;
  quickTip: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  createdAt: string;
  completedAt?: string;
}

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);
  private s3Client: S3Client;
  private bucket: string;

  constructor(
    private configService: ConfigService,
    private firebaseService: FirebaseService,
    private aiService: AiService,
  ) {
    const region = this.configService.get<string>('aws.region') || 'us-east-1';
    const accessKeyId = this.configService.get<string>('aws.accessKeyId');
    const secretAccessKey = this.configService.get<string>('aws.secretAccessKey');

    if (accessKeyId && secretAccessKey) {
      this.s3Client = new S3Client({
        region,
        credentials: { accessKeyId, secretAccessKey },
      });
    } else {
      this.s3Client = new S3Client({ region });
    }

    this.bucket = this.configService.get<string>('aws.s3Bucket') || 'confidently-recordings';
  }

  async requestFeedback(
    userId: string,
    recordingId: string,
    lessonId?: string,
  ): Promise<{ feedbackId: string; status: string }> {
    if (!this.aiService.isConfigured()) {
      throw new BadRequestException('AI feedback is not configured');
    }

    const db = this.firebaseService.getFirestore();

    // Get the recording
    const recordingDoc = await db.collection('recordings').doc(recordingId).get();
    if (!recordingDoc.exists) {
      throw new NotFoundException('Recording not found');
    }

    const recording = recordingDoc.data();
    if (!recording || recording.userId !== userId) {
      throw new NotFoundException('Recording not found');
    }

    // Check if feedback already exists for this recording
    const existingFeedback = await db.collection('feedback')
      .where('recordingId', '==', recordingId)
      .where('status', 'in', ['completed', 'processing'])
      .limit(1)
      .get();

    if (!existingFeedback.empty) {
      const existing = existingFeedback.docs[0];
      return { feedbackId: existing.id, status: existing.data().status };
    }

    // Create pending feedback record
    const now = new Date().toISOString();
    const feedbackRef = await db.collection('feedback').add({
      userId,
      recordingId,
      lessonId: lessonId || null,
      status: 'pending',
      createdAt: now,
    });

    // Process feedback asynchronously (fire and forget)
    this.processFeedbackAsync(feedbackRef.id, recording, lessonId).catch(err => {
      this.logger.error(`Async feedback processing failed for ${feedbackRef.id}`, err);
    });

    return { feedbackId: feedbackRef.id, status: 'pending' };
  }

  private async processFeedbackAsync(
    feedbackId: string,
    recording: FirebaseFirestore.DocumentData,
    lessonId?: string,
  ): Promise<void> {
    const db = this.firebaseService.getFirestore();

    try {
      // Update status to processing
      await db.collection('feedback').doc(feedbackId).update({
        status: 'processing',
      });

      // Get lesson context if lessonId provided
      let context: PracticeContext | undefined;
      if (lessonId) {
        const lessonDoc = await db.collection('lessons').doc(lessonId).get();
        if (lessonDoc.exists) {
          const lesson = lessonDoc.data();
          if (lesson) {
            context = {
              lessonTitle: lesson.title,
              lessonCategory: lesson.category,
              practicePrompt: lesson.practicePrompt,
              exerciseType: lesson.exerciseType,
            };
          }
        }
      }

      // Get transcript - either from recording or transcribe the audio
      let transcript = recording.transcript;
      if (!transcript) {
        // Download audio from S3 and transcribe
        const s3Key = this.extractS3Key(recording.s3Url);
        const audioBuffer = await this.downloadFromS3(s3Key);
        const transcriptionResult = await this.aiService.transcribeAudio(
          audioBuffer,
          `recording-${feedbackId}.webm`,
        );
        transcript = transcriptionResult.text;

        // Save transcript to recording
        const recordingRef = db.collection('recordings').where('s3Url', '==', recording.s3Url);
        const recordingSnapshot = await recordingRef.limit(1).get();
        if (!recordingSnapshot.empty) {
          await recordingSnapshot.docs[0].ref.update({ transcript });
        }
      }

      // Generate AI feedback
      const analysis = await this.aiService.generateFeedback(
        transcript,
        recording.durationSeconds || 60,
        context,
      );

      // Generate quick tip
      const quickTip = await this.aiService.generateQuickTip(transcript);

      // Update feedback record with results
      await db.collection('feedback').doc(feedbackId).update({
        transcript,
        analysis,
        quickTip,
        status: 'completed',
        completedAt: new Date().toISOString(),
      });

      // Update user statistics with feedback score
      await this.updateUserStats(recording.userId, analysis.overallScore);

      this.logger.log(`Feedback ${feedbackId} completed with score ${analysis.overallScore}`);
    } catch (error) {
      this.logger.error(`Feedback processing failed for ${feedbackId}`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      await db.collection('feedback').doc(feedbackId).update({
        status: 'failed',
        error: errorMessage,
      });
    }
  }

  private extractS3Key(s3Url: string): string {
    const url = new URL(s3Url);
    return url.pathname.substring(1); // Remove leading slash
  }

  private async downloadFromS3(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    const stream = response.Body as NodeJS.ReadableStream;

    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }

  private async updateUserStats(userId: string, score: number): Promise<void> {
    const db = this.firebaseService.getFirestore();
    const statsRef = db.collection('userStatistics').doc(userId);
    const statsDoc = await statsRef.get();

    const stats = statsDoc.data();
    if (statsDoc.exists && stats) {
      const totalSessions = (stats.totalFeedbackSessions || 0) + 1;
      const currentAvg = stats.averageScore || 0;
      const newAverage = ((currentAvg * (totalSessions - 1)) + score) / totalSessions;

      await statsRef.update({
        totalFeedbackSessions: totalSessions,
        averageScore: Math.round(newAverage),
        lastFeedbackScore: score,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await statsRef.set({
        userId,
        totalFeedbackSessions: 1,
        averageScore: score,
        lastFeedbackScore: score,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  async getFeedback(userId: string, feedbackId: string): Promise<FeedbackRecord> {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection('feedback').doc(feedbackId).get();

    if (!doc.exists) {
      throw new NotFoundException('Feedback not found');
    }

    const data = doc.data();
    if (!data || data.userId !== userId) {
      throw new NotFoundException('Feedback not found');
    }

    return {
      id: doc.id,
      ...data,
    } as FeedbackRecord;
  }

  async getFeedbackByRecording(userId: string, recordingId: string): Promise<FeedbackRecord | null> {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db.collection('feedback')
      .where('userId', '==', userId)
      .where('recordingId', '==', recordingId)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as FeedbackRecord;
  }

  async getUserFeedbackHistory(
    userId: string,
    limit: number = 20,
  ): Promise<FeedbackRecord[]> {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db.collection('feedback')
      .where('userId', '==', userId)
      .where('status', '==', 'completed')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as FeedbackRecord[];
  }

  async getUserProgressStats(userId: string): Promise<{
    totalSessions: number;
    averageScore: number;
    recentTrend: 'improving' | 'stable' | 'declining';
    scoreHistory: { date: string; score: number }[];
  }> {
    const feedbackHistory = await this.getUserFeedbackHistory(userId, 10);

    if (feedbackHistory.length === 0) {
      return {
        totalSessions: 0,
        averageScore: 0,
        recentTrend: 'stable',
        scoreHistory: [],
      };
    }

    const scores = feedbackHistory.map(f => f.analysis?.overallScore || 0);
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    // Calculate trend from last 5 sessions
    let recentTrend: 'improving' | 'stable' | 'declining' = 'stable';
    if (scores.length >= 3) {
      const recent = scores.slice(0, 3);
      const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;
      const older = scores.slice(3, 6);
      if (older.length > 0) {
        const avgOlder = older.reduce((a, b) => a + b, 0) / older.length;
        if (avgRecent > avgOlder + 5) recentTrend = 'improving';
        else if (avgRecent < avgOlder - 5) recentTrend = 'declining';
      }
    }

    const scoreHistory = feedbackHistory.map(f => ({
      date: f.createdAt,
      score: f.analysis?.overallScore || 0,
    })).reverse();

    return {
      totalSessions: feedbackHistory.length,
      averageScore,
      recentTrend,
      scoreHistory,
    };
  }
}
