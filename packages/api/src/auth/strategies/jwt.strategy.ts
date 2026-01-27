import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../../database/firebase.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private firebaseService: FirebaseService,
  ) {
    const secret = configService.get<string>('jwt.secret') || 'default-secret';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const db = this.firebaseService.getFirestore();

    const profileDoc = await db.collection('profiles').doc(payload.sub).get();

    if (!profileDoc.exists) {
      throw new UnauthorizedException('User not found');
    }

    const profile = profileDoc.data();

    return {
      id: profile?.id,
      email: profile?.email,
      fullName: profile?.fullName,
      ageGroup: profile?.ageGroup,
      learningGoals: profile?.learningGoals,
      onboardingCompleted: profile?.onboardingCompleted,
    };
  }
}
