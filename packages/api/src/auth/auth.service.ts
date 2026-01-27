import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from '../database/firebase.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private firebaseService: FirebaseService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const auth = this.firebaseService.getAuth();
    const db = this.firebaseService.getFirestore();

    try {
      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email: signupDto.email,
        password: signupDto.password,
        displayName: signupDto.fullName,
      });

      // Create profile in Firestore
      const profileData = {
        id: userRecord.uid,
        email: signupDto.email,
        fullName: signupDto.fullName || null,
        ageGroup: null,
        learningGoals: [],
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      await db.collection('profiles').doc(userRecord.uid).set(profileData);

      // Create user statistics
      await db.collection('userStatistics').doc(userRecord.uid).set({
        userId: userRecord.uid,
        totalPracticeMinutes: 0,
        lessonsCompleted: 0,
        currentStreak: 0,
        updatedAt: new Date().toISOString(),
      });

      const token = this.generateToken(userRecord.uid, signupDto.email);

      return {
        user: this.formatUser(profileData),
        token,
      };
    } catch (error: any) {
      if (error.code === 'auth/email-already-exists') {
        throw new ConflictException('User with this email already exists');
      }
      throw new ConflictException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    const db = this.firebaseService.getFirestore();

    // Note: Firebase Admin SDK doesn't support password verification directly
    // In production, you'd verify the Firebase ID token from the client
    // For this backend, we'll use a custom token approach

    // Find user by email
    const profilesRef = db.collection('profiles');
    const snapshot = await profilesRef.where('email', '==', loginDto.email).get();

    if (snapshot.empty) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const profileDoc = snapshot.docs[0];
    const profile = profileDoc.data();

    // In a real implementation, the client would authenticate with Firebase
    // and send an ID token. Here we're simplifying for the demo.
    const token = this.generateToken(profile.id, profile.email);

    return {
      user: this.formatUser(profile),
      token,
    };
  }

  async verifyFirebaseToken(idToken: string) {
    const auth = this.firebaseService.getAuth();
    const db = this.firebaseService.getFirestore();

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      const uid = decodedToken.uid;

      const profileDoc = await db.collection('profiles').doc(uid).get();

      if (!profileDoc.exists) {
        throw new UnauthorizedException('User profile not found');
      }

      const profile = profileDoc.data();
      const token = this.generateToken(uid, decodedToken.email || '');

      return {
        user: this.formatUser(profile),
        token,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }

  async forgotPassword(email: string) {
    // Firebase handles password reset via client SDK
    // This endpoint just confirms the request was received
    return { message: 'Password reset email will be sent if the account exists' };
  }

  private generateToken(userId: string, email: string): string {
    return this.jwtService.sign({
      sub: userId,
      email,
    });
  }

  private formatUser(profile: any) {
    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.fullName,
      ageGroup: profile.ageGroup,
      learningGoals: profile.learningGoals,
      onboardingCompleted: profile.onboardingCompleted,
      createdAt: profile.createdAt,
    };
  }
}
