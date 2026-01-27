import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import { UpdateProfileDto, CompleteOnboardingDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(private firebaseService: FirebaseService) {}

  async getProfile(userId: string) {
    const db = this.firebaseService.getFirestore();

    const profileDoc = await db.collection('profiles').doc(userId).get();

    if (!profileDoc.exists) {
      throw new NotFoundException('User not found');
    }

    return this.formatUser(profileDoc.data());
  }

  async updateProfile(userId: string, updateDto: UpdateProfileDto) {
    const db = this.firebaseService.getFirestore();

    const updateData: any = {};
    if (updateDto.fullName !== undefined) updateData.fullName = updateDto.fullName;
    if (updateDto.ageGroup !== undefined) updateData.ageGroup = updateDto.ageGroup;
    if (updateDto.learningGoals !== undefined) updateData.learningGoals = updateDto.learningGoals;

    await db.collection('profiles').doc(userId).update(updateData);

    const profileDoc = await db.collection('profiles').doc(userId).get();
    return this.formatUser(profileDoc.data());
  }

  async completeOnboarding(userId: string, onboardingDto: CompleteOnboardingDto) {
    const db = this.firebaseService.getFirestore();

    await db.collection('profiles').doc(userId).update({
      ageGroup: onboardingDto.ageGroup,
      learningGoals: onboardingDto.learningGoals,
      onboardingCompleted: true,
    });

    const profileDoc = await db.collection('profiles').doc(userId).get();
    return this.formatUser(profileDoc.data());
  }

  async getStatistics(userId: string) {
    const db = this.firebaseService.getFirestore();

    const statsDoc = await db.collection('userStatistics').doc(userId).get();

    if (!statsDoc.exists) {
      return {
        userId,
        totalPracticeMinutes: 0,
        lessonsCompleted: 0,
        currentStreak: 0,
      };
    }

    const stats = statsDoc.data();
    return {
      userId: stats?.userId,
      totalPracticeMinutes: stats?.totalPracticeMinutes || 0,
      lessonsCompleted: stats?.lessonsCompleted || 0,
      currentStreak: stats?.currentStreak || 0,
    };
  }

  private formatUser(profile: any) {
    return {
      id: profile?.id,
      email: profile?.email,
      fullName: profile?.fullName,
      ageGroup: profile?.ageGroup,
      learningGoals: profile?.learningGoals,
      onboardingCompleted: profile?.onboardingCompleted,
      createdAt: profile?.createdAt,
    };
  }
}
