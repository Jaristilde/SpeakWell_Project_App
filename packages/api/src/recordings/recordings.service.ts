import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from '../database/firebase.service';

@Injectable()
export class RecordingsService {
  private s3Client: S3Client;
  private bucket: string;

  constructor(
    private configService: ConfigService,
    private firebaseService: FirebaseService,
  ) {
    const region = this.configService.get<string>('aws.region') || 'us-east-1';
    const accessKeyId = this.configService.get<string>('aws.accessKeyId');
    const secretAccessKey = this.configService.get<string>('aws.secretAccessKey');

    if (accessKeyId && secretAccessKey) {
      this.s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    } else {
      this.s3Client = new S3Client({ region });
    }

    this.bucket = this.configService.get<string>('aws.s3Bucket') || 'confidently-recordings';
  }

  async getPresignedUrl(userId: string, contentType: string) {
    const key = `recordings/${userId}/${uuidv4()}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return {
      uploadUrl: url,
      key,
    };
  }

  async createRecording(
    userId: string,
    s3Key: string,
    durationSeconds: number,
    transcript?: string,
  ) {
    const db = this.firebaseService.getFirestore();
    const s3Url = `https://${this.bucket}.s3.amazonaws.com/${s3Key}`;
    const now = new Date().toISOString();

    const docRef = await db.collection('recordings').add({
      userId,
      s3Url,
      durationSeconds,
      transcript: transcript || null,
      createdAt: now,
    });

    // Update practice time statistics
    await this.updatePracticeTime(userId, durationSeconds);

    return {
      id: docRef.id,
      userId,
      s3Url,
      durationSeconds,
      transcript,
      createdAt: now,
    };
  }

  async getUserRecordings(userId: string) {
    const db = this.firebaseService.getFirestore();

    const snapshot = await db.collection('recordings')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  private async updatePracticeTime(userId: string, durationSeconds: number) {
    const db = this.firebaseService.getFirestore();
    const practiceMinutes = Math.ceil(durationSeconds / 60);

    const statsDoc = await db.collection('userStatistics').doc(userId).get();
    const currentMinutes = statsDoc.exists ? (statsDoc.data()?.totalPracticeMinutes || 0) : 0;

    await db.collection('userStatistics').doc(userId).set({
      userId,
      totalPracticeMinutes: currentMinutes + practiceMinutes,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  }
}
